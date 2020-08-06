import {Component, OnInit} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';
import { FormationService } from '../../shared/formation.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Besoin_Collecte } from '../../Models/besoin_collecte.model';
@Component({
  selector: 'app-list-groups',
  templateUrl: './list-groups.component.html',
  styles: []
})
export class ListGroupsComponent implements OnInit {

  heading = 'List Groups';
  subheading = 'These can be used with other components and elements to create stunning and unique new elements for your UIs.';
  icon = 'pe-7s-paint icon-gradient bg-sunny-morning';

  constructor(private sanitizer: DomSanitizer,private modalService: NgbModal, public formation: FormationService, private toastr: ToastrService) {
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
    this.formation.GetAllBesoinCollecte();
    this.resetForm();
  }
  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.formation.EtatFormation = {
      id:'',
      intitule_Formation: '',
      justification_du_besoin: '',
      nombre_de_participants:'',
      activite:'',
      priorite: '',
      organisme_de_formation:'',
      date_Debut:null, 
      date_Fin:null,
      type_de_formation: '',
      nombre_de_jours:0,
      duree: '',
      cout_unitaire:0,
      frais_de_deplacement:0,
      cout_Totale_previsionnel:0,
      imputation:0, 
      bareme_TFP: '',
      montant_recuperer:0

    }
  }
  //maDate.getDate()
  Edit(item: Besoin_Collecte){
   
      this.formation.EtatFormation = Object.assign({}, item);
      console.log(item.id);
   
  }

  RegisterEtatFormation(){
    /*this.formation.PostEtatFormation()
    .subscribe( 
      res => {
        console.log("apres subscribe");
        console.log("res",res)
        this.toastr.success("Formation ajouté avec succées")
        if (res) {
         

          // // this.formation.formModele.reset();
          this.toastr.success('New user created!','Registration successful.');
       // // this.formation.refreshList();

      } 
    },err=>{
      console.log(err)
  })

*/
this.formation.registerFormation();


   
   this.formation.formModele.reset();
   
  }

  formatsDateTest: string[] = [
    'dd/MM/yyyy',
    
    ];
    today= new Date();
}
