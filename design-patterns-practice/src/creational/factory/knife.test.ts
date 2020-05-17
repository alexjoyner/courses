import { ChefsKnife, SteakKnife } from './knife';

describe('chefs knife', () => {
	let chefKnife: ChefsKnife;

	beforeEach(() => {
		chefKnife = new ChefsKnife();
	});

	it('should create a basic chef knife', () => {
		expect(chefKnife.getState()).toEqual({
			polished: false,
			sharpened: false,
			packaged: false,
		});
	});
	it('should allow sharpening', () => {
		chefKnife.sharpen();
		expect(chefKnife.getState()).toEqual({
			polished: false,
			sharpened: true,
			packaged: false,
		});
	});
	it('should allow polishing', () => {
		chefKnife.polish();
		expect(chefKnife.getState()).toEqual({
			polished: true,
			sharpened: false,
			packaged: false,
		});
	});
	it('should allow packaging', () => {
		chefKnife.package();
	});
});
describe('steak knife', () => {
	let steakKnife: SteakKnife;

	beforeEach(() => {
		steakKnife = new SteakKnife();
	});

	it('should create a basic steak knife', () => {
		expect(steakKnife.getState()).toEqual({
			polished: false,
			sharpened: false,
			packaged: false,
		});
	});
	it('should allow sharpening', () => {
		steakKnife.sharpen();
		expect(steakKnife.getState()).toEqual({
			polished: false,
			sharpened: true,
			packaged: false,
		});
	});
	it('should allow polishing', () => {
		steakKnife.polish();
		expect(steakKnife.getState()).toEqual({
			polished: true,
			sharpened: false,
			packaged: false,
		});
	});
	it('should allow packaging', () => {
		steakKnife.package();
	});
});
