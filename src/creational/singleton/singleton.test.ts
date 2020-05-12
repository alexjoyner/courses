import { Singleton } from './singleton';

describe('singleton pattern', () => {
	test('can create an instance of singleton', () => {
		const instance1 = Singleton.getInstance();
		expect(instance1).toBeInstanceOf(Singleton);
	});
	test('only allows creating one instance', () => {
		const instance1 = Singleton.getInstance();
		const instance2 = Singleton.getInstance();
		expect(instance1 === instance2).toBeTruthy();
	});
});
