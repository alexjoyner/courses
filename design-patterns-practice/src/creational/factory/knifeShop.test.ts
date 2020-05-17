import { KnifeShop } from './knifeShop';
import { ChefsKnife, SteakKnife } from './knife';

describe('KnifeShop', () => {
	let knifeShop: KnifeShop;
	beforeEach(() => {
		knifeShop = new KnifeShop();
	});
	it('should create a shop', () => {
		expect(knifeShop).toBeInstanceOf(KnifeShop);
	});
	it('should warn of ordering unsupported knives', () => {
		const makeBadOrder = () => {
			return knifeShop.orderKnife('Stupid Knife');
		};

		expect(makeBadOrder).toThrowError("Can't make a Stupid Knife");
	});
	it('should should allow ordering a finished chef knife', () => {
		let chefKnife = knifeShop.orderKnife('chef');
		expect(chefKnife).toBeInstanceOf(ChefsKnife);
		expect(chefKnife.getState()).toEqual({
			polished: true,
			sharpened: true,
			packaged: true,
		});
	});
	it('should should allow ordering a finished steak knife', () => {
		let steakKnife = knifeShop.orderKnife('steak');
		expect(steakKnife).toBeInstanceOf(SteakKnife);
		expect(steakKnife.getState()).toEqual({
			polished: true,
			sharpened: true,
			packaged: true,
		});
	});
});
