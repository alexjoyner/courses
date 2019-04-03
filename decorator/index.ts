abstract class Car {
    private description: string;
    constructor(description: string){
        this.description = description;
    }
    public getDescription(): string{
        return this.description;
    };
    public abstract cost(): number;
}

class ModelS extends Car {
    constructor(){
        super('ModelS')
    }
    
    public cost(): number {
        return 73000
    }
}

class ModelX extends Car {
    constructor(){
        super('ModelX')
    }
    
    public cost(): number {
        return 77000
    }
}


abstract class CarOption extends Car {
    decoratedCar: Car;
    constructor(decoratedCar: Car){
        super(decoratedCar.getDescription());
        this.decoratedCar = decoratedCar;
    }
}

class EnhancedAutoPilot extends CarOption{
    constructor(car: Car){
        super(car);
    }
    public getDescription(): string {
        return this.decoratedCar.getDescription() + '\n  - Auto Pilot';
    }    
    public cost(): number {
        return this.decoratedCar.cost() + 3000;
    }
}
class WhiteSeats extends CarOption{
    constructor(car: Car){
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
let basicModelS = new ModelS();
let myCar = new WhiteSeats(basicModelS);
myCar = new EnhancedAutoPilot(myCar);

console.log(myCar.getDescription());
console.log(myCar.cost());
