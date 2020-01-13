import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  public form: FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthService) {}

  ngOnInit() {
    this.form = this.fb.group ( {
      email: ['test@me.com' , Validators.compose ( [ Validators.required, Validators.email ] )] , 
      password: ['1234567' , Validators.compose ( [ Validators.required ] )]
    } );
  }

  onSubmit() {
    if(this.form.invalid)return;
    this.auth.login(this.form.value);
  }

}
