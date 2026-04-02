export interface IMusicans {
  [key: string]: {
    name: string;
    alboms: {
      label: string;
      value: string;
      tracks: string[];
    }[];
  };
}

export const musicians: IMusicans = {
  // kishlak: {
  //   name: "Кишлак",
  //   alboms: [
  //     {
  //       value: "kishlak-11-11",
  //       label: "11:11",
  //       tracks: []
  //     },
  //     {
  //       value: "kishlak-sbornyk-huyni-i-kartinki",
  //       label: "Сборник хуйни и картинки",
  //       tracks: []
  //     },
  //     {
  //       value: "kishlak-escapyst",
  //       label: "Эскапист",
  //       tracks: []
  //     },
  //     {
  //       value: "kishlak-shyk2",
  //       label: "СХИК2",
  //       tracks: []
  //     },
  //     {
  //       value: "kishlak-patsanskyy-emo-rep",
  //       label: "Пацанский эмо-рэп",
  //       tracks: []
  //     },
  //     {
  //       value: "kishlak-patsanskyy-emo-rep-2",
  //       label: "Пацанский эмо рэп 2",
  //       tracks: []
  //     },
  //   ],
  // },
  apfs: {
    name: "Автостопом по фазе сна",
    alboms: [
      {
        value: "apfs-krugosvetka-v-ramkakh-cherepnoy-korobky",
        label: "Кругосветка в рамках черепной коробки",
        tracks: [
          "Intro",
          "Кругосветка в рамках черепной коробки",
          "Выпить или выпилиться",
          "Выплакайся",
          "Эхо 51",
          "Спокойной ночи, Максим",
        ],
      },
      {
        value: "apfs-sobachyy-vals",
        label: "Собачий вальс",
        tracks: [
          "Идите нахуй",
          "Покурил и упал в обморок",
          "Просто погафкай",
          "Собачий вальс",
          "Скорость",
          "Я настоящий",
          "Не вспоминай меня",
          "Диссоциальное расстройство",
          "Дискотека 90-х",
          "Раздевайся",
        ],
      },
      {
        value: "apfs-opianarium",
        label: "Опианариум",
        tracks: [
          "Аф",
          "Девочка",
          "Опианариум",
          "Порно",
          "Слепые",
          "Таблетки",
          "Сонный паралич",
          "Опиаты",
          "Мам, я умираю",
          "lv",
          "Голая, красивая",
          "Оргазм",
          "Давай поправимся",
          "Панацея",
          "Я некрасивый",
          "Ты",
          "Убегу",
          "Хочешь, я стану проблемой твоей",
          "Метадон",
          "Героиновый шейк",
          "Я заебал",
          "Открой мне",
          "Сильнее соли",
          "$ALT $NUFF",
          "105 оттенков автобуса",
          "Комната",
          "-5326364312",
          "Я умру в Североморске",
          "I will fall",
        ],
      },
      {
        value: "apfs-dvizheniye",
        label: "Движение",
        tracks: [
          "Танцы на Vy большого пса",
          "Упс",
          "Один среди дорог",
          "Картонка",
          "21",
          "Я впадаю в кому",
          "Зачем я сегодня проснулся",
          "Движение",
          "Убей меня",
          "Ширево",
          "Канет в низ",
          "Ку-ку",
          "Сперма",
          "Вечер выпускников вечерней школы",
          "Спина старика",
          "Я твоя сука",
          "Чё",
          "Помню как вчера",
          "Зажечь кровать",
        ],
      },
      {
        value: "apfs-ne-zabiray-menya-domoy",
        label: "Не забирай меня домой",
        tracks: [
          "Привет, малышка",
          "Тот самый",
          "Не забирай меня домой",
          "После смерти",
          "Въеби мне в четверг",
          "Закончим",
          "Кислота",
          "Benjamin Button",
          "Котик, зайчик",
          "Не в адеквате",
          "Что мне делать",
          "Щёлк щёлк щёлк",
          "Нет! Нет! Нет! Нет! Нет! Нет! Нет! Нет!",
          "STOP LIFE",
          "Нам пизда",
          "Мне не нужна эта новая жизнь",
          "Господи, что со мной такое",
          "Я летаю во вселенной",
        ],
      },
      {
        value: "apfs-laytovo",
        label: "Лайтово",
        tracks: [
          "Там, где нас нет",
          "Мы затаимся в фильтрах выкуренных сигарет",
          "Утиль",
          "Лайтово",
        ],
      },
    ],
  },
};

export const modes = [
  {
    value: "hard",
    label: "Hard (Угадай трек за пару секунд с начала)",
  },
  {
    value: "medium",
    label: "Medium (Угадай трек за пару секунд с случайного места)",
  },
  {
    value: "light",
    label: "Light (Угадай песню по строчке)",
  },
];

export const requiredError = "Это поле обязательное";

export const stages = [1, 2, 4, 7, 11, 16];
export const maxPointsFromGame = 150;

export type TMode = "hard" | "medium" | "light";
export const modeMultiplier: Record<TMode, number> = {
  hard: 3,
  medium: 2,
  light: 1,
};

export type TStatus = 'win' | 'lost' | 'process'