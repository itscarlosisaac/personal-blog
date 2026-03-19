---
title: Wireless ESP32 Communication with ESP-NOW
description: How to send data between two ESP32 boards without a router using ESP-NOW — perfect for RC car controllers and robotics.
date: 2025-03-10
author: Carlos Isaac
category: Wireless
tags: [esp32, esp-now, wireless, rc-car, sender, receiver]
---

# Wireless ESP32 Communication with ESP-NOW

Wi-Fi is great, but it needs a router. Bluetooth has range limits. **ESP-NOW** is different — it lets two ESP32 boards talk directly to each other, peer-to-peer, with latency as low as 1ms. No router, no pairing, no overhead.

I'm using this to build the controller for my RC car project, but it works for anything that needs fast wireless data between two boards.

## How ESP-NOW Works

Each ESP32 has a unique MAC address burned into its chip. ESP-NOW uses these addresses to establish a direct connection — you register the receiver's MAC on the sender, and data flows immediately.

```
[Sender ESP32] ──── ESP-NOW ──── [Receiver ESP32]
  (controller)                     (car / robot)
```

The max payload is **250 bytes** per packet, and you can have up to 20 peers registered at once.

## Step 1 — Get the Receiver's MAC Address

Flash this sketch to the board that will **receive** data:

```cpp
#include <Arduino.h>
#include <WiFi.h>

void setup() {
  Serial.begin(115200);
  WiFi.mode(WIFI_STA);
  Serial.println("Receiver MAC Address:");
  Serial.println(WiFi.macAddress());
}

void loop() {}
```

Open the Serial Monitor and note the MAC. Mine was `28:05:A5:33:92:88`.

## Step 2 — Define a Shared Message Struct

Both boards need the same data structure. Create `car_message.h` in both projects:

```cpp
#pragma once

struct CarMessage {
  int   throttle;    // -100 to 100
  int   steering;    // -100 to 100
  bool  brakePressed;
};
```

## Step 3 — Sender Code

```cpp
#include <Arduino.h>
#include <esp_now.h>
#include <WiFi.h>
#include "car_message.h"

// Replace with your receiver's MAC
uint8_t receiverMAC[] = { 0x28, 0x05, 0xA5, 0x33, 0x92, 0x88 };

void onSent(const uint8_t* mac, esp_now_send_status_t status) {
  Serial.print("Send status: ");
  Serial.println(status == ESP_NOW_SEND_SUCCESS ? "OK" : "FAIL");
}

void setup() {
  Serial.begin(115200);
  WiFi.mode(WIFI_STA);

  if (esp_now_init() != ESP_OK) {
    Serial.println("ESP-NOW init failed");
    return;
  }

  esp_now_register_send_cb(onSent);

  esp_now_peer_info_t peer = {};
  memcpy(peer.peer_addr, receiverMAC, 6);
  peer.channel = 0;
  peer.encrypt = false;
  esp_now_add_peer(&peer);
}

void loop() {
  CarMessage msg;
  msg.throttle    = 75;
  msg.steering    = -30;
  msg.brakePressed = false;

  esp_now_send(receiverMAC, (uint8_t*)&msg, sizeof(msg));
  delay(20); // 50Hz update rate
}
```

## Step 4 — Receiver Code

> **Important:** The callback signature must use `const uint8_t*` not `esp_now_recv_info_t*` — the newer API signature will cause a compile error on most board versions.

```cpp
#include <Arduino.h>
#include <esp_now.h>
#include <WiFi.h>
#include "car_message.h"

void onDataRecv(const uint8_t* mac_addr, const uint8_t* data, int len) {
  CarMessage msg;
  memcpy(&msg, data, sizeof(msg));

  Serial.printf("Throttle: %d | Steering: %d | Brake: %s\n",
    msg.throttle,
    msg.steering,
    msg.brakePressed ? "YES" : "NO"
  );
}

void setup() {
  Serial.begin(115200);
  WiFi.mode(WIFI_STA);

  if (esp_now_init() != ESP_OK) {
    Serial.println("ESP-NOW init failed");
    return;
  }

  esp_now_register_recv_cb(onDataRecv);
}

void loop() {}
```

## Results

With both boards powered and within ~100m of each other (clear line of sight), I'm getting:

| Metric | Value |
|---|---|
| Latency | ~2ms |
| Update rate | 50Hz (20ms interval) |
| Range (indoors) | ~30m |
| Range (outdoors) | ~80m |

## Common Issues

**`esp_now_init()` returns error** — make sure `WiFi.mode(WIFI_STA)` is called before `esp_now_init()`. ESP-NOW requires the Wi-Fi radio to be on even though it doesn't use a router.

**Packets not arriving** — double-check the MAC address byte order. The Serial Monitor prints it as `XX:XX:XX:XX:XX:XX` but the array needs each byte as a separate hex literal `{ 0xXX, 0xXX, ... }`.

**`onDataRecv` callback not compiling** — you're using the old `esp_now_recv_info_t*` signature. Use `const uint8_t* mac_addr` instead.

## What's Next

The next step is connecting a joystick to the sender and L9110S motor driver to the receiver, turning this into a fully functional RC car controller. That's the next build log.

---

*Parts used: 2× ESP32 DOIT DEVKIT V1 · Total cost: ~$10*