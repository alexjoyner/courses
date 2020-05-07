"use strict";
class WeatherStation {
    constructor() {
        this.temperature = 0;
        this.observers = [];
    }
    setTemperature(temp) {
        console.log("WeatherStation: new temperature " + temp);
        this.temperature = temp;
        this.notifyObservers();
    }
    registerObserver(o) {
        this.observers.push(o);
    }
    removeObserver(o) {
        let index = this.observers.indexOf(o);
        this.observers.splice(index, 1);
    }
    notifyObservers() {
        this.observers.map(observer => {
            observer.update(this.temperature);
        });
    }
}
class TemperatureDisplay {
    constructor(weatherStation) {
        this.weatherStation = weatherStation;
        this.weatherStation.registerObserver(this);
    }
    update(temperature) {
        console.log("Current Temp: ", temperature);
    }
}
class Fan {
    constructor(weatherStation) {
        weatherStation.registerObserver(this);
    }
    update(temperature) {
        temperature > 25
            ? console.log("It's hot... Turning Fan On")
            : console.log("It's cold... Turning Fan Off");
    }
}
let weatherStation = new WeatherStation();
let temperatureDisplay = new TemperatureDisplay(weatherStation);
let temperatureDisplay2 = new TemperatureDisplay(weatherStation);
weatherStation.removeObserver(temperatureDisplay);
weatherStation.setTemperature(20);
weatherStation.setTemperature(40);
//# sourceMappingURL=index.js.map