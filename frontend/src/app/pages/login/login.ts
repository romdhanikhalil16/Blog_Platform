import { Component } from '@angular/core';
import { AuthService } from './../../core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private auth: AuthService) { }

  onLogin() {
    this.auth.login({ email: this.email, password: this.password });
  }
}
