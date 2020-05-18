interface AccountInterface {
	deposit(amount: number): string;
	withdraw(amount: number): string;
	transfer(toAccountNum: number, amount: number): string;
	getAccountNumber(): number;
}

abstract class Account implements AccountInterface {
	protected accountNumber: number;
	constructor() {
		this.accountNumber = Math.random();
	}
	abstract deposit(amount: number): string;
	abstract withdraw(amount: number): string;
	abstract transfer(toAccountNum: number, amount: number): string;
	abstract getAccountNumber(): number;
}

class CheckingAccount extends Account {
	constructor() {
		super();
	}
	deposit(amount: number): string {
		return `Deposited $${amount} into Checking Account`;
	}
	withdraw(amount: number): string {
		return `Withdrew $${amount} from Checking Account`;
	}
	transfer(toAccountNum: number, amount: number): string {
		return `Transferred $${amount} to account number ${toAccountNum}`;
	}
	getAccountNumber(): number {
		return this.accountNumber;
	}
}

class SavingsAccount extends Account {
	constructor() {
		super();
	}
	deposit(amount: number): string {
		return `Deposited $${amount} into Savings Account`;
	}
	withdraw(amount: number): string {
		return `Withdrew $${amount} from Savings Account`;
	}
	transfer(toAccountNum: number, amount: number): string {
		return `Transferred $${amount} to account number ${toAccountNum}`;
	}
	getAccountNumber(): number {
		return this.accountNumber;
	}
}

class InvestmentAccount extends Account {
	constructor() {
		super();
	}
	deposit(amount: number): string {
		return `Deposited $${amount} into Investment Account`;
	}
	withdraw(amount: number): string {
		return `Withdrew $${amount} from Investment Account`;
	}
	transfer(toAccountNum: number, amount: number): string {
		return `Transferred $${amount} to account number ${toAccountNum}`;
	}
	getAccountNumber(): number {
		return this.accountNumber;
	}
}

export { CheckingAccount, SavingsAccount, InvestmentAccount, Account };
