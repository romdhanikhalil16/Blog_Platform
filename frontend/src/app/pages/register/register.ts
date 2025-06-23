import { Component } from '@angular/core';
import { AuthService } from './../../core/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  role = 'Reader';

  constructor(private auth: AuthService) { }

  onRegister() {
    this.auth.register({
      username: this.username,
      email: this.email,
      password: this.password,
      role: this.role
    }).subscribe(() => alert('Registered!'));
  }
}
