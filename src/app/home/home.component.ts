import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  userEmail: string;
  isValidUser: boolean = false;

  constructor(private authService: AuthService){}

  handleLogin() {
    this.isValidUser = this.authService.isValidUser(this.userEmail);
  }
}
