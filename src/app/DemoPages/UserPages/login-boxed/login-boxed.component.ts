import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {Color} from 'ng2-charts/ng2-charts';
import { UserService } from './../../shared/user.service';
import { Router } from '@angular/router';
import { NgForm} from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { Users } from '../../Models/users.model';
@Component({
  selector: 'app-login-boxed',
  templateUrl: './login-boxed.component.html',
  styles: []
})
export class LoginBoxedComponent implements OnInit {
  formModel = {
    Email: '',
    Password: ''
  }
  private currentUserSubject: BehaviorSubject<Users>;
  public currentUser: Observable<Users>;
  constructor(private service: UserService, private router: Router, private toastr: ToastrService) { 
    this.currentUserSubject = new BehaviorSubject<Users>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  
  ngOnInit() {
    if (localStorage.getItem('token') != null)
      this.router.navigateByUrl('/home');


    
  }

   users = JSON.parse(localStorage.getItem('users')) ;
  onSubmit(form: NgForm) {
    this.service.login(form.value).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        this.router.navigateByUrl('/home');
        //ici on peut reccuperer l'idUser et le role
        var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
        console.log(payLoad)
       
      },
      err => {
        if (err.status == 400)
          this.toastr.error('Incorrect username or password.', 'Authentication failed.');
        else
          console.log(err);
      }
    );
   
  //  console.log(this.currentUserSubject.) 
  }

 SingIn() {
   // localStorage.removeItem('token');
    this.router.navigate(['pages/register-boxed']);
  }
}
