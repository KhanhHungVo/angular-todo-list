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
          isCompleted: item.completed,
          userId: item.userId,
          id: item.id
        }))
    }));
  }

  updateTodo(todo: Todo) {
    // fake id to call jsonplace holder
    todo.id = 1;
    return this.httpClient.put<Todo>(
      `https://jsonplaceholder.typicode.com/todos/${todo.id}`, todo);
  }

  updateTodoStatus(id: number, newStatus: boolean) {
    id = 1; // fake id to call jsonplace holder
    return this.httpClient.put<Todo>(
      `https://jsonplaceholder.typicode.com/todos/${id}`, {completed: newStatus});
  }

  deleteTodo(id: number) {
    return this.httpClient.delete<Todo>(
      `https://jsonplaceholder.typicode.com/todos/${id}`);
  }

  addTodo(todo: Todo) {
    return this.httpClient.post<Todo>(
      `https://jsonplaceholder.typicode.com/todos`, todo);
  }
}