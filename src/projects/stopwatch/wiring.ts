// Single source of truth for the stopwatch wiring: used by the SVG diagram
// and by the wiring table, so both always match the sketches.

export type Kind = 'segment' | 'digit';

export interface Wire {
  pin: number; // display pin number
  signal: string; // a..g, dp, DIG1..DIG4
  kind: Kind;
  arduino: string; // Arduino Uno pin
  color: string;
  colorName: string;
  optional?: boolean; // not wired on the reference schematic
}

// Display pins: signal and wire color are the same in every variant
const DISPLAY = [
  { pin: 12, signal: 'DIG1', kind: 'digit', color: '#2563eb', colorName: 'синий' },
  { pin: 11, signal: 'a', kind: 'segment', color: '#dc2626', colorName: 'красный' },
  { pin: 10, signal: 'f', kind: 'segment', color: '#c026d3', colorName: 'малиновый' },
  { pin: 9, signal: 'DIG2', kind: 'digit', color: '#0ea5e9', colorName: 'голубой' },
  { pin: 8, signal: 'DIG3', kind: 'digit', color: '#0891b2', colorName: 'бирюзовый' },
  { pin: 7, signal: 'b', kind: 'segment', color: '#ea580c', colorName: 'оранжевый' },
  { pin: 6, signal: 'DIG4', kind: 'digit', color: '#7c3aed', colorName: 'фиолетовый' },
  { pin: 5, signal: 'g', kind: 'segment', color: '#a855f7', colorName: 'сиреневый' },
  { pin: 4, signal: 'c', kind: 'segment', color: '#ca8a04', colorName: 'золотой' },
  { pin: 3, signal: 'dp', kind: 'segment', color: '#78716c', colorName: 'серый' },
  { pin: 2, signal: 'd', kind: 'segment', color: '#eab308', colorName: 'жёлтый' },
  { pin: 1, signal: 'e', kind: 'segment', color: '#65a30d', colorName: 'салатовый' },
] as const;

function makeWires(pins: Record<string, string>, optional: string[] = []): Wire[] {
  return DISPLAY.map((d) => ({ ...d, arduino: pins[d.signal], optional: optional.includes(d.signal) }));
}

export interface Variant {
  id: string;
  title: string;
  summary: string;
  resistor: string; // segment resistor value
  sketchFile: string; // file name in public/projects/stopwatch/
  sketchDir: string; // Arduino IDE sketch folder
  diagramFile: string;
  wires: Wire[];
}

export const variants: Variant[] = [
  {
    id: 'v1',
    title: 'Вариант 1: MSQC6412C',
    summary:
      'Под распиновку из документации MSQC6412C. Сегменты на D6–D8 и A0–A4, разряды на D5–D2.',
    resistor: '1 кОм',
    sketchFile: 'stopwatch.ino',
    sketchDir: 'stopwatch',
    diagramFile: 'diagram.json',
    wires: makeWires({
      DIG1: 'D5', a: 'D6', f: 'A2', DIG2: 'D4', DIG3: 'D3', b: 'D7',
      DIG4: 'D2', g: 'A3', c: 'D8', dp: 'A4', d: 'A0', e: 'A1',
    }),
  },
  {
    id: 'v2',
    title: 'Вариант 2: схема Прил_2 (КИМ)',
    summary:
      'Как на принципиальной схеме из Прил_2: сегменты подряд на D2–D8, разряды K1–K4 на D13–D10. Точка на схеме не подключена, при желании её можно завести на A0.',
    resistor: '240–360 Ом',
    sketchFile: 'stopwatch_v2.ino',
    sketchDir: 'stopwatch_v2',
    diagramFile: 'diagram-v2.json',
    wires: makeWires(
      {
        DIG1: 'D13', a: 'D2', f: 'D7', DIG2: 'D12', DIG3: 'D11', b: 'D3',
        DIG4: 'D10', g: 'D8', c: 'D4', dp: 'A0', d: 'D5', e: 'D6',
      },
      ['dp'],
    ),
  },
];

// Physical rows of the real part (digits facing you, dots at the bottom)
export const topRow = [12, 11, 10, 9, 8];
export const bottomRow = [1, 2, 3, 4, 5, 6, 7];
