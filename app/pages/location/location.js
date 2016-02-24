import {Page} from 'ionic-framework/ionic';
import {Footer} from '../components/footer';

@Page ({
  templateUrl: 'build/pages/location/location.html',
  directives: [Footer]
})

export class LocationPage {
  constructor() {
    // this.footer = footer;
    // console.log('run');
  }
}