import { ChefsKnife, Knife, SteakKnife } from './knife';
import { KnifeFactory } from './knifeFactory';

interface KnifeShopInterface {
	orderKnife(knifeType: string): Knife;
}

class KnifeShop implements KnifeShopInterface {
	private factory: KnifeFactory;
	constructor(knifeFactory: KnifeFactory = new KnifeFactory()) {
		this.factory = knifeFactory;
	}
	public orderKnife(knifeType: string): Knife {
		const knife: Knife = this.factory.createKnife(knifeType);

		knife.sharpen();
		knife.polish();
		knife.package();
		return knife;
	}
}

export { KnifeShop, KnifeShop as default };
