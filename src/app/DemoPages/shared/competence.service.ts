
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Domaine } from '../Models/domaine.model';
import { Labels } from '../Models/labels.mode';
import { Users } from '../Models/users.model';
import { Formateur } from '../Models/formateur.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})

export class CompetenceService {

  constructor(private fb: FormBuilder,private fbAcvite: FormBuilder,private Ac : FormBuilder, private FB: FormBuilder,private AcFb: FormBuilder, private Fb: FormBuilder, private http: HttpClient, private router: Router) { }

  DomaineList: Domaine[]
  formData: Domaine;
  formDataActivite:any;
  LabeList: Labels[]
  LabeList1: Labels[]
  UserId: string;
  ActiviteList:any=[];
  user: Users;
  getAllActivite() {
    this.http.get('https://localhost:44385/api/Activite/GetAllActivites').subscribe(
      res => {
        console.log(res);
        this.ActiviteList = res;
        console.log(this.ActiviteList);
        //  this.users = data.json();
      }
    )
  }
  getUser(UserId) {
    this.http.get('https://localhost:44385/api/Metier/Getuser/' + UserId).subscribe(
      res => {
        console.log(res);
        this.user = res as Users;
        console.log(this.user);
        //  this.users = data.json();
      }
    )
  }
  List: any;
  get(UserId) {
    this.http.get('https://localhost:44385/api/Metier/GetuserSelected/' + UserId).subscribe(
      res => {
        console.log(res);
        this.List = res;
        console.log(this.List[0]);
        //  tihis.users = data.json();
      }
    )
  }
  UserDomaineList: Domaine[];

  GetDomaineUser(UserId) {
    this.http.get('https://localhost:44385/api/Metier/GetAllDomaineuser/' + UserId).toPromise().then(
      res => {
        this.UserDomaineList = res as Domaine[];
        console.log(this.UserDomaineList[0]);
        //  this.users = data.json();
        

      }
    )
  }
ListeActivite:any=[];
tabLabActivite:any={};
  GetListeActivite(id) {
    return this.http.get(`https://localhost:44385/api/Activite/listeActivite/` + id).toPromise().then(
      res => {
        this.ListeActivite = res ;
        console.log(this.ListeActivite);
        //  this.users = data.json();
        this.ListeActivite.map(p =>{
          console.log(this.tabLabActivite.indexOf(p));
          if(this.tabLabActivite.indexOf(p.nomDomaine) ==-1  ) this.tabLabActivite.push(p);
        })  
        console.log(this.tabLabActivite);

      }
    )

  }
  refreshActivite(listActivId){
    this.http.get('https://localhost:44385/api/Activite/listeActivite/'+listActivId)
    .toPromise()
    .then(res => this.ListeActivite = res );
  }
  GetLabell(UserId) {
    return this.http.get(`https://localhost:44385/api/Metier/GetAllUserLabel/` + UserId)
  }

  userConnecte:Users;
  getUserConnecte(UserId){
    this.http.get('https://localhost:44385/api/ApplicationUser/'+UserId).subscribe(
      res=>{
        console.log(res);
        this.userConnecte = res as Users;
       console.log(this.userConnecte);
     //  this.users = data.json();
      }
    ) 
  }
  participant:Users[];
  getUserParticipant(UserId){
    this.http.get('https://localhost:44385/api/ApplicationUser/'+UserId).subscribe(
      res=>{
        console.log(res);
        this.participant = res as Users[];
       console.log("before", this.participant);

       this.usersTrue.map(user => {
         this.getUserLevelById(user.id)
         .subscribe(res=>{
           user.Level = res
         },err=>{
           console.log("error :", err)
         })
       })
       console.log("after", this.participant);
     //  this.users = data.json();
      }
    ) 
  }

