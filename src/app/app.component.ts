import { Component } from '@angular/core';
import { Todo } from './Todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-todo-list';
  todos : Todo[] = [];
  newTodo: string;

  saveTodo(){
    debugger
    if(this.newTodo){
      let todo = new Todo();
      todo.description = this.newTodo;
      todo.isCompleted = false;
      this.todos.push(todo);
      this.newTodo = '';
    } else {
      alert('Please enter todo');
    }
  }

  done(id:number){
    this.todos[id].isCompleted = !this.todos[id].isCompleted;
  }

  remove(id:number){
    this.todos.splice(id,1);
  }
}
