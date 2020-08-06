import {Component, OnInit} from '@angular/core';
import { FormationService } from 'src/app/DemoPages/shared/formation.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styles: []
})
export class ControlsComponent implements OnInit {

  heading = 'Form Controls';
  subheading = 'Wide selection of forms controls, using the Bootstrap 4 code base, but built with Vue.';
  icon = 'pe-7s-display1 icon-gradient bg-premium-dark';

  constructor( public formation: FormationService, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.formation.GetAllFormateur();
  }


  DeleteFormateur(id) {
    if (confirm('Are you sure to delete this record ?')) {
      this.formation.deleteOrganisme(id)
        .subscribe(res => {
          debugger;
          this.formation.refreshList();
          this.toastr.warning('Deleted successfully', 'user Register');
        },
          err => {
            debugger;
            console.log(err);
          })
    }
  }

}