  UserLabelList: Labels[];
  occ: any[] = []
  GetLabel(UserId) {

    this.http.get(`https://localhost:44385/api/Metier/GetAllUserLabel/` + UserId).toPromise().then(
      res => {
        this.UserLabelList = res as Labels[];

        // liste tous labels 
        for (var j = 0; j < this.LabeList.length; j++) {
          console.log("liste de tous labels ", this.LabeList[j].labelId)
        }
        for (var i = 0; i < this.UserLabelList.length; i++) {
          console.log("UserLabelList", this.UserLabelList[i].labelId)
        }

        // liste tous labels 
        for (var j = 0; j < this.LabeList.length; j++) {
          //console.log("liste de tous labels ",this.LabeList[j].labelId)
          //parcour list label user
          let count = 0;
          for (var i = 0; i < this.UserLabelList.length; i++) {
            if (this.LabeList[j].labelId == this.UserLabelList[i].labelId)
              count++;
            // console.log("count",count)
            // console.log("UserLabelList",this.UserLabelList[i].labelId)
          }
          if (count == 0) {
            this.occ[this.occ.length] = 'X';
          }
          else {
            this.occ[this.occ.length] = count;
          }

        }
        console.log("occ", this.occ)


        //console.log("UserLabelList",this.UserLabelList[0].labelId);
        //  this.users = data.json();

      }
    )
  }

  GetAllLabels() {
    this.http.get('https://localhost:44385/api/Label/GetAllLabels').toPromise().then(
      res => {
        this.LabeList = res as Labels[];
        console.log("this.LabeList **********", this.LabeList);
        //  this.users = data.json();
        this.GetAllDomaine()
      }
    )
  }


  GetAllDomaine() {

    this.http.get('https://localhost:44385/api/Domaine/GetAllDomaines').toPromise().then(
      res => {
        this.DomaineList = res as Domaine[];
        console.log("alldomaines *********", this.DomaineList);
        this.DomaineList.map((domain: any) => {
          if (this.LabeList) {
            domain.labels = this.LabeList.filter(x => x.domaineId == domain.domaineId)
          }
          this.getAllUsersTrue()
        })
        //  this.users = data.json();

      }
    )
  }
  ListActiviteModel=this.Ac.group({
    activiteId: ['', Validators.required],
    domaineId: ['', Validators.required],
    labelId: ['', Validators.required],
  // Niveau: ['', Validators.required],
   //UserId: ['', Validators.required],
  });

  CompetenceModel = this.Fb.group({
    domaineId: ['', Validators.required],
    NomLabel: ['', Validators.required],
    Niveau: ['', Validators.required],
  });
  CompetenceActiviteModel=this.AcFb.group({
    ActiviteId: ['', Validators.required],
    domaineId: ['', Validators.required],
    labelId: ['', Validators.required],
   Niveau: ['', Validators.required],
   UserId: ['', Validators.required],
  });
  UserCompModel = this.Fb.group({
    domaineId: ['', Validators.required],
    UserId: ['', Validators.required],
    LabelId: ['', Validators.required],
    Niveau: ['', Validators.required],
  });

  DomaineModel = this.FB.group({
    NomDomaine: ['', Validators.required],
  });
  FormModel = this.fb.group({
    domaineId: ['', Validators.required],
    nomDomaine: ['', Validators.required],
  });
  FormModelActivite= this.fbAcvite.group({
    Id: ['', Validators.required],
    nomActivite: ['', Validators.required],
  });
  ModifierDomaine(domaineId) {
    var domaine = {
      NomDomaine: this.FormModel.value.nomDomaine,
    }
    return this.http.post('https://localhost:44385/api/Domaine/ModifierDomaine/' + domaineId, domaine);
  }
  registerDomaine() {
    var domaine = {
      NomDomaine: this.DomaineModel.value.NomDomaine,
    }
    return this.http.post('https://localhost:44385/api/Domaine/RegisterDomaine', domaine);
  }

