import {Page} from 'ionic-framework/index';
import {ButtonSearch} from '../../components/button-search';

@Page ({
  templateUrl: 'build/pages/random/random.html',
  directives: [ButtonSearch]
})

export class RandomPage {
  constructor() {
  }
}
