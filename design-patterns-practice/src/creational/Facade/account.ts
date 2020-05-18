interface AccountInterface {
	deposit(amount: Number): string;
	withdraw(amount: Number): string;
	transfer(toAccountNum: Number, amount: Number): string;
	getAccountNumber(): Number;
}

abstract class Account implements AccountInterface {
	protected accountNumber: Number;
	constructor() {
		this.accountNumber = Math.random();
	}
	abstract deposit(amount: Number): string;
	abstract withdraw(amount: Number): string;
	abstract transfer(toAccountNum: Number, amount: Number): string;
	abstract getAccountNumber(): Number;
}

class CheckingAccount extends Account {
	constructor() {
		super();
	}
	deposit(amount: Number): string {
		return `Deposited $${amount} into Checking Account`;
	}
	withdraw(amount: Number): string {
		return `Withdrew $${amount} from Checking Account`;
	}
	transfer(toAccountNum: Number, amount: Number): string {
		return `Transferred $${amount} to account number ${toAccountNum}`;
	}
	getAccountNumber(): Number {
		return this.accountNumber;
	}
}

class SavingsAccount extends Account {
	constructor() {
		super();
	}
	deposit(amount: Number): string {
		return `Deposited $${amount} into Savings Account`;
	}
	withdraw(amount: Number): string {
		return `Withdrew $${amount} from Savings Account`;
	}
	transfer(toAccountNum: Number, amount: Number): string {
		return `Transferred $${amount} to account number ${toAccountNum}`;
	}
	getAccountNumber(): Number {
		return this.accountNumber;
	}
}

class InvestmentAccount extends Account {
	constructor() {
		super();
	}
	deposit(amount: Number): string {
		return `Deposited $${amount} into Investment Account`;
	}
	withdraw(amount: Number): string {
		return `Withdrew $${amount} from Investment Account`;
	}
	transfer(toAccountNum: Number, amount: Number): string {
		return `Transferred $${amount} to account number ${toAccountNum}`;
	}
	getAccountNumber(): Number {
		return this.accountNumber;
	}
}

export { CheckingAccount, SavingsAccount, InvestmentAccount };
