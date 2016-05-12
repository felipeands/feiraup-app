import {Page} from 'ionic-framework/index';

@Page ({
  templateUrl: 'build/pages/search/search.html',
  styles: [`
  .icon {
    position: relative;
    z-index: 10;
  }
  [fab-top] {
    top: -34px;
  }
  .results {
    margin: 20px 0 50px;
  }
  `]
})

export class SearchPage {
  searchQuery;

  constructor() {
    this.shops = [
    {image: 'http://ionicframework.com/dist/preview-app/www/img/badu-live.png'},
    {image: 'http://ionicframework.com/dist/preview-app/www/img/advance-card-map-mario.png'},
    {image: 'http://ionicframework.com/dist/preview-app/www/img/card-sf.png'},
    {image: 'http://ionicframework.com/dist/preview-app/www/img/badu-live.png'},
    {image: 'http://ionicframework.com/dist/preview-app/www/img/advance-card-map-mario.png'},
    {image: 'http://ionicframework.com/dist/preview-app/www/img/card-sf.png'},
    ];
  }

  onGetShops(searchBar) {
    alert(searchBar.value);
  }
}
