export enum ETransactionType {
    DEPOSIT = 'deposit',
    WITHDRAW = 'withdraw',
    PROFIT = 'profit',
    LOSS = 'loss'
}

export interface ITransaction {
    portfolioAmount: number;
    transactionType: ETransactionType;
    amount: number;
    date: Date;
}

export interface IPortfolio {
    _id?: string;
    user: string;
    amount: number;
    createdAt: Date;
    updatedAt: Date;
    transactions: ITransaction[];
}