// Stopwatch 0..60 s, 4-digit 7-segment display MSQC6412C (common anode)
// Button D9 -> GND: start -> stop -> reset -> start ...
//
// Display pin -> Arduino:
//   segments (via 1 kOhm): a=11->D6, b=7->D7, c=4->D8, d=2->A0,
//                          e=1->A1, f=10->A2, g=5->A3, dp=3->A4
//   digits (direct):       DIG1=12->D5, DIG2=9->D4, DIG3=8->D3, DIG4=6->D2

const bool COMMON_CATHODE = false;  // common anode display

//                       a  b  c  d   e   f   g
const uint8_t SEG[7] = {6, 7, 8, A0, A1, A2, A3};
const uint8_t DP = A4;
//                     DIG1 DIG2 DIG3 DIG4
const uint8_t DIG[4] = {5, 4, 3, 2};
const uint8_t BTN = 9;

// Segment patterns for digits 0..9 (bit 0 = a ... bit 6 = g)
const uint8_t F[10] = {0x3F, 0x06, 0x5B, 0x4F, 0x66, 0x6D, 0x7D, 0x07, 0x7F, 0x6F};

uint8_t mode = 0;  // 0 = reset, 1 = counting, 2 = stopped
uint8_t lastBtn = HIGH;
uint8_t cur = 0;  // digit currently lit
uint16_t sec = 0;
uint32_t tStart = 0;  // start of the current second

void seg(uint8_t p, bool on) { digitalWrite(p, COMMON_CATHODE ? on : !on); }
void dig(uint8_t p, bool on) { digitalWrite(p, COMMON_CATHODE ? !on : on); }

void setup() {
  for (uint8_t i = 0; i < 7; i++) { pinMode(SEG[i], OUTPUT); seg(SEG[i], false); }
  pinMode(DP, OUTPUT); seg(DP, false);
  for (uint8_t i = 0; i < 4; i++) { pinMode(DIG[i], OUTPUT); dig(DIG[i], false); }
  pinMode(BTN, INPUT_PULLUP);
}

void loop() {
  // Button with debounce
  uint8_t b = digitalRead(BTN);
  if (b != lastBtn) {
    delay(20);
    b = digitalRead(BTN);
    if (b != lastBtn) {
      lastBtn = b;
      if (b == LOW) {
        mode = (mode + 1) % 3;
        if (mode == 1) { sec = 0; tStart = millis(); }
        if (mode == 0) sec = 0;
      }
    }
  }

  // Count seconds
  if (mode == 1 && millis() - tStart >= 1000) {
    tStart += 1000;
    if (++sec >= 60) mode = 2;
  }

  // Multiplexing: light one digit per pass
  dig(DIG[cur], false);
  cur = (cur + 1) & 3;
  uint8_t digit = cur == 0 ? sec / 1000 :
                  cur == 1 ? sec / 100 % 10 :
                  cur == 2 ? sec / 10 % 10 :
                             sec % 10;
  uint8_t k = F[digit];
  for (uint8_t s = 0; s < 7; s++) seg(SEG[s], (k >> s) & 1);
  seg(DP, mode == 1 && millis() - tStart < 500);  // blinking dot
  dig(DIG[cur], true);
  delay(4);
}
