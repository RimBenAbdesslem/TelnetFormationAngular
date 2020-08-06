import { Component, OnInit } from '@angular/core';
import {Color} from 'ng2-charts/ng2-charts';
import { UserService } from './../../shared/user.service';
import { NotificationService } from './../../shared/Notification.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Users } from '../../Models/users.model';
import { Role } from '../../Models/role.model';
@Component({
  selector: 'app-waiting-registration-boxed',
  templateUrl: './waiting-registration-boxed.component.html',
  styleUrls: []
  //'./waiting-registration-boxed.component.sass'
})
export class WaitingRegistrationBoxedComponent implements OnInit {

  closeResult: string;
  open(content) {
    this.modalService.open(content).result.then((result) => {
      //this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
     // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
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


  slideConfig6 = {
    className: 'center',
    infinite: true,
    slidesToShow: 1,
    speed: 500,
    adaptiveHeight: true,
    dots: true,
  };

  public datasets = [
    {
      label: 'My First dataset',
      data: [65, 59, 80, 81, 46, 55, 38, 59, 80],
      datalabels: {
        display: false,
      },

    }
  ];

  public datasets2 = [
    {
      label: 'My First dataset',
      data: [46, 55, 59, 80, 81, 38, 65, 59, 80],
      datalabels: {
        display: false,
      },

    }
  ];

  public datasets3 = [
    {
      label: 'My First dataset',
      data: [65, 59, 80, 81, 55, 38, 59, 80, 46],
      datalabels: {
        display: false,
      },

    }
  ];
  public lineChartColors: Color[] = [
    { // dark grey
      backgroundColor: 'rgba(247, 185, 36, 0.2)',
      borderColor: '#f7b924',
      borderCapStyle: 'round',
      borderDash: [],
      borderWidth: 4,
      borderDashOffset: 0.0,
      borderJoinStyle: 'round',
      pointBorderColor: '#f7b924',
      pointBackgroundColor: '#fff',
      pointHoverBorderWidth: 4,
      pointRadius: 6,
      pointBorderWidth: 5,
      pointHoverRadius: 8,
      pointHitRadius: 10,
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#f7b924',
    },
  ];

  public lineChartColors2: Color[] = [
    { // dark grey
      backgroundColor: 'rgba(48, 177, 255, 0.2)',
      borderColor: '#30b1ff',
      borderCapStyle: 'round',
      borderDash: [],
      borderWidth: 4,
      borderDashOffset: 0.0,
      borderJoinStyle: 'round',
      pointBorderColor: '#30b1ff',
      pointBackgroundColor: '#ffffff',
      pointHoverBorderWidth: 4,
      pointRadius: 6,
      pointBorderWidth: 5,
      pointHoverRadius: 8,
      pointHitRadius: 10,
      pointHoverBackgroundColor: '#ffffff',
      pointHoverBorderColor: '#30b1ff',
    },
  ];

  public lineChartColors3: Color[] = [
    { // dark grey
      backgroundColor: 'rgba(86, 196, 121, 0.2)',
      borderColor: '#56c479',
      borderCapStyle: 'round',
      borderDash: [],
      borderWidth: 4,
      borderDashOffset: 0.0,
      borderJoinStyle: 'round',
      pointBorderColor: '#56c479',
      pointBackgroundColor: '#fff',
      pointHoverBorderWidth: 4,
      pointRadius: 6,
      pointBorderWidth: 5,
      pointHoverRadius: 8,
      pointHitRadius: 10,
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#56c479',
    },
  ];

  public labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'];

  public options = {
    layout: {
      padding: {
        left: 0,
        right: 8,
        top: 0,
        bottom: 0
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          display: false,
          beginAtZero: true
        },
        gridLines: {
          display: false
        }
      }],
      xAxes: [{
        ticks: {
          display: false
        },
        gridLines: {
          display: false
        }
      }]
    },
    legend: {
      display: false
    },
    responsive: true,
    maintainAspectRatio: false
  };

  constructor(public notification: NotificationService,private modalService: NgbModal , private toastr: ToastrService) { }
   
  SelectedRole:any=[];
  ngOnInit(): void{
    this.notification.getAllUsersFalse();
    this.resetForm();
  }
  
  resetForm(form?: NgForm) {
   if (form != null)
      form.form.reset();
    this.notification.formData1 = {
      id:'',
      name:'',
      normalizedName:'',
    }
  }
 
  
  

  RoleChange(event){
          let index = this.SelectedRole.indexOf(event.target.value);
       console.log(index);
          if(index==-1){
             this.SelectedRole.push(event.target.value);
          }else{
  this.SelectedRole.splice(index,1);
       }
   console.log(this.SelectedRole);
  }
 
  

  
  RegisterUserRole(id, role){
    this.notification.registerUserRole(id,role).subscribe(
      res => {
      
        this.toastr.info('role bien affecté', 'succé');
        this.notification.refreshList();
      },
      err => {
        console.log(err);
      }
    );
  }

}


//OnRegisterRole(item : Users){
  //console.log(item);
 // console.log(this.SelectedRole);
//for(var val of this.SelectedRole ){
// console.log(val);
//this.notification.PostRegisterRole(item,val).subscribe(
 //   (res: any) => {
 //     if (res.succeeded){
  //    debugger;
  //    this.resetForm();
  //    this.toastr.success('Submitted successfully', 'User Accepted');
   //   console.log("ok");
   //   this.notification.refreshList();
  //  }
  //  else{   this.toastr.success('Erreur', 'Erreur update');}
   // });
//}
//}