import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServerService } from 'src/app/shared/services/auth-server.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  sexs = ['Male', 'Female', 'Other'];

  register: FormGroup;
  loading = false;

  constructor(
    private authService: AuthServerService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.register = this.fb.group({
      cccd: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      sex: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  ngOnInit(): void {}

  onSubmit() {
    console.log(this.register.value);
    this.authService.register(this.register.value).subscribe(
      (next) => {
        this.register.reset();
        this.router.navigate(['/auth/sign-in']);
      },
      (error) => {
        console.log(error.message);
        this.router.navigate(['/auth/sign-in']);
      }
    );
  }

  fieldControl(fieldName: string) {
    return this.register.get(fieldName);
  }
}
