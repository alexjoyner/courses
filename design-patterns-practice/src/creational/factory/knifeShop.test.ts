import { BasicKnifeShop } from './knifeShop';
import { ChefsKnife, SteakKnife } from './knife';

describe('BasicKnifeShop', () => {
	let basicKnifeShop: BasicKnifeShop;
	beforeEach(() => {
		basicKnifeShop = new BasicKnifeShop();
	});
	it('should create a shop', () => {
		expect(basicKnifeShop).toBeInstanceOf(BasicKnifeShop);
	});
	it('should warn of ordering unsupported knives', () => {
		const makeBadOrder = () => {
			return basicKnifeShop.orderKnife('Stupid Knife');
		};

		expect(makeBadOrder).toThrowError("Can't make a Stupid Knife");
	});
	it('should should allow ordering a finished chef knife', () => {
		let chefKnife = basicKnifeShop.orderKnife('chef');
		expect(chefKnife).toBeInstanceOf(ChefsKnife);
		expect(chefKnife.getState()).toEqual({
			polished: true,
			sharpened: true,
			packaged: true,
		});
	});
	it('should should allow ordering a finished steak knife', () => {
		let steakKnife = basicKnifeShop.orderKnife('steak');
		expect(steakKnife).toBeInstanceOf(SteakKnife);
		expect(steakKnife.getState()).toEqual({
			polished: true,
			sharpened: true,
			packaged: true,
		});
	});
});
