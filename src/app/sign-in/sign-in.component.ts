import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['jason@gmail.com', Validators.required],
      password: ['test', Validators.required],
      username: ['Jason', Validators.required]
    });
  }

  signIn() {
    // call authService.signIn here
    const val = this.form.value;

    if (val.email && val.password && val.username) {
      this.authService
        .signIn(val.email, val.password, val.username)
        .subscribe(data => {
          console.log(data);
          this.router.navigateByUrl('/');
        });
    }
  }
}
