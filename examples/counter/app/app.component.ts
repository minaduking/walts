import { Component } from '@angular/core';

import { actions } from './actions/index';
import { IncrementAAction } from './actions/increment-a.action';
import { IncrementBAction } from './actions/increment-b.action';
import { MultiplyAAction } from './actions/multiply-a.action';
import { MultiplyBAction } from './actions/multiply-b.action';
import { NestedCombileAction } from './actions/nested-combine.action';
import { Plus1Times2BAction } from './actions/plus1times2-b.action';
import { ResetAction } from './actions/reset.action';
import { SyncThrowAction } from './actions/sync-throw.action';
import { Times2Plus1BAction } from './actions/times2plus1-b.action';
import { Wait1SecAndThrowAction } from './actions/wait1sec-and-throw.action';

import { AppDispatcher } from './app.dispatcher';
import { AppStore, AppState } from './app.store';

@Component({
  selector: 'ex-app',
  directives: [],
  providers: [
    actions,
    AppDispatcher,
    AppStore
  ],
  template: `
    <h1>A: {{state?.counterA}} B: {{state?.counterB}}</h1>
    <button (click)="onClickIncrementA()">A +1</button>
    <button (click)="onClickIncrementB()">B +1</button>
    <button (click)="onClickIncrementBSequence()">B (+1*2+3)</button>
    <button (click)="onClickIncrementBSimul()">B +1*2+3</button>
    <button (click)="onClickMultiplyA()">A x3</button>
    <button (click)="onClickPlus1Times2A()">A +1 x2</button>
    <button (click)="onClickTimes2Plus1A()">A x2 +1</button>
    <button (click)="onClickPlus1Times2B()">B +1 x2</button>
    <button (click)="onClickTimes2Plus1B()">B x2 +1</button>
    <button (click)="onClickNested()">Nested</button>
    <button (click)="onClickReset()">Reset</button>
    <button (click)="onClickAsyncThrow()">Async Throw</button>
    <button (click)="onClickSyncThrow()">Sync Throw</button>
  `
})
export class AppComponent {

  private state: AppState;

  constructor(private dispatcher: AppDispatcher,
              private store: AppStore,
              private incrementA: IncrementAAction,
              private incrementB: IncrementBAction,
              private multiplyA: MultiplyAAction,
              private multiplyB: MultiplyBAction,
              private nested: NestedCombileAction,
              private plus1Times2B: Plus1Times2BAction,
              private reset: ResetAction,
              private syncThrow: SyncThrowAction,
              private times2Plus1B: Times2Plus1BAction,
              private wait1SecAndThrow: Wait1SecAndThrowAction) {
    this.store.observable.subscribe((state) => {
      console.log(state);
      this.state = state;
    }, (err) => {
      console.error('Caught the error.', err);
    });
  }

  onClickIncrementA() {
    this.dispatcher.emit(this.incrementA.create(1));
  }

  onClickMultiplyA() {
    this.dispatcher.emit(this.multiplyA.create(3));
  }

  onClickPlus1Times2A() {
    this.dispatcher.emitAll([
      this.incrementA.create(1),
      this.multiplyA.create(2)
    ]);
  }

  onClickTimes2Plus1A() {
    this.dispatcher.emitAll([
      this.multiplyA.create(2),
      this.incrementA.create(1)
    ]);
  }

  onClickIncrementB() {
    this.dispatcher.emit(this.incrementB.create(1));
  }

  onClickIncrementBSequence() {
    this.dispatcher.emitAll([
      this.incrementB.create(1),
      this.multiplyB.create(2),
      this.incrementB.create(3)
    ]);
  }

  onClickIncrementBSimul() {
    this.dispatcher.emit(this.incrementB.create(1));
    this.dispatcher.emit(this.multiplyB.create(2));
    this.dispatcher.emit(this.incrementB.create(3));
  }

  onClickPlus1Times2B() {
    this.dispatcher.emit(this.plus1Times2B.create());
  }

  onClickTimes2Plus1B() {
    this.dispatcher.emit(this.times2Plus1B.create());
  }

  onClickNested() {
    this.dispatcher.emit(this.nested.create());
  }

  onClickReset() {
    this.dispatcher.emit(this.reset.create());
  }

  onClickAsyncThrow() {
    this.dispatcher.emit(this.wait1SecAndThrow.create());
  }

  onClickSyncThrow() {
    try {
      this.dispatcher.emit(this.syncThrow.create());
    } catch(err) {
      console.error('Caught the error.', err);
    }
  }

}
