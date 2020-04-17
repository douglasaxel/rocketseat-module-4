import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (req, res) => {
  try {
    const obj = {
      transactions: transactionsRepository.all(),
      balance: transactionsRepository.getBalance(),
    };

    return res.json(obj);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (req, res) => {
  try {
    const { title, value, type } = req.body;
    const balance = transactionsRepository.getBalance();

    if (type === 'outcome' && value > balance.total)
      throw Error('Saldo insuficiente');

    const objService = new CreateTransactionService(transactionsRepository);
    const transaction = objService.execute({ title, value, type });

    return res.json(transaction);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
