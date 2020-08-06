import {Component, OnInit} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormationService } from 'src/app/DemoPages/shared/formation.service';
import { TestBed } from '@angular/core/testing';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styles: []
})
export class LayoutComponent implements OnInit {

  heading = 'Form Layouts';
  subheading = 'Build whatever layout you need with our ArchitectUI framework.';
  icon = 'pe-7s-graph text-success';

  constructor(public formation: FormationService,private modalService: NgbModal,private toastr: ToastrService) {
   
  }
  SelectedValue: any = [];
  
  open(content) {
   // this.CalculerTotaleEvaluation();
    this.modalService.open(content).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
     
    }, (reason) => {
      //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openCentred(content) {
    this.modalService.open(content, { centered: true });
  }

  openSmall(content) {
    this.modalService.open(content, {
      size: 'sm'
    });
  }

  openLarge(content) {
    this.modalService.open(content, {
      size: 'lg'
    });
  }
 
  ngOnInit() {
     
  }
 ValueChange(event) {
    let index = this.SelectedValue.indexOf(event.target.value);
    console.log(index);
    if (index == -1) {
      this.SelectedValue.push(event.target.value);
    } else {
      this.SelectedValue.splice(index, 1);
    }
    console.log(this.SelectedValue);
  }
   test(res){
     for(var i in [1,2,3]){
        res=res+i}
   }
   private res:any=0;
CalculerTotaleEvaluation(){
  //let res:Number=0;
 // this.SelectedValue.forEach(function (value) {
  // console.log(value);
  // this.res=this.res+1;
  // this.test(this.res);
 // });
  for(var i in this.SelectedValue){
    console.log(this.SelectedValue[i]);
    if(this.SelectedValue[i]== "Oui1" || this.SelectedValue[i]== "Oui2"  || this.SelectedValue[i]== "Oui3"
    || this.SelectedValue[i]== "Oui4"  || this.SelectedValue[i]== "Oui5"  || this.SelectedValue[i]== "Oui6" || this.SelectedValue[i]== "Oui7" ){
      this.res=this.res + 2 
     // this.SelectedValue.splice(i, 1)
    }else if( this.SelectedValue[i]== "Bon1" ||this.SelectedValue[i]== "Bon2" ||this.SelectedValue[i]== "Bon3" ||
    this.SelectedValue[i]== "Bon4" || this.SelectedValue[i]== "Bon5" || this.SelectedValue[i]== "Bon6" ||
    this.SelectedValue[i]== "Bon7" || this.SelectedValue[i]== "Bon8" ){ 
      this.res=this.res + 3
      //this.SelectedValue.splice(i, 1)
    }
    else if( this.SelectedValue[i]== "Moyen1" ||this.SelectedValue[i]== "Moyen2" ||this.SelectedValue[i]== "Moyen3" ||
    this.SelectedValue[i]== "Moyen4" || this.SelectedValue[i]== "Moyen5" || this.SelectedValue[i]== "Moyen6" ||
    this.SelectedValue[i]== "Moyen7" || this.SelectedValue[i]== "Moyen8" ){ 
      this.res=this.res + 1
    }else{
      this.res=this.res + 0
     // this.SelectedValue.splice(i, 1)
    }
   
  }
  this.SelectedValue= [];
  this.deleteListe(this.SelectedValue);
  console.log(this.res)
  this.formation.envoyer(this.res)
  console.log(this.formation.resultat);
  this.deleteListe(this.SelectedValue);

  this.deleteListe(this.SelectedValue);
  console.log( this.SelectedValue)
  return(this.formation.resultat);
}
 deleteListe(SelectedValue){
  for(var i in SelectedValue){
    console.log(i);
    SelectedValue.splice(i, 1);
  }
 }

AjouterOrganisme(){
  this.SelectedValue= [];
  this.deleteListe(this.SelectedValue);
  if (this.formation.resultat > 20){
     this.formation.PostOrganisme().subscribe(
    (res: any) => {
        this.toastr.success('Enregistrement avec succée', 'Formateur bien ajouté');
    });
  } else{
    this.toastr.error('Echec', 'Prestataire non reteni');
  }
  this.deleteListe(this.SelectedValue);
    this.formation.OrganismeModel.reset();
}
}
