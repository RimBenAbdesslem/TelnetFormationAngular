import { Component, OnInit } from '@angular/core';
import { NotificationService } from './../../shared/Notification.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
//import { ToastrService } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from './../../shared/user.service';
import { Users } from '../../Models/users.model';
@Component({
  selector: 'app-users-listes',
  templateUrl: './users-listes.component.html',
  styleUrls: ['./users-listes.component.sass']
})
export class UsersListesComponent implements OnInit {

  constructor(public notification: NotificationService,private modalService: NgbModal,public service: UserService, private toastr: ToastrService) { }
  
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
  isHidden:Boolean=true
  ngOnInit() {
    this.notification.getAllUsersTrue();
    this.notification.getAllRoles();
    this.notification.refreshList();
    this.resetForm();
  }
  populateForm(item: Users) {
    this.notification.formData = Object.assign({}, item);
    this.notification.getUserRole(item.id);
    console.log(item.id);
  }


 rolee: any;

  DeleteRole(Role,id){

    console.log("id user ",id)
    console.log("Role",Role)
    console.log(this.notification.role)



    this.notification.deleteUserRole(Role,id).subscribe(
      res => {
        let index = this.notification.role.findIndex(x=>x==Role)
        this.notification.role.splice(index,1)
        this.toastr.info('', 'role effacer avec succés');
       // this.notification.refreshList1();
      },
      err => {
        console.log(err);
      }
    );
  }



  SupprimerUser(item: Users){
    console.log(item.id);
    this.notification.deletePaymentDetail(item.id);
  
  }


  formModel = {
    Email: '',
    Password: ''
  }
  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.notification.formData = {
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



  onSubmit(form: NgForm, id ) {
   
      this.updateRecord(form);
      this.notification.attributNewRole(id);
  }






  RegisterUserRole(id, role){
    this.notification.registerUserRole(id,role).subscribe(
      res => {
      
        this.toastr.info('role bien affecté', 'succé');
       this.notification.refreshListRole(id);
      },
      err => {
        console.log(err);
      }
    );
  }




  updateRecord(form: NgForm) {
    this.notification.putPaymentDetail().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.info('Modification effectuée avec succès', '');
        this.notification.refreshList1();
      },
      err => {
        console.log(err);
      }
    )
  }





 

  onDelete(id) {
    if (confirm('Are you sure to delete this record ?')) {
      this.notification.deletePaymentDetail(id)
        .subscribe(res => {
          debugger;
          this.notification.refreshList();
          this.toastr.warning('suppression avec succes', 'un utilisateur a été supprimé');
        },
          err => {
            debugger;
            console.log(err);
          })
    }
  }




   
}



// onSubmit(form: NgForm) {
    
 // this.notification.UpdateUsers(form.value).subscribe(
  //  res => {
  //    this.resetForm(form);
  //    this.toastr.info('Submitted successfully', 'Payment Detail Register');
  //    this.notification.refreshList();
  //  },
  //  err => {
   //  console.log(err);
  //  }
  //)

//}