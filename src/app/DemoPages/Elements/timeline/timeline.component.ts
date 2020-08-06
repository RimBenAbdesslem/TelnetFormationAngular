import {Component, OnInit} from '@angular/core';
import { CompetenceService } from '../../shared/competence.service';
import { UserService } from '../../shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import * as jwt_decode from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { Users } from '../../Models/users.model';
@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styles: []
})
export class TimelineComponent implements OnInit {

  heading = 'Timelines';
  subheading = 'Timelines are used to show lists of notifications, tasks or actions in a beautiful way.';
  icon = 'pe-7s-light icon-gradient bg-malibu-beach';
  images = [1, 2, 3].map(() => `https://picsum.photos/1700/500?random&t=${Math.random()}`);

  slides = [
    {img: '1'},
    {img: '2'},
    {img: '3'},
    {img: '4'},
    {img: '5'},
    {img: '6'},
    {img: '7'},
    {img: '8'},

  ];
  slideConfig = {
    slidesToShow: 1,
    dots: true,
  };

  slideConfig2 = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '60px',
    slidesToShow: 3,
    speed: 100,
    dots: true,
  };

  slideConfig3 = {
    dots: true,
    infinite: false,
    speed: 100,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  slideConfig4 = {
    slidesToShow: 3,
    dots: true,
  };

  slideConfig5 = {
    className: 'slider variable-width',
    dots: true,
    infinite: true,
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true
  };

  slideConfig6 = {
    className: 'center',
    infinite: true,
    slidesToShow: 1,
    speed: 100,
    adaptiveHeight: true,
    dots: true,
  };
  constructor(public competence: CompetenceService , private http: HttpClient,public user: UserService, private toastr: ToastrService) {
  }
  users = JSON.parse(localStorage.getItem('users')) ;
  payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
  changeValueID(event){
    console.log(this.payLoad);
    console.log(this.payLoad.role);
    console.log(this.payLoad.UserID);
}
resetForm(form?: NgForm) {
  if (form != null)
    form.form.reset();
  this.user.formData = {
    id:'',
    userName: '',
    email: '',
    fullName:'',
    valide:'',
    normalizedUserName: '',  
    normalizedEmail: '',
    emailConfirmed: '',
    passwordHash: null,
    securityStamp: null,
    concurrencyStamp: '',
    phoneNumber: null,
    phoneNumberConfirmed: false,
    twoFactorEnabled: false,
    lockoutEnd: null,
    lockoutEnabled: false

  }
}
  ngOnInit() {
    console.log(this.payLoad.UserID);
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    console.log(payLoad)
    console.log(payLoad.UserID);
   // this.competence.get(this.payLoad.UserID)
    this.competence.getUserConnecte(payLoad.UserID);
    this.competence.get(this.payLoad.UserID)
    this.competence.getUser(this.payLoad.UserID);
    this.competence.GetLabel(this.payLoad.UserID);
    this.competence.GetDomaineUser(this.payLoad.UserID);
    this.competence.getUserLevelById(this.payLoad.UserID);
    this.competence.GetAllLabels();
  }
  
 
   userDetails : any = {}
   userConnecte : Users;
   populateForm() {
     console.log("hello");
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
   getUserLabelSum(user,label){
    if (user.Level) {
      let res = user.Level.find(x=>x.labelId == label.labelId )
  
      return res? res.niveau : 0
    }else{
      return 0
    }
  }
  changeSelect(user,label,niveau){
    console.log("user :  ",user)
    console.log("label :  ",label)
    niveau = Number(niveau)
    console.log("niveau :  ",niveau)


    let level = user.Level.find(x=>x.labelId == label.labelId)
    let metierId = level? level.metierId : null
    console.log("metierId : ",metierId);

    this.competence.editLevel(metierId,niveau)
    .subscribe(res=>{
      console.log("res : ",res)
    })
 
  }
  onSubmit(form: NgForm){
    // this.updateRecord(form);
     this.updateRecord(form);
   //  this.notification.attributNewRole(id);
   }
   updateRecord(form: NgForm) {
     this.user.Modifier().subscribe(
       res => {
         this.resetForm(form);
         this.toastr.info('Modification effectuée avec succès', '');
         let token = localStorage.getItem('token');
         let decodedToken = token ? jwt_decode(token) : null
         this.userDetails = decodedToken
         this.user.refreshList(this.userDetails.UserID);
         this.competence.refreshList2(this.userDetails.UserID)
       },
       err => {
         console.log(err);
       }
     )
   }
}
