export interface Project {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  date: string;
}

export const projects: Project[] = [
  {
    slug: 'stopwatch',
    title: 'Секундомер на 60 секунд',
    summary:
      'Arduino Uno, 4-разрядный индикатор MSQC6412C с общим анодом и одна кнопка: старт, стоп, сброс. Динамическая индикация без библиотек.',
    tags: ['Arduino Uno', 'MSQC6412C', '7-сегментный индикатор'],
    date: '2026-10-13',
  },
];
