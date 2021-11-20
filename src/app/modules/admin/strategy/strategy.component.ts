import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ApexOptions } from 'ng-apexcharts';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/operators';
import { StrategyDetailsComponent } from './details/details.component';
import { StrategyService } from './strategy.service';
import { IStrategy } from './strategy.types';

@Component({
  selector: 'app-strategy',
  templateUrl: './strategy.component.html',
})
export class StrategyComponent implements OnInit, OnDestroy {
  chartImpressions: ApexOptions;
  strategies$: Observable<IStrategy[]>;
  selected = new FormControl(0);
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _matDialog: MatDialog,
    private _strategyService: StrategyService
  ) {
  }

  ngOnInit(): void {
    // Request the data from the server
    this._strategyService.getStrategies().subscribe();
    this.strategies$ = this._strategyService.strategies$;
    this._strategyService.strategies$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((strategies) => {
        // Prepare the chart data
        this._prepareChartData1();
        // this._prepareChartData();
        console.log(strategies);
      });
    this._strategyService.strategies$.forEach((strategy) => {
      console.log(strategy);
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
  /**
   * Open the new strategy dialog
   */
  openNewStrategyDialog(): void {
    this._matDialog.open(StrategyDetailsComponent, {
      autoFocus: false
    });
  }

  calculateAmountOfPercent(base: number, percent: number): number{
    return Math.round((base * percent) / 100);
  }

  private _prepareChartData1(): void {
    this.chartImpressions = {
      chart: {
        animations: {
          enabled: true
        },
        fontFamily: 'inherit',
        foreColor: 'inherit',
        height: '100%',
        type: 'area',
        sparkline: {
          enabled: true
        }
      },
      colors: ['#34D399'],
      fill: {
        colors: ['#34D399'],
        opacity: 0.5
      },
      series: [
        {
          name: 'Impressions',
          data: [11577, 11441, 11544, 11523]
        }
      ],
      stroke: {
        curve: 'smooth'
      },
      tooltip: {
        followCursor: true,
        theme: 'dark'
      },
      xaxis: {
        type: 'category',
        categories: []
      },
      yaxis: {
        labels: {
          formatter: (val): string => val.toString()
        }
      }
    };
  }
}
