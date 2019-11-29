//////////////////// LIBRARIES /////////////////////
#include <Arduino.h>
#include <Wire.h>

#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>

#include <Servo.h>

//////////////////// GLOBAL DEFINE /////////////////////
WiFiClient client;

const char *ssid = "Bodo amat";
const char *password = "H2nomor11";
char path[] = "/";
char host[]= "192.168.1.8"; //WLAN IP (SERVER)
int port = 3000;






////////////////// LOOP AND SETUP ///////////////////////
void setup(){
    #if defined(ESP8266)
        Serial.begin(115200);
    #else
        Serial.begin(38400);
    #endif

    Serial.setDebugOutput(true);
    for (uint8_t t = 4; t > 0; t--)
    {
        Serial.printf("[SETUP] BOOT WAIT %d...\n", t);
        Serial.flush();
        delay(500);
    }    
    wifi_connection();
}





void loop()
{
//  post_();
  post_json();

  get_json();
  
  delay(60000);
}






void get_json(){
  HTTPClient http;  //Declare an object of class HTTPClient
     
  http.begin("http://192.168.1.8:3000/api/test");  //Specify request destination
  int httpCode = http.GET();                                                                  //Send the request
     
  if (httpCode > 0) { //Check the returning code
     
    String payload = http.getString();   //Get the request response payload
    Serial.println(payload);
  }
  
  http.end();
}

void post_json(){
    StaticJsonBuffer<300> JSONbuffer;   //Declaring static JSON buffer
    JsonObject& JSONencoder = JSONbuffer.createObject();
  
    JSONencoder["value"] = 12345;
    JSONencoder["name"] = "test sensor";
    char JSONmessageBuffer[300];
    JSONencoder.prettyPrintTo(JSONmessageBuffer, sizeof(JSONmessageBuffer));
    
    HTTPClient http;    //Declare object of class HTTPClient
   
    http.begin("http://192.168.1.8:3000/api/test");      //Specify request destination
    http.addHeader("Content-Type", "application/json");  //Specify content-type header
   
    int httpCode = http.POST(JSONmessageBuffer);   //Send the request
    String payload = http.getString();                  //Get the response payload
   
    Serial.println(httpCode);   //Print HTTP return code
    Serial.println(payload);    //Print request response payload
   
    http.end();  //Close connection
}








//////////////// BINDING CONNECTION /////////////////////
void wifi_connection()
{
    Serial.print("\n");
    Serial.printf("WiFi Connecting to :: ");
    Serial.printf(ssid);

    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
        Serial.printf(".");
    }

    Serial.print("\n");
    Serial.printf("WiFi connected");
    Serial.printf("IP address: ");
    Serial.print(WiFi.localIP());

    app_connection();
}

void app_connection()
{
    Serial.print("\n");
    Serial.printf("App Connecting to :: ");
    Serial.printf(host);

    if (client.connect(host, port))
    {
        Serial.printf("\nApp Server Connected\n");
    }
    else
    {
        Serial.printf("\nApp Server Connection failed\n & Trying...");
        app_connection();
    }

    Serial.print("");
}








//////////////////////////////////////////////////////////////


void post_(){
     HTTPClient http;    //Declare object of class HTTPClient
   
     http.begin("http://192.168.1.8:3000/api/test");      //Specify request destination
     http.addHeader("Content-Type", "application/x-www-form-urlencoded");  //Specify content-type header
   
     int httpCode = http.POST("Message from ESP8266");   //Send the request
     String payload = http.getString();                  //Get the response payload
   
     Serial.println(httpCode);   //Print HTTP return code
     Serial.println(payload);    //Print request response payload
   
     http.end();  //Close connection
}
// https://techtutorialsx.com/2016/07/21/esp8266-post-requests/