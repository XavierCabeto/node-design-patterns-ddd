import AccountBuilder from "../../domain/builder/account-builder";
import AccountRepository from "../../domain/repository/AccountRepository";
import Publisher from "../../infra/queue/publisher";
import CreditCommand from "../command/credit-command";
import DebitCommand from "../command/debit-command";
import TransferCommand from "../command/transfer-command";

export default class AccountApplicationService {
  constructor(readonly publisher: Publisher, readonly accountRepository: AccountRepository) {
  }

  create(document: string) {
    const account = new AccountBuilder(document).build();
    this.accountRepository.save(account);
  }

  credit(accountDocument: string, amount: number) {
    const creditCommand = new CreditCommand(accountDocument, amount);
    this.publisher.publish(creditCommand);
  }

  debit(accountDocument: string, amount: number) {
    const debitCommand = new DebitCommand(accountDocument, amount);
    this.publisher.publish(debitCommand);
  }

  trasnfer(accountDocumentFrom: string, accountDocumentTo: string, amount: number) {
    const transferCommand = new TransferCommand(accountDocumentFrom, accountDocumentTo, amount);
    this.publisher.publish(transferCommand);
  }

  get(accountDocument: string) {
    return this.accountRepository.get(accountDocument);
  }
}