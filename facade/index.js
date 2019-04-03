var BlurayPlayer = /** @class */ (function () {
    function BlurayPlayer() {
    }
    BlurayPlayer.prototype.on = function () {
        console.log('Bluray player turning on...');
    };
    BlurayPlayer.prototype.turnOff = function () {
        console.log('Bluray turning off..');
    };
    BlurayPlayer.prototype.play = function () {
        console.log('Playing bluray disc...');
    };
    return BlurayPlayer;
}());
var Amplifier = /** @class */ (function () {
    function Amplifier() {
    }
    Amplifier.prototype.on = function () {
        console.log('Amp is turning on..');
    };
    Amplifier.prototype.turnOff = function () {
        console.log('Amplifier turning off..');
    };
    Amplifier.prototype.setSource = function (source) {
        console.log('Setting source to ' + source);
    };
    Amplifier.prototype.setVolume = function (volumeLevel) {
        console.log('Setting volume to ' + volumeLevel);
    };
    return Amplifier;
}());
var Lights = /** @class */ (function () {
    function Lights() {
    }
    Lights.prototype.dim = function () {
        console.log('Lights are dimming..');
    };
    return Lights;
}());
var TV = /** @class */ (function () {
    function TV() {
    }
    TV.prototype.turnOn = function () {
        console.log('TV turning on..');
    };
    TV.prototype.turnOff = function () {
        console.log('TV turning off..');
    };
    return TV;
}());
var PopcornMaker = /** @class */ (function () {
    function PopcornMaker() {
    }
    PopcornMaker.prototype.turnOn = function () {
        console.log('Popcorn maker turning on..');
    };
    PopcornMaker.prototype.turnOff = function () {
        console.log('Popcorn maker turning off..');
    };
    PopcornMaker.prototype.pop = function () {
        console.log('Popping corn!');
    };
    return PopcornMaker;
}());
// ----
var HomeTheaterFacade = /** @class */ (function () {
    function HomeTheaterFacade(opts) {
        this.bluray = opts.bluray || new BlurayPlayer;
        this.amp = opts.amp || new Amplifier;
        this.lights = opts.lights || new Lights;
        this.tv = opts.tv || new TV;
        this.popcornMaker = opts.popcornMaker || new PopcornMaker;
    }
    HomeTheaterFacade.prototype.watchMovie = function () {
        this.popcornMaker.turnOn();
        this.popcornMaker.pop();
        this.lights.dim();
        this.tv.turnOn();
        this.amp.on();
        this.amp.setSource('bluray');
        this.amp.setVolume(11);
        this.bluray.on();
        this.bluray.play();
    };
    HomeTheaterFacade.prototype.endMovie = function () {
        this.popcornMaker.turnOff();
        this.amp.turnOff();
        this.tv.turnOff();
        this.bluray.turnOff();
    };
    return HomeTheaterFacade;
}());
// ----
// let bluray = new BlurayPlayer();
// let amp = new Amplifier();
// let lights = new Lights();
// let tv = new TV();
// let popcornMaker = new PopcornMaker();
var hometheater = new HomeTheaterFacade({} /* amp, bluray, lights, tv, popcornMaker */);
console.log('\n### Starting Movie ###\n');
hometheater.watchMovie();
console.log('\n### Stopping Movie ###\n');
hometheater.endMovie();
