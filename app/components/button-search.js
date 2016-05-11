import {Component} from 'angular2/core';
import {IONIC_DIRECTIVES, NavController} from 'ionic-framework/index';
import {SearchPage} from '../pages/search/search';

@Component({
  selector: 'button-search',
  template: `
  <button (click)="onButtonClick()" light clear class="search">
    <ion-icon name="search"></ion-icon>
  </button>
  `,
  styles: [`
  `]
  directives: [IONIC_DIRECTIVES],
})

export class ButtonSearch {

  static get parameters() {
    return [[NavController]];
  }

  constructor(nav) {
    this.nav = nav;
  }

  onButtonClick() {
    this.nav.push(SearchPage);
  }

}