import Command from "./command";

export default class CreditCommand implements Command {
  operation = "credit";

  constructor(readonly accountDocument: string, readonly amount: number) {
  }
}