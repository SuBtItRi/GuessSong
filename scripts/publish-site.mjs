import { spawnSync } from "node:child_process";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";

const COLORS = {
  reset: "\x1b[0m",
  cyan: (s) => `\x1b[36m${s}${COLORS.reset}`,
  green: (s) => `\x1b[32m${s}${COLORS.reset}`,
  yellow: (s) => `\x1b[33m${s}${COLORS.reset}`,
  red: (s) => `\x1b[31m${s}${COLORS.reset}`,
};

const log = {
  info: (msg) => console.log(COLORS.cyan(msg)),
  ok: (msg) => console.log(COLORS.green(msg)),
  warn: (msg) => console.log(COLORS.yellow(msg)),
  err: (msg) => console.error(COLORS.red(msg)),
};

const run = (cmd, args, { stdio = "inherit" } = {}) => {
  const res = spawnSync(cmd, args, { stdio });
  if (res.error) throw res.error;
  if (res.status !== 0) {
    throw new Error(`${cmd} ${args.join(" ")} failed with code ${res.status}`);
  }
  return res;
};

const runCapture = (cmd, args) => {
  const res = spawnSync(cmd, args, { stdio: "pipe", encoding: "utf8" });
  if (res.error) throw res.error;
  if (res.status !== 0) return "";
  return (res.stdout ?? "").toString().trim();
};

const isWin = process.platform === "win32";
const yarnCmd = isWin ? "yarn.cmd" : "yarn";

const printHelp = () => {
  log.info(
    [
      "Usage:",
      "  yarn pub [--minor] [--major]",
      "",
      "Description:",
      "  Switch to branch `publish`, bump version, build, commit dist, push to origin, then return back.",
      "",
      "Version rules:",
      "  --minor: x.y.z -> x.(y+1).0 (default)",
      "  --major: x.y.z -> (x+1).0.0",
    ].join("\n")
  );
};

const argv = process.argv.slice(2);
if (argv.includes("--help") || argv.includes("-h")) {
  printHelp();
  process.exit(0);
}

const wantsMajor = argv.includes("--major");
const wantsMinor = argv.includes("--minor");
if (wantsMajor && wantsMinor) {
  log.err("Нельзя одновременно указывать --major и --minor");
  process.exit(1);
}

const bumpType = wantsMajor ? "major" : "minor";
const publishBranch = "publish";

const originalBranch = runCapture("git", ["rev-parse", "--abbrev-ref", "HEAD"]);
if (!originalBranch || originalBranch === "HEAD") {
  log.err("Текущая ветка не определена (detached HEAD). Выйди на ветку и повтори.");
  process.exit(1);
}

const stashTag = `publish-site-temp-${Date.now()}`;
let stashed = false;
const isDirty = runCapture("git", ["status", "--porcelain"]).length > 0;
if (isDirty) {
  log.warn("Есть несохранённые изменения: делаю stash…");
  run("git", ["stash", "push", "-u", "-m", stashTag]);
  stashed = true;
}

const stashPopByTag = () => {
  const stashList = runCapture("git", ["stash", "list"]);
  const lines = stashList ? stashList.split("\n") : [];
  const idx = lines.findIndex((l) => l.includes(stashTag));
  const ref = idx >= 0 ? `stash@{${idx}}` : null;
  if (!ref) {
    log.warn("Не нашёл stash по сообщению, пропускаю восстановление.");
    return;
  }
  run("git", ["stash", "pop", ref]);
};

const parseSemver = (v) => {
  const parts = String(v ?? "0.0.0").split(".");
  const major = Number.parseInt(parts[0] ?? "0", 10) || 0;
  const minor = Number.parseInt(parts[1] ?? "0", 10) || 0;
  const patch = Number.parseInt(parts[2] ?? "0", 10) || 0;
  return { major, minor, patch };
};

const bumpVersion = (version) => {
  const { major, minor } = parseSemver(version);
  if (bumpType === "major") return { major: major + 1, minor: 0, patch: 0, tag: `${major + 1}.0` };
  const nextMinor = minor + 1;
  return { major, minor: nextMinor, patch: 0, tag: `${major}.${nextMinor}` };
};

const setPackageVersion = async (newVersion) => {
  const packageJsonPath = fileURLToPath(new URL("../package.json", import.meta.url));
  const raw = await fs.readFile(packageJsonPath, "utf8");
  const pkg = JSON.parse(raw);
  pkg.version = newVersion;
  await fs.writeFile(packageJsonPath, JSON.stringify(pkg, null, 2) + "\n", "utf8");
};

try {
  // Проверка существования ветки
  const publishExistsRes = spawnSync(
    "git",
    ["show-ref", "--verify", "--quiet", `refs/heads/${publishBranch}`],
    { stdio: "ignore" }
  );
  const publishExists = publishExistsRes.status === 0;

  if (!publishExists) {
    log.info(`Создаю ветку ${publishBranch}…`);
    run("git", ["checkout", "-b", publishBranch]);
  } else {
    log.info(`Переключаюсь на ${publishBranch}…`);
    run("git", ["checkout", publishBranch]);
  }

  const packageJsonPath = fileURLToPath(new URL("../package.json", import.meta.url));
  const pkgRaw = await fs.readFile(packageJsonPath, "utf8");
  const pkg = JSON.parse(pkgRaw);
  const bumped = bumpVersion(pkg.version);
  const newVersion = `${bumped.major}.${bumped.minor}.${bumped.patch}`;

  log.info(`Версия: ${pkg.version} -> ${newVersion} (${bumpType})`);
  await setPackageVersion(newVersion);

  log.info("Собираю проект…");
  run(yarnCmd, ["-s", "build"]);

  // dist в .gitignore => force-add
  run("git", ["add", "package.json"]);
  run("git", ["add", "-f", "-A", "dist"]);

  const diffQuiet = spawnSync("git", ["diff", "--cached", "--quiet"], { stdio: "ignore" });
  const hasStagedChanges = diffQuiet.status !== 0;

  if (hasStagedChanges) {
    const commitMsg = `v${bumped.tag}`;
    log.ok(`Коммит: ${commitMsg}`);
    run("git", ["commit", "-m", commitMsg]);
  } else {
    log.warn("В staged не оказалось изменений — коммит пропущен.");
  }

  log.info(`Пушу в origin/${publishBranch}…`);
  run("git", ["push", "-u", "origin", publishBranch]);
} finally {
  run("git", ["checkout", originalBranch]);
  if (stashed) stashPopByTag();
}

