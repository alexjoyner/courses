import { ChefsKnife, Knife, SteakKnife } from './knife';

interface KnifeShopInterface {
	orderKnife(knifeType: string): Knife;
}

abstract class KnifeShop implements KnifeShopInterface {
	public orderKnife(knifeType: string): Knife {
		const knife: Knife = this.createKnife(knifeType);

		knife.sharpen();
		knife.polish();
		knife.package();
		return knife;
	}
	abstract createKnife(knifeType: string): Knife;
}

class BasicKnifeShop extends KnifeShop {
	// THIS! This is how the factory METHOD pattern works.
	//   every shop has a factory method that will create products
	//   specific to that shop.  This is analogous to a small
	//   shop that creates it's own products, and doesn't need
	//   to outsource it's product creation to a separate factory.
	createKnife(knifeType: string): Knife {
		switch (knifeType) {
			case 'chef':
				return new ChefsKnife();
			case 'steak':
				return new SteakKnife();
			default:
				throw new Error(`Can't make a ${knifeType} knife`);
		}
	}
}

export { BasicKnifeShop, BasicKnifeShop as default };
