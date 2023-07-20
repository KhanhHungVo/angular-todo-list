import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly validEmail = '1';
  constructor() {}

  isValidUser(email: string) {
    return email === this.validEmail;
  }
}
