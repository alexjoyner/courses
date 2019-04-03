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
var Car = /** @class */ (function () {
    function Car(description) {
        this.description = description;
    }
    Car.prototype.getDescription = function () {
        return this.description;
    };
    ;
    return Car;
}());
var ModelS = /** @class */ (function (_super) {
    __extends(ModelS, _super);
    function ModelS() {
        return _super.call(this, 'ModelS') || this;
    }
    ModelS.prototype.cost = function () {
        return 73000;
    };
    return ModelS;
}(Car));
var ModelX = /** @class */ (function (_super) {
    __extends(ModelX, _super);
    function ModelX() {
        return _super.call(this, 'ModelX') || this;
    }
    ModelX.prototype.cost = function () {
        return 77000;
    };
    return ModelX;
}(Car));
var CarOption = /** @class */ (function (_super) {
    __extends(CarOption, _super);
    function CarOption(decoratedCar) {
        var _this = _super.call(this, decoratedCar.getDescription()) || this;
        _this.decoratedCar = decoratedCar;
        return _this;
    }
    return CarOption;
}(Car));
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
var basicModelS = new ModelS();
var myCar = new WhiteSeats(basicModelS);
myCar = new EnhancedAutoPilot(myCar);
console.log(myCar.getDescription());
console.log(myCar.cost());
