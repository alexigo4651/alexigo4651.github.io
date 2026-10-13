// Single source of truth for the stopwatch wiring: used by the SVG diagram
// and by the wiring table, so both always match the sketch.

export type Kind = 'segment' | 'digit';

export interface Wire {
  pin: number; // MSQC6412C pin number
  signal: string; // a..g, dp, DIG1..DIG4
  kind: Kind;
  arduino: string; // Arduino Uno pin
  color: string; // wire color (same as in Wokwi diagram.json)
  colorName: string;
}

export const wires: Wire[] = [
  { pin: 12, signal: 'DIG1', kind: 'digit', arduino: 'D5', color: '#2563eb', colorName: 'синий' },
  { pin: 11, signal: 'a', kind: 'segment', arduino: 'D6', color: '#dc2626', colorName: 'красный' },
  { pin: 10, signal: 'f', kind: 'segment', arduino: 'A2', color: '#c026d3', colorName: 'малиновый' },
  { pin: 9, signal: 'DIG2', kind: 'digit', arduino: 'D4', color: '#0ea5e9', colorName: 'голубой' },
  { pin: 8, signal: 'DIG3', kind: 'digit', arduino: 'D3', color: '#0891b2', colorName: 'бирюзовый' },
  { pin: 7, signal: 'b', kind: 'segment', arduino: 'D7', color: '#ea580c', colorName: 'оранжевый' },
  { pin: 6, signal: 'DIG4', kind: 'digit', arduino: 'D2', color: '#7c3aed', colorName: 'фиолетовый' },
  { pin: 5, signal: 'g', kind: 'segment', arduino: 'A3', color: '#a855f7', colorName: 'сиреневый' },
  { pin: 4, signal: 'c', kind: 'segment', arduino: 'D8', color: '#ca8a04', colorName: 'золотой' },
  { pin: 3, signal: 'dp', kind: 'segment', arduino: 'A4', color: '#78716c', colorName: 'серый' },
  { pin: 2, signal: 'd', kind: 'segment', arduino: 'A0', color: '#eab308', colorName: 'жёлтый' },
  { pin: 1, signal: 'e', kind: 'segment', arduino: 'A1', color: '#65a30d', colorName: 'салатовый' },
];

// Physical rows of the real part (digits facing you, dots at the bottom)
export const topRow = [12, 11, 10, 9, 8];
export const bottomRow = [1, 2, 3, 4, 5, 6, 7];
