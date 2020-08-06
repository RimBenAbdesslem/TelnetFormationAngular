import {Component, OnInit} from '@angular/core';
import { EmailService } from './../../../shared/email.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

import { FormsModule } from '@angular/forms';
import { NotificationService } from 'src/app/DemoPages/shared/Notification.service';
@Component({
  selector: 'app-standard',
  templateUrl: './standard.component.html',
  styles: []
})
export class StandardComponent implements OnInit {

  heading = 'Standard Buttons';
  subheading = 'Wide selection of buttons that feature different styles for backgrounds, borders and hover options!';
  icon = 'pe-7s-plane icon-gradient bg-tempting-azure';

  progress: boolean | number = false;

  model = {
    left: true,
    middle: false,
    right: false
  };

  startLoading() {
    this.progress = 0; // starts spinner

    setTimeout(() => {
      this.progress = 0.5; // sets progress bar to 50%

      setTimeout(() => {
        this.progress = 1; // sets progress bar to 100%

        setTimeout(() => {
          this.progress = false; // stops spinner
        }, 200);
      }, 500);
    }, 400);
  }

  constructor(public notification: NotificationService, public email: EmailService,private modalService: NgbModal, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.resetForm();
    this.notification.getAllUsersTrue();
  }
  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.email.formData = {
      To:'',
      Subject: '',
      Body: '',
    }}
  onSubmit(form: NgForm) {
   
    this.email.SendEmail().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.info('Email sending successfully', ' ');
       // this.email.refreshList();
      },
      err => {
        console.log(err);
      }
    )
}
}
