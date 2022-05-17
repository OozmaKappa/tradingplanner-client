import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { PortfolioService } from '../portfolio.service';
import { ETransactionType, IPortfolio, ITransaction } from '../portfolio.types';
type TransactionTypeStrings = keyof typeof ETransactionType;
@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss']
})
export class PortfolioDetailsComponent implements OnInit {
    portfolio: IPortfolio;
    transactionForm: FormGroup = this._formBuilder.group({
        amount: ['', [Validators.required]],
        type: ['deposit', [Validators.required]],
        date: [new Date()]
    });

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { portfolio: IPortfolio },
        private _changeDetectorRef: ChangeDetectorRef,
        private _portfolioService: PortfolioService,
        private _matDialogRef: MatDialogRef<PortfolioDetailsComponent>,
        private _formBuilder: FormBuilder,
    ) { }

    ngOnInit(): void {
        this.portfolio = this.data?.portfolio;

        this.transactionForm.get('date')?.setValue(new Date())

        this._changeDetectorRef.markForCheck();

        // this._portfolioService.portfolioData$.pipe(first())
        //     .subscribe(portfolio => { this.portfolio = portfolio })
    }

    onSubmit(type: TransactionTypeStrings): void {
        const newTransaction: ITransaction = {
            amount: this.transactionForm.value.amount,
            transactionType: ETransactionType[type],
            date: this.transactionForm.value.date,
            portfolioAmount: 0,
        };

        console.log(`Submit transaction with form values: ${JSON.stringify(newTransaction)}`);
        let portfolioObservable;
        if (this.portfolio?._id) {
            portfolioObservable = this._portfolioService.createTransaction(this.portfolio._id, newTransaction);
        } else {
            portfolioObservable = this._portfolioService.createPortfolio(newTransaction);
        }
        portfolioObservable.subscribe((res) => {
            console.log(res);
            this.portfolio = res;
        });
    }

    onNoClick(): void {
        this._matDialogRef.close();
    }

    isProfitable(transaction) {
        return transaction.transactionType === ETransactionType.DEPOSIT || transaction.transactionType === ETransactionType.PROFIT;
    }
}
