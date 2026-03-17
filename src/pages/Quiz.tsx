import { useState } from "react";
import Icon from "@/components/ui/icon";

interface Slide {
  block: string;
  question: string;
  answer: string;
  isRiddle?: boolean;
}

const slides: Slide[] = [
  // Блок 1
  { block: "Блок 1 · Разминка", question: "Как называется первый шаг исследования, когда появляется интерес к теме?", answer: "Идея / Проблема" },
  { block: "Блок 1 · Разминка", question: "Как называется вопрос, на который исследователь хочет найти ответ?", answer: "Проблема" },
  { block: "Блок 1 · Разминка", question: "Предположение о результате исследования — это…", answer: "Гипотеза" },
  { block: "Блок 1 · Разминка", question: "Как называется проверка гипотезы на практике?", answer: "Эксперимент / Исследование" },
  { block: "Блок 1 · Разминка", question: "Что помогает исследователю узнать мнение других людей?", answer: "Опрос / Анкетирование" },

  // Блок 2
  { block: "Блок 2 · Продолжи фразу", question: "Любое исследование начинается с…", answer: "Идеи или вопроса" },
  { block: "Блок 2 · Продолжи фразу", question: "Чтобы проверить гипотезу, нужно провести…", answer: "Эксперимент / Наблюдение" },
  { block: "Блок 2 · Продолжи фразу", question: "Результаты исследования обычно представляют в виде…", answer: "Выводов / Презентации / Отчёта" },
  { block: "Блок 2 · Продолжи фразу", question: "Если гипотеза не подтвердилась — это значит…", answer: "Нужно искать другое объяснение" },
  { block: "Блок 2 · Продолжи фразу", question: "Главная задача исследователя — это…", answer: "Найти ответ на вопрос" },

  // Блок 3
  {
    block: "Блок 3 · Загадки",
    isRiddle: true,
    question: "Я без рук, без ног,\nНо многое могу сказать.\nЕсли учёный наблюдает,\nЯ помогаю записать.\n\nЧто это?",
    answer: "Наблюдение / Дневник наблюдений",
  },
  {
    block: "Блок 3 · Загадки",
    isRiddle: true,
    question: "Сначала мысль, потом вопрос,\nПотом работа и ответ.\nИ в конце учёный пишет\nГлавный свой итог…",
    answer: "Вывод",
  },
  {
    block: "Блок 3 · Загадки",
    isRiddle: true,
    question: "Он не волшебник и не маг,\nНо опыты проводит.\nВопросы задаёт всегда\nИ истину находит.",
    answer: "Исследователь / Учёный",
  },

  // Блок 4
  { block: "Блок 4 · Ребусы", question: "ГИ + ПО + ТЕ + ЗА\n\nКакое слово получилось?", answer: "Гипотеза" },
  { block: "Блок 4 · Ребусы", question: "НА + БЛЮ + ДЕ + НИЕ", answer: "Наблюдение" },
  { block: "Блок 4 · Ребусы", question: "ЭКС + ПЕ + РИ + МЕНТ", answer: "Эксперимент" },
  { block: "Блок 4 · Ребусы", question: "«ИССЛЕДО» + «ВАНИЕ»", answer: "Исследование" },

  // Блок 5
  { block: "Блок 5 · Логика", question: "Студентка решила узнать, какие книги больше любят дети: сказки или рассказы.\nЧто она должна сделать?\n\nа) провести опрос\nб) угадать\nв) спросить одного человека", answer: "а) Провести опрос" },
  { block: "Блок 5 · Логика", question: "Если ученик наблюдает за ростом растения каждый день и записывает результаты — это…\n\nа) эксперимент\nб) наблюдение\nв) игра", answer: "б) Наблюдение" },
  { block: "Блок 5 · Логика", question: "Что из этого является гипотезой?\n\nа) «Я думаю, что растения растут быстрее на солнце»\nб) «Я посадил растение»\nв) «Я измерил рост растения»", answer: "а) «Я думаю, что растения растут быстрее на солнце»" },

  // Блок 6
  { block: "Блок 6 · Найди лишнее", question: "Идея — Гипотеза — Эксперимент — Каникулы — Вывод\n\nНайди лишнее слово!", answer: "Каникулы" },
  { block: "Блок 6 · Найди лишнее", question: "Наблюдение — Эксперимент — Вывод — Шпаргалка\n\nНайди лишнее слово!", answer: "Шпаргалка" },
  { block: "Блок 6 · Найди лишнее", question: "Исследователь — Учёный — Эксперимент — Подушка\n\nНайди лишнее слово!", answer: "Подушка" },

  // Блок 7
  { block: "Блок 7 · Ситуации", question: "Студент решил узнать, почему зимой птицам трудно найти пищу.\nКак называется такой вопрос в исследовании?", answer: "Проблема исследования" },
  { block: "Блок 7 · Ситуации", question: "Ученик предполагает:\n«Если подкармливать птиц зимой, их станет больше»\n\nЭто…", answer: "Гипотеза" },
  { block: "Блок 7 · Ситуации", question: "Что нужно сделать после эксперимента?", answer: "Сделать вывод" },

  // Блок 8
  { block: "Блок 8 · Головоломки", question: "Расставьте этапы исследования в правильном порядке:\n• вывод\n• идея\n• эксперимент\n• гипотеза", answer: "Идея → Гипотеза → Эксперимент → Вывод" },
  { block: "Блок 8 · Головоломки", question: "Назовите два способа сбора информации в исследовании.", answer: "Наблюдение, Опрос, Эксперимент, Работа с книгами (любые два)" },
  { block: "Блок 8 · Головоломки", question: "Что помогает наглядно показать результаты исследования?\n\nа) рисунок / схема\nб) таблица\nв) диаграмма", answer: "Любой из вариантов подходит!" },

  // Финальное задание
  { block: "🏆 Финальное задание", question: "Назовите три качества хорошего исследователя.", answer: "Любознательность, Внимательность, Наблюдательность, Терпение, Аккуратность\n(любые три)" },

  // Дополнительные — Блок 1
  { block: "Доп. Блок 1 · Понятия", question: "Как называется объект, который изучается в исследовании?", answer: "Объект исследования" },
  { block: "Доп. Блок 1 · Понятия", question: "Как называется конкретная часть объекта, которую изучает исследователь?", answer: "Предмет исследования" },
  { block: "Доп. Блок 1 · Понятия", question: "Как называется конечный результат, к которому стремится исследователь?", answer: "Цель исследования" },
  { block: "Доп. Блок 1 · Понятия", question: "Небольшие шаги, которые помогают достичь цели исследования — это…", answer: "Задачи исследования" },
  { block: "Доп. Блок 1 · Понятия", question: "Как называется сбор информации из книг, статей и интернета?", answer: "Работа с источниками / Анализ литературы" },

  // Дополнительные — Блок 2
  { block: "Доп. Блок 2 · Продолжи фразу", question: "Цель исследования отвечает на вопрос…", answer: "Что нужно узнать / Чего мы хотим достичь" },
  { block: "Доп. Блок 2 · Продолжи фразу", question: "Задачи исследования помогают…", answer: "Достичь цели" },
  { block: "Доп. Блок 2 · Продолжи фразу", question: "Объект исследования — это то, что…", answer: "Изучается в работе" },
  { block: "Доп. Блок 2 · Продолжи фразу", question: "Предмет исследования — это…", answer: "Конкретная часть объекта" },
  { block: "Доп. Блок 2 · Продолжи фразу", question: "Вывод должен быть связан с…", answer: "Целью и гипотезой исследования" },

  // Дополнительные — Блок 3
  {
    block: "Доп. Блок 3 · Загадки",
    isRiddle: true,
    question: "Есть вопрос и есть ответ,\nНо сначала нужен план.\nЧтобы всё не перепутать,\nИсследователь пишет…",
    answer: "Задачи / План исследования",
  },
  {
    block: "Доп. Блок 3 · Загадки",
    isRiddle: true,
    question: "Я показываю рост и спад,\nЦифры выстрою подряд.\nЧтобы сразу было видно —\nПомогаю очень сильно.",
    answer: "Диаграмма / График",
  },
  {
    block: "Доп. Блок 3 · Загадки",
    isRiddle: true,
    question: "Меня читают перед тем,\nКак начинать работу.\nЯ опыт прошлых исследователей\nСобрал в одну заботу.",
    answer: "Литература / Источники",
  },

  // Дополнительные — Блок 4
  { block: "Доп. Блок 4 · Ребусы", question: "ЦЕ + ЛЬ", answer: "Цель" },
  { block: "Доп. Блок 4 · Ребусы", question: "ЗА + ДА + ЧА", answer: "Задача" },
  { block: "Доп. Блок 4 · Ребусы", question: "ОБ + ЪЕКТ", answer: "Объект" },
  { block: "Доп. Блок 4 · Ребусы", question: "ПРЕД + МЕТ", answer: "Предмет" },

  // Дополнительные — Блок 5
  { block: "Доп. Блок 5 · Логика", question: "Студент изучает влияние музыки на внимание детей.\nЧто будет объектом исследования?\n\nа) музыка\nб) внимание детей\nв) дети", answer: "в) Дети" },
  { block: "Доп. Блок 5 · Логика", question: "В теме «влияние музыки на внимание детей».\nЧто будет предметом исследования?", answer: "Влияние музыки на внимание детей" },
  { block: "Доп. Блок 5 · Логика", question: "Что из перечисленного НЕ является методом исследования?\n\nа) наблюдение\nб) эксперимент\nв) фантазия\nг) опрос", answer: "в) Фантазия" },

  // Дополнительные — Блок 6
  { block: "Доп. Блок 6 · Найди ошибку", question: "Цель: узнать, какие игрушки любят дети.\nГипотеза: дети любят сладости.\n\nЧто здесь неправильно?", answer: "Гипотеза не связана с целью исследования" },
  { block: "Доп. Блок 6 · Найди ошибку", question: "Цель: изучить влияние света на рост растений.\nЗадача: посмотреть фильм.\n\nЧто здесь неправильно?", answer: "Задача не связана с исследованием" },
  { block: "Доп. Блок 6 · Найди ошибку", question: "Вывод: растения растут быстрее на солнце.\nНо эксперимент не проводился.\n\nЧто нарушено?", answer: "Вывод сделан без исследования / без доказательств" },

  // Дополнительные — Блок 7
  { block: "Доп. Блок 7 · Ситуации", question: "Студент решил выяснить:\n«Сколько времени дети проводят с гаджетами»\n\nКакой метод исследования лучше использовать?", answer: "Опрос / Анкетирование" },
  { block: "Доп. Блок 7 · Ситуации", question: "Студент наблюдает за поведением детей на прогулке и записывает результаты.\n\nКакой это метод?", answer: "Наблюдение" },
  { block: "Доп. Блок 7 · Ситуации", question: "Студент сравнил две группы детей:\nодна группа слушает музыку во время занятий, другая — нет.\n\nЧто это?", answer: "Эксперимент" },

  // Дополнительные — Блок 8
  { block: "Доп. Блок 8 · Головоломки", question: "Соберите слово из букв:\nЕ С И С Л Д О В А Н И Е", answer: "Исследование" },
  { block: "Доп. Блок 8 · Головоломки", question: "Назовите три этапа исследования.", answer: "Постановка проблемы → Гипотеза → Эксперимент → Анализ → Вывод\n(любые три)" },
  { block: "Доп. Блок 8 · Головоломки", question: "Что важнее в исследовании?\n\nа) доказательства\nб) догадки\nв) случай", answer: "а) Доказательства" },

  // Финальный вопрос доп.
  { block: "🏆 Финальный вопрос", question: "Студент провёл исследование, но результат оказался неожиданным и не совпал с гипотезой.\n\nЧто должен сделать исследователь?", answer: "Признать результат, проанализировать данные и сделать новый вывод" },

  // Конкурсы
  { block: "🎯 Конкурс 1 · Собери исследование", question: "Капитану выдаются карточки с этапами исследования.\nРасставь в правильном порядке:\n\n• гипотеза\n• вывод\n• цель\n• эксперимент\n• проблема", answer: "1. Проблема\n2. Цель\n3. Гипотеза\n4. Эксперимент\n5. Вывод\n\n✅ Правильный порядок — 3 балла\n⚡ 1 ошибка — 2 балла" },
  { block: "🎯 Конкурс 2 · Угадай метод", question: "Студент наблюдает за поведением детей на прогулке и записывает результаты.\n\nКакой это метод исследования?", answer: "Наблюдение\n\n✅ 1 балл" },
  { block: "🎯 Конкурс 2 · Угадай метод", question: "Студент задаёт детям одинаковые вопросы и записывает ответы.\n\nКакой это метод исследования?", answer: "Опрос / Анкетирование\n\n✅ 1 балл" },
  { block: "🎯 Конкурс 2 · Угадай метод", question: "Студент сравнивает две группы растений:\nодни растут на солнце, другие — в тени.\n\nКакой это метод исследования?", answer: "Эксперимент\n\n✅ 1 балл" },
  { block: "🎯 Конкурс 3 · Быстрый исследователь", question: "Тема: «Любимые игрушки детей»\n\nЗа 1 минуту назови:\n1. Цель исследования\n2. Гипотезу\n3. Метод исследования", answer: "Пример:\n• Цель — узнать, какие игрушки дети любят больше всего\n• Гипотеза — большинство детей предпочитают мягкие игрушки\n• Метод — опрос\n\n✅ Все три — 3 балла | Два — 2 балла | Одно — 1 балл" },
  { block: "🎯 Конкурс 3 · Быстрый исследователь", question: "Тема: «Влияние музыки на настроение»\n\nЗа 1 минуту назови:\n1. Цель исследования\n2. Гипотезу\n3. Метод исследования", answer: "Пример:\n• Цель — узнать, как музыка влияет на настроение детей\n• Гипотеза — спокойная музыка улучшает настроение\n• Метод — наблюдение / опрос\n\n✅ Все три — 3 балла | Два — 2 балла | Одно — 1 балл" },
  { block: "🎯 Конкурс 3 · Быстрый исследователь", question: "Тема: «Почему дети любят сказки»\n\nЗа 1 минуту назови:\n1. Цель исследования\n2. Гипотезу\n3. Метод исследования", answer: "Пример:\n• Цель — выяснить причины интереса детей к сказкам\n• Гипотеза — дети любят сказки за интересных героев\n• Метод — опрос / анкетирование\n\n✅ Все три — 3 балла | Два — 2 балла | Одно — 1 балл" },
];

