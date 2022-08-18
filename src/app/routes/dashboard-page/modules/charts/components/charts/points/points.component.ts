import { Component, Input, OnInit } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexGrid,
  ApexYAxis,
  ApexFill,
  ApexTooltip
} from 'ng-apexcharts';

@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.scss']
})
export class PointsComponent implements OnInit {
  @Input() userPoints: any;
  today = new Date().getTime();
  series: ApexAxisChartSeries;

  chart: ApexChart = {
    height: 260,
    type: 'area',
    toolbar: {
      show: false
    },
    zoom: {
      enabled: false
    }
  };
  dataLabels: ApexDataLabels = {
    enabled: false
  };
  stroke: ApexStroke = {
    curve: 'smooth',
    colors: ['#0bbf64']
  };
  grid: ApexGrid = {
    show: false
  };
  xaxis: ApexXAxis = {
    type: 'datetime',
    labels: {
      rotate: 0
    }
  };
  yaxis: ApexYAxis = {
    show: false
  };
  fill: ApexFill = {
    type: 'gradient',
    colors: ['#0bbf64'],
    gradient: {
      shade: 'light',
      opacityFrom: 0.5,
      opacityTo: 0.1
    }
  };

  ngOnInit() {
    this.series = [
      {
        name: 'Balance',
        data: this.getSeries()
      }
    ];
  }

  private getSeries(): any {
    if (!this.userPoints.length) {
      return [
        {
          y: 0,
          x: this.today
        }
      ];
    }

    return this.userPoints.map((item: any) => {
      return {
        y: item.consumptionBalance,
        x: item.createDate
      };
    });
  }
}
