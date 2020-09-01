import {Component, OnInit} from '@angular/core';
import {ChartOptions, ChartType, ChartDataSets} from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import {Label} from 'ng2-charts';
import { HttpClient } from '@angular/common/http';
import { CompetenceService } from 'src/app/DemoPages/shared/competence.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
})
export class BarChartComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {xAxes: [{}], yAxes: [{}]},
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
   barChartLabels: any=[] //= ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];
  TauxEfficaciteAnnuelle:any=[];
  data:any=[]
  getTauxEfficaciteAnnuelle(){
   this.http.get('https://localhost:44385/api/BesoinFormation/TauxDeParticipation').toPromise().then(
     res=>{
       this.TauxEfficaciteAnnuelle = res as [];
       console.log(this.TauxEfficaciteAnnuelle);
    //  this.users = data.json();
    this.TauxEfficaciteAnnuelle.map(p =>{
      console.log(this.barChartLabels.indexOf(p));
      if(this.barChartLabels.indexOf(p.anne) == -1  ) 
      this.barChartLabels.push(String(p.anne));
      this.barChartLabels = Array.from(new Set(this.barChartLabels))
     this.data.push(p.taux);
   //  this.data= Array.from(new Set(this.data))
    }) 
     }
 
   )
 console.log(this.data)
 console.log(this.barChartLabels);
 }

  public barChartData: ChartDataSets[] = [
    {data: this.data, label: 'Taux éficacité'},
    //{data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];

  constructor(private http: HttpClient,public competence: CompetenceService) {
  }

  ngOnInit() {
    this. getTauxEfficaciteAnnuelle();
  }

  // events
  public chartClicked({event, active}: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({event, active}: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
    const data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    this.barChartData[0].data = data;
  }
}
