import {
	Account,
	CheckingAccount,
	SavingsAccount,
	InvestmentAccount,
} from './account';

class BankService {
	private bankAccounts: {
		[key: number]: Account;
	};
	constructor() {
		this.bankAccounts = [];
	}
	public createNewAccount(type: string, initAmt: number) {
		let newAccount: Account;
		switch (type) {
			case 'checking':
				newAccount = new CheckingAccount();
				break;
			case 'savings':
				newAccount = new SavingsAccount();
				break;
			case 'investment':
				newAccount = new InvestmentAccount();
				break;
			default:
				throw new Error(`Can't create account. Invalid type`);
		}
		const accountNumber = newAccount.getAccountNumber();
		this.bankAccounts[accountNumber] = newAccount;
		return `Created new ${type} account #${accountNumber}`;
	}
}

export { BankService };
