import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Todo } from 'src/app/models/Todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.scss']
})
export class EditTodoComponent implements OnChanges {
  @ViewChild('editTodoModal') editTodoModal: ElementRef;
  @Input() editTodoValue: string;
  @Input() editIndex: number;
  @Input() todos: Todo[];
  isLoading = false;
  originalEditTodoValue: string;
  constructor(private todoService: TodoService) {
    console.log(`Init Edit Todo ${this.editTodoValue} ${this.editIndex}`);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editTodoValue']) {
      this.originalEditTodoValue = changes['editTodoValue'].currentValue;
    }
  }

  editTodo() {
    if (this.editTodoValue) {
      if (this.editTodoValue === this.originalEditTodoValue) return this.closeModal();
      const todo: Todo = this.todos[this.editIndex];
      todo.description = this.editTodoValue;
      this.isLoading = true;
      this.todoService.updateTodo(todo).subscribe({
        next: (data) => {
          this.closeModal();
        },
        error: (err) => {
          alert('Error updating todo');
          this.editTodoValue = this.originalEditTodoValue;
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    } else {
      alert('Please enter todo');
      this.editTodoValue = this.originalEditTodoValue;
    }
  }

  closeEditTodo() {
    this.editTodoValue = this.originalEditTodoValue;
    this.closeModal();
  }

  openModal() {
    this.editTodoModal.nativeElement.classList.add('show');
    this.editTodoModal.nativeElement.style.display = 'block';
  }

  closeModal() {
    this.editTodoModal.nativeElement.classList.remove('show');
    this.editTodoModal.nativeElement.style.display = 'none';
  }
}
