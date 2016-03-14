import {Page, Alert} from 'ionic-framework/ionic';
// import {RouteData}

@Page ({
  templateUrl: 'build/pages/route/new-route.html'
})

export class NewRoutePage {
  // Model;

  static get parameters() {
    // return [];

  }

  constructor() {
    this.mapping = false;
    this.firstPosition = false;
    this.lastPosition = false;
  }

  onStart() { }

  onEnd() { }

  onNewMark() { }

}