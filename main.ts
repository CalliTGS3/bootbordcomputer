radio.onReceivedValue(function (name, value) {
    ZeitstempelEmpfangen = input.runningTime()
    if (name == "F") {
        if (value == 1) {
            Fahren = true
        } else {
            Fahren = false
        }
    } else if (name == "G") {
        Geschwindigkeit = value
    } else if (name == "R") {
        Richtung = value
    } else if (name == "X") {
        LedX = value
    } else if (name == "Y") {
        LedY = value
    } else {
    	
    }
})
let LedY = 0
let LedX = 0
let Richtung = 0
let Geschwindigkeit = 0
let Fahren = false
let ZeitstempelEmpfangen = 0
let motor1 = l298.create_motor(DigitalPin.P0, DigitalPin.P1, AnalogPin.C16)
let motor2 = l298.create_motor(DigitalPin.P2, DigitalPin.P3, AnalogPin.C17)
let boot = l298.create_vehicle(motor1, motor2)
led.enable(true)
let Timeout = 500
radio.setGroup(1)
basic.setLedColor(0x007fff)
serial.redirectToUSB()
basic.forever(function () {
    if (Fahren && input.runningTime() < ZeitstempelEmpfangen + Timeout) {
        basic.clearScreen()
        led.plot(4 - LedX, 4 - LedY)
        serial.writeValue("G", Geschwindigkeit)
        serial.writeValue("R", Richtung)
        boot.drive(Geschwindigkeit, Richtung)
    } else {
        basic.clearScreen()
        boot.stop()
    }
})
