import {Component, OnInit} from '@angular/core';
import { CompetenceService } from '../../shared/competence.service';
@Component({
  selector: 'app-tooltips-popovers',
  templateUrl: './tooltips-popovers.component.html',
})
export class TooltipsPopoversComponent implements OnInit {

  heading = 'Tooltips & Popovers';
  subheading = 'These Vue components are used to add interaction or extra information for your app\'s content.';
  icon = 'pe-7s-note2 icon-gradient bg-happy-fisher';

  constructor(public competence: CompetenceService) {
  }
  users = JSON.parse(localStorage.getItem('users')) ;
  payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
  changeValueID(event){
    console.log(this.payLoad);
    console.log(this.payLoad.role);
    console.log(this.payLoad.UserID);
}
    Id : string= this.competence.UserId;
    changeSelect(user,label,niveau){
      console.log("user :  ",user)
      console.log("label :  ",label)
      niveau = Number(niveau)
      console.log("niveau :  ",niveau)
  
      let level = user.Level.find(x=>x.labelId == label.labelId)
      let metierId = level? level.metierId : null
      console.log("metierId : ",metierId);
  
      this.competence.editLevel(metierId,niveau)
      .subscribe(res=>{
        console.log("res : ",res)
      })
      
  
    }
  ngOnInit() {
    console.log(this.payLoad.UserID);
   // this.competence.get(this.payLoad.UserID)
    //this.competence.getUser(this.payLoad.UserID);
   // this.competence.GetLabel(this.payLoad.UserID);
   // this.competence.GetDomaineUser(this.payLoad.UserID);
  //  this.competence.GetAllLabels();
   
  }
  getUserLabelSum(user,label){
    if (user.Level) {
      let res = user.Level.find(x=>x.labelId == label.labelId )
  
      return res? res.niveau : 0
    }else{
      return 0
    }
  }

  getItems( id) {
    return this.competence.LabeList.filter((item) =>
     item.domaineId === id);
  }
  isShow = false;



 
  toggleDisplay() {
    this.isShow = !this.isShow;
  }
  

}
