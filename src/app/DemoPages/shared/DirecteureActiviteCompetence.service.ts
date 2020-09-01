
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Domaine } from '../Models/domaine.model';
import { Labels } from '../Models/labels.mode';
import { Users } from '../Models/users.model';
import { environment } from 'src/environments/environment';
@Injectable({
    providedIn: 'root'
  })
  export class DirecteureActiviteCompetenceService {
    constructor(private fb: FormBuilder,private FB: FormBuilder,private Fb: FormBuilder,private http: HttpClient,private router: Router){}

    user:Users;
    listeMetierActivite:any
    listeMetierActiviteuser:any
    liste:any=[]
    //ici get activiter metier selon directeur
      getActiviteMetierUser(UserId){
        this.http.get('https://localhost:44385/api/ActiviteMetier/GetusersByDomaine/'+UserId).subscribe(
          res=>{
            console.log(res);
            this.listeMetierActivite = res;
           console.log(this.user);
         //  this.users = data.json();
         console.log('==>listeMetierActivite before',this.listeMetierActivite)
         this.listeMetierActivite.map(p =>{
          console.log(this.liste.indexOf(p));
          if(this.liste.indexOf(p.activiteId) ==-1  ) 
          this.liste.push(p.activiteId);
       console.log('==>listeMetierActivite after',this.listeMetierActivite)
        })  
      
          }
        ) 
      }
      
      editLevelActivite(activMetId,niveau) {
        return this.http.put(environment.apiUrl+`ActiviteMetier/editLevel/${activMetId}/?niveau=${niveau}`,null);
      }
      listeActiviteUserConnecte:any
      
      getListeActiviteUserConnecte(UserId){
        this.http.get('https://localhost:44385/api/ActiviteMetier/GetuserConnecteActivite/'+UserId).subscribe(
          res=>{
            console.log(res);
            this.listeActiviteUserConnecte = res;
           console.log(this.listeActiviteUserConnecte);
           this.listeActiviteUserConnecte.map((domaina: any) => {
            if (this.LabeListActivite) {
              domaina.labelsa = this.LabeListActivite.filter(x => x.domaineId == domaina.domaineId)
            }
            console.log('this AllListeActivite',this.LabeListActivite)
        //    this.getAllUsersTrue()
          })
         //  this.users = data.json();
          }
        ) 
      }











      //ici get la liste d'activites cad kol activite chnouwa feha domaine w sous domaine
      listeActivite:any
      
        getListeActivite(UserId){
          this.http.get('https://localhost:44385/api/ActiviteMetier/GetusersByActivite/'+UserId).subscribe(
            res=>{
              console.log(res);
              this.listeActivite = res;
             console.log(this.listeActivite);
             this.listeActivite.map((domaina: any) => {
              if (this.LabeListActivite) {
                domaina.labelsa = this.LabeListActivite.filter(x => x.domaineId == domaina.domaineId)
              }
              console.log('this AllListeActivite',this.LabeListActivite)
          //    this.getAllUsersTrue()
            })
           //  this.users = data.json();
            }
          ) 
        }
        ActiviteList:any=[];
  
  getAllActivite(UserId) {
    this.http.get('https://localhost:44385/api/ActiviteMetier/ListeActivite/'+UserId).subscribe(
      res => {
        console.log(res);
        this.ActiviteList = res;
        console.log('liste de tout les activites',this.ActiviteList);
        //  this.users = data.json();
      }
    )
  }

  DomaineList: Domaine[]
  LabeList: Labels[]
  GetAllDomaine() {

    this.http.get('https://localhost:44385/api/Domaine/GetAllDomaines').toPromise().then(
      res => {
        this.DomaineList = res as Domaine[];
        console.log("alldomaines *********", this.DomaineList);
        this.DomaineList.map((domain: any) => {
          if (this.LabeList) {
            domain.labels = this.LabeList.filter(x => x.domaineId == domain.domaineId)
          }
          console.log('this LabeList',this.LabeList)
        //  this.getAllUsersTrue()
        })
        //  this.users = data.json();
        this.DomaineList.map((domaina: any) => {
          if (this.LabeListActivite) {
            domaina.labelsa = this.LabeListActivite.filter(x => x.domaineId == domaina.domaineId)
            console.log('labelsa',domaina.labelsa)
          }
          console.log('this AllListeActivite',this.LabeListActivite)
       //   this.getAllUsersTrue()
        })
      }
    )
  }
  LabeListActivite:any=[];
  GetAllLabelsActivite() {
    this.http.get('https://localhost:44385/api/Label/GetAllLabels').toPromise().then(
      res => {
        this.LabeListActivite = res as Labels[];
        console.log("this.LabeListActivite **********", this.LabeListActivite);
        //  this.users = data.json();
        this.GetAllDomaine()
      }
    )
  }
  AllListeActivite:any=[];
  GetAllListeActivite() {
    return this.http.get('https://localhost:44385/api/Activite/GetAll').toPromise().then(
      res => {
        this.AllListeActivite = res ;
        console.log('All Liste Activite',this.AllListeActivite);
        //  this.users = data.json();
        this.AllListeActivite.map((domaina: any) => {
          if (this.LabeListActivite) {
            domaina.labelsa = this.LabeListActivite.filter(x => x.domaineId == domaina.domaineId)
          }
          console.log('this AllListeActivite',this.LabeListActivite)
      //    this.getAllUsersTrue()
        })
      }
    )

  }

  ParticipantusersTrue: any =[];
  getParticipantusersTrue(UserId){
   this.http.get('https://localhost:44385/api/ApplicationUser/'+UserId).subscribe(
     res=>{
       console.log(res);
       this.ParticipantusersTrue = res ;
      console.log("before ParticipantusersTrue", this.ParticipantusersTrue);

      
      
        this.getActiviteUserLevelById(this.ParticipantusersTrue.id)
        .subscribe(res=>{
          this.ParticipantusersTrue.Level = res
        },err=>{
          console.log("error :", err)
        })
     
      console.log(" ParticipantusersTrue after", this.ParticipantusersTrue);

    //  this.users = data.json();
     }
   ) 
 }









         //ici la liste des utilistateur qui on la meme activite que don directeur
      listeuser:any
      
      getlisteuser(UserId){
        this.http.get('https://localhost:44385/api/ActiviteMetier/GetusersActivite/'+UserId).subscribe(
          res=>{
            console.log(res);
            this.listeuser = res;
           console.log(this.listeActivite);
         //  this.users = data.json();
         this.listeuser.map(user => {
          this.getActiviteUserLevelById(user.id)
          .subscribe(res=>{
            user.Level = res
          },err=>{
            console.log("error :", err)
          })
        })
        console.log("All usersTrue after", this.listeuser);
          }
        ) 
      }
      getActiviteUserLevelById(userId) {
        return this.http.get(environment.apiUrl+'ActiviteMetier/GetAllmetieruser/' + userId);
      }
      //cette list contien IdUser, IdLabel,Niveau
      List:any;
      get(UserId){
        this.http.get('https://localhost:44385/api/Metier/GetUserDetail/'+UserId).subscribe(
          res=>{
            console.log(res);
            this.List = res;
           console.log(this.List[0]);
         //  tihis.users = data.json();
          }
        ) 
      }
      UserDomaineList: Domaine[];
      AllActiviteMetier:any=[];
      GetAllActiviteMetier() {
        return this.http.get('https://localhost:44385/api/ActiviteMetier/GetAll').toPromise().then(
          res => {
            this.AllActiviteMetier = res ;
            console.log('All Activite Metier',this.AllActiviteMetier);
            //  this.users = data.json();
    
          }
        )
    
      }
      GetDomaineActivite(UserId){
        this.http.get('https://localhost:44385/api/Metier/GetDirecteurActiviteDomaine/'+UserId).toPromise().then(
          res=>{
            this.UserDomaineList = res as Domaine[];
            console.log(this.UserDomaineList[0]);
         //  this.users = data.json();
         
          }
        )
      }
     // cette userlabeliste contient les label qui correspond au domaine de DA
      UserLabelList: Labels[];
      GetLabel(UserId){
       
        this.http.get('https://localhost:44385/api/Metier/GetLabelDA/'+UserId).toPromise().then(
          res=>{
            this.UserLabelList = res as Labels[];
            console.log(this.UserLabelList[0]);
         //  this.users = data.json();
         
          }
        )
      }
  }