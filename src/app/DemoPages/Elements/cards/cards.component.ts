import {Component, ViewChild, TemplateRef} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormationService } from 'src/app/DemoPages/shared/formation.service';
import { ToastrService } from 'ngx-toastr';


const PrimaryWhite = '#fff';
const SecondaryGrey = '#ccc';
const PrimaryRed = 'var(--danger)';
const SecondaryBlue = 'var(--primary)';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styles: []
})
export class CardsComponent {

  heading = 'Cards';
  subheading = 'Wide selection of cards with multiple styles, borders, actions and hover effects.';
  icon = 'pe-7s-stopwatch icon-gradient bg-amy-crisp';

  constructor(private sanitizer: DomSanitizer,private modalService: NgbModal, public formation: FormationService, private toastr: ToastrService) {
  }
  ngOnInit() {
    this.getAllformation();
  }
  open(content) {
    this.modalService.open(content).result.then((result) => {
     
    }, (reason) => {
    
    });
  }

  formationsListing : any =[]
  getAllformation(){
    this.formation.newgetAllFormation()
    .subscribe((res : any)=>{
      res = res.filter(x=>x.formationType == "BesoinCollecte")
      this.formationsListing = res
      console.log("formation listing ************************ : ",res)
    })
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


  formatsDateTest: string[] = [
    'dd/MM/yyyy',
    
    ];

  DeleteBesoin(id){
    if (confirm('Are you sure to delete this record ?')) {


      this.formation.deleteFormation(id)
        .subscribe(res => {
          debugger;
          this.formation.refreshList();
          this.toastr.warning('Formation Deleted successfully', 'Delete Formation');
        },
          err => {
            debugger;
            console.log(err);
          })
    }
    this.formation.refreshList();
  }
}
