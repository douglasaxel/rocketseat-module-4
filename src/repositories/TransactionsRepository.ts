import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    let income = 0;
    let outcome = 0;
    let total = 0;

    this.transactions.forEach(v => {
      if (v.type === 'income') income += v.value;
      if (v.type === 'outcome') outcome += v.value;
    });

    total = income - outcome;

    const balance: Balance = {
      income,
      outcome,
      total,
    };

    return balance;
    // const income2 = this.transactions.reduce((prev, cur) => {
    //   if (cur.type === 'income') return cur.value + prev;
    //   return prev;
    // }, 0);
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
