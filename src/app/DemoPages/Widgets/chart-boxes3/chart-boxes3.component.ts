import {Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgStyle } from '@angular/common';
import { CompetenceService } from '../../shared/competence.service';
import { ToastrService } from 'ngx-toastr';
import {NgbPanelChangeEvent} from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { Labels } from '../../Models/labels.mode';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Domaine } from '../../Models/domaine.model';
@Component({
  selector: 'app-chart-boxes3',
  templateUrl: './chart-boxes3.component.html',
  styles: []
})
export class ChartBoxes3Component implements OnInit {

  heading = 'Chart Boxes III';
  subheading = 'Highly configurable boxes best used for showing numbers in an user friendly way.';
  icon = 'pe-7s-wallet icon-gradient bg-plum-plate';

  constructor(private modalService: NgbModal,private http: HttpClient,public competence: CompetenceService, private toastr: ToastrService) {
 

   
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



  open(content) {
    this.modalService.open(content).result.then((result) => {
     
    }, (reason) => {
    
    });
  }

  openCentred(content) {
    this.modalService.open(content, { centered: true });
  }

  openSmall(content1) {
    this.modalService.open(content1, {
      size: 'sm'
    });
  }

  openLarge(content){
    this.modalService.open(content, {
      size: 'lg'
    });
  }
 

  
  ngOnInit() {

    this.competence.getAllUsersTrue();

    this.competence.GetAllDomaine();
    this.competence.GetAllLabels();
    this.resetForm();
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `http://swimlane.github.io/ngx-datatable/assets/data/company.json`);

    req.onload = () => {
      const data = JSON.parse(req.response);
      cb(data);
    };

    req.send();
  }

  editField: string;
  personList: Array<any> = [
    { id: 1, Domaine: '', Niveau: 0, Label: '' },
  
  ];
  CompUserList: Array<any> = [
    { id: 1, Domaineid: '', userId: "", LabelId: '', Niveau: 0 },
  
  ];
  awaitingPersonList: Array<any> = [
    { id: 2, Domaine: '', Niveau: 0, Label: ''  },
    { id: 3, Domaine: '', Niveau: 0, Label: ''  },
    { id: 4, Domaine: '', Niveau: 0, Label: ''  },
    { id: 5, Domaine: '', Niveau: 0, Label: '' },
    { id: 6, Domaine: '', Niveau: 0, Label: '' },
    { id: 7, Domaine: '', Niveau: 0, Label: ''  },
    { id: 8, Domaine: '', Niveau: 0, Label: ''  },
    { id: 9, Domaine: '', Niveau: 0, Label: ''  },
    { id: 10,Domaine: '', Niveau: 0, Label: ''  },
    { id: 11,Domaine: '', Niveau: 0, Label: '' },
    { id: 12,Domaine: '', Niveau: 0, Label: ''  },
    { id: 13,Domaine: '', Niveau: 0, Label: ''  },
    { id: 14,Domaine: '', Niveau: 0, Label: ''  },
    { id: 15,Domaine: '', Niveau: 0, Label: ''  },
    { id: 16,Domaine: '', Niveau: 0, Label: '' },
    { id: 17,Domaine: '', Niveau: 0, Label: ''  },
    { id: 18,Domaine: '', Niveau: 0, Label: ''  },
    { id: 19,Domaine: '', Niveau: 0, Label: ''  },
    { id: 20,Domaine: '', Niveau: 0, Label: ''  },
  ];

  updateList(id: number, property: string, event: any) {
    const editField = event.target.textContent;
    this.personList[id][property] = editField;
  }
  
  remove(id: any) {
 
    this.awaitingPersonList.push(this.personList[id]);
    this.personList.splice(id, 1);
 //   console.log(this.SelectedValue);
  
 //   this.competence.removeCompetence(this.SelectedValue).subscribe(
    //  (res: any) => {
    //    if (res.succeeded) {
        
  //      } 
 //     },
     
  //  );
  //  this.competence.CompetenceModel.reset();  
  }

  add() {
    if (this.awaitingPersonList.length > 0) {
      const person = this.awaitingPersonList[0];
      this.personList.push(person);
      this.awaitingPersonList.splice(0, 1);
    }
  }
  userData: any[] = [];
  userList1 : any[]= []
  lastkeydown1: number = 0;
  subscription: any;
  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.competence.formData = {
      DomaineId:null,
      NomDomaine: '',

    }
  }
  getUserIdsFirstWay($event) {
    let userId = (<HTMLInputElement>document.getElementById('userIdFirstWay')).value;
    this.userList1 = [];
  
    if (userId.length > 2) {
      if ($event.timeStamp - this.lastkeydown1 > 200) {
        this.userList1 = this.searchFromArray(this.userData, userId);
      }
    }
  }  
  
  searchFromArray(arr, regex) {
    let matches = [], i;
    for (i = 0; i < arr.length; i++) {
      if (arr[i].match(regex)) {
        matches.push(arr[i]);
      }
    }
    return matches;
  };



  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }
  domaineId:number
  ValueChange(event){
    this.domaineId=event.target.value;
    console.log( this.domaineId);
  }

  RegisterDomaine(){
    console.log();
    this.competence.registerDomaine().subscribe(
      (res: any) => {
        if (res.succeeded) {
          this.toastr.success('Nouveau Domaine!','Bien ajouté.');
        } 
      },
     
    );
    this.competence.DomaineModel.reset();
  }


  SelectedValue: any = [];
  userId:number
  DomaineId:number
  LabelId:number 
  ValueChangeDomaine(event) {
     this.DomaineId=event.target.value;
    console.log( this.DomaineId);}
  ValueChangeLabel(event) {
     this.LabelId=event.target.value;
     console.log( this.LabelId);
    }
  ValueChangeuser(event) {
      this.userId=event.target.value;
    console.log( this.userId);
  }
  RegisterCompetenceUser(){
    this.competence.registerCompetenceUser( this.DomaineId,this.LabelId, this.userId).subscribe(
  (res: any) => {
        if (res.succeeded) {
          this.toastr.success('Nouveau Compétence!','Bien ajouté.');
        } 
      },
    );
   // this.competence.refreshList();
  }
  RegisterCompetence(){
    console.log(this.SelectedValue);
    this.competence.registerCompetence(this.domaineId)
    .subscribe(
      
      (res: any) => {
        if (res.succeeded) {
         this.toastr.info('Nouveau Compétence!','Bien ajouté.');
          this.toastr.success('Nouveau Compétence!','Bien ajouté.');

        } 
      },
    
    );
    this.competence.refreshList();
  }

  populateForm(item: Domaine) {
    this.competence.formData = Object.assign({}, item);
  //  this.competence.getUserRole(item.id);
    console.log(item.DomaineId);
  }
  onSubmit(form: NgForm,domaineId){
    this.competence.ModifierDomaine(domaineId).subscribe(
      res => {
        this.resetForm(form);
        this.toastr.info('Modification effectuée avec succès', '');
        this.competence.refreshList1();
      },
      err => {
        console.log(err);
      }
    )
  }
  onDelete(id){
    if (confirm('Voulez-vous vraiment supprimer cet enregistrement ?')) {
      this.competence.deleteDomaine(id)
        .subscribe(res => {
          debugger;
          this.competence.refreshList();
          this.toastr.warning('Succé', 'Domaine supprimé avec succé');
        },
          err => {
            debugger;
            console.log(err);
          })
    }

  }
}
