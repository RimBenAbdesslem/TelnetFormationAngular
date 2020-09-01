import {Component, OnInit, HostBinding} from '@angular/core';
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
  @HostBinding('class.isActive')
  get isActiveAsGetter() {
    return this.isActive;
  }
  public isActive: any;
  userFilter: any = { userName: '' ,fullName:''};
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
    this.competence.getAllActivite();
    this.competence.getActiviteAllUsersTrue();
   // this.competence.tLabelActivite()
    this.competence.GetAllActiviteMetier() ;
    this.competence.GetAllListeActivite();
    this.competence.GetAllLabelsActivite();
  }
  item: any={name: "", componentid: 0};
  tabLabActivite:any=[]
  addComp(c){
    this.competence.AllListeActivite.map(p=>{
    //  console.log(this.tabLabActivite.indexOf(p));
      if(this.tabLabActivite.indexOf(p.domaineId==-1) ) 
      this.tabLabActivite.push(p)
    
     
    })
    console.log( ' this.tabLabActivite[1]',this.tabLabActivite[1]);
    return this.tabLabActivite[1];
  }
  getUserLabelSum(user,label){
    if (user.Level) {
      let res = user.Level.find(x=>x.labelId == label.labelId )
  
      return res? res.niveau : 0
    }else{
      return 0
    }
  }
  getUserLabelSumActivite(user,domaine,activite){
    //  console.log(user.id);
      for(var i in this.competence.AllActiviteMetier){
      
      if(this.competence.AllActiviteMetier[i].domaineId==activite.domaineId && this.competence.AllActiviteMetier[i].domaineId== domaine.domaineId && this.competence.AllActiviteMetier[i].userId==user.id){
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
  getItems( id) {
    return this.competence.LabeList.filter((item) =>
     item.domaineId === id);
  }
  isShow = false;



 
  toggleDisplay() {
    this.isShow = !this.isShow;
  }
  
}
