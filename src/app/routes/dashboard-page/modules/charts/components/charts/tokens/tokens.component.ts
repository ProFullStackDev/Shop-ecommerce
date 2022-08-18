import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexGrid,
  ApexLegend,
  ApexPlotOptions,
  ApexStroke,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};

@Component({
  selector: 'app-tokens',
  templateUrl: './tokens.component.html',
  styleUrls: ['./tokens.component.scss']
})
export class TokensComponent implements OnInit {
  @Input() userPerformance: any;
  @Output() readonly setCurrentPerformance = new EventEmitter();
  array: any[] = [];
  today = new Date();
  series: ApexAxisChartSeries;
  chart: ApexChart = {
    type: 'bar',
    height: 300,
    toolbar: {
      show: false
    },
    events: {
      dataPointSelection: (event, chartContext, config) => {
        if (event.currentTarget.attributes[16].ownerElement.classList.contains('selected')) {
          event.currentTarget.attributes[16].ownerElement.classList.remove('selected');
          this.setCurrentPerformance.emit(null);
          return;
        }
        const currentVal = this.userPerformance.find((item: any) => item.id === config.dataPointIndex);
        this.setCurrentPerformance.emit(currentVal.performance);
        document.querySelector('.apexcharts-bar-area.selected')?.classList.remove('selected');
        event.currentTarget.attributes[16].ownerElement.classList.add('selected');
      }
    }
  };
  plotOptions: ApexPlotOptions = {
    bar: {
      horizontal: false,
      columnWidth: '80%'
    }
  };
  dataLabels: ApexDataLabels = {
    enabled: false
  };
  xaxis: ApexXAxis;
  yaxis: ApexYAxis = {
    show: false
  };
  grid: ApexGrid = {
    show: false
  };
  fill: ApexFill = {
    type: 'gradient',
    colors: ['#ffb209', '#ffe335'],
    gradient: {
      shade: 'light',
      type: 'vertical',
      shadeIntensity: 0.5,
      gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
      inverseColors: true,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [50, 100]
    }
  };

  ngOnInit(): void {
    if (!this.userPerformance || !this.userPerformance.days.length) {
      this.series = [];
      return;
    }
    this.series = [
      {
        name: 'Tokens',
        data: this.getPerformance()
      }
    ];
    this.xaxis = {
      categories: this.getDays()
    };
  }

  private getPerformance(): any {
    if (!this.userPerformance.days.length) {
      return [0];
    }

    return this.userPerformance.days.map((item: any) => {
      return item.value;
    });
  }

  private getDays(): any {
    if (!this.userPerformance.days.length) {
      const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ];
      const day = this.today.getDate();
      const month = monthNames[this.today.getMonth()];

      const str = `${day} ${month}`;
      return [str];
    }

    return this.userPerformance.days.map((item: any) => {
      return new Date(item.key).toDateString();
    });
  }
}
