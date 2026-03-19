---
title: Getting Started with ESP32 on macOS
description: A complete guide to setting up your ESP32 development environment using PlatformIO and VS Code on macOS.
date: 2025-03-01
author: Carlos Isaac
category: ESP32
tags: [esp32, platformio, vscode, macos, setup]
---

# Getting Started with ESP32 on macOS

If you've been wanting to dive into embedded development, the **ESP32** is one of the best places to start. It's cheap, powerful, has built-in Wi-Fi and Bluetooth, and has a massive community around it. This guide walks through everything I did to get my first LED blinking.

## What You'll Need

- ESP32 DEVKIT V1 (DOIT board)
- USB to Micro-USB cable
- VS Code installed
- macOS 12 or later

## Step 1 — Install PlatformIO

PlatformIO is a VS Code extension that handles compiling, uploading, and managing libraries for embedded projects. It's miles better than the Arduino IDE for anything serious.

Open VS Code, go to the Extensions panel and search for **PlatformIO IDE**. Install it and restart VS Code when prompted.

```bash
# Verify Python is available (PlatformIO needs it)
python3 --version
```

## Step 2 — Create Your First Project

Once PlatformIO is installed, click the alien icon in the sidebar → **New Project**.

Fill in the fields:

| Field | Value |
|---|---|
| Name | `hello-esp32` |
| Board | `DOIT ESP32 DEVKIT V1` |
| Framework | `Arduino` |

PlatformIO will download the toolchain automatically — this takes a few minutes the first time.

## Step 3 — Blink an LED

Replace the contents of `src/main.cpp` with this:

```cpp
#include <Arduino.h>

#define LED_PIN 2  // Built-in LED on most DOIT boards

void setup() {
  Serial.begin(115200);
  pinMode(LED_PIN, OUTPUT);
  Serial.println("ESP32 is alive!");
}

void loop() {
  digitalWrite(LED_PIN, HIGH);
  Serial.println("ON");
  delay(500);

  digitalWrite(LED_PIN, LOW);
  Serial.println("OFF");
  delay(500);
}
```

## Step 4 — Find Your Port

Plug in the board and run:

```bash
ls /dev/cu.*
```

You should see something like `/dev/cu.usbserial-0001`. If nothing shows up, you need the **CH340 driver** — the DOIT boards use a CH340 chip instead of CP2102.

> **Note:** After installing the CH340 driver you may need to restart your Mac. The port will appear as `/dev/cu.usbserial-XXXX` not `/dev/cu.wchusbserial`.

## Step 5 — Upload and Monitor

Click the **Upload** button (→) in the PlatformIO toolbar. Once it says `SUCCESS`, open the Serial Monitor (plug icon) at 115200 baud. You should see `ON` and `OFF` printing every 500ms, and the blue LED on the board flashing.

## Troubleshooting

If upload fails with `A fatal error occurred: Failed to connect to ESP32`, hold the **BOOT** button on the board while the upload starts, then release it once you see `Connecting...` in the terminal.

## What's Next

Now that the toolchain is working, the next step is wiring up a joystick module and reading analog inputs — which I'll cover in the next post.

---

*Build time: ~45 minutes including driver issues.*