import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Evaluation_Participant } from '../Models/evaluation_participant.model';
import { element } from '@angular/core/src/render3';

@Injectable({
    providedIn: 'root'
  })
  export class EvaluationService {
    constructor(private fb: FormBuilder,private For : FormBuilder, private F: FormBuilder,private FB: FormBuilder,private Fb: FormBuilder,private http: HttpClient,private router: Router){}

    readonly BaseURI = 'https://localhost:44385/api';
    resultat : any=0;
    resultats : any=0;
    EvaluationData: Evaluation_Participant;
    EvaluationFroidParticipant:Evaluation_Participant[];
    envoyer(res){
      this.resultat=res;
    }
    envoyers(result){
      this.resultats=result;
    }
    
    EvaluationFroidModel = this.fb.group({
      Theme: ['', Validators.required],
      Lieu: ['', Validators.required],
      Organisme: ['', Validators.required],
      Formateur:['', Validators.required],
      Date_Evaluation_Froid:['', Validators.required],
      Date_Debut: ['', Validators.required],
      Date_Fin: ['', Validators.required],
      Nom_Participant: ['', Validators.required],
      Prenom_Participant: ['', Validators.required],
      Matricule: ['', Validators.required],
      Fonction: ['', Validators.required],
      Direction: ['', Validators.required],
      question_A: ['', Validators.required],
      Lesquelles: ['', Validators.required],
      PourquoiA: ['', Validators.required],
      PourquoiB: ['', Validators.required],
      Autres1: ['', Validators.required],
      Autres2: ['', Validators.required],
      question_C: ['', Validators.required],
      question_B: ['', Validators.required],
      Comment: ['', Validators.required],
     
      Commentaire1: ['', Validators.required],
   
     });
     EvaluaFroidModel = this.For.group({
      Critere1: ['', Validators.required],
      Critere3: ['', Validators.required],
      Critere2: ['', Validators.required],
      Critere4: ['', Validators.required],
      Critere5: ['', Validators.required],
      Critere6: ['', Validators.required],
      Critere7: ['', Validators.required],
      Critere8: ['', Validators.required],
      Critere9: ['', Validators.required],
      Sinon: ['', Validators.required],

     });
     CompetenceEvalFroidModel = this.Fb.group({
      Competence: ['', Validators.required],
      Niveau_actuel: ['', Validators.required],
      Degre: ['', Validators.required],
      Niveau_acquis:['', Validators.required],
      Critere10:['', Validators.required],
 
     });


     EvaluationChaud = this.FB.group({
      Theme: ['', Validators.required],
      Lieu: ['', Validators.required],
      Organisme: ['', Validators.required],
      Formateur:['', Validators.required],
      Date_Evaluation_Chaud:['', Validators.required],
      Date_DebutFormation: ['', Validators.required],
      Date_FinFormation: ['', Validators.required],
      Nom_Participant: ['', Validators.required],
      Prenom_Participant: ['', Validators.required],
      Matricule: ['', Validators.required],
      Fonction: ['', Validators.required],
      Direction: ['', Validators.required],
      QuestionA: ['', Validators.required],
      Lesquelles: ['', Validators.required],
      PourqouiA: ['', Validators.required],
      PourquoiB: ['', Validators.required],
      Autres1: ['', Validators.required],
      Autres2: ['', Validators.required],
      QuestionB: ['', Validators.required],
      QuestionC: ['', Validators.required],
      Comment: ['', Validators.required],
      Commentaire1: ['', Validators.required],
      Commentaire2: ['', Validators.required],
      Commentaire3: ['', Validators.required],
      check:['', Validators.required],
     });
     registerEvaluationFroid(SelectedUserValue){
      var evaluation={
      Theme:this.EvaluationFroidModel.value.Theme,
      Lieu:this.EvaluationFroidModel.value.Lieu,
       Organisme:this.EvaluationFroidModel.value.Organisme,
       Formateur:this.EvaluationFroidModel.value.Formateur,
       Date_Evaluation_Froid:this.EvaluationFroidModel.value.Date_Evaluation_Froid,
       Date_Debut: this.EvaluationFroidModel.value.Date_Debut,
       Date_Fin: this.EvaluationFroidModel.value.Date_Fin,
       Nom_Participant: this.EvaluationFroidModel.value.Nom_Participant,
       Prenom_Participant: this.EvaluationFroidModel.value.Prenom_Participant,
       Matricule: this.EvaluationFroidModel.value.Matricule,
       Fonction: this.EvaluationFroidModel.value.Fonction,
       Direction: this.EvaluationFroidModel.value.Direction,
       question_A:this.EvaluationFroidModel.value.question_A,
       Lesquelles: this.EvaluationFroidModel.value.Lesquelles,
       PourquoiA: this.EvaluationFroidModel.value.PourquoiA,
       PourquoiB: this.EvaluationFroidModel.value.PourquoiB,
       Autres1:this.EvaluationFroidModel.value.Autres1,
       Autres2:this.EvaluationFroidModel.value.Autres2,
       question_C:this.EvaluationFroidModel.value.question_C,
       question_B: this.EvaluationFroidModel.value.question_B,
       Comment: this.EvaluationFroidModel.value.Comment,
       Commentaire1: this.EvaluationFroidModel.value.Commentaire1,
      
       
      }
      console.log( this.EvaluationFroidModel.value.Date_Fin)
      console.log(this.EvaluationFroidModel.value.question_B)
    //  return(evaluation) EvaluationFroidParticipant
    var id=SelectedUserValue[1]
    console.log(SelectedUserValue[0])
     return this.http.post('https://localhost:44385/api/EvaluationFroidParticipant/RegisterEvaluationFroidParticipant/'+ SelectedUserValue[0], evaluation);
      
     }
     registerCompetenceEvaluationFroid(){
      var evaluation={
        Competence:this.CompetenceEvalFroidModel.value.Competence,
        Niveau_actuel:this.CompetenceEvalFroidModel.value.Niveau_actuel,
        Degre:this.CompetenceEvalFroidModel.value.Degre,
        Critere10:this.CompetenceEvalFroidModel.value.Critere10,
        Niveau_acquis:this.CompetenceEvalFroidModel.value.Niveau_acquis
       }
      return this.http.post('https://localhost:44385/api/EvaluationFroid/RegisterComtepenceEvaluation', evaluation);

     }


     registerEvaluationChaud(){
      
      var evaluation={
       Theme:this.EvaluationChaud.value.Theme,
       Lieu:this.EvaluationChaud.value.Lieu,
       Organisme:this.EvaluationChaud.value.Organisme,
       Formateur:this.EvaluationChaud.value.Formateur,
       Date_Evaluation_Froid:this.EvaluationChaud.value.Date_Evaluation_Froid,
       Date_Debut: this.EvaluationChaud.value.Date_Debut,
       Date_Fin: this.EvaluationChaud.value.Date_Fin,
       Nom_Participant: this.EvaluationChaud.value.Nom_Participant,
       Prenom_Participant: this.EvaluationChaud.value.Prenom_Participant,
       Matricule: this.EvaluationChaud.value.Matricule,
       Fonction: this.EvaluationChaud.value.Fonction,
       Direction: this.EvaluationChaud.value.Direction,
       question_A:this.EvaluationChaud.value.question_A,
       Lesquelles: this.EvaluationChaud.value.Lesquelles,
       PourquoiA: this.EvaluationChaud.value.PourquoiA,
       PourquoiB: this.EvaluationChaud.value.PourquoiB,
       Commentaire1: this.EvaluationChaud.value.PourquoiB,
       Commentaire2: this.EvaluationChaud.value.PourquoiB,
       Commentaire3: this.EvaluationChaud.value.PourquoiB,
       Score_Evaluation:this.resultat,
       Score_Satisfaction:this.resultats ,
      }
      console.log(this.resultat);
      console.log(this.resultats);
 // this.progress.EvalFormateur(evaluation);
 //return (evaluation)
     // console.log(res);
    // return this.afAuth.auth.currentUser.uid
    // return this.router.parseUrl('/layout.component.html');
     return this.http.post('https://localhost:44385/api/EvaluationChaud/RegisterEvaluationChaud', evaluation);
     }

     envoiyer(formData){
       console.log(formData.Theme)
return(formData)
     }


     getEvaluationFroidParticipant(){
      this.http.get(this.BaseURI  + '/EvaluationFroidParticipant/GetEvaluationFroidParticipant').toPromise().then(
        res=>{
          this.EvaluationFroidParticipant = res as Evaluation_Participant[];
          console.log(this.EvaluationFroidParticipant);
       //  this.users = data.json();
       
        }

      )
      var elem:any
      for(var element in this.EvaluationFroidParticipant ){
        elem=element
      }
      return(elem)
    }
    users = JSON.parse(localStorage.getItem('users')) ;
    payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    getEvaluationParticipant(){
      this.http.get('https://localhost:44385/api/EvaluationFroidParticipant/GetEvaluationParticipant/'+this.payLoad.UserID).toPromise().then(
        res=>{
          this.EvaluationFroidParticipant = res as Evaluation_Participant[];
          console.log(this.EvaluationFroidParticipant);
        }
      )
    }

    registerSuiteEvaluationFroid(Evaluation){
    var evaluation={
      Theme:Evaluation.theme,
      Lieu:Evaluation.lieu,
       Organisme:Evaluation.organisme,
       Formateur:Evaluation.formateur,
       Date_Evaluation_Froid:Evaluation.date_Evaluation_Froid,
       Date_Debut: Evaluation.date_Debut,
       Date_Fin: Evaluation.date_Fin,
       Nom_Participant: Evaluation.nom_Participant,
       Prenom_Participant: Evaluation.prenom_Participant,
       Matricule: Evaluation.matricule,
       Fonction: Evaluation.fonction,
       Direction: Evaluation.direction,
       question_A:Evaluation.question_A,
       Lesquelles: Evaluation.lesquelles,
       PourquoiA: Evaluation.pourquoiA,
       PourquoiB: Evaluation.PourquoiB,
       Autres1:Evaluation.autres1,
       Autres2:Evaluation.autres2,
       question_C:Evaluation.question_C,
       question_B: Evaluation.question_B,
       Comment: Evaluation.Comment,
       Commentaire1: Evaluation.Commentaire1,
       Critere1: this.EvaluaFroidModel.value.Critere1,
       Critere2: this.EvaluaFroidModel.value.Critere2,
       Critere3: this.EvaluaFroidModel.value.Critere3,
       Critere4: this.EvaluaFroidModel.value.Critere4,
       Critere5: this.EvaluaFroidModel.value.Critere5,
       Critere6: this.EvaluaFroidModel.value.Critere6,
       Critere7: this.EvaluaFroidModel.value.Critere7,
       Critere8: this.EvaluaFroidModel.value.Critere8,
       Critere9: this.EvaluaFroidModel.value.Critere9,
      Sinon:this.EvaluaFroidModel.value.Sinon, 
    }
    console.log(Evaluation.theme)
    return this.http.post('https://localhost:44385/api/EvaluationFroid/RegisterEvaluationFroid"', evaluation);
    }
  }


  //  Critere1: this.EvaluationFroidModel.value.Critere1,
  //Critere3:this.EvaluationFroidModel.value.Critere3,
 // Critere2:this.EvaluationFroidModel.value.Critere2,
 // Critere4:this.EvaluationFroidModel.value.Critere4,
 // Critere5:this.EvaluationFroidModel.value.Critere5,
 // Critere6: this.EvaluationFroidModel.value.Critere6,
 // Critere7:this.EvaluationFroidModel.value.Critere7,
 // Critere8:this.EvaluationFroidModel.value.Critere8,
 // Critere9:this.EvaluationFroidModel.value.Critere9,
 // Sinon:this.EvaluationFroidModel.value.Sinon,




 //Critere1: ['', Validators.required],
 //Critere3: ['', Validators.required],
 //Critere2: ['', Validators.required],
 //Critere4: ['', Validators.required],
 //Critere5: ['', Validators.required],
 //Critere6: ['', Validators.required],
 //Critere7: ['', Validators.required],
 //Critere8: ['', Validators.required],
 //Critere9: ['', Validators.required],
 //Sinon: ['', Validators.required],