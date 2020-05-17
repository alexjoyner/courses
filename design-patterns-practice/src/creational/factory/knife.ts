// The objects that we want to create
type knifeState = {
	sharpened: boolean;
	polished: boolean;
	packaged: boolean;
};

// We need a super class for the general type of object
interface Knife {
	sharpen(): void;
	polish(): void;
	package(): void;
	getState(): knifeState;
}

// Now we can make subclasses or concrete classes of products
class ChefsKnife implements Knife {
	private state: knifeState = {
		sharpened: false,
		polished: false,
		packaged: false,
	};
	sharpen(): void {
		this.state.sharpened = true;
	}
	polish(): void {
		this.state.polished = true;
	}
	package(): void {
		this.state.packaged = true;
	}
	getState(): knifeState {
		return this.state;
	}
}

// Now we can make subclasses or concrete classes of products
class SteakKnife implements Knife {
	private state: knifeState = {
		sharpened: false,
		polished: false,
		packaged: false,
	};
	sharpen(): void {
		this.state.sharpened = true;
	}
	polish(): void {
		this.state.polished = true;
	}
	package(): void {
		this.state.packaged = true;
	}
	getState(): knifeState {
		return this.state;
	}
}

export { ChefsKnife, SteakKnife, Knife };
