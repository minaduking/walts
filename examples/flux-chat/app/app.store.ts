import { Injectable } from '@angular/core';
import { State, Store } from 'walts';

import { Threads } from './threads';
import { Messages } from './messages';
import { AppDispatcher } from './app.dispatcher';

export class AppState extends State {
  threadId: string;
  threads: Threads;
  messages: Messages;
}

const INIT_STATE: AppState = {
  threadId: '',
  threads: {},
  messages: {}
};

@Injectable()
export class AppStore extends Store<AppState> {

  constructor(protected dispatcher: AppDispatcher) {
    super(INIT_STATE, dispatcher);
  }

}