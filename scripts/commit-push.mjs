import { spawnSync } from "node:child_process";

const args = process.argv.slice(2);

const usage = () => {
  console.log(
    [
      "Usage:",
      '  yarn commit-push [--all] "commit message" [branch]',
      "",
      "Description:",
      "  Stages changes, creates a commit, and pushes to origin.",
      "",
      "Options:",
      "  --all     uses `git add -A` (also stages deletions).",
      "",
      "Defaults:",
      "  branch    master",
    ].join("\n")
  );
};

let addAll = false;
if (args[0] === "--all") {
  addAll = true;
  args.shift();
}

const message = args[0];
const branch = args[1] ?? "master";
const remote = "origin";

if (!message || message === "--help" || message === "-h") {
  usage();
  process.exit(message ? 0 : 1);
}

const run = (cmd, cmdArgs) => {
  const res = spawnSync(cmd, cmdArgs, { stdio: "inherit", shell: false });
  if (res.error) throw res.error;
  if (res.status !== 0) process.exit(res.status ?? 1);
};

// If nothing is staged, there's nothing to commit.
const stagedCheck = spawnSync("git", ["diff", "--cached", "--quiet"], {
  stdio: "ignore",
  shell: false,
});

// Stage first.
run("git", addAll ? ["add", "-A"] : ["add", "."]);

const stagedCheckAfter = spawnSync("git", ["diff", "--cached", "--quiet"], {
  stdio: "ignore",
  shell: false,
});
if (stagedCheckAfter.status === 0) {
  console.log("Nothing to commit (staged changes are empty).");
  process.exit(0);
}

run("git", ["commit", "-m", message]);
run("git", ["push", "-u", remote, `HEAD:${branch}`]);

