import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';
import { Observable, catchError, concat, map, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {

  private readonly adminUser : User =  { email: "admin@gmail.com", id: 100000};
  constructor(private httpClient: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(
      `https://jsonplaceholder.typicode.com/users`
    ).pipe(
      map((users: User[]) => {
        users.push(this.adminUser);
        return users;
      }),
      catchError((err) => {
        return of([this.adminUser]);
      })
    );
  }

  getUserByEmail(email: string): Observable<User | undefined> {
    return this.getAllUsers().pipe(
      map((users: User[]) => users.find((user) => user.email === email))
    );
  }
}
