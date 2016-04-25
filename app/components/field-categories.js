import {Component} from 'angular2/core';
import {IONIC_DIRECTIVES} from 'ionic-framework/ionic';

@Component({
  selector: 'field-categories',
  template: `
  <ion-item>
    <ion-label>Categorias</ion-label>
  </ion-item>
  `,
  directives: [IONIC_DIRECTIVES]
})

export class FieldCategories {
  constructor() {
  }

  getCategories() {
  }

  prepareCategories() {
  }

  checkCategories() {
  }
}