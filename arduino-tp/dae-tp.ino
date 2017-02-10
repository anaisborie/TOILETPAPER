int dir1 = 2;
int step1 = 3;

int moveSteps = 50;
int moveSpeed = 10;

void setup() {
  // put your setup code here, to run once:
  pinMode(dir1, OUTPUT);
  pinMode(step1, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  // put your main code here, to run repeatedly:
  if (Serial.available() > 0){
    char command = Serial.read();
    if (command == 'u'){
      digitalWrite(dir1, HIGH);
      for (int i=0; i<moveSteps; i++){
        digitalWrite(step1, HIGH);
        delay(moveSpeed);
        digitalWrite(step1, LOW);
        delay(moveSpeed);
      }
    } else if (command == 'd'){
      digitalWrite(dir1, LOW);
      for (int i=0; i<moveSteps; i++){
        digitalWrite(step1, HIGH);
        delay(moveSpeed);
        digitalWrite(step1, LOW);
        delay(moveSpeed);
      }
    }
  }
}
