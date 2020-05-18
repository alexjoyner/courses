import { BankService } from './bankService';

describe('Bank Service Facade', () => {
	let myBankService: BankService;
	beforeEach(() => {
		jest.spyOn(global.Math, 'random').mockReturnValue(0.123456789);
		myBankService = new BankService();
	});
	afterEach(() => {
		// @ts-ignore-line
		global.Math.random.mockRestore();
	});
	it('can exist', () => {
		expect(myBankService).toBeInstanceOf(BankService);
	});
	it("doesn't allow creating unsupported accounts", () => {
		const createInvalidAccount = () => {
			myBankService.createNewAccount('invalid', 15);
		};
		expect(createInvalidAccount).toThrowError(
			"Can't create account. Invalid type"
		);
	});
	it('allows creating a new checking account', () => {
		expect(myBankService.createNewAccount('checking', 1234)).toEqual(
			'Created new checking account #0.123456789'
		);
	});
	it('allows creating a new savings account', () => {
		expect(myBankService.createNewAccount('savings', 1234)).toEqual(
			'Created new savings account #0.123456789'
		);
	});
	it('allows creating a new investment account', () => {
		expect(myBankService.createNewAccount('investment', 1234)).toEqual(
			'Created new investment account #0.123456789'
		);
	});
});
