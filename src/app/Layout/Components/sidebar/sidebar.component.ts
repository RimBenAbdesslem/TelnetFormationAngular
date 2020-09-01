import {Component, HostListener, OnInit} from '@angular/core';
import {ThemeOptions} from '../../../theme-options';
import {select} from '@angular-redux/store';
import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CompetenceService } from 'src/app/DemoPages/shared/competence.service';
import { FormBuilder,Validators } from '@angular/forms';
import * as jwt_decode from 'jwt-decode';
import { UserService } from 'src/app/DemoPages/shared/user.service';
import { Users } from 'src/app/DemoPages/Models/users.model';
import { ToastrService } from 'ngx-toastr';
import { EmailService } from 'src/app/DemoPages/shared/email.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  public extraParameter: any;
  isAdmin : boolean = false
  userDetails : any = {}
  userConnecte : Users;


  constructor(public globals: ThemeOptions, private toastr: ToastrService,public email: EmailService,public user: UserService,private Fb: FormBuilder, private http: HttpClient,public competence: CompetenceService, private router: Router,private activatedRoute: ActivatedRoute,private modalService: NgbModal) {
    this.getDecodedToken()
  }
  
  users = JSON.parse(localStorage.getItem('users')) ;
  payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
  getDecodedToken() {
    let token = localStorage.getItem('token');
    let decodedToken = token ? jwt_decode(token) : null
    this.userDetails = decodedToken
    this.isAdmin =  decodedToken && decodedToken.role =='admin'
    console.log("this.isAdmin : ",this.isAdmin)
  }

  @select('config') public config$: Observable<any>;

  private newInnerWidth: number;
  private innerWidth: number;
  activeId = 'dashboardsMenu';

  toggleSidebar() {
    this.globals.toggleSidebar = !this.globals.toggleSidebar;
  }
  openSmall(content1) {
    this.modalService.open(content1, {
      size: 'sm'
    });
  }
  Envoiyer(){
    // this.formationsListing.splice(id, 1);
     if (confirm('Vous pouvez envoyer à tous les directeurs')) {
 
    //   this.formationsListing = this.formationsListing.filter(item => item.id !== id);
 
this.email.SendEmailTous().subscribe(res => {
  this.toastr.warning('Email à bien été envoyé', ''); 
})
    //   this.formation.deleteFormation(id)
      //   .subscribe(res => {
      
      
        //   this.toastr.warning('Formation Deleted successfully', 'Delete Formation');
      //   },
      //     err => {
        
        //     console.log(err);
        //  })
    // }
   
   }}
  openSmallActivite(content2) {
    this.modalService.open(content2, {
      size: 'sm'
    });
  }
  sidebarHover() {
    this.globals.sidebarHover = !this.globals.sidebarHover;
  }
  userId:string
  ValueChangeuser(event) {
    this.userId=event.target.value;
  console.log( this.userId);
}
activiteId:any
ValueChangeActivite(event) {
  this.activiteId=event.target.value;
console.log( this.activiteId);
}
Option = this.Fb.group({
  All: ['', Validators.required]
})
OptionActivite = this.Fb.group({
  All: ['', Validators.required]
})
  ngOnInit() {

    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    console.log(payLoad)
    console.log(payLoad.UserID);
   // this.competence.get(this.payLoad.UserID)
   this.competence.getAllActivite();
   this.competence.GetAllActiviteMetier() ;
   this.competence.GetAllListeActivite();
   this.competence.GetAllLabelsActivite();
    this.competence.getUserConnecte(payLoad.UserID);
    this.competence.getAllUsersTrue();

    this.competence.GetAllDomaine();
    this.competence.GetAllLabels();
    setTimeout(() => {
      this.innerWidth = window.innerWidth;
      if (this.innerWidth < 1200) {
        this.globals.toggleSidebar = true;
      }
    });

    this.extraParameter = this.activatedRoute.snapshot.firstChild.data.extraParameter;

  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.newInnerWidth = event.target.innerWidth;

    if (this.newInnerWidth < 1200) {
      this.globals.toggleSidebar = true;
    } else {
      this.globals.toggleSidebar = false;
    }

  }
  populateForm() {
   let token = localStorage.getItem('token');
   let decodedToken = token ? jwt_decode(token) : null
   this.userDetails = decodedToken
   console.log('user detail ====>',this.userDetails)
    
  this.http.get(`https://localhost:44385/api/ApplicationUser/` + this.userDetails.UserID).subscribe(
    res=>{
      console.log(res);
      this.userConnecte = res as Users;
      this.user.formData = Object.assign({}, this.userConnecte);
     console.log(this.userConnecte);
   // this.users = data.json();
    }
  ) 
  console.log(this.userConnecte);
    this.user.formData = Object.assign({}, this.userConnecte);
    console.log(this.userDetails.UserID);
  }
  choix(){
    console.log(this.userId)
    console.log(this.Option.value.All)
    if(this.Option.value.All=="All"){
     
      this.router.navigate(['/tables/bootstrap']);
    }
    else{
    
      this.competence.GetLabel(this.userId);
      this.competence.getUser(this.userId);
      this.competence.GetDomaineUser(this.userId);
      this.competence.UserId=this.userId;
   //   this.http.post('https://localhost:44385/api/Metier/PostGet',metier).subscribe
      this.router.navigate(['/components/pagination']);
    }
    
  }
  choixActivite(){
    console.log(this.activeId)
    console.log(this.OptionActivite.value.All)
    if(this.OptionActivite.value.All=="All"){
     
      this.router.navigate(['/components/tooltips-popovers']);
    }
    else{
    
      this.competence.GetListeActivite(this.activiteId);
      this.competence.Get(this.activiteId);
      this.competence.getAllActiviteUsersTrue(this.activiteId)

      //this.competence.getUserActivite(this.userId);
      //this.competence.GetDomaineUserActivite(this.userId);
      this.competence.UserId=this.userId;
   //   this.http.post('https://localhost:44385/api/Metier/PostGet',metier).subscribe
      this.router.navigate(['/tables/choix-activite']);
    }
    
  }
}
