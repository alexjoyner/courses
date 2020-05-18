import { BasicKnifeShop } from './knifeShop';

describe('Knife Factory Implementation', () => {
	// As is mentioned in the docs, in the factory pattern, the client/programmer does not
	//   work directly with the Factory.  The factory is a way to just abstract creating objects
	//   from the shop.  The client still just works directly with the shop.  As is the
	//   case most of the time in the real world.
	it('should allow ordering knives', () => {
		const knifeShop = new BasicKnifeShop();
		const steakKnife = knifeShop.orderKnife('steak');
		const status = steakKnife.getState();
		const result = `The steak knife is ${
			status.packaged ? 'packaged' : 'not packaged'
		}, ${status.polished ? 'polished' : 'not polished'},and ${
			status.sharpened ? 'sharpened' : 'not sharpened'
		}!`;
		expect(result).toEqual(
			`The steak knife is packaged, polished,and sharpened!`
		);
	});
});
