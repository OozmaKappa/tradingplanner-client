import { Component, OnInit } from '@angular/core';
import { ApexOptions } from 'ng-apexcharts';

@Component({
  selector: 'app-strategy',
  templateUrl: './strategy.component.html',
})
export class StrategyComponent implements OnInit {
  chartImpressions: ApexOptions;

  constructor() { }

  ngOnInit(): void {
    this. _prepareChartData1();
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
