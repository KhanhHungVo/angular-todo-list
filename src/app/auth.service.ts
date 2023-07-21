import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly validEmails : string[] = ["1", "1@1.com", "test@gmail.com"];
  constructor() {}

  isValidUser(email: string) {
    return this.validEmails.includes(email);
  }

  getAllValidUsers(){
    return this.validEmails;
  }
}
