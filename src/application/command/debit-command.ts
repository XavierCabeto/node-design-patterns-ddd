import Command from "./command";

export default class DebitCommand implements Command {
  operation = "debit";

  constructor(readonly accountDocument: string, readonly amount: number) {
  }
}