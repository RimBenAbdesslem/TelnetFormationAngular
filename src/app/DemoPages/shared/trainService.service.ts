import { Injectable } from '@angular/core';
import {Email } from '../Models/email.model';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TrainServiceService {

  constructor(private http: HttpClient,private fb: FormBuilder) { }
  formData: Email;
  readonly rootURL = 'https://localhost:44385/api';

 

}
