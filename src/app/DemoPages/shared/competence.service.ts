
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

  constructor(private fb: FormBuilder,private fbAcvite: FormBuilder,private role : FormBuilder,private Ac : FormBuilder, private FB: FormBuilder,private AcFb: FormBuilder, private Fb: FormBuilder, private http: HttpClient, private router: Router) { }

  DomaineList: Domaine[]
  formData: Domaine;
  formDataActivite:any;
  LabeList: Labels[]
  LabeListActivite: Labels[]
  LabeList1: Labels[]
  UserId: string;
  ActiviteList:any=[];
  user: Users;
  getAllActivite() {
    this.http.get('https://localhost:44385/api/Activite/GetAllActivites').subscribe(
      res => {
        console.log(res);
        this.ActiviteList = res;
        console.log('liste de tout les activites',this.ActiviteList);
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
  registerRole(){
    var role={
      Name:this.RoleModel.value.Role
    }
    return this.http.post('https://localhost:44385/api/ApplicationUser/AddRole' ,role);
  }
  deleteRole(id){
    return this.http.delete('https://localhost:44385/api/ApplicationUser/role/' +id);
  }
  Top:any
  Top1:any
  TopFormateur(){
    this.http.get('https://localhost:44385/api/Formateur/top').subscribe(
      res => {
        console.log(res);
        this.Top = res;
        this.Top1=this.Top[0]
        console.log(this.Top[0]);
        //  tihis.users = data.json();
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
          this.getAllUsersTrue()
        })
      }
    )

  }
ListeActivite:any=[];
tabLabActivite:any=[];
lab:any=[]
  GetListeActivite(id) {
    return this.http.get(`https://localhost:44385/api/Activite/listeActivite/` + id).toPromise().then(
      res => {
        this.ListeActivite = res ;
        console.log('listeActivite',this.ListeActivite);
        //  this.users = data.json();
   
        this.ListeActivite.map(p =>{
          console.log(this.tabLabActivite.indexOf(p));
          if(this.tabLabActivite.indexOf(p.nomDomaine) ==-1  ) 
          this.tabLabActivite.push(p.nomDomaine);
       
        })  
      
        console.log(this.tabLabActivite.length);
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
  ChoixActivite:any=[]
 
  ChoixUserActivite:any= []
  choix:any=[]
  tab :any=[]
  nomActivite:any
  Get(activiteId){
    this.http.get(`https://localhost:44385/api/ActiviteMetier/GetAllUserLabel/` + activiteId).toPromise().then(
      res=>{
       // console.log(res);
        this.choix = res ;
        this.ChoixActivite= res ;
        console.log('choix',this.choix);
        this.ChoixActivite.map(p =>{
          this.nomActivite=p.nomActivite
         
        })
        console.log('this.ChoixActivite',this.ChoixActivite)
     //   this.tab= this.ChoixActivite.map(p =>p.userId ==-1 );
      //  console.log('==>this.tab',this.tab)
    
       
      
      }
      
    ) 
    console.log('les users selon activite',this.ChoixUserActivite);
  }
  GetLabellActivite() {  
       this.ChoixActivite.map(p =>{
          for(let i in this.AllusersTrue ){
            if(p.userId == this.AllusersTrue[i].id ) 
          this.ChoixUserActivite=this.AllusersTrue[i];
          this.choix=p;
          console.log('les users selon activite',this.ChoixUserActivite);
          }
        }) 
      return this.ChoixUserActivite
     
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
 NombreFormation:any;
  getNombreFormation(UserId){
    this.http.get('https://localhost:44385/api/BesoinCollecte/NombreFormation/'+UserId).subscribe(
      res=>{
        console.log(res);
        this.NombreFormation = res;
       console.log('nbr formation de participant',this.NombreFormation);
     //  this.users = data.json();
      }
    ) 
  }
 FormationRealise:any=[];
  getFormationRealise(UserId){
    this.http.get('https://localhost:44385/api/Formation/FormationRealise/'+UserId).subscribe(
      res=>{
        console.log(res);
        this.FormationRealise = res;
       console.log('les formation de participant réalisé',this.FormationRealise);
     //  this.users = data.json();
      }
    ) 
  }
  NombrePlanifie:any=[];
  getFormationPlanifie(UserId){
    this.http.get('https://localhost:44385/api/Formation/FormationPlanifier/'+UserId).subscribe(
      res=>{
        console.log(res);
        this.NombrePlanifie = res;
       console.log('les formation de participant planifiées',this.NombrePlanifie);
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
console.log('labelList',this.LabeList)
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
  UserLabelListActivite:Labels[]
  GetLabelActivite(UserId) {

    this.http.get(`https://localhost:44385/api/ActiviteMetier/GetAllActiviteUserLabel/` + UserId).toPromise().then(
      res => {
        this.UserLabelListActivite = res as Labels[];

        // liste tous labels 
        for (var j = 0; j < this.LabeListActivite.length; j++) {
          console.log("liste de tous labels ", this.LabeListActivite[j].labelId)
        }
        for (var i = 0; i < this.UserLabelListActivite.length; i++) {
          console.log("UserLabelListActivite", this.UserLabelListActivite[i].labelId)
        }

        // liste tous labels 
        for (var j = 0; j < this.LabeListActivite.length; j++) {
          //console.log("liste de tous labels ",this.LabeListActivite[j].labelId)
          //parcour list label user
          let count = 0;
          for (var i = 0; i < this.UserLabelListActivite.length; i++) {
            if (this.LabeListActivite[j].labelId == this.UserLabelListActivite[i].labelId)
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
          this.getAllUsersTrue()
        })
        //  this.users = data.json();
        this.DomaineList.map((domaina: any) => {
          if (this.LabeListActivite) {
            domaina.labelsa = this.LabeListActivite.filter(x => x.domaineId == domaina.domaineId)
            console.log('labelsa',domaina.labelsa)
          }
          console.log('this AllListeActivite',this.LabeListActivite)
          this.getAllUsersTrue()
        })
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
  RoleModel= this.role.group({
    Role: ['', Validators.required],
   
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
  AllActiviteusersTrue: any = [];
  getAllActiviteUsersTrue(activiteId) {
    this.http.get('https://localhost:44385/api/ActiviteMetier/GetAllActivitemetieruser/'+activiteId).toPromise().then(
      (res: any) => {
        this.AllActiviteusersTrue = res
        console.log("All AllActiviteusersTrue before", this.AllActiviteusersTrue);

        this.AllActiviteusersTrue.map(user => {
          this.getActiviteUserLevelById(user.id)
          .subscribe(res=>{
            user.Level = res
          },err=>{
            console.log("error :", err)
          })
        })
        console.log("All usersTrue after", this.AllActiviteusersTrue);


        //  this.users = data.json();
      }
    )
  }





  AllusersTrue: any = [];
  readonly UrlUserTrue = 'https://localhost:44385/api/ApplicationUser/AllUsersTrue';
  getActiviteAllUsersTrue() {
    this.http.get(this.UrlUserTrue).toPromise().then(
      (res: any) => {
        this.AllusersTrue = res
        console.log("All usersTrue before", this.AllusersTrue);

        this.AllusersTrue.map(user => {
          this.getActiviteUserLevelById(user.id)
          .subscribe(res=>{
            user.Level = res
          },err=>{
            console.log("error :", err)
          })
        })
        console.log("All usersTrue after", this.AllusersTrue);


        //  this.users = data.json();
      }
    )
  }


  Allusers: any = [];
 // readonly UrlUserTrue = 'https://localhost:44385/api/ApplicationUser/AllUsersTrue';
  getActiviteAllUsers() {
    this.http.get(this.UrlUserTrue).toPromise().then(
      (res: any) => {
        this.Allusers = res
        console.log("All Allusers before", this.Allusers);

        this.Allusers.map(user => {
          this.getActiviteUserLevelById(user.id)
          .subscribe(res=>{
            user.Level = res
          },err=>{
            console.log("error :", err)
          })
        })
        console.log("All usersTrue after", this.Allusers);


        //  this.users = data.json();
      }
    )
  }




  usersTrue: any = [];
 // readonly UrlUserTrue = 'https://localhost:44385/api/ApplicationUser/AllUsersTrue';
  getAllUsersTrue() {
    this.http.get(this.UrlUserTrue).toPromise().then(
      (res: any) => {
        this.usersTrue = res
     //   console.log("before", this.usersTrue);

        this.usersTrue.map(user => {
          this.getUserLevelById(user.id)
          .subscribe(res=>{
            user.Level = res
          },err=>{
            console.log("error :", err)
          })
        })
    //    console.log("after", this.usersTrue);


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
  getActiviteUserLevelById(userId) {
    return this.http.get(environment.apiUrl+'ActiviteMetier/GetAllmetieruser/' + userId);
  }
  editLevel(metierId,niveau) {
    return this.http.put(environment.apiUrl+`Metier/editLevel/${metierId}/?niveau=${niveau}`,null);
  }
  editLevelActivite(activMetId,niveau) {
    return this.http.put(environment.apiUrl+`ActiviteMetier/editLevel/${activMetId}/?niveau=${niveau}`,null);
  }
  onDeleteActivite(id) {
  return this.http.delete('https://localhost:44385/api/Activite/deleteActivite/' + id);
}
deletelabelActivite(id) {
  console.log(id);
  return this.http.delete('https://localhost:44385/api/Activite/deleteListeActivite/' + id);
}
deleteUserActivite(activMetId){
  return this.http.delete('https://localhost:44385/api/ActiviteMetier/deleteActiviteMitier/' + activMetId);
}
}