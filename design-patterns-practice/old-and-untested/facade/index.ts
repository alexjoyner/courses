class BlurayPlayer{
    on() {
        console.log('Bluray player turning on...');
    }

    turnOff() {
        console.log('Bluray turning off..');
    }

    play() {
        console.log('Playing bluray disc...');
    }
}

class Amplifier{
    on() {
        console.log('Amp is turning on..');
    }

    turnOff() {
        console.log('Amplifier turning off..');
    }

    setSource(source: string) {
        console.log('Setting source to ' + source);
    }

    setVolume(volumeLevel: number) {
        console.log('Setting volume to ' + volumeLevel);
    }
}

class Lights{
    dim() {
        console.log('Lights are dimming..');
    }
}

class TV{
    turnOn() {
        console.log('TV turning on..');
    }

    turnOff() {
        console.log('TV turning off..');
    }
}

class PopcornMaker{
    turnOn() {
        console.log('Popcorn maker turning on..');
    }

    turnOff() {
        console.log('Popcorn maker turning off..');
    }

    pop() {
        console.log('Popping corn!');
    }
}

// ----
class HomeTheaterFacade{
    private bluray: BlurayPlayer;
    private amp: Amplifier;
    private lights : Lights;
    private tv : TV;
    private popcornMaker: PopcornMaker;

    constructor(opts: {amp?: Amplifier, bluray?: BlurayPlayer, lights?: Lights, tv?: TV, popcornMaker?: PopcornMaker}){
        this.bluray = opts.bluray || new BlurayPlayer;
        this.amp = opts.amp || new Amplifier;
        this.lights = opts.lights || new Lights;
        this.tv = opts.tv || new TV;
        this.popcornMaker = opts.popcornMaker || new PopcornMaker;
    }

    public watchMovie() {
        this.popcornMaker.turnOn();
        this.popcornMaker.pop();

        this.lights.dim();

        this.tv.turnOn();

        this.amp.on();
        this.amp.setSource('bluray');
        this.amp.setVolume(11);

        this.bluray.on();
        this.bluray.play();
    }

    endMovie() {
        this.popcornMaker.turnOff();
        this.amp.turnOff();
        this.tv.turnOff();
        this.bluray.turnOff();
    }
}

// ----
// let bluray = new BlurayPlayer();
// let amp = new Amplifier();
// let lights = new Lights();
// let tv = new TV();
// let popcornMaker = new PopcornMaker();
let hometheater = new HomeTheaterFacade({}/* amp, bluray, lights, tv, popcornMaker */);
console.log('\n### Starting Movie ###\n');
hometheater.watchMovie();
console.log('\n### Stopping Movie ###\n');
hometheater.endMovie();