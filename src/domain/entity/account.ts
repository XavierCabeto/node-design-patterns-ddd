import AccountBuilder from "../builder/account-builder";
import Transaction from "./transaction";

export default class Account {
  private bank: string | undefined;
  private branch: string | undefined;
  private account: string | undefined;
  document: string;
  private transaction: Transaction[];
  
  constructor (accountBuilder: AccountBuilder) {
    this.bank = accountBuilder.bank;
    this.branch = accountBuilder.branch;
    this.account = accountBuilder.account;
    this.document = accountBuilder.document;
    this.transaction = [];
  }

  credit(amount: number) {
    this.transaction.push(new Transaction("credit", amount));
  }

  debit(amount: number) {
    this.transaction.push(new Transaction("debit", amount));
  }

  getBalance() {
    let balance = 0;
    for (const transaction of this.transaction) {
      if (transaction.type === "credit") {
        balance += transaction.amount;
      }
      if (transaction.type === "debit") {
        balance -= transaction.amount;
      }
    }
    return balance;
  }
}