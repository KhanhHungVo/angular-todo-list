import { Component } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  userEmail: string;
  isValidUser: boolean = false;
  currentUser: User;

  constructor(private userService: UserService) {}

  handleLogin() {
    this.userService.getUserByEmail(this.userEmail).subscribe({
      next: (user) => {
        if (user) {
          this.currentUser = user;
          this.isValidUser = true;
        } else {
          alert('User is not valid');
        }
      },
      error: (err) => {
        console.error('Error fetching user:', err);
      },
    });
  }
}
