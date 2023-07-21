import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private validEmails: string[];
  public currentUser: User | null;
  constructor(private userService: UserService) {
    this.loadValidEmails();
  }

  isValidUser(email: string) {
    return this.validEmails.includes(email);
  }

  private loadValidEmails() {
    return this.userService.getAllUsers().subscribe(
    {
      next: (users) => {
        this.validEmails = users.map((user) => user.email);
      }, 
      error: (err) => {
        this.validEmails = ["admin@gmail.com"];
      }
    });
  }
}
