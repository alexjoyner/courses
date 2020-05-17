import { ChefsKnife, Knife, SteakKnife } from './knife';

class KnifeShop {
	public orderKnife(knifeType: string): Knife {
		let knife: Knife;

		if (knifeType === 'chef') {
			knife = new ChefsKnife();
		} else if (knifeType === 'steak') {
			knife = new SteakKnife();
		} else {
			throw new Error(`Can't make a ${knifeType} knife`);
		}

		knife.sharpen();
		knife.polish();
		knife.package();
		return knife;
	}
}

export { KnifeShop, KnifeShop as default };
