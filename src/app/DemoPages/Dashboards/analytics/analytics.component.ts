import { Component, OnInit, NgZone } from '@angular/core'
import { Color } from 'ng2-charts/ng2-charts'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'
import { HttpClient } from '@angular/common/http'
import { Formateur } from '../../Models/formateur.model'
import { CompetenceService } from '../../shared/competence.service'
import { FormationService } from '../../shared/formation.service'
am4core.useTheme(am4themes_animated)


@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
})
export class AnalyticsComponent implements OnInit {
  private chart: am4charts.XYChart
  data: Formateur[]

  constructor(private zone: NgZone, private http: HttpClient) {
    this.TauxForma()

  }
  top = []
  //Top 5 Formateures 
  getTopFormateures() {
    return this.http
      .get('https://localhost:44385/api/Formateur/top')
      .subscribe((data: any) => {
        console.log('TOP 5 FOrmateures ', data)

        let chart = am4core.create('line-chart', am4charts.XYChart)
        let title = chart.titles.create()
        title.text = 'Top 5 Formateures Selon leur Scores '
        chart.paddingRight = 20

        console.log(' ********* data: ', data)
        chart.data = data
        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis())
        categoryAxis.title.text = 'nom_Formateur'
        categoryAxis.dataFields.category = 'nom_Formateur'

        let valueAxisY = chart.yAxes.push(new am4charts.ValueAxis())
        valueAxisY.title.text = 'Score'
        valueAxisY.renderer.minWidth = 20

        let seriesNames = ['organisme_prestataire', 'period', 'score']
        for (let i = 0; i < 3; i++) {
          let series = chart.series.push(new am4charts.LineSeries())
          series.dataFields.categoryX = 'nom_Formateur'
          series.dataFields.valueY = seriesNames[i]
          series.name = seriesNames[i]

          let bullet = series.bullets.push(new am4charts.CircleBullet())
          bullet.circle.strokeWidth = 2
          bullet.circle.radius = 4
          bullet.tooltipText =
            'nom_Formateur {categoryX} \n Sales {valueY} {name} '
        }
        chart.legend = new am4charts.Legend()
        this.chart = chart
      })
  }
  //Taux de participation à la formation 
  Piechart() {
    // Create chart instance
    var chart2 = am4core.create('chartPie', am4charts.PieChart)
    let title = chart2.titles.create()
    title.text =
      'Taux De Participation à La Formation'
    chart2.paddingRight = 20
    // Add data
    chart2.data = [
      {
        formation: 'Java',
        pourcentage: 501.9
        //"color": am4core.color("#ED1C24")
      },
    ]

    // Add and configure Series
    var pieSeries = chart2.series.push(new am4charts.PieSeries())
    pieSeries.dataFields.value = 'pourcentage'
    pieSeries.dataFields.category = 'formation'
    pieSeries.slices.template.propertyFields.fill = 'color'

    chart2.legend = new am4charts.Legend()
  }

  Piechart2() {
    // Create chart instance
    this.http.get('https://localhost:44385/api/Formateur/top')
    .subscribe((res: any) => {
      console.log('TOP 5 organisme_prestataires ', res)

      let obj = {}
      res.map(x=>{
        if (!obj[x.organisme_prestataire.toLowerCase()]) {
          obj[x.organisme_prestataire.toLowerCase()] = x.score
        }else{
          obj[x.organisme_prestataire.toLowerCase()] = obj[x.organisme_prestataire.toLowerCase()].score + x.score
        }
      })

      let data = Object.entries(obj).map((e) => ({ organisme_prestataire : e[0],score: e[1] }));
    //  console.clear()
      console.log("data : ",data);
      

            
    var chart2 = am4core.create('chartPie2', am4charts.PieChart)
    let title = chart2.titles.create()
    title.text =
      'Taux De Participation à La Formation'
    chart2.paddingRight = 20
    // Add data
    chart2.data = data;

    // Add and configure Series
    var pieSeries = chart2.series.push(new am4charts.PieSeries())
    pieSeries.dataFields.value = 'score'
    pieSeries.dataFields.category = 'organisme_prestataire'
    pieSeries.slices.template.propertyFields.fill = 'color'

    chart2.legend = new am4charts.Legend()
  })
}
  // taux de formation réalisée par rapport planifié 
  PieChart3d() {
    this.http.get('https://localhost:44385/api/BesoinFormation/getCountBesoinFormations')
    .subscribe((res:any)=>{
      // let taux= (res.besoinCollecte*100)/res.BesoinFormation;
      let data = Object.entries(res).map((e) => ({ titre : [e[0]],valeur: e[1] }));
      console.log(data)


      var chart3 = am4core.create('chartdiv', am4charts.PieChart3D)
      let title = chart3.titles.create()
      title.text = 'Taux de Formations réalisees par rapport planifiée'
       chart3.paddingRight = 20
      chart3.paddingBottom=10
      chart3.marginBottom=10
      chart3.hiddenState.properties.opacity = 0 // this creates initial fade-in
  
      chart3.data = data
  
      chart3.innerRadius = am4core.percent(40)
      chart3.depth = 120
  
      chart3.legend = new am4charts.Legend()
      chart3.legend.position = 'right'
  
      var series = chart3.series.push(new am4charts.PieSeries3D())
      series.dataFields.value = 'valeur'
      series.dataFields.depthValue = 'valeur'
      series.dataFields.category = 'titre'
      series.slices.template.cornerRadius = 5
      series.colors.step = 3
    })
    

  }
  TopOrganizmePrestataire(){

  }
 
 array:any[];
  TauxForma(){
    this.http.get('https://localhost:44385/api/Participant/taux_Participants')
    .subscribe((res:any)=>{
      
      let obj = {}
      res.map(x=>{
        if (!obj[x.idFormation]) {
          obj[x.idFormation] = { sum : 1 , titre : x.titre , nombreParticipant : Number(x.nombreParticipant)}
        }else{
          obj[x.idFormation].sum = obj[x.idFormation].sum + 1
        }
      })
      let occurence = Object.values(obj)
      occurence.map((x : any)=>{
        x.taux = ((x.sum * 100) / x.nombreParticipant).toFixed(2)
      })
      
      let lineChartData = occurence.map((x:any)=>({titre : x.titre, value : x.taux}))

      this.lineGraphChart(lineChartData)

      console.log("obj : ",occurence)
      console.log("res taux",res )


    })
  }

  lineGraphChart(chartData){
    let chart = am4core.create("eventsLineGraphChart", am4charts.XYChart);
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "titre";
    categoryAxis.title.text = "value";

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = "Nombre des personnes";

    // Create series
    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "value";
    series.dataFields.categoryX = "titre";
    series.name = "";
    series.columns.template.tooltipText = "Series: {name}\nTitre: {categoryX}\nTaux: {valueY}";
    // series.columns.template.fill = am4core.color("#46d0d5");
    chart.exporting.menu = new am4core.ExportMenu();
    chart.data = chartData
  }

  ngOnInit() {
    this.getTopFormateures()
    this.Piechart()
    this.Piechart2()
    this.PieChart3d()
    console.log(this.array)
  }
}