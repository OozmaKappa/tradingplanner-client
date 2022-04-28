import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { PortfolioService } from '../portfolio.service';
import { ETransactionType, IPortfolio } from '../portfolio.types';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss']
})
export class PortfolioDetailsComponent implements OnInit {
    portfolio: IPortfolio;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { portfolio: IPortfolio },
        private _portfolioService: PortfolioService,
        private _matDialogRef: MatDialogRef<PortfolioDetailsComponent>
    ) { }

    ngOnInit(): void {
        this.portfolio = this.data.portfolio;
        // this._portfolioService.portfolioData$.pipe(first())
        //     .subscribe(portfolio => { this.portfolio = portfolio })
    }

    onNoClick(): void {
        this._matDialogRef.close();
    }

    isProfitable(transaction) {
        return transaction.transactionType === ETransactionType.DEPOSIT || transaction.transactionType === ETransactionType.PROFIT;
    }
}
