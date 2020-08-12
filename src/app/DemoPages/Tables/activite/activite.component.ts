import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormationService } from '../../shared/formation.service';
import { ToastrService } from 'ngx-toastr';
import { CompetenceService } from '../../shared/competence.service';

@Component({
  selector: 'app-activite',
  templateUrl: './activite.component.html',
  styleUrls: ['./activite.component.sass']
})
export class ActiviteComponent implements OnInit {

  constructor(private modalService: NgbModal,public competence: CompetenceService,public formation: FormationService, private toastr: ToastrService) { }
 
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

  ngOnInit() {
    this.competence.getAllActivite();
    this.competence.getAllUsersTrue();

    this.competence.GetAllDomaine();
    this.competence.GetAllLabels();
   // this.resetForm();
  }
  userId:string
  ValueChangeuser(event) {
    this.userId=event.target.value;
  console.log( this.userId);
}
  domaineId:number
  ValueChangeDomaine(event){
    this.domaineId=event.target.value;
    console.log( this.domaineId);
  }
  activiteId:number
  ValueChangeActivite(event){
    this.activiteId=event.target.value;
    console.log( this.activiteId);
  }
  labelId:number
  ValueChangeLabel(event){
    this.labelId=event.target.value;
    console.log( this.labelId);
  }
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

  openLarge(content) {
    this.modalService.open(content, {
      size: 'lg'
    });
  }
  AjouterActivite(){
    this.formation.ajouteracticite().subscribe(
      (res: any) => {
        if (res.succeeded) {
          this.toastr.success('Activité bien Ajouté!', '');
        }
      },

    );
    this.formation.ActiviteModel.reset();
  }
  RegisterCompetenceActivite(){
    this.competence.registerCompetenceActivite( this.domaineId,this.labelId, this.activiteId,this.userId).subscribe(
      (res: any) => {
            if (res.succeeded) {
              this.toastr.success('Nouveau Compétence!','Bien ajouté.');
            } 
          },
        );
  }
  Register(){
    this.competence.registerListeActivite( this.domaineId,this.labelId, this.activiteId).subscribe(
      (res: any) => {
            if (res.succeeded) {
              this.toastr.success('Nouveau Compétence!','Bien ajouté.');
            } 
          },
        );
  }
  onDeleteActivite(id){
    this.competence.onDeleteActivite(id).subscribe(
      (res: any) => {
            if (res.succeeded) {
              this.toastr.success('Activite supprimer avec succés','');
            } 
          },
        );
        this.competence.refreshListeActivite();
  }
  populateForm(activite: any) {
    this.competence.GetListeActivite(activite.id);
    this.competence.formDataActivite = Object.assign({}, activite);
  //  this.competence.getUserRole(item.id);
    console.log(activite.id);
    console.log(activite.nomActivite);
  }
  DeletelabelActivite(listActivId){
    this.competence.deletelabelActivite(listActivId).subscribe(
      (res: any) => {
            
              this.toastr.success('Activite supprimer avec succés','');
           
          },
        );
        this.competence.refreshActivite(listActivId);
  }
}
