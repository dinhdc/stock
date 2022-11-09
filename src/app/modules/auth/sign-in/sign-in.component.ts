import { LoginResponse } from './../../../shared/interfaces/auth.interface';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthServerService } from 'src/app/shared/services/auth-server.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthServerService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  onLogin() {
    const { username, password } = this.loginForm.value;

    this.auth.login(username, password).subscribe(
      (response: LoginResponse) => {
        this.loginSuccess(response);
      },
      (error) => {
        this.loginSuccess(error);
      }
    );
  }

  loginSuccess(response: LoginResponse) {
    localStorage.setItem('token', JSON.stringify(response.token));
    localStorage.setItem('userId', JSON.stringify(response.userId));
    this.router.navigate(['/stocks']);
    this.loginForm.reset();
  }
}
