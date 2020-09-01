import {Component, OnInit} from '@angular/core';
import {NgbPanelChangeEvent} from '@ng-bootstrap/ng-bootstrap';
import { EvaluationService } from '../../shared/evaluation.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl } from '@angular/forms';
import { NotificationService } from '../../shared/Notification.service';
import { FormationService } from '../../shared/formation.service';
import { HttpClient } from '@angular/common/http';
import { Users } from '../../Models/users.model';

@Component({
  selector: 'app-accordions',
  templateUrl: './accordions.component.html',
})
export class AccordionsComponent implements OnInit {

  heading = 'Accordions';
  subheading = 'Accordions represent collapsable component with extended functionality.';
  icon = 'pe-7s-diamond icon-gradient bg-warm-flame';

  public isCollapsed = false;
  SelectedNumber: any = [];
  SelectedNumberValue: any = [];
  public beforeChange($event: NgbPanelChangeEvent) {

    if ($event.panelId === 'preventchange-2') {
      $event.preventDefault();
    }

    if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
      $event.preventDefault();
    }
  };

  constructor(public notification: NotificationService, public evaluation: EvaluationService ,private http: HttpClient, private toastr: ToastrService, public formation: FormationService) {
  }

  ngOnInit() {
    this.evaluation.EvaluationChaud.reset();
    this.notification.getAllUsersTrue();
   // this.notification.getAllUsersTrue();
    this.formation.GetAllBesoinCollecte();
  }

  variable:string
  SelectUser(event){
    console.log(event.target.value);
    this.variable=event.target.value;
    console.log(this.evaluation.EvaluationChaud.value.Nom_Participant);
  }




  
  NumberChange(event) {
    let index = this.SelectedNumber.indexOf(event.target.value);
    console.log(index);
    if (index == -1) {
      this.SelectedNumber.push(event.target.value);
    } else {
      this.SelectedNumber.splice(index, 1);
    }
    console.log(this.SelectedNumber);
  }
  NumberChangeValue(event) {
    let index = this.SelectedNumberValue.indexOf(event.target.value);
    console.log(index);
    if (index == -1) {
      this.SelectedNumberValue.push(event.target.value);
    } else {
      this.SelectedNumberValue.splice(index, 1);
    }
    console.log(this.SelectedNumberValue);
  }
  private res:any=0;
  private result:any=0;
 
  CalculerTotaleEvaluation(){
    for(var i in this.SelectedNumber){
      console.log(this.SelectedNumber[i]);
      if(this.SelectedNumber[i]== "num1" || this.SelectedNumber[i]== "num9"  || this.SelectedNumber[i]== "num13" || this.SelectedNumber[i]== "num33" 
      || this.SelectedNumber[i]== "num17"  || this.SelectedNumber[i]== "num5"  || this.SelectedNumber[i]== "num21" || this.SelectedNumber[i]== "num25" 
      || this.SelectedNumber[i]== "num29" ){
        this.res=this.res + 1 
       // this.SelectedValue.splice(i, 1)
      }else if( this.SelectedNumber[i]== "num2" || this.SelectedNumber[i]== "num6"  || this.SelectedNumber[i]== "num10" || this.SelectedNumber[i]== "num14" 
      || this.SelectedNumber[i]== "num18"  || this.SelectedNumber[i]== "num22"  || this.SelectedNumber[i]== "num26" || this.SelectedNumber[i]== "num30" 
      || this.SelectedNumber[i]== "num34" ){ 
        this.res=this.res + 2
        //this.SelectedValue.splice(i, 1)
      }
      else if( this.SelectedNumber[i]== "num3" || this.SelectedNumber[i]== "num7"  || this.SelectedNumber[i]== "num11" || this.SelectedNumber[i]== "num15" 
      || this.SelectedNumber[i]== "num19"  || this.SelectedNumber[i]== "num23"  || this.SelectedNumber[i]== "num27" || this.SelectedNumber[i]== "num31" 
      || this.SelectedNumber[i]== "num35" ){ 
        this.res=this.res + 3
      }else if( this.SelectedNumber[i]== "num4" || this.SelectedNumber[i]== "num8"  || this.SelectedNumber[i]== "num12" || this.SelectedNumber[i]== "num16" 
      || this.SelectedNumber[i]== "num20"  || this.SelectedNumber[i]== "num24"  || this.SelectedNumber[i]== "num28" || this.SelectedNumber[i]== "num32" 
      || this.SelectedNumber[i]== "num36" ){
        this.res=this.res + 4
       
      }
    }
    console.log(this.res)
    this.evaluation.envoyer(this.res)
    console.log(this.evaluation.resultat);
    return(this.evaluation.resultat);
  }


  CalculerTotaleEvaluations(){
    for(var i in this.SelectedNumberValue){
      console.log(this.SelectedNumberValue[i]);
      if(this.SelectedNumberValue[i]== "num37" || this.SelectedNumberValue[i]== "num41"  || this.SelectedNumberValue[i]== "num45" || this.SelectedNumberValue[i]== "num49" 
      || this.SelectedNumberValue[i]== "num53"  || this.SelectedNumberValue[i]== "num57"  || this.SelectedNumberValue[i]== "num61" || this.SelectedNumberValue[i]== "num65" 
      || this.SelectedNumberValue[i]== "num69" ){
        this.result=this.result + 1 
       
      }else if( this.SelectedNumberValue[i]== "num38" || this.SelectedNumberValue[i]== "num42"  || this.SelectedNumberValue[i]== "num46" || this.SelectedNumberValue[i]== "num50" 
      || this.SelectedNumberValue[i]== "num54"  || this.SelectedNumberValue[i]== "num58"  || this.SelectedNumberValue[i]== "num62" || this.SelectedNumberValue[i]== "num66" 
      || this.SelectedNumberValue[i]== "num70" ){ 
        this.result=this.result + 2
       
      }
      else if( this.SelectedNumberValue[i]== "num39" || this.SelectedNumberValue[i]== "num43"  || this.SelectedNumberValue[i]== "num47" || this.SelectedNumberValue[i]== "num51" 
      || this.SelectedNumberValue[i]== "num55"  || this.SelectedNumberValue[i]== "num59"  || this.SelectedNumberValue[i]== "num63" || this.SelectedNumberValue[i]== "num67" 
      || this.SelectedNumberValue[i]== "num71" ){ 
        this.result=this.result + 3
      }
      else if( this.SelectedNumberValue[i]== "num40" || this.SelectedNumberValue[i]== "num44"  || this.SelectedNumberValue[i]== "num48" || this.SelectedNumberValue[i]== "num52" 
      || this.SelectedNumberValue[i]== "num56"  || this.SelectedNumberValue[i]== "num60"  || this.SelectedNumberValue[i]== "num64" || this.SelectedNumberValue[i]== "num68" 
      || this.SelectedNumberValue[i]== "num72" ){
        this.result=this.result + 4
       
      }
    }
    console.log(this.result)
    this.evaluation.envoyers(this.result)
    console.log(this.evaluation.resultats);
    return(this.evaluation.resultats);
  }
  nameusers:any=[]
  participant:any = [];
  getUserParticipant(UserId){
       this.http.get('https://localhost:44385/api/ApplicationUser/AllUsersTrue').subscribe(
        res=>{
          console.log(res);
          this.participant = res as Users;
         console.log("before", this.participant.userName)
         this.participant.map(p=>{
          if(this.nameusers.indexOf(p.Id) ==-1  && p.Id==UserId ) 

           this.nameusers.push(p.userName);
         })}
       )

      }
  usersTrue:Users
  SubmutEvaluationChaud(){
  
    this.CalculerTotaleEvaluations(); 
  
    this.CalculerTotaleEvaluation(); 
    this.getUserParticipant(this.variable);
    this.SelectedNumberValue=[] ;
    this.SelectedNumber=[];
    this.res=0;
    this.result=0;
    
    console.log(this.SelectedNumber);
    console.log(this.SelectedNumberValue);
    console.log(this.evaluation.resultats);
    console.log(this.evaluation.resultat);
   // console.log(this.evaluation.participant);
    this.evaluation.registerEvaluationChaud(this.variable,this.nameusers[0])
    .subscribe(
      (res: any) => {
        if (res.succeeded) {
        this.toastr.success('New user created!','Registration successful.');
        } 
     },
     
  );
    this.evaluation.EvaluationChaud.reset();
  }
}
