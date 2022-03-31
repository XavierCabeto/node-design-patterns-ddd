import CreditCommand from "../../application/command/credit-command";
import Observer from "../../infra/queue/observer";
import AccountRepository from "../repository/AccountRepository";

export default class CreditHandler implements Observer {
  operation = "credit";

  constructor(readonly accountRepository: AccountRepository) {
  }

  notify(command: CreditCommand): void {
      const account = this.accountRepository.get(command.accountDocument);
      if (account) {
        account.credit(command.amount);
      }
  }
}