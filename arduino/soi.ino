//////////////////// LIBRARIES /////////////////////
#include <Arduino.h>
#include <Wire.h>

#include <ESP8266WiFi.h>
#include <SocketIoClient.h>
#include <ArduinoJson.h>

#include <Servo.h>


//////////////////// GLOBAL DEFINE /////////////////////
WiFiClient client;
SocketIoClient webSocket;


const char *ssid = "zenzen-Inspiron-7559";
const char *password = "zenzen-Inspiron-7559";
char path[] = "/";
char host[]= "10.42.0.1"; //WLAN IP (SERVER)
int port = 3000;





////////////////// LOOP AND SETUP ///////////////////////
void setup() {
    #if defined(ESP8266)
      Serial.begin(115200);
    #else
      Serial.begin(38400);
    #endif

    Serial.setDebugOutput(true);
    for(uint8_t t = 4; t > 0; t--) {
        Serial.printf("[SETUP] BOOT WAIT %d...\n", t);
        Serial.flush();
        delay(500);
    }

    pinMode(LED_BUILTIN, OUTPUT);
    digitalWrite(LED_BUILTIN, LOW);
    
    wifi_connection();
    
    webSocket.on("connect", connection);
    webSocket.begin(host, port);
}



int a = 0;
const char* src_key = "ESP_5";

void loop() {
    webSocket.loop();

    webSocket.on("kirim_pesan", msg_pesan);

    if(a == 0){
      webSocket.emit("esp_connection", "ESP Connected");
      broadcast_test();
      a=1;
    }
}




//////////////// BINDING CONNECTION /////////////////////
void wifi_connection(){
    Serial.print("\n");
    Serial.printf("WiFi Connecting to :: ");
    Serial.printf(ssid);

    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
        delay(500); Serial.printf(".");
    }

    Serial.print("\n"); Serial.printf("WiFi connected");
    Serial.printf("IP address: ");
    Serial.print(WiFi.localIP());

    app_connection();
}





void app_connection(){
    Serial.print("\n");
    Serial.printf("App Connecting to :: ");
    Serial.printf(host);

    if (client.connect(host, port)) {
        Serial.printf("\nApp Server Connected\n");
    } else {
        Serial.printf("\nApp Server Connection failed\n");
    }

    Serial.print("");
}


void connection(const char * payload, size_t length) {
    webSocket.emit("connection", "ESP Connected");
}


//////////////// TRIGGER AND PARSE DATA /////////////////////


void msg_pesan(const char * payload, size_t length) {
    StaticJsonDocument<2048> doc;//Memory pool
    DeserializationError error = deserializeJson(doc, payload);
    // Test if parsing succeeds.
    
    if (!error) {
        const char* dist_key = doc["dist_key"];
        int msg = doc["msg"];//selain N10
        Serial.println(dist_key);
        Serial.println(msg);
        
//        blink_(msg);
    }

}




void broadcast_test(){
    StaticJsonDocument<800> doc;
    
    doc["dist_key"]  = "N5";
    doc["src_key"]  = src_key;
    doc["msg"]  = 250;

    char dt_json[800];
    serializeJson(doc, dt_json);
    //Serial.println(jsodt_jsonndt);
    webSocket.emit("kirim_pesan", dt_json);//here replying
}



void blink_(int i){
  for(int a=0; a<i; a++){
    digitalWrite(LED_BUILTIN, HIGH);
    delay(200);
    digitalWrite(LED_BUILTIN, LOW);
    delay(200);
  }
  digitalWrite(LED_BUILTIN, LOW);
  delay(3000);
}
