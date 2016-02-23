import {Page} from 'ionic-framework/ionic';
import {Http, HTTP_PROVIDERS, Response} from 'angular2/http';
// import {Settings} from './../../settings';

@Page({
  templateUrl: 'build/pages/page1/page1.html'
})

export class Page1 {
  constructor(http: Http) {
    this.http = http;

    // this.settings = new Settings();

    // var url = this.settings.url;

    // alert(url);

    fetch('http://feiraup.ngrok.com/testes', {
      method: 'get'
    }).then(function(response) {
      console.log('respondeu');
    }).catch(function(err) {
      console.log('erro');
    })

  }
}
