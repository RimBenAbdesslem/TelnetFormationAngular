import { Component, OnInit } from '@angular/core';
import { CompetenceService } from '../../shared/competence.service';

@Component({
  selector: 'app-choix-activite',
  templateUrl: './choix-activite.component.html',
  styleUrls: ['./choix-activite.component.sass']
})
export class ChoixActiviteComponent implements OnInit {

  constructor(public competence: CompetenceService) { }

  ngOnInit() {
    this.competence.getAllActivite();
    this.competence.getActiviteAllUsersTrue();
    this.competence.GetLabellActivite();
   // this.competence.tLabelActivite()
    this.competence.GetAllActiviteMetier() ;
    this.competence.GetAllListeActivite();
    this.competence.GetAllLabelsActivite();
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
  getchoixUserLabelSumActivite(user,domaine,activMetId)
  {
 //   console.log(user.id);
  //  console.log(activMetId);

      for(var i in this.competence.ChoixActivite){
      
      if( this.competence.ChoixActivite[i].domaineId== domaine.domaineId && this.competence.ChoixActivite[i].userId==user.id){
     // console.log(this.competence.AllActiviteMetier[i].niveau)
          if (user.Level){
            let res = user.Level.find(x=>x.labelId == domaine.labelId )
        console.log(res);
            return res? res.niveau : 0
          }else{
            return 0
          }
       
       
      }
       
      }}
    }
