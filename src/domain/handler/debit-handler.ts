import DebitCommand from "../../application/command/debit-command";
import Observer from "../../infra/queue/observer";
import AccountRepository from "../repository/AccountRepository";

export default class DebitHandler implements Observer {
  operation = "debit";

  constructor(readonly accountRepository: AccountRepository) {
  }

  notify(command: DebitCommand): void {
      const account = this.accountRepository.get(command.accountDocument);
      if (account) {
        account.debit(command.amount);
      }
  }
}