  id: number
  registerCompetence(domaineid) {
    var competence = {

      NomLabel: this.CompetenceModel.value.NomLabel,
      Niveau: 0,
    }
    console.log(domaineid)
    //  console.log(this.CompetenceModel.value.domaineId)
    return this.http.post('https://localhost:44385/api/Label/RegisterLabel/' + domaineid, competence);


  }
  registerCompetenceActivite(domaineId, labelId, activiteId,userId) {
    var competenceUser = {
      DomaineId: domaineId,
      LabelId: labelId,
      activiteId: activiteId,
      userId:userId,
      Niveau: this.CompetenceActiviteModel.value.Niveau,
    }
    console.log(domaineId)
    console.log(labelId)
    console.log(activiteId)
    return this.http.post('https://localhost:44385/api/ActiviteMetier/RegisterActiviteMetier', competenceUser);
  }
  registerListeActivite (domaineId, labelId, activiteId) {
    var competenceUser = {
      nomActivite:"",
      nomDomaine:"",
      nomLabel:"",
      DomaineId: domaineId,
      LabelId: labelId,
      activiteId: activiteId,
     // userId:userId,
     // Niveau: this.CompetenceActiviteModel.value.Niveau,
    }
    console.log(this.ListActiviteModel.value.activiteId)
    console.log(this.ListActiviteModel.value.domaineId)
    console.log(this.ListActiviteModel.value.labelId)
    console.log(domaineId)
    console.log(labelId)
    console.log(activiteId)
    return this.http.post('https://localhost:44385/api/Activite/RegisterListeActivite', competenceUser);
  }
  registerCompetenceUser(DomaineId, LabelId, userId) {
    var competenceUser = {
      DomaineId: DomaineId,
      LabelId: LabelId,
      userId: userId,
      Niveau: this.UserCompModel.value.Niveau,
    }
    console.log(DomaineId)
    console.log(LabelId)
    console.log(userId)
    return this.http.post('https://localhost:44385/api/Metier/RegisterMetier', competenceUser);
  }
  refreshList() {
    this.http.get('https://localhost:44385/api/Label/GetAllLabels')//false
      .toPromise()
      .then(res => this.LabeList = res as Labels[]);
  }
  refreshListeActivite()
  {
    this.http.get('https://localhost:44385/api/Activite/GetAllActivites')//false
      .toPromise()
      .then(res => this.ActiviteList = res);
  }
  
  refreshList1() {
    this.http.get('https://localhost:44385/api/Domaine/GetAllDomaines')
      .toPromise()
      .then(res => this.DomaineList = res as Domaine[]);
  }
  refreshList2(id){
    this.http.get('https://localhost:44385/api/ApplicationUser/'+id)
    .toPromise()
    .then(res => this.userConnecte = res as Users);
  }
  Id: number
  Idlab: number

  removeCompetence(list: any = []) {
    console.log(list[0])
    this.refreshList();
    console.log(this.LabeList);
    for (var i in this.LabeList) {
      console.log(this.LabeList[i].labelId)
      //  console.log(this.Id)
      console.log(this.LabeList[i].nomLabel)
      if (list[0] == this.LabeList[i].nomLabel) {
        console.log(this.LabeList[i].nomLabel)
        this.Idlab = this.LabeList[i].labelId;

      }
    }
    this.refreshList();
    console.log(this.LabeList);
    console.log(this.Idlab)
    console.log("hello")

    return this.http.delete('https://localhost:44385/api/Label/DeleteAllLabels' + this.Idlab);
  }

  usersTrue: any = [];
  readonly UrlUserTrue = 'https://localhost:44385/api/ApplicationUser/AllUsersTrue';
  getAllUsersTrue() {
    this.http.get(this.UrlUserTrue).toPromise().then(
      (res: any) => {
        this.usersTrue = res
        console.log("before", this.usersTrue);

        this.usersTrue.map(user => {
          this.getUserLevelById(user.id)
          .subscribe(res=>{
            user.Level = res
          },err=>{
            console.log("error :", err)
          })
        })
        console.log("after", this.usersTrue);


        //  this.users = data.json();
      }
    )
  }

  deleteDomaine(id) {
    return this.http.delete('https://localhost:44385/api/Domaine/deleteDomaine/' + id);
  }

  getUserLevelById(userId) {
    return this.http.get(environment.apiUrl+'Metier/GetAllmetieruser/' + userId);
  }
  
  editLevel(metierId,niveau) {
    return this.http.put(environment.apiUrl+`Metier/editLevel/${metierId}/?niveau=${niveau}`,null);
  }
  onDeleteActivite(id) {
  return this.http.delete('https://localhost:44385/api/Activite/deleteActivite/' + id);
}
deletelabelActivite(id) {
  console.log(id);
  return this.http.delete('https://localhost:44385/api/Activite/deleteListeActivite/' + id);
}
}