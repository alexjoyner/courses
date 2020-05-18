import { Knife, ChefsKnife, SteakKnife } from './knife';

interface KnifeFactoryInterface {
	createKnife(knifeType: string): Knife;
}

class KnifeFactory implements KnifeFactoryInterface {
	public createKnife(knifeType: string): Knife {
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

export { KnifeFactory };
