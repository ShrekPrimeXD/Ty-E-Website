const projetsParFiliere = {
  melec: [
    {
      titre: "LECTURE SIGNAUX",
      lien: "https://www.tinkercad.com/things/hqeFFlHGALv-lecture-signaux/editel?returnTo=%2Fdashboard%2Fdesigns%2Fcircuits&sharecode=TAdjYkHjqIRVWNDTclaUrcWTGF_LwzDM-f0_Vrn0X40"
      // Pas de code pour Melec
    }
  ],
  ciel: [
    {titre:"Feux tricolore", lien:"https://www.tinkercad.com/things/3xvFANLNDCH-amazing-hango-albar", code:`// Feux Tricolore Arduino
int ledRouge = 10;
int ledOrange = 9;
int ledVerte = 8;

void setup() {
  pinMode(ledRouge, OUTPUT);
  pinMode(ledOrange, OUTPUT);
  pinMode(ledVerte, OUTPUT);
}

void loop() {
  digitalWrite(ledRouge, HIGH);
  delay(3000);
  digitalWrite(ledRouge, LOW);
  digitalWrite(ledOrange, HIGH);
  delay(1000);
  digitalWrite(ledOrange, LOW);
  digitalWrite(ledVerte, HIGH);
  delay(3000);
  digitalWrite(ledVerte, LOW);
}`},
    {titre:"Allumage LED", lien:"https://www.tinkercad.com/things/1UpGT1sjzcR-allumage-led", code:`const int led = 13;

void setup() {
  pinMode(led, OUTPUT);
}

void loop() {
  digitalWrite(led, HIGH);
  delay(500);
  digitalWrite(led, LOW);
  delay(500);
}`},
    {titre:"Capteur Ultrason", lien:"https://www.tinkercad.com/things/elsRRyCBrV7-neat-crift-sango", code:`const int TRIGGER_PIN = 2;
const int ECHO_PIN = 3;
const float SOUND_SPEED = 0.343;
const unsigned long MEASURE_TIMEOUT = 25000;

void setup() {
  Serial.begin(9600);
  pinMode(TRIGGER_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  digitalWrite(TRIGGER_PIN, LOW);
}

void loop() {
  digitalWrite(TRIGGER_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIGGER_PIN, LOW);
  long measure = pulseIn(ECHO_PIN, HIGH, MEASURE_TIMEOUT);
  float distance_mm = measure * 0.5 * SOUND_SPEED;
  Serial.print("Distance : ");
  Serial.print(distance_mm);
  Serial.print(" mm (");
  Serial.print(distance_mm / 10.0);
  Serial.print(" cm, ");
  Serial.print(distance_mm / 1000.0);
  Serial.println(" m)");
  delay(200);
}`},
    {titre:"Bouton + Buzzer", lien:"https://www.tinkercad.com/things/dkqLm6Srjgs-funky-curcan", code:`int bouton = 8;
int buzzer = 7;

void setup() {
  pinMode(bouton, INPUT);
  pinMode(buzzer, OUTPUT);
}

void loop() {
  if(digitalRead(bouton) == HIGH) {
    tone(buzzer, 1000);
  } else {
    noTone(buzzer);
  }
}`}
  ]
};

// Le reste du script reste identique...
