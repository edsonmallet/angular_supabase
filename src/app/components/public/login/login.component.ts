import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  message: string;
  form: FormGroup;

  constructor(
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private userService: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  login() {
    this.spinner.show();
    const email = this.form.get('email').value;
    const password = this.form.get('password').value;

    this.userService.singIn(email, password).then(
      (data) => {
        this.spinner.hide();
        this.router.navigateByUrl('/admin/dashboard');
        localStorage.setItem('@app-stock:auth', JSON.stringify(data.data));
      },
      (error) => {
        console.log(error);
        this.spinner.hide();
        this.message = error.error.message;
      }
    );
  }
}
