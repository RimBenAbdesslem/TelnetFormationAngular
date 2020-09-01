import {Component, OnInit, Pipe, HostBinding} from '@angular/core';
import { CompetenceService } from '../../shared/competence.service';
import { element } from '@angular/core/src/render3';
@Component({
  selector: 'app-tooltips-popovers',
  templateUrl: './tooltips-popovers.component.html',
})
@Pipe({
  name: 'filterBy',
  pure: false
})

export class TooltipsPopoversComponent implements OnInit {

  heading = 'Tooltips & Popovers';
  subheading = 'These Vue components are used to add interaction or extra information for your app\'s content.';
  icon = 'pe-7s-note2 icon-gradient bg-happy-fisher';

  constructor(public competence: CompetenceService) {
  }
  @HostBinding('class.isActive')
  get isActiveAsGetter() {
    return this.isActive;
  }
  public isActive: any;
  userFilter: any = { userName: '' };
  get isActiveAsGetter1() {
    return this.isActive1;
  }
  
  public isActive1: any;
  stringsFilter = '';

  ActiviteFilter: any = { nomActivite: '' };
  objectsFilter = { userName: 'value',fullName:''};
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
    changeSelectActivite(user,label,niveau){
      console.log("user :  ",user)
      console.log("label :  ",label)
      niveau = Number(niveau)
      console.log("niveau :  ",niveau)
  
      let level = user.Level.find(x=>x.labelId == label.labelId)
      let activMetId = level? level.activMetId : null
      console.log("metierId : ",activMetId);
  
      this.competence.editLevelActivite(activMetId,niveau)
      .subscribe(res=>{
        console.log("res : ",res)
      })
      
  
    }
  ngOnInit() {
    this.competence.getAllActivite();
    this.competence.getActiviteAllUsersTrue();
   // this.competence.tLabelActivite()
    this.competence.GetAllActiviteMetier() ;
    this.competence.GetAllListeActivite();
    this.competence.GetAllLabelsActivite();
    console.log(this.payLoad.UserID);
   // this.competence.get(this.payLoad.UserID)
    //this.competence.getUser(this.payLoad.UserID);
   // this.competence.GetLabel(this.payLoad.UserID);
   // this.competence.GetDomaineUser(this.payLoad.UserID);
  //  this.competence.GetAllLabels();
   
  }

labName:any=[]
  getLabel(activite){
   // console.log('avec domaine',domaine.activiteId);
  //  console.log('avec label',label.activiteId);
  this.competence.AllListeActivite.map(p =>{
    console.log(this.competence.AllListeActivite.indexOf(p));
    if(this.labName.indexOf(p.nomDomaine) ==-1 && p.activiteId==activite.id ) 
    this.labName.push(p.nomDomaine);
  
  })
  return this.labName
}

getUserLabelSumActivite(user,domaine,activite){
//  console.log(user.id);
  for(var i in this.competence.AllActiviteMetier){
  
  if(this.competence.AllActiviteMetier[i].activiteId==activite.id && this.competence.AllActiviteMetier[i].domaineId== domaine.domaineId && this.competence.AllActiviteMetier[i].userId==user.id){
 // console.log(this.competence.AllActiviteMetier[i].niveau)
      if (user.Level){
        let res = user.Level.find(x=>x.labelId == domaine.labelId )
  //  console.log(res);
        return res? res.niveau : 0
      }else{
        return 0
      }
   
   
  }
   
  }
  
}
  getUserLabelSum(user,label){
   // console.log('label Id',label);
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
  getItemsActivite( id) {
    return this.competence.LabeListActivite.filter((item) =>
     item.domaineId === id);
  }
  isShow = false;



 
  toggleDisplay() {
    this.isShow = !this.isShow;
  }
  

}