const blockColors: Record<string, string> = {
  "Блок 1": "bg-sage/20 text-sage",
  "Блок 2": "bg-terracotta/15 text-terracotta",
  "Блок 3": "bg-amber/20 text-amber",
  "Блок 4": "bg-sage/15 text-sage",
  "Блок 5": "bg-terracotta/10 text-terracotta",
  "Блок 6": "bg-amber/15 text-amber",
  "Блок 7": "bg-sage/20 text-sage",
  "Блок 8": "bg-terracotta/15 text-terracotta",
  "Доп.": "bg-stone/15 text-stone",
  "🏆": "bg-amber/30 text-amber",
  "🎯": "bg-sage/25 text-sage",
};

function getBlockColor(block: string) {
  for (const key of Object.keys(blockColors)) {
    if (block.startsWith(key)) return blockColors[key];
  }
  return "bg-muted text-muted-foreground";
}

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const slide = slides[current];
  const total = slides.length;

  const goNext = () => {
    setCurrent((c) => Math.min(c + 1, total - 1));
    setRevealed(false);
  };

  const goPrev = () => {
    setCurrent((c) => Math.max(c - 1, 0));
    setRevealed(false);
  };

  const handleSlideClick = () => {
    if (!revealed) setRevealed(true);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card">
        <span className="font-serif text-xl text-foreground">Викторина «От идеи до открытия»</span>
        <span className="text-sm text-muted-foreground">
          {current + 1} / {total}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-muted">
        <div
          className="h-full bg-sage transition-all duration-500"
          style={{ width: `${((current + 1) / total) * 100}%` }}
        />
      </div>

      {/* Slide */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div
          className="w-full max-w-3xl cursor-pointer select-none"
          onClick={handleSlideClick}
        >
          {/* Block badge */}
          <div className="flex justify-center mb-6">
            <span className={`text-xs uppercase tracking-widest px-4 py-1.5 rounded-full font-medium ${getBlockColor(slide.block)}`}>
              {slide.block}
            </span>
          </div>

          {/* Question card */}
          <div className="rounded-2xl border border-border bg-card p-8 md:p-12 shadow-sm mb-6 transition-all duration-300 hover:border-sage/30">
            <p className="font-serif text-2xl md:text-3xl text-foreground text-center leading-relaxed whitespace-pre-line">
              {slide.question}
            </p>

            {!revealed && (
              <div className="mt-8 flex justify-center">
                <span className="inline-flex items-center gap-2 text-sm text-muted-foreground animate-pulse">
                  <Icon name="MousePointer2" size={16} />
                  Нажмите, чтобы увидеть ответ
                </span>
              </div>
            )}
          </div>

          {/* Answer card */}
          <div
            className={`rounded-2xl border border-sage/30 bg-sage/5 p-8 md:p-10 transition-all duration-500 ${
              revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-sage/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon name="Check" size={16} className="text-sage" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-sage mb-2">Ответ</p>
                <p className="font-serif text-xl md:text-2xl text-foreground whitespace-pre-line leading-relaxed">
                  {slide.answer}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="px-6 py-6 border-t border-border bg-card flex items-center justify-between gap-4">
        <button
          onClick={goPrev}
          disabled={current === 0}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground hover:bg-muted transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <Icon name="ArrowLeft" size={18} />
          Назад
        </button>

        {/* Dot indicators — showing nearby slides */}
        <div className="flex items-center gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => { setCurrent(i); setRevealed(false); }}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? "w-6 h-2 bg-sage"
                  : "w-2 h-2 bg-border hover:bg-muted-foreground"
              }`}
            />
          ))}
        </div>

        <button
          onClick={goNext}
          disabled={current === total - 1}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Далее
          <Icon name="ArrowRight" size={18} />
        </button>
      </div>
    </div>
  );
}
