import {Component, OnInit} from '@angular/core';
import { CompetenceService } from '../../shared/competence.service';
import { AngularFontAwesomeComponent } from 'angular-font-awesome';


@Component({
  selector: 'app-regular',
  templateUrl: './regular.component.html',
  //templateUrl: 
  styles: []
})
export class RegularComponent implements OnInit {

  heading = 'Regular Tables';
  subheading = 'Tables are the backbone of almost all web applications.';
  icon = 'pe-7s-drawer icon-gradient bg-happy-itmeo';

  constructor(public competence: CompetenceService) {
  }

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
    console.clear()
    // this.competence.getAllUsersTrue();
    this.competence.GetAllLabels();
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
