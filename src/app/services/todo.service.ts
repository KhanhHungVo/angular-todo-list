import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../models/Todo';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TodoService {
  constructor(private httpClient: HttpClient) {}

  getTodosByUser(userId: number): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(
      `https://jsonplaceholder.typicode.com/users/${userId}/todos`
    ).pipe(map((res: any[]) => {
        return res.map((item: any) => ({
          description: item.title,
          isCompleted: item.completed
        }))
    }));
  }
}