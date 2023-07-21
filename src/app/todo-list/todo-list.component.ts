import { Component } from '@angular/core';
import { Todo } from '../models/Todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {

  todos: Todo[] = [];
  newTodoValue: string;
  editTodoValue: string;
  editIndex: number;

  saveTodo() {
    if (this.newTodoValue) {
      const todo = new Todo();
      todo.description = this.newTodoValue;
      todo.isCompleted = false;
      this.todos.push(todo);
      this.newTodoValue = '';
    } else {
      alert('Please enter todo');
    }
  }

  done(id: number) {
    this.todos[id].isCompleted = !this.todos[id].isCompleted;
  }

  removeTodo(id: number) {
    const confirmed = window.confirm(
      'Are you sure you want to remove this todo item ?'
    );
    if (confirmed) {
      this.todos.splice(id, 1);
    }
  }

  editTodo() {
    if(this.editTodoValue){
      const todo : Todo = this.todos[this.editIndex];
      todo.description =  this.editTodoValue;
      this.editTodoValue = '';
      this.editIndex = -1;
    } else {
      alert('Please enter todo');
    }
  }

  callEditModal(todo: Todo, index: number){
    this.editTodoValue = todo.description;
    this.editIndex = index;
  }
}
