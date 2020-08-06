import {Component, OnInit, Input} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EvaluationService } from '../../shared/evaluation.service';
import { NgForm, FormBuilder ,Validators,FormControl,FormsModule,FormGroup} from '@angular/forms';
import {NgbPanelChangeEvent} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FormationService } from '../../shared/formation.service';
import { NotificationService } from '../../shared/Notification.service';
import { Evaluation_Participant } from '../../Models/evaluation_participant.model';
//import { NgSelectModule } from '@ng-select/ng-select';
@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
})
export class ProgressBarComponent implements OnInit {

  height = '20px';

  heading = 'Progress Bar';
  subheading = 'You can use the progress bars on their own or in combination with other widgets.';
  icon = 'pe-7s-filter icon-gradient bg-grow-early';

  constructor(public notification: NotificationService,private fb: FormBuilder,private modalService: NgbModal, public formation: FormationService, public evaluation: EvaluationService , private toastr: ToastrService) {
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
 // @Input() ParentData
  //=this.evaluation.envoiyer().value.Theme
  parentFormateur(){
    //console.log(this.evaluation.registerEvaluationFroid().Formateur)
   // this.ParentData =this.evaluation.registerEvaluationFroid().Formateur
  }
  ngOnInit() {
    this.formation.GetAllBesoinCollecte();
    this.notification.getAllUsersTrue();
  //  this.evaluation.getEvaluationFroidParticipant();
    this.evaluation.getEvaluationParticipant();
    this.resetForm();
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

  remove() {
   // this.awaitingPersonList.push(this.personList[id]);
  //  this.personList.splice(id, 1);
  this.evaluation.registerCompetenceEvaluationFroid().subscribe()
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
    this.evaluation.registerSuiteEvaluationFroid(evaluation).subscribe()
  }


 
 
}
