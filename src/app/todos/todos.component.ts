import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { v4 } from 'uuid';
import { Todo } from '../todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];

  constructor(private readonly databaseService: DatabaseService) { }

  ngOnInit(): void {
    this.update();
  }

  async add(title: string): Promise<void> {
    await this.databaseService.todos.add({ id: v4(), title, done: false });
    await this.update();
  }

  async update(): Promise<void> {
    this.todos = await this.databaseService.todos.toArray();
  }
}
