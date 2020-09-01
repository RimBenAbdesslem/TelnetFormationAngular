import {Component, OnInit, Input, HostBinding, Pipe} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EvaluationService } from '../../shared/evaluation.service';
import { NgForm, FormBuilder ,Validators,FormControl,FormsModule,FormGroup} from '@angular/forms';
import {NgbPanelChangeEvent} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FormationService } from '../../shared/formation.service';
import { NotificationService } from '../../shared/Notification.service';
import { Evaluation_Participant } from '../../Models/evaluation_participant.model';
import { CompetenceService } from '../../shared/competence.service';
import { DirecteureActiviteCompetenceService } from '../../shared/DirecteureActiviteCompetence.service';
//import { NgSelectModule } from '@ng-select/ng-select';
@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
})
@Pipe({
  name: 'filterBy',
  pure: false
})
export class ProgressBarComponent implements OnInit {

  height = '20px';

  heading = 'Progress Bar';
  subheading = 'You can use the progress bars on their own or in combination with other widgets.';
  icon = 'pe-7s-filter icon-gradient bg-grow-early';

  constructor(public notification: NotificationService, public DACompetence: DirecteureActiviteCompetenceService,public competence: CompetenceService,private fb: FormBuilder,private modalService: NgbModal, public formation: FormationService, public evaluation: EvaluationService , private toastr: ToastrService) {
  }
  open(content) {
    this.modalService.open(content).result.then((result) => {
     // this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
 
  openLarge(content) {
    this.modalService.open(content, {
      size: 'lg'
    });
  }
  @HostBinding('class.isActive')
  get isActiveAsGetter() {
    return this.isActive;
  }

  public isActive: any;
  ActiviteFilter: any = { theme: '' };
 // @Input() ParentData
  //=this.evaluation.envoiyer().value.Theme
  parentFormateur(){
    //console.log(this.evaluation.registerEvaluationFroid().Formateur)
   // this.ParentData =this.evaluation.registerEvaluationFroid().Formateur
  }
  tabLabActivite:any[];
  ngOnInit() {
   // var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
   // this.competence.getUserConnecte(payLoad.UserID);
   
    this.formation.GetAllBesoinCollecte();
    this.notification.getAllUsersTrue();
  //  this.evaluation.getEvaluationFroidParticipant();
    this.evaluation.getEvaluationParticipant();
    this.competence.GetAllLabels();
    this.resetForm();
       //////////////////////////
   this.DACompetence.getListeActivite(this.payLoad.UserID);
   this.DACompetence.getlisteuser(this.payLoad.UserID);
   this.DACompetence.getAllActivite(this.payLoad.UserID);
   this.DACompetence.getActiviteMetierUser(this.payLoad.UserID);
   this.DACompetence.get(this.payLoad.UserID);
   this.DACompetence.AllActiviteMetier.map(p =>{
     console.log(this.tabLabActivite.indexOf(p));
     if(this.tabLabActivite.indexOf(p.userId) ==this.payLoad.UserID  ) 
     this.tabLabActivite.push(p.activiteId);
  console.log(this.tabLabActivite)
   })  
   for(var i in this.competence.AllActiviteMetier){
     if(this.competence.AllActiviteMetier[i].userId==this.payLoad.UserID){
 
     }
   }
   this.DACompetence.GetDomaineActivite(this.payLoad.UserID);
   this.DACompetence.GetLabel(this.payLoad.UserID);
   this.DACompetence.GetAllActiviteMetier();
  }
  public isCollapsed = false;
list: any=this.evaluation.EvaluationFroidParticipant
  public beforeChange($event: NgbPanelChangeEvent) {

    if ($event.panelId === 'preventchange-2') {
      $event.preventDefault();
    }

    if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
      $event.preventDefault();
    }
  };

  editField: string;
  personList: Array<any> = [
  { id: '', name: '', age: '', companyName: '', country: '', city: '' },
  ];

  awaitingPersonList: Array<any> = [
    { id: '', name: '', age: '', companyName: '', country: '', city: '' },
    { id: '', name: '', age: '', companyName: '', country: '', city: ' ' },
    { id: '', name: '', age: '', companyName: '', country: '', city: '' },
    { id: '', name: '', age: '', companyName: '', country: '', city: '' },
    { id: '', name: '', age: '', companyName: '', country: '', city: '' },
  ];

  updateList(id: number, property: string, event: any) {
    const editField = event.target.textContent;
    this.personList[id][property] = editField;
  }
  changeSelect(user,label,niveau){
    console.log("user :  ",user)
    console.log("label :  ",label)
    niveau = Number(niveau)
    console.log("niveau :  ",niveau)
    console.log("user.level :",user.level);

   //let level = user.Level.find(x=>x.labelId == label.labelId)
  // let metierId = level? level.metierId : null
    console.log("metierId : ",label.metierId);

    this.competence.editLevel(label.metierId,niveau)
    .subscribe(res=>{
      console.log("res : ",res)
    })
    

  }
  getchoixUserLabelSumActivite(user,domaine,activite)
  {
  //   console.log(user.id);
  //  console.log(activMetId);
  
      for(var i in this.DACompetence.listeMetierActivite){
      
      if(this.DACompetence.listeMetierActivite[i].activiteId==activite.id && this.DACompetence.listeMetierActivite[i].domaineId== domaine.domaineId && this.DACompetence.listeMetierActivite[i].userId==user.id){
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
  remove() {
   // this.awaitingPersonList.push(this.personList[id]);
  //  this.personList.splice(id, 1);
  this.evaluation.registerCompetenceEvaluationFroid().subscribe()
  }
  getUserLabelSum(user,label){
    console.log(label.labelId)
    if (user.Level) {
      let res = user.Level.find(x=>x.labelId == label.labelId )
  //console.log(user.Level)
      return res? res.niveau : 0
    }else{
      return 0
    }
  }
  getItems( id) {
    return this.competence.LabeList.filter((item) =>
     item.domaineId === id);
  }
  add() {
   // this.evaluation.CompetenceEvalFroidModel.reset();
    if (this.awaitingPersonList.length > 0) {
      const person = this.awaitingPersonList[0];
      this.personList.push(person);
      this.awaitingPersonList.splice(0, 1);
    }
  }

 
  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }
  users = JSON.parse(localStorage.getItem('users')) ;
  payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
  changeValueID(event){
    console.log(this.payLoad);
console.log(this.payLoad.role);
console.log(this.payLoad.UserID);

  }
  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.evaluation.EvaluationData = {
      id:0,
     theme: '',
     lieu: '',
    organisme: '',
    formateur:'',
    nom_Participant: '',
    prenom_Participant: '',
    date_Debut:new Date,
    date_Fin:new Date,
    matricule: '',
    direction:0,
    date_Evaluation_Froid: '',
    question_A: '',
    question_B: '',
    question_C: '',
    lesquelles: '',
    pourquoiA: '',
    autres1: '',
    Comment: '',
    PourquoiB: '',
    Commentaire1: '',

    }
  }
  populateForm(item: Evaluation_Participant) {
    this.evaluation.EvaluationData = Object.assign({}, item);
  //  this.competence.getUserRole(item.id);
    console.log(item.id);
  }
  Register(evaluation){
    console.log(evaluation.idParticipant);
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    this.competence.getUserParticipant(evaluation.idParticipant);
    this.DACompetence.getParticipantusersTrue(evaluation.idParticipant);
    this.DACompetence.getListeActivite(evaluation.idParticipant);
    this.DACompetence.getlisteuser(evaluation.idParticipant);
    this.DACompetence.getAllActivite(evaluation.idParticipant);
    this.DACompetence.getActiviteMetierUser(evaluation.idParticipant);
    this.DACompetence.get(evaluation.idParticipant);
    
   
    this.DACompetence.GetDomaineActivite(evaluation.idParticipant);
    this.DACompetence.GetLabel(evaluation.idParticipant);
    this.DACompetence.GetAllActiviteMetier();
    this.evaluation.registerSuiteEvaluationFroid(evaluation).subscribe()
    this.evaluation.EvaluaFroidModel.reset();
    
  }


 
 
}
