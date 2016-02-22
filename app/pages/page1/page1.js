import {Page} from 'ionic/ionic';
import {PlaceModel} from '../../models/place-model';
import {Settings} from '../../settings';
// import {Http} from 'angular2/http';

@Page({
  templateUrl: 'build/pages/page1/page1.html'
})
export class Page1 {
  constructor() {

    // this.http = http;

    var place = new PlaceModel('nova feira');

    place.getAll();

    this.doGet();

    // var item = {name: 'opa'};

    // place.addItem(item);

    // console.log(Settings.url);

    // console.log(place);

    // console.log('PAGE 1');
  }

  doGet() {
    // this.http.get('teste.json').subscribe((res:Response) => console.log(res) );
  }
}
