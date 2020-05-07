interface Car {
	getDescription(): string;
	cost(): number;
}

class ModelS implements Car {
	public getDescription(): string {
		return 'ModelS';
	}
	public cost(): number {
		return 73000;
	}
}

class ModelX implements Car {
	public getDescription(): string {
		return 'ModelX';
	}
	public cost(): number {
		return 77000;
	}
}

abstract class CarOption implements Car {
	decoratedCar: Car;
	constructor(decoratedCar: Car) {
		this.decoratedCar = decoratedCar;
	}
	getDescription(): string {
		return this.decoratedCar.getDescription();
	}
	cost(): number {
		throw this.decoratedCar.cost();
	}
}

class EnhancedAutoPilot extends CarOption {
	constructor(car: Car) {
		super(car);
	}
	public getDescription(): string {
		return this.decoratedCar.getDescription() + '\n  - Auto Pilot';
	}
	public cost(): number {
		return this.decoratedCar.cost() + 3000;
	}
}
class WhiteSeats extends CarOption {
	constructor(car: Car) {
		super(car);
	}
	public getDescription(): string {
		return this.decoratedCar.getDescription() + '\n  - White Seats';
	}
	public cost(): number {
		return this.decoratedCar.cost() + 1000;
	}
}

// Implementation
let baseCar = new ModelX();
let myCar = new WhiteSeats(baseCar);

console.log(myCar.getDescription());
console.log(myCar.cost());
