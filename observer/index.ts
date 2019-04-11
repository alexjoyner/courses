// Observers can only subscribe to Subjects
interface ObserverSubject {
	registerObserver(o: Observer): void;
	removeObserver(o: Observer): void;
	notifyObservers(): void;
}
interface Observer {
	update(data: any): void;
}

class WeatherStation implements ObserverSubject {
	private temperature: number = 0;
	private observers: Observer[] = [];

	setTemperature(temp: number) {
		console.log("WeatherStation: new temperature " + temp);
		this.temperature = temp;
		this.notifyObservers();
	}
	registerObserver(o: Observer): void {
		this.observers.push(o);
	}
	removeObserver(o: Observer): void {
		let index = this.observers.indexOf(o);
		this.observers.splice(index, 1);
	}
	notifyObservers(): void {
		this.observers.map(observer => {
			observer.update(this.temperature);
		});
	}
}

class TemperatureDisplay implements Observer {
	private weatherStation: WeatherStation;
	constructor(weatherStation: WeatherStation) {
		this.weatherStation = weatherStation
		this.weatherStation.registerObserver(this);
	}
	update(temperature: number): void {
		console.log("Current Temp: ", temperature);
	}
}

class Fan implements Observer {
	constructor(weatherStation: WeatherStation) {
		weatherStation.registerObserver(this);
	}
	update(temperature: number): void {
		temperature > 25
			? console.log("It's hot... Turning Fan On")
			: console.log("It's cold... Turning Fan Off");
	}
}

let weatherStation = new WeatherStation();
let temperatureDisplay = new TemperatureDisplay(weatherStation);
let temperatureDisplay2 = new TemperatureDisplay(weatherStation);
weatherStation.removeObserver(temperatureDisplay)

weatherStation.setTemperature(20);
weatherStation.setTemperature(40);
