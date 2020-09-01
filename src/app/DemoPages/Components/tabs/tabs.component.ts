import {Component, OnInit} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EvaluationService } from '../../shared/evaluation.service';
import { NgForm } from '@angular/forms';
import {NgbPanelChangeEvent} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FormationService } from '../../shared/formation.service';
import { NotificationService } from '../../shared/Notification.service';
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
})
export class TabsComponent implements OnInit {

  heading = 'Tabs';
  subheading = 'Tabs are used to split content between multiple sections. Wide variety available.';
  icon = 'pe-7s-drawer icon-gradient bg-happy-itmeo';

  currentJustify = 'start';
  currentJustify2 = 'center';
  currentJustify3 = 'start';

  currentOrientation = 'horizontal';

  constructor( public notification: NotificationService,private modalService: NgbModal, public formation: FormationService, public evaluation: EvaluationService , private toastr: ToastrService) {
  }
  


 
  openLarge(content) {
    this.modalService.open(content, {
      size: 'lg'
    });
  }

  ngOnInit() {
    this.formation.GetAllBesoinCollecte();
    this.notification.getAllUsersTrue();
    this.formation.GetAllBesoin();
  }


  public isCollapsed = false;

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
  SelectedUserValue: any = [];
  UserChangeValue(event) {
    let index = this.SelectedUserValue.indexOf(event.target.value);
    console.log(index);
    if (index == -1) {
      this.SelectedUserValue.push(event.target.value);
    } else {
      this.SelectedUserValue.splice(index, 1);
    }
    console.log(this.SelectedUserValue);
  }
  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }
   id: string
  getItemId(item){
    console.log(item.id)
    this.id= item.id
  }
  variable:string
  SelectUser(event){
    console.log(event.target.value);
    this.variable=event.target.value;
  }
  onSubmit(){

    console.log(this.SelectedUserValue);
    console.log(this.variable);
    this.evaluation.registerEvaluationFroid(this.SelectedUserValue,this.variable)
   .subscribe(
      (res: any) => {
       if (res.succeeded) {
          this.toastr.success('New user created!','Registration successful.');
        } 
     },
     
    );
    this.evaluation.EvaluationFroidModel.reset();
  }

 


}
