import AccountApplicationService from "../src/application/service/account-application-service";
import CreditHandler from "../src/domain/handler/credit-handler";
import DebitHandler from "../src/domain/handler/debit-handler";
import TransferHandler from "../src/domain/handler/transfer-handler";
import Publisher from "../src/infra/queue/publisher";
import AccountRepositoryMemory from "../src/infra/repository/account-repository-memory";

let service: AccountApplicationService;

beforeEach(function () {
  const publisher = new Publisher();
  const accountRepositoryMemory = new AccountRepositoryMemory();
  publisher.register(new CreditHandler(accountRepositoryMemory))
  publisher.register(new DebitHandler(accountRepositoryMemory))
  publisher.register(new TransferHandler(accountRepositoryMemory))
  service = new AccountApplicationService(publisher, accountRepositoryMemory);
});

test("Should be to create an account", function () {
  service.create("111.111.111-11");
  const account = service.get("111.111.111-11");
  expect(account.getBalance()).toBe(0);
});

test("Should be to create an account and make a credit", function () {
  service.create("111.111.111-11");
  service.credit("111.111.111-11", 1000);
  const account = service.get("111.111.111-11");
  expect(account.getBalance()).toBe(1000);
});

test("Should be to create an account and make a debit", function () {
  service.create("111.111.111-11");
  service.credit("111.111.111-11", 1000);
  service.debit("111.111.111-11", 500);
  const account = service.get("111.111.111-11");
  expect(account.getBalance()).toBe(500);
});

test("Should be to create two accounts and make a transfer", function () {
  service.create("111.111.111-11");
  service.credit("111.111.111-11", 1000);
  service.create("222.222.222-22");
  service.credit("222.222.222-22", 1000);
  service.trasnfer("111.111.111-11", "222.222.222-22", 700);
  const accountFrom = service.get("111.111.111-11");
  const accountTo = service.get("222.222.222-22");
  expect(accountFrom.getBalance()).toBe(300);
  expect(accountTo.getBalance()).toBe(1700);
});
