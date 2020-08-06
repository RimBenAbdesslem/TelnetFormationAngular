import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from './../../shared/user.service';
@Component({
  selector: 'app-register-boxed',
  templateUrl: './register-boxed.component.html',
  styles: []
})
export class RegisterBoxedComponent implements OnInit {

  constructor(public service: UserService, private toastr: ToastrService,private router: Router) { }

  ngOnInit() {
    this.service.formModel.reset();
  }
  onSubmit() {
    this.service.register().subscribe(
      (res: any) => {
        if (res.succeeded) {
          this.service.formModel.reset();
          this.toastr.success('Nouvel utilisateur créé!','Inscription réussi.');
        } else {
          res.errors.forEach(element => {
            switch (element.code) {
              case 'DuplicateUserName':
                this.toastr.error('Nom utilisateur déjà pris','Échec de enregistrement.');
                break;

              default:
              this.toastr.error(element.description,'Échec .');
                break;
            }
          });
        }
      },
      err => {
        console.log(err);
      }
    );
  }

}
