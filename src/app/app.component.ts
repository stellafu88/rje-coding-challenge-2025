import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from './state';
import { appStarted } from './state/actions';
import * as actions from './state/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'coding-task-2024';

  constructor(
    private store : Store<State>
  ){ }

  ngOnInit(){
    this.store.dispatch(appStarted())
  }

  addContactClicked(){
    this.store.dispatch(actions.addContactClicked())
  }
}
