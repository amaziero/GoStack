import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import TransactionRepository from '../repositories/TransactionsRepository';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    const transactionRepository = getCustomRepository(TransactionRepository);

    const transactioToDelete = await transactionRepository.findOne(id);

    if (!transactioToDelete) {
      throw new AppError('Transactio id does not exist');
    }

    await transactionRepository.remove(transactioToDelete);
  }
}

export default DeleteTransactionService;
