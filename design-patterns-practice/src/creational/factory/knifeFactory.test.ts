import { KnifeFactory } from './knifeFactory';
import { ChefsKnife, SteakKnife } from './knife';

describe('Knife Factory', () => {
	let testKnifeFactory: KnifeFactory;
	beforeEach(() => {
		testKnifeFactory = new KnifeFactory();
	});
	it('exists', () => {
		expect(testKnifeFactory).toBeInstanceOf(KnifeFactory);
	});
	it('does not allow creating invalid knives', () => {
		const createInvalidKnife = () => {
			return testKnifeFactory.createKnife('crappy');
		};

		expect(createInvalidKnife).toThrowError("Can't make a crappy knife");
	});
	it('allows creating valid knives', () => {
		expect(testKnifeFactory.createKnife('chef')).toBeInstanceOf(ChefsKnife);
		expect(testKnifeFactory.createKnife('steak')).toBeInstanceOf(SteakKnife);
	});
});
