export interface IStrategy {
    _id?: string;
    name: string;
    seed?: number;
    maxLoss?: number;
    maxTradeLoss?: number;
    ticker?: string;
    createdAt?: Date;
    updatedAt?: Date;
    comment?: string;
}
