import {Injectable, Inject} from 'angular2/core';
import {Http, Headers} from 'angular2/http';

import {Options} from '../options';

@Injectable()

export class CategoryData {
  public headers: Headers;

  static get parameters() {
    return [[Http],[Options]];
  }

  constructor(http,options) {
    this.http = http;
    this.options = options;
    this.selected = [];
    this.categories = null;
  }

  loadCategories() {
    if (this.categories) {
      return Promise.resolve(this.categories);
    }

    return new Promise((resolve) => {
      this.http.get(`${this.options.base_url}/category/list`).subscribe((res) => {
        this.categories = this.processData(res.json());
        resolve(this.categories);
      })
    })
  }

  processData(data) {
    return data.data;
  }

}