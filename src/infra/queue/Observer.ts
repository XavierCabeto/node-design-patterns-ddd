import Command from "../../application/command/command";

export default interface Observer {
  operation: string;
  notify(command: Command): void;
}