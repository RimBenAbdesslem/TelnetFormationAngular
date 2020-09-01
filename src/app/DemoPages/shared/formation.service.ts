import { Injectable } from '@angular/core';
import {  FormControl,FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Besoin_Formation } from '../Models/besoin_formation.model';
import { ValueTransformer } from '@angular/compiler/src/util';
import { Participant } from '../Models/participant.model';
import { Formateur } from '../Models/formateur.model';
import { Besoin_Collecte } from '../Models/besoin_collecte.model';
import { HttpHeaders } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class FormationService {
  reactiveForm: FormGroup = new FormGroup({
    reactiveRadio: new FormControl(true)
  })
  num: number=0;
  constructor(private fb: FormBuilder,private Activ: FormBuilder,private Fb: FormBuilder,private Part: FormBuilder,private FB: FormBuilder ,private OrgFB: FormBuilder,private http: HttpClient,private router: Router) {

    this.reactiveForm.controls['reactiveRadio'].valueChanges.subscribe((state: any) => {
      this.num=state;
      console.log( this.num);

      console.log(state);

    })
   }
   TestFormation: any;
  BesFormation: Besoin_Formation[];
  ListeFormateurs:Formateur[];
  besoins:Besoin_Collecte[]
  formData: Besoin_Formation;
  EtatFormation:Besoin_Collecte;
  formData1:Participant;
  resultat : any;
  name:string;
  key:string;
  readonly BaseURI = 'https://localhost:44385/api';

  

    formModel = this.fb.group({
     Intitule_Formation: ['', Validators.required],
    Justification_du_besoin: ['', Validators.required],
    Nombre_de_participants: ['', Validators.required],
    Activite:['', Validators.required],
    Priorite:['', Validators.required],


  });




  formModele = this.Fb.group({
    Name: ['', Validators.required],
    Email:['', Validators.required],
    Phone:['', Validators.required],
  });




OrganismeModel= this.OrgFB.group({
  Theme: ['', Validators.required],
  Organisme_prestataire : ['', Validators.required],
  Nom_Formateur: ['', Validators.required],
  Period: ['', Validators.required],

})

ParticipantModel=this.Part.group({
  id:[""],
  nom: ['', Validators.required],
  prenom: ['', Validators.required],
})

  formeModel = this.FB.group({
    besoinFormationId:[""],
    intitule_Formation: ['', Validators.required],
    justification_du_besoin: ['', Validators.required],
    nombre_de_participants: ['', Validators.required],
    activite:['', Validators.required],
    priorite:['', Validators.required],
    organisme_de_formation:['', Validators.required],
    date_Debut:['', Validators.required],
    date_Fin:['', Validators.required],
    type_de_formation:['', Validators.required],
    nombre_de_jours:['', Validators.required],
    duree:['', Validators.required],
    cout_unitaire:['', Validators.required],
    frais_de_deplacement:['', Validators.required],
    cout_Totale_previsionnel:['', Validators.required],
    imputation:['', Validators.required],
    bareme_TFP:['', Validators.required],
    montant_recuperer:['', Validators.required],
    Competence_visee:['', Validators.required],
    Date_EvaluationFroid:['', Validators.required],
    Evaluation_Manquantes:['', Validators.required],
    nom_formateur:['', Validators.required]

 });

   



 envoyer(res){
   this.resultat=res;
 }

 ActiviteModel= this.Activ.group({
  activite:['', Validators.required],
 });

 ajouteracticite(){
  console.log(this.ActiviteModel.value.activite)
  var Activite={
   NomActivite: this.ActiviteModel.value.activite,
  }
  return this.http.post(this.BaseURI + '/Activite/RegisterActivite', Activite);
}



  registerFormation(){
    
    var body = {
      Intitule_Formation: this.formModel.value.Intitule_Formation,
      Justification_du_besoin: this.formModel.value.Justification_du_besoin,
      Nombre_de_participants: this.formModel.value.Nombre_de_participants,
      Activite: this.formModel.value.Activite,
      Priorite: this.num,
      };
  console.log("our bodyyyyyy",body);
  this.name=body.Intitule_Formation
  console.log(body.Intitule_Formation);
  console.log(body.Justification_du_besoin);
  console.log(body.Nombre_de_participants);
  console.log(body.Activite);
  console.log(this.num);
     return this.http.post(this.BaseURI +'/Formation', body);
     
}





PostRegisterParticipant(idFormation,idParticipant){
  return this.http.post(this.BaseURI + `/Participant/EditParticipantToFormation/${idFormation}?ParticipantId=${idParticipant}`,null);
}






  // registerParticipant(val){


  //   var participant = {
  //     nom: this.formModele.value.nom,
  //     prenom: this.formModele.value.prenom,
    
  // };
  
//   console.log(participant.nom);
//   console.log(participant.prenom);
 
//  console.log(this.name);
//   return this.http.post(this.BaseURI + '/Participant/EditParticipantToFormation',this.name, val);
//   }
  // ajouterPartToForation(data){
  //    return this.http.post('https://localhost:44385/api/partFormation',data);
  // }
 





registerFormationAnnuelle(formationid){
    
  var body = {
    BesoinFormationId :formationid,
    Intitule_Formation: this.formeModel.value.intitule_Formation,
    Justification_du_besoin: this.formeModel.value.justification_du_besoin,
    Nombre_de_participants: this.formeModel.value.nombre_de_participants,
    Activite: this.formeModel.value.activite,
    Priorite: this.formeModel.value.priorite,
    Organisme_de_formation:this.formeModel.value.organisme_de_formation,
    Date_Debut:new Date(this.formeModel.value.date_Debut),
    Date_Fin:new Date(this.formeModel.value.date_Fin),
    type_de_formation:this.formeModel.value.type_de_formation,
    Nombre_de_jours:this.formeModel.value.nombre_de_jours,
    Duree:this.formeModel.value.duree,
    Cout_unitaire:this.formeModel.value.cout_unitaire,
    Frais_de_deplacement:this.formeModel.value.frais_de_deplacement,
    Cout_Totale_previsionnel:this.formeModel.value.cout_Totale_previsionnel,
    Imputation:this.formeModel.value.imputation,
    Bareme_TFP:this.formeModel.value.bareme_TFP,
    Montant_recuperer:this.formeModel.value.montant_recuperer,
    nom_formateur:this.formeModel.value.nom_formateur,

};
console.log(body.Intitule_Formation);
console.log(body.Justification_du_besoin);
console.log(body.Nombre_de_participants);
console.log(body.Montant_recuperer);
console.log(body.Frais_de_deplacement);
return this.http.put('https://localhost:44385/api/Formation/ChangeTocollectType/'+formationid, body);
}




refreshList(){
 
  this.http.get(this.BaseURI + '/BesoinFormation/GetAllBesoin')//false
  .toPromise()
  .then(res => this.BesFormation= res as Besoin_Formation[]);


  this.http.get(this.BaseURI + '/Formateur/GetAllFormateurs')//false
  .toPromise()
  .then(res => this.BesFormation= res as Besoin_Formation[]);
 
  
   
  // this.http.get(this.BaseURI + '/ApplicationUser/AllUsersTrue')//false https://localhost:44385/api/ApplicationUser/AllUsersTrue
  // .toPromise()
  // .then(res => this.participants= res as Participant[]);
 
}




Score:any;

PostOrganisme(){
 
 var Organisme={
   Theme:this.OrganismeModel.value.Theme,
   Organisme_prestataire:this.OrganismeModel.value.Organisme_prestataire,
   Nom_Formateur:this.OrganismeModel.value.Nom_Formateur,
   Period:this.OrganismeModel.value.Period,
   Score:this.resultat,
  }
  return this.http.post('https://localhost:44385/api/Formateur/RegisterFormateur', Organisme);
}


postNewParticipant(){
  var participant={
    nom:this.ParticipantModel.value.nom,
   prenom:this.ParticipantModel.value.prenom,
  }
  console.log("participant to post ",participant)
 return this.http.post('https://localhost:44385/api/Participant/RegisterParticipant', participant);
  
}


deleteOrganisme(id) {
  console.log(id);
  return this.http.delete(this.BaseURI + '/Formateur/deleteFormateur/'+ id);
}



deleteBesoinCollecte(id){
  console.log(id);
  return this.http.delete(this.BaseURI + '/BesoinCollecte/deleteBesoinCollecte'+ id);
}
tabLab = [];
getAllFormation(){
  this.http.get(this.BaseURI  + '/BesoinFormation/GetAllBesoin').toPromise().then(
    res=>{
      this.BesFormation = res as Besoin_Formation[];
      console.log("this.BesFormation",this.BesFormation);
   //  this.users = data.json();
   this.BesFormation.map(p =>{
    console.log(this.tabLab.indexOf(p));
    if(this.tabLab.indexOf(p.activite) ==-1  ) this.tabLab.push(p.activite);
  })  
  console.log("Liste de activité sans occurance ===>",this.tabLab);
    }
  )
}

newgetAllFormation(){
  return this.http.get(this.BaseURI  + '/BesoinFormation/GetAllBesoin')
}

deleteFormation(id){
 
  return this.http.delete(this.BaseURI  + '/Formation/'+id)
}

getAllFormationParticipants(idFormation){
  return this.http.get(this.BaseURI  + '/ParticipantFormations/getParticipants/'+idFormation)
}


//ici on fait les get des besoins qui son réalisé

AllBesoin:Besoin_Collecte[];
GetAllBesoin(){
  this.http.get('https://localhost:44385/api/BesoinCollecte/GetBesoin').toPromise().then(
    res=>{
      this.AllBesoin = res as Besoin_Collecte[];
      console.log(this.AllBesoin);
   //  this.users = data.json();
   
 
    }
  )
}
JustificationBesoin=[]
GetAllBesoinCollecte(){
  this.http.get('https://localhost:44385/api/BesoinCollecte/GetBesoin').toPromise().then(
    res=>{
      this.besoins = res as Besoin_Collecte[];
      console.log(this.besoins);
   //  this.users = data.json();
   this.besoins.map(p =>{
    console.log(this.JustificationBesoin.indexOf(p));
    if(this.JustificationBesoin.indexOf(p.justification_du_besoin) ==-1  ) this.JustificationBesoin.push(p.justification_du_besoin);
  })  
  console.log("Justification de besoin",this.JustificationBesoin);
    }
  )
}

participants:any;

GetAllParticipant(){
// return this.http.get(this.BaseURI +'/Participant/GetAllParticipant')
return this.http.get(this.BaseURI + "/ApplicationUser/AllUsersTrue")

}




GetAllFormateur(){
  this.http.get(this.BaseURI  + '/Formateur/GetAllFormateurs').toPromise().then(
    res=>{
      this.ListeFormateurs = res as Formateur[];
      console.log(this.ListeFormateurs);
  
    }
  )
}

PostEtatFormation(){
  var Etat={
    Intitule_Formation: this.formeModel.value.intitule_Formation,
    Justification_du_besoin: this.formeModel.value.justification_du_besoin,
    Nombre_de_participants: this.formeModel.value.nombre_de_participants,
    Activite: this.formeModel.value.activite,
    Priorite: this.formeModel.value.priorite,
    Organisme_de_formation:this.formeModel.value.organisme_de_formation,
    Date_Debut:new Date(this.formeModel.value.date_Debut),
    Date_Fin:new Date(this.formeModel.value.date_Fin),
    type_de_formation:this.formeModel.value.type_de_formation,
    Nombre_de_jours:this.formeModel.value.nombre_de_jours,
    Duree:this.formeModel.value.duree,
    Cout_unitaire:this.formeModel.value.cout_unitaire,
    Frais_de_deplacement:this.formeModel.value.frais_de_deplacement,
    Cout_Totale_previsionnel:this.formeModel.value.cout_Totale_previsionnel,
    Imputation:this.formeModel.value.imputation,
    Bareme_TFP:this.formeModel.value.bareme_TFP,
    Montant_recuperer:this.formeModel.value.montant_recuperer,
    Competence_visee:this.formeModel.value.Competence_visee,
    Date_EvaluationFroid :this.formeModel.value.Date_EvaluationFroid,
    Evaluation_Manquantes :this.formeModel.value.Evaluation_Manquantes
   }
   return this.http.post('https://localhost:44385/api/EtatFormation/RegisterEtatFormation',Etat)
}


// getAllFormations(){
//   return this.http.post('/BesoinFormation/GetAllBesoin');
// }
listeparticipants: Participant[]

getUserList() {
  let headers = new HttpHeaders();
  headers.set('Content-Type', 'https://localhost:44385/api/ApplicationUser/AllUsersTrue');

  return this.http.get('https://localhost:44385/api/ApplicationUser/AllUsersTrue', { headers });
}
}

