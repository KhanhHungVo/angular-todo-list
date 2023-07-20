import { Component } from '@angular/core';
import { Todo } from '../models/Todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
  todos: Todo[] = [];
  newTodo: string;

  saveTodo() {
    if (this.newTodo) {
      let todo = new Todo();
      todo.description = this.newTodo;
      todo.isCompleted = false;
      this.todos.push(todo);
      this.newTodo = '';
    } else {
      alert('Please enter todo');
    }
  }

  done(id: number) {
    this.todos[id].isCompleted = !this.todos[id].isCompleted;
  }

  remove(id: number) {
    const confirmed = window.confirm(
      'Are you sure you want to remove this todo item ?'
    );
    if (confirmed) {
      this.todos.splice(id, 1);
    }
  }
}
