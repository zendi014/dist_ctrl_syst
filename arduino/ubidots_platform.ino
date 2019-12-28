#include "UbidotsESPMQTT.h"

/****************************************
 * Define Constants
 ****************************************/
#define TOKEN "UBIDOTS_TOKEN" // Your Ubidots TOKEN
#define WIFINAME "SSID" //Your SSID
#define WIFIPASS "PASS" // Your Wifi Pass

Ubidots client(TOKEN);

/****************************************
 * Auxiliar Functions
 ****************************************/

void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  for (int i=0;i<length;i++) {
    Serial.print((char)payload[i]);
  }
  if ((char)payload[0]=='1'){
    Serial.print("DATA COMING ");
  }
  Serial.println();
}



/****************************************
 * Main Functions
 ****************************************/

#define DEVICE_LABEL  "my-new-esp"  // Put here your Ubidots device label
#define VARIABLE_LABEL  "temp"  // Put here your Ubidots variable label

void setup() {
  // put your setup code here, to run once:
  client.ubidotsSetBroker("industrial.api.ubidots.com"); // Sets the broker properly for the industrial account
  client.setDebug(true); // Pass a true or false bool value to activate debug messages
  Serial.begin(115200);
  client.wifiConnection(WIFINAME, WIFIPASS);
  client.begin(callback);

  //retrievind data here
  client.ubidotsSubscribe("my-new-esp", "hmd"); //Insert the dataSource and Variable's Labels
}



void loop() {
  // put your main code here, to run repeatedly:
  if(!client.connected()){
      client.reconnect();
      client.ubidotsSubscribe("my-new-esp", "hmd"); //Insert the dataSource and Variable's Labels
  }
  
  //must be readed from sensor data
  float val_1 = random(20, 40);
  int val_2 = random(20, 35);
  client.add("temp", val_1);
  client.add("hmd", val_2);
  client.ubidotsPublish("my-new-esp");
  client.loop();
  delay(2000);

}