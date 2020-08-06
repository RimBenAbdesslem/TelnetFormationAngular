
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Domaine } from '../Models/domaine.model';
import { Labels } from '../Models/labels.mode';
import { Users } from '../Models/users.model';
@Injectable({
    providedIn: 'root'
  })
  export class DirecteureActiviteCompetenceService {
    constructor(private fb: FormBuilder,private FB: FormBuilder,private Fb: FormBuilder,private http: HttpClient,private router: Router){}

    user:Users;
      getUser(UserId){
        this.http.get('https://localhost:44385/api/Metier/GetusersByDomaine/'+UserId).subscribe(
          res=>{
            console.log(res);
            this.user = res as Users;
           console.log(this.user);
         //  this.users = data.json();
          }
        ) 
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