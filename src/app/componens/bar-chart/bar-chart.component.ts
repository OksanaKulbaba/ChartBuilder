import {Component, Input, OnInit} from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  @Input() date: any;

  barChartOptions: ChartOptions = {
    responsive: true,
  };

  barChartLabels: Label[] = [];

  barChartType: ChartType = 'bar';

  barChartLegend = true;

  barChartPlugins = [];

  barChartData: ChartDataSets[] = [];

  constructor() {

  }

  ngOnInit(): void {

    this.barChartLabels = this.getUniqueLabel();

    this.barChartData.push({
      data: this.getCountDate(this.barChartLabels),
      label: this.date[0]
    });
  }

  getUniqueLabel(): string[]{
   return this.date[1].filter((v, i, a) => a.indexOf(v) === i);
  }

  getCountDate(labels): number[]{

    const numberDate: number[] = [];

    for (const label of labels ){
      let count = 0;
      this.date[1].map(date => {
        if (date === label) { count++; }
      });
      numberDate.push(count);
    }
    return numberDate;
  }

}
