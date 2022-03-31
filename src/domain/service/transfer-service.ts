import Account from "../entity/account";

export default class TransferService {
  transfer(from: Account, to: Account, amount: number) {
    from.debit(amount);
    to.credit(amount);
  }
}