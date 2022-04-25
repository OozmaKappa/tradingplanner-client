import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApexOptions } from 'ng-apexcharts';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PortfolioService } from './portfolio.service';

@Component({
    selector: 'app-portfolio',
    templateUrl: './portfolio.component.html',
    styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

    data: any;
    portfolioBalanceOptions: ApexOptions;
    portfolioDataSource: MatTableDataSource<any> = new MatTableDataSource();
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(private _portfolioService: PortfolioService) { }

    ngOnInit(): void {
        this._portfolioService.data$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((data) => {
                console.log(data);

                // Store the data
                this.data = data;

                // Store the table data
                this.portfolioDataSource.data = data;

                // Prepare the chart data
                this._prepareChartData();
            });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Prepare the chart data from the data
     *
     * @private
     */
    private _prepareChartData(): void {
        // Account balance
        this.portfolioBalanceOptions = {
            chart: {
                animations: {
                    speed: 400,
                    animateGradually: {
                        enabled: false
                    }
                },
                fontFamily: 'inherit',
                foreColor: 'inherit',
                width: '100%',
                height: '100%',
                type: 'area',
                sparkline: {
                    enabled: true
                }
            },
            colors: ['#A3BFFA', '#667EEA'],
            fill: {
                colors: ['#CED9FB', '#AECDFD'],
                opacity: 0.5,
                type: 'solid'
            },
            series: this.data.series,
            stroke: {
                curve: 'straight',
                width: 2
            },
            tooltip: {
                followCursor: true,
                theme: 'dark',
                x: {
                    format: 'MMM dd, yyyy'
                },
                y: {
                    formatter: (value): string => value + '%'
                }
            },
            xaxis: {
                type: 'datetime'
            }
        };
    }
}
