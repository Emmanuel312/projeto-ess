#include <WiFi.h>
#include <BLEDevice.h>
#include <BLEUtils.h>
#include <BLEServer.h>
#include "FirebaseESP32.h"
#include "uuidGenerator.h"

//Endereco Banco de dados

#define FIREBASE_HOST ""

//Chave do Banco de dados
#define FIREBASE_AUTH ""

//Nome rede wifi
#define WIFI_SSID ""
//Senha rede wifi
#define WIFI_PASSWORD ""


#define SERVICE_UUID        "4fafc201-1fb5-459e-8fcc-c5c9c331914b"
#define CHARACTERISTIC_UUID "beb5483e-36e1-4688-b7f5-ea07361b26a8"

//Tempo em que o uuid Fica em operação em minutos
#define Tempo 5

//Define Firebase Data object
FirebaseData firebaseData;


void appendNewUUID(){
  
    String jsonStr = "{\"uuid""\":""\"" + String(uuidStr)+ "\"}";
    String path = "/esps/mac_da_esp";

    if(Firebase.pushJSON(firebaseData, path,jsonStr)){
      String pathTimeStamp = path +"/" + firebaseData.pushName() + "/TimeStamp";
      Firebase.setTimestamp(firebaseData, pathTimeStamp);
    }else
      Serial.println("error");

}

void createAdvertising(int intervalToStartAdvertising = 2000, int timeOfAdvertising = 5000){

  genUUID();
  Serial.println("A");
  BLEAdvertising *pAdvertising = BLEDevice::getAdvertising();
  pAdvertising->addServiceUUID(uuidStr);
  pAdvertising->setScanResponse(true);
  pAdvertising->setMinPreferred(0x06);
  pAdvertising->setMinPreferred(0x12);
  BLEDevice::startAdvertising();
  Serial.println("B");
  delay(intervalToStartAdvertising);
    
  appendNewUUID();
   
  Serial.println(uuidStr);
  delay(timeOfAdvertising);
  
}


void setup() {
  Serial.begin(115200);

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();
  delay(2000);
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.reconnectWiFi(true);
  
  Firebase.setReadTimeout(firebaseData, 1000 * 60);

  Firebase.setwriteSizeLimit(firebaseData, "tiny");
  
  delay(5000);
  
  BLEDevice::init("Long name works now");
  BLEServer *pServer = BLEDevice::createServer();
  BLEService *pService = pServer->createService(SERVICE_UUID);
  BLECharacteristic *pCharacteristic = pService->createCharacteristic(
                                         CHARACTERISTIC_UUID,
                                         BLECharacteristic::PROPERTY_READ |
                                         BLECharacteristic::PROPERTY_WRITE
                                       );

  pCharacteristic->setValue("Hello World says Neil");
  pService->start();
  
  Serial.println("Funcionou");
  delay(5000);
}

void loop() {
 
  createAdvertising();
}
