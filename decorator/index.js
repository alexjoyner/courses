var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ModelS = /** @class */ (function () {
    function ModelS() {
    }
    ModelS.prototype.getDescription = function () {
        return 'ModelS';
    };
    ModelS.prototype.cost = function () {
        return 73000;
    };
    return ModelS;
}());
var ModelX = /** @class */ (function () {
    function ModelX() {
    }
    ModelX.prototype.getDescription = function () {
        return 'ModelX';
    };
    ModelX.prototype.cost = function () {
        return 77000;
    };
    return ModelX;
}());
var CarOption = /** @class */ (function () {
    function CarOption(decoratedCar) {
        this.decoratedCar = decoratedCar;
    }
    CarOption.prototype.getDescription = function () {
        return this.decoratedCar.getDescription();
    };
    CarOption.prototype.cost = function () {
        throw this.decoratedCar.cost();
    };
    return CarOption;
}());
var EnhancedAutoPilot = /** @class */ (function (_super) {
    __extends(EnhancedAutoPilot, _super);
    function EnhancedAutoPilot(car) {
        return _super.call(this, car) || this;
    }
    EnhancedAutoPilot.prototype.getDescription = function () {
        return this.decoratedCar.getDescription() + '\n  - Auto Pilot';
    };
    EnhancedAutoPilot.prototype.cost = function () {
        return this.decoratedCar.cost() + 3000;
    };
    return EnhancedAutoPilot;
}(CarOption));
var WhiteSeats = /** @class */ (function (_super) {
    __extends(WhiteSeats, _super);
    function WhiteSeats(car) {
        return _super.call(this, car) || this;
    }
    WhiteSeats.prototype.getDescription = function () {
        return this.decoratedCar.getDescription() + '\n  - White Seats';
    };
    WhiteSeats.prototype.cost = function () {
        return this.decoratedCar.cost() + 1000;
    };
    return WhiteSeats;
}(CarOption));
// Implementation
var baseCar = new ModelX();
var myCar = new WhiteSeats(baseCar);
console.log(myCar.getDescription());
console.log(myCar.cost());
