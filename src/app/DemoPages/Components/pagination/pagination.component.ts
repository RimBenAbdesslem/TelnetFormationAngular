import {Component, OnInit} from '@angular/core';
import { CompetenceService } from '../../shared/competence.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
})
export class PaginationComponent implements OnInit {
  niveau;
  labelid;
  heading = 'Pagination';
  subheading = 'Basic and dynamic pagination for use in your next awesome application.';
  icon = 'pe-7s-notebook icon-gradient bg-mixed-hopes';

  page = 3;
  page3 = 3;
  page4 = 4;

  currentPage = 4;

  page2 = 5;

  isDisabled = true;

  toggleDisabled() {
    this.isDisabled = !this.isDisabled;
  }

  constructor(public competence: CompetenceService) {
  }
Id : string= this.competence.UserId;
  ngOnInit() {
    console.log(this.Id);
    this.competence.get(this.Id)
    this.competence.getUser(this.Id);
    this.competence.GetLabel(this.Id);
    this.competence.GetDomaineUser(this.Id);
   
  }

}
