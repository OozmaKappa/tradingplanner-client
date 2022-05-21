export enum ETradeType {
    STK = 'STK',
    OPT = 'OPT',
    CASH = 'CASH',
}

export enum ETradeSide {
    SELL = 'SELL',
    BUY = 'BUY',
}

export enum EOptionType {
    P = 'PUT',
    C = 'CALL',
}

export enum EOrderType {
    MKT = 'MKT',
    LMT = 'LMT',
    STP = 'STP',
    STP_LIMIT = 'STP_LIMIT',
}

export enum ETradeStatus {
    open = 'open',
    running = 'running',
    waiting = 'waiting',
    closed = 'closed',
}

export interface ITrade {
    _id?: string;
    tradeId?: string;
    contractId?: number;
    ticker?: string;
    strike?: number;
    price?: number;
    type?: ETradeType;
    amount?: number;
    side?: ETradeSide;
    status?: ETradeStatus;
    createdAt?: Date;
    updatedAt?: Date;
    openedAt?: Date;
    closedAt?: Date;
    cost?: number;
    optType?: EOptionType;
    orderType?: EOrderType;
    expiresAt?: Date;
    pnl?: number;
    comment?: string;
    closing?: string[];
    closedBy?: ITrade[];
    strategy?: string | any;
}
