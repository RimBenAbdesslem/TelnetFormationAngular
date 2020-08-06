import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Users } from '../Models/users.model';
import { Role } from '../Models/role.model';
import { getBodyNode } from '@angular/animations/browser/src/render/shared';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.getAllUsersTrue();
    // this.getAllUsersFalse();
    this.getAllRoles();
  }
  formData: Users;
  formData1: Role;

  readonly UrlUserTrue = 'https://localhost:44385/api/ApplicationUser/AllUsersTrue';
  readonly UrlUserFalse = 'https://localhost:44385/api/ApplicationUser/AllUsers';

  readonly urlrole = 'https://localhost:44385/api/ApplicationUser/GetRole';
  readonly rootURL = 'https://localhost:44385/api';
  usersTrue: Users[];
  UsersFalse: Users[];
  roles: Role[];
  role: Role[];
  var: string;
  // user:Array<string>[];
  formModel = this.fb.group({
    id: ['', Validators.required],
    UserName: ['', Validators.required],
    Email: ['', Validators.email],
    // FullName: [''],
  });





  getAllUsersTrue() {
    return this.http.get(environment.apiUrl + "ApplicationUser/AllUsersTrue")
   .toPromise().then(
       res=>{
        this.usersTrue = res as Users[];
        console.log(this.usersTrue);
    //  //  this.users = data.json();
    }
     )
  }


  getAllUsersFalse() {
    this.http.get(this.UrlUserFalse).toPromise().then(
      res => {
        this.UsersFalse = res as Users[];
        console.log(this.UsersFalse);
        //  this.users = data.json();
      }
    )
  }



  getAllRoles() {
    this.http.get(this.urlrole).toPromise().then(
      res => {
        this.roles = res as Role[];
        console.log(this.roles);
        //  this.users = data.json();
      }
    )

  }

  getUserRole(id) {
    this.http.get('https://localhost:44385/api/ApplicationUser/GetRole/' + id).toPromise().then(
      res => {
        this.role = res as Role[];
        console.log(this.role);
        //  this.users = data.json();
      }
    )

  }


  deleteUserRole(roles, id) {
    console.log(id);
    console.log("roles", roles);

    //  const params =  new HttpParams ({ fromString: 'name=roles'  });
    // let options=  { params: HttpParams };
    //   let options = new RequestOptions({ headers: headers });

    //const params = new HttpParams({fromString: 'name=term'});
    //, Roles
    // let search = new URLSearchParams();
    // search.set('RoleName', roles);

    return this.http.request('delete', `https://localhost:44385/api/ApplicationUser/DeleteRole/${id}`, { body: { "RoleName": roles } });
    //return  this.http.delete(`https://localhost:44385/api/ApplicationUser/DeleteRole/${id}`,options);
    //this.http.request('DELETE', 'https://localhost:44385/api/ApplicationUser/DeleteRole/'+ id, {
    //   headers: new HttpHeaders({}),
    //   body: { RoleName: roles }});



    //this.http.delete('https://localhost:44385/api/ApplicationUser/DeleteRole/'+ id );

  }

  optio(pass) {
    const header = new HttpHeaders();
    // const pass = 'Basic ' + btoa(cuid + ': ');
    header.set('RoleName', pass);
    const options = ({
      headers: header

    });
    return this.http.request('DELETE', 'https://localhost:44385/api/ApplicationUser/DeleteRole/', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: { foo: pass }
    });

  }

  registerUserRole(id, roles) {
    console.log(id);
    console.log(roles.name);
    var role = {
      RoleName: roles.name,
    }
    return this.http.post('https://localhost:44385/api/ApplicationUser/EditRoleToUser/' + id, role);
  }
  refreshList1() {
    this.http.get(this.rootURL + '/ApplicationUser/AllUsersTrue')
    .toPromise()
    .then(res => this.usersTrue = res as Users[]);
  }
  refreshListRole(id) {
    this.http.get('https://localhost:44385/api/ApplicationUser/GetRole/' + id)
    .toPromise()
    .then(res => this.role = res as Role[]);
  }
  refreshList() {
    this.http.get(this.rootURL + '/ApplicationUser/AllUsers')//false
      .toPromise()
      .then(res => this.UsersFalse = res as Users[]);

  }
  UpdateUsers(formData) {

    return this.http.post(this.rootURL + '/ApplicationUser/Update', formData);
  }

  //  postPaymentDetail() {
  //  return this.http.post(this.rootURL + '/ApplicationUser/Register', this.formData);
  //  }


  deletePaymentDetail(id) {
    console.log(id);
    return this.http.delete(this.rootURL + '/ApplicationUser/' + id);
  }

  PostRegisterRole(formData, i) {
    //return this.http.post(this.rootURL+'/ApplicationUser/EditRoleToUser/'+formData.id,role)
    console.log(formData.id);
    this.var = formData.id;
    console.log(this.var);
    console.log(i);//i c'est le role
    var role = {
      RoleName: i,
    }
    console.log(role);
    return this.http.post(this.rootURL + '/ApplicationUser/EditRoleToUser/' + formData.id, role);
  }
  SelectedRole: any = [];
  RoleChange(event) {
    let index = this.SelectedRole.indexOf(event.target.value);
    console.log(index);
    if (index == -1) {
      this.SelectedRole.push(event.target.value);
    } else {
      this.SelectedRole.splice(index, 1);
    }
    console.log(this.SelectedRole);
  }
  attributNewRole(id) {
    for (var i in this.SelectedRole) {
      return this.http.post(this.rootURL + '/ApplicationUser/EditRoleToUser/' + id, i);
    }

  }

  putPaymentDetail() {
    return this.http.post(this.rootURL + '/ApplicationUser/Update', this.formData);
  }

}
