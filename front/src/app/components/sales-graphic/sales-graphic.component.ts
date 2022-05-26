import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sales-graphic',
  templateUrl: './sales-graphic.component.html',
  styleUrls: ['./sales-graphic.component.css']
})
export class SalesGraphicComponent implements OnInit {

  chartData: any = {
    datasets: [
      {
        data: [20, 35, 95, 10, 5]
      }
    ]
  }
  chartOptions: any = {
    responsive: true,
    type: 'pie',
    maintainAspectRatio: false,
    scales : {
      yAxes: [{
        ticks: {
          beginZero: true,
          // userCallback: function(label, index, labels) {
          //   if (Math.floor(label) === label) return label;
          // }
        }
      }],
      xAxes: [{}],
    },
    hover: {
      mode: 'nearest',
      intersect: true,
    },
    tooltips: {
      enable: true,
      mode: 'nearest',
      intersect: true,
      titleFontColor: '#000',
      bodyFontColor: '#000',
      backgroundColor: '#ddd',
      callbacks: {
        // title: function(tooltipItems, data) {
        //   const text = `${tooltipItems[0].xLabel}`;
        //   return text;
        // },
        // label: function (tooltipItem, data) {
        //   const datasetIndex = tooltipItem.datasetIndex;
        //   const dataSetSelected = data.datasets[datasetIndex];
        //   const text = `${dataSetSelected.label}: ${tooltipItem.value}`;
        //   return text;
        // },
        // labelColor: function (tooltipItem, chart) {
        //   let dataset = chart.config.data.datasets[tooltipItem.datasetIndex];
        //   return {
        //     borderColor: '#ddd',
        //     backgroundColor: dataset.borderColor
        //   }
        // }
      }
    },
  }

  constructor() { }

  ngOnInit(): void {
  }

}
