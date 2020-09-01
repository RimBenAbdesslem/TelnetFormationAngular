import { Component, OnInit, HostBinding, Pipe } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../../shared/Notification.service';
import { DirecteureActiviteCompetenceService } from '../../shared/DirecteureActiviteCompetence.service';
import { CompetenceService } from '../../shared/competence.service';
import { FormBuilder } from '@angular/forms';
import { NgbModal, NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { FormationService } from '../../shared/formation.service';
import { EvaluationService } from '../../shared/evaluation.service';

@Component({
  selector: 'app-evaluation-da',
  templateUrl: './evaluation-da.component.html',
  styleUrls: ['./evaluation-da.component.sass']
})
@Pipe({
  name: 'filterBy',
  pure: false
})
export class EvaluationDAComponent implements OnInit {

  constructor(public notification: NotificationService, public DACompetence: DirecteureActiviteCompetenceService,public competence: CompetenceService,private fb: FormBuilder,private modalService: NgbModal, public formation: FormationService, public evaluation: EvaluationService , private toastr: ToastrService) { }

  ngOnInit() {
    this.formation.GetAllBesoinCollecte();
    this.notification.getAllUsersTrue();
  //  this.evaluation.getEvaluationFroidParticipant();
    this.evaluation.getEvaluationChaudDirecteur();
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
}
