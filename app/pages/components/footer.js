import {IONIC_DIRECTIVES} from 'ionic-framework/ionic';
import {Component} from 'angular2/core';

// @View ({
//   template: `foooter`
// })

@Component ({
  selector: 'footer',
  template: `
  <ion-toolbar *navbar position="bottom">
    <button fab-left clear master><ion-icon name="sync"></ion-icon>Aleatório</button>
    <button fab-center fab-top master outline round large><ion-icon name="cart"></ion-icon></button>
    <button fab-right clear master><ion-icon name="navigate"></ion-icon>Localização</button>
  </ion-toolbar>
  `,
  directives: [IONIC_DIRECTIVES]
})

export class Footer() {
  constructor() {

  }
}