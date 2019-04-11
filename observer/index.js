var WeatherStation = /** @class */ (function () {
    function WeatherStation() {
        this.temperature = 0;
        this.observers = [];
    }
    WeatherStation.prototype.setTemperature = function (temp) {
        console.log("WeatherStation: new temperature " + temp);
        this.temperature = temp;
        this.notifyObservers();
    };
    WeatherStation.prototype.registerObserver = function (o) {
        this.observers.push(o);
    };
    WeatherStation.prototype.removeObserver = function (o) {
        var index = this.observers.indexOf(o);
        this.observers.splice(index, 1);
    };
    WeatherStation.prototype.notifyObservers = function () {
        var _this = this;
        this.observers.map(function (observer) {
            observer.update(_this.temperature);
        });
    };
    return WeatherStation;
}());
var TemperatureDisplay = /** @class */ (function () {
    function TemperatureDisplay(weatherStation) {
        this.weatherStation = weatherStation;
        this.weatherStation.registerObserver(this);
    }
    TemperatureDisplay.prototype.update = function (temperature) {
        console.log("Current Temp: ", temperature);
    };
    return TemperatureDisplay;
}());
var Fan = /** @class */ (function () {
    function Fan(weatherStation) {
        weatherStation.registerObserver(this);
    }
    Fan.prototype.update = function (temperature) {
        temperature > 25
            ? console.log("It's hot... Turning Fan On")
            : console.log("It's cold... Turning Fan Off");
    };
    return Fan;
}());
var weatherStation = new WeatherStation();
var temperatureDisplay = new TemperatureDisplay(weatherStation);
var temperatureDisplay2 = new TemperatureDisplay(weatherStation);
weatherStation.removeObserver(temperatureDisplay);
weatherStation.setTemperature(20);
weatherStation.setTemperature(40);
