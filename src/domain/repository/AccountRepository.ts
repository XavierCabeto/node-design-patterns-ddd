import Account from "../entity/account";

export default interface AccountRepository {
  save(account: Account): void;
  get(accountDocument: string): Account;
}