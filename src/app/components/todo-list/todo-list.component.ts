import { Component, Input, ViewChild } from '@angular/core';
import { Todo } from '../../models/Todo';
import { TodoService } from 'src/app/services/todo.service';
import { EditTodoComponent } from '../edit-todo/edit-todo.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {

  @Input() userId: number; 
  @ViewChild(EditTodoComponent) editTodoComponent: EditTodoComponent;
  todos: Todo[] = [];
  newTodoValue: string;
  editTodoValue: string;
  editIndex: number;
  isLoading: boolean = false;
  constructor(private todoService: TodoService){}

  ngOnInit(){
    this.getTodos();
  }
  addTodo() {
    if (this.newTodoValue && !this.isLoading) {
      this.isLoading = true;
      const todo = new Todo();
      todo.description = this.newTodoValue;
      todo.isCompleted = false;

      this.todoService.addTodo(todo).subscribe({
        next: (data) => {
          todo.id = data.id
          this.todos.push(todo);
          this.newTodoValue = '';
        },
        error: (err) => {
          alert('Error adding new todo');
        },
        complete: () => {
          this.isLoading = false;
        },
      });
      
    } else {
      alert('Please enter todo');
    }
  }

  getTodos(){
    this.todoService.getTodosByUser(this.userId).subscribe({
      next: (todos) => {
        this.todos = todos;
      },
      error: (err) => {
        console.log('Error fetching todos: ', err);
      }
    })
  }

  done(id: number) {
    var newStatus = !this.todos[id].isCompleted;
    this.todos[id].isCompleted = !this.todos[id].isCompleted;
    this.todoService.updateTodoStatus(id, newStatus).subscribe({
      error: (err) => {
        alert('Error updating todo status');
      }
    })
    
  }

  removeTodo(id: number) {
    const confirmed = window.confirm(
      'Are you sure you want to remove this todo item ?'
    );
    if (confirmed) {
      this.isLoading = true;
      const deleteTodo = this.todos[id];
      this.todoService.deleteTodo(deleteTodo.id).subscribe({
        next: (data) => {
          this.todos.splice(id, 1);
        },
        error: (err) => {
          alert('Error deleting todo');
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }
  }

  callEditModal(todo: Todo, index: number){
    this.editTodoValue = todo.description;
    this.editIndex = index;
    this.editTodoComponent.openModal(); 
  }
}
