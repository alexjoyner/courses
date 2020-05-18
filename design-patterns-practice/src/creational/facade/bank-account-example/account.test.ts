import { CheckingAccount, SavingsAccount, InvestmentAccount } from './account';

describe('Accounts', () => {
	beforeEach(() => {
		jest.spyOn(global.Math, 'random').mockReturnValue(0.123456789);
	});
	afterEach(() => {
		// @ts-ignore-line
		global.Math.random.mockRestore();
	});
	describe('Checking Account', () => {
		let account: CheckingAccount;
		beforeEach(() => {
			account = new CheckingAccount();
		});
		it('should exist', () => {
			expect(account).toBeInstanceOf(CheckingAccount);
		});
		it('should create a random account number', () => {
			expect(account.getAccountNumber()).toEqual(0.123456789);
		});
		it('should allow depositing an amount', () => {
			expect(account.deposit(5000)).toEqual(
				'Deposited $5000 into Checking Account'
			);
		});
		it('should allow withdrawing an amount', () => {
			expect(account.withdraw(1000)).toEqual(
				'Withdrew $1000 from Checking Account'
			);
		});
		it('should allow transferring an amount', () => {
			expect(account.transfer(1010101, 1500)).toEqual(
				'Transferred $1500 to account number 1010101'
			);
		});
	});
	describe('Savings Account', () => {
		let account: SavingsAccount;
		beforeEach(() => {
			account = new SavingsAccount();
		});
		it('should exist', () => {
			expect(account).toBeInstanceOf(SavingsAccount);
		});
		it('should create a random account number', () => {
			expect(account.getAccountNumber()).toEqual(0.123456789);
		});
		it('should allow depositing an amount', () => {
			expect(account.deposit(5000)).toEqual(
				'Deposited $5000 into Savings Account'
			);
		});
		it('should allow withdrawing an amount', () => {
			expect(account.withdraw(1000)).toEqual(
				'Withdrew $1000 from Savings Account'
			);
		});
		it('should allow transferring an amount', () => {
			expect(account.transfer(1010101, 1500)).toEqual(
				'Transferred $1500 to account number 1010101'
			);
		});
	});
	describe('Investment Account', () => {
		let account: InvestmentAccount;
		beforeEach(() => {
			account = new InvestmentAccount();
		});
		it('should exist', () => {
			expect(account).toBeInstanceOf(InvestmentAccount);
		});
		it('should create a random account number', () => {
			expect(account.getAccountNumber()).toEqual(0.123456789);
		});
		it('should allow depositing an amount', () => {
			expect(account.deposit(5000)).toEqual(
				'Deposited $5000 into Investment Account'
			);
		});
		it('should allow withdrawing an amount', () => {
			expect(account.withdraw(1000)).toEqual(
				'Withdrew $1000 from Investment Account'
			);
		});
		it('should allow transferring an amount', () => {
			expect(account.transfer(1010101, 1500)).toEqual(
				'Transferred $1500 to account number 1010101'
			);
		});
	});
});
