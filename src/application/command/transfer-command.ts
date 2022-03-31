import Command from "./command";

export default class TransferCommand implements Command {
  operation = "transfer";

  constructor(readonly accountDocumentFrom: string, readonly accountDocumentTo: string, readonly amount: number) {
  }
}