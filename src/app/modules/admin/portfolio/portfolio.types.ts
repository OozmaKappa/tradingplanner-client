export enum ETransactionType {
    DEPOSIT = 'deposit',
    WITHDRAW = 'withdraw',
    PROFIT = 'profit',
    LOSS = 'loss'
}

export interface ITransaction {
    transactionType: ETransactionType;
    amount: number;
    date: Date;
}

export interface IPortfolio {
    user: string;
    amount: number;
    createdAt: Date;
    updatedAt: Date;
    transactions: ITransaction[];
}