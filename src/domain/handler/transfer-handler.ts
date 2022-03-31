import TransferCommand from "../../application/command/transfer-command";
import Observer from "../../infra/queue/observer";
import AccountRepository from "../repository/AccountRepository";
import TransferService from "../service/transfer-service";

export default class TransferHandler implements Observer {
  operation = "transfer";

  constructor(readonly accountRepository: AccountRepository) {
  }

  notify(command: TransferCommand): void {
      const accountFrom = this.accountRepository.get(command.accountDocumentFrom);
      const accountTo = this.accountRepository.get(command.accountDocumentTo);
      if (accountFrom && accountTo) {
        const transferService = new TransferService();
        transferService.transfer(accountFrom, accountTo, command.amount);
      }
  }
}