"use strict";
class ModelS {
    getDescription() {
        return 'ModelS';
    }
    cost() {
        return 73000;
    }
}
class ModelX {
    getDescription() {
        return 'ModelX';
    }
    cost() {
        return 77000;
    }
}
class CarOption {
    constructor(decoratedCar) {
        this.decoratedCar = decoratedCar;
    }
    getDescription() {
        return this.decoratedCar.getDescription();
    }
    cost() {
        throw this.decoratedCar.cost();
    }
}
class EnhancedAutoPilot extends CarOption {
    constructor(car) {
        super(car);
    }
    getDescription() {
        return this.decoratedCar.getDescription() + '\n  - Auto Pilot';
    }
    cost() {
        return this.decoratedCar.cost() + 3000;
    }
}
class WhiteSeats extends CarOption {
    constructor(car) {
        super(car);
    }
    getDescription() {
        return this.decoratedCar.getDescription() + '\n  - White Seats';
    }
    cost() {
        return this.decoratedCar.cost() + 1000;
    }
}
// Implementation
let baseCar = new ModelX();
let myCar = new WhiteSeats(baseCar);
console.log(myCar.getDescription());
console.log(myCar.cost());
//# sourceMappingURL=index.js.map