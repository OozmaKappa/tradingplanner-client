import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApexOptions } from 'ng-apexcharts';
import { StrategyDetailsComponent } from './details/details.component';

@Component({
  selector: 'app-strategy',
  templateUrl: './strategy.component.html',
})
export class StrategyComponent implements OnInit {
  chartImpressions: ApexOptions;

  constructor(
    private _matDialog: MatDialog
    ) {
  }

  ngOnInit(): void {
    this. _prepareChartData1();
  }

  /**
   * Open the new strategy dialog
   */
   openNewStrategyDialog(): void
   {
       this._matDialog.open(StrategyDetailsComponent, {
           autoFocus: false
       });
       // this._matDialog.afterAllClosed.subscribe(()=>{
       //     console.log('Get trades after close dialog');
       //     this._tradeService.getTrades();
       // });
   }

  private _prepareChartData1(): void{
    this.chartImpressions = {
        chart  : {
            animations: {
                enabled: false
            },
            fontFamily: 'inherit',
            foreColor : 'inherit',
            height    : '100%',
            type      : 'area',
            sparkline : {
                enabled: true
            }
        },
        colors : ['#34D399'],
        fill   : {
            colors : ['#34D399'],
            opacity: 0.5
        },
        series : [
          {
              name: 'Impressions',
              data: [11577, 11441, 11544, 11523]
          }
      ],
        stroke : {
            curve: 'smooth'
        },
        tooltip: {
            followCursor: true,
            theme       : 'dark'
        },
        xaxis  : {
            type      : 'category',
            categories: []
        },
        yaxis  : {
            labels: {
                formatter: (val): string => val.toString()
            }
        }
    };
}
}
