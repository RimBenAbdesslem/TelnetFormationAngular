import {Component, OnInit} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { EvaluationService } from '../../shared/evaluation.service';

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
})
export class ModalsComponent implements OnInit {

  heading = 'Modals';
  subheading = 'Wide selection of modal dialogs styles and animations available.';
  icon = 'pe-7s-phone icon-gradient bg-premium-dark';

  closeResult: string;

  constructor(private modalService: NgbModal,public evaluation: EvaluationService) {
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openCentred(content) {
    this.modalService.open(content, {centered: true});
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

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit() {
    //this.evaluation.EvaluationChaud.reset();
  }
  total:number=0
  CalculerTotaleEvaluation(){
   console.log(this.evaluation.EvaluationFournisseur.value.Conformite) 
   console.log(this.evaluation.EvaluationFournisseur.value.Respect_consultation) 
   console.log(this.evaluation.EvaluationFournisseur.value.Qualite) 
   console.log(this.evaluation.EvaluationFournisseur.value.Certification) 
   console.log(this.evaluation.EvaluationFournisseur.value.Coherence) 
   console.log(this.evaluation.EvaluationFournisseur.value.Conditions) 
   console.log(this.evaluation.EvaluationFournisseur.value.Politique) 
   console.log(this.evaluation.EvaluationFournisseur.value.Respect_livraison) 
   console.log(this.evaluation.EvaluationFournisseur.value.Respect_consultation) 
    this.total= this.total+Number(this.evaluation.EvaluationFournisseur.value.Conformite)
    this.total= this.total+Number(this.evaluation.EvaluationFournisseur.value.Qualite)
    this.total= this.total+Number(this.evaluation.EvaluationFournisseur.value.Certification)
    this.total= this.total+Number(this.evaluation.EvaluationFournisseur.value.Coherence)
    this.total= this.total+Number(this.evaluation.EvaluationFournisseur.value.Conditions)
    this.total= this.total+Number(this.evaluation.EvaluationFournisseur.value.Politique)
    this.total= this.total+Number(this.evaluation.EvaluationFournisseur.value.Respect_consultation)
    this.total= this.total+Number(this.evaluation.EvaluationFournisseur.value.Respect_livraison)
  
  }
  FournisseurRetenu(){
   
     console.log(this.total);
     this.evaluation.AddEvaluationFournisseur(this.total)
   .subscribe(res => {
     //debugger;
    // this.evaluation.resetform();
   //  this.toastr.warning('Deleted successfully', 'user Register');
   },
     err => {
    //   debugger;
       console.log(err);
     })
  }
}
