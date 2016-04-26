import {Component} from 'angular2/core';
import {IONIC_DIRECTIVES} from 'ionic-framework/index';
import {CategoryData} from '../services/category-data';

@Component({
  selector: 'field-categories',
  template: `
  <div>
    <div>Produtos vendidos</div>
    <div>
      <div *ngFor="#genre of categories">

        <div class="title" (click)="onClickGenre(genre)">{{genre.name}}</div>
        <div *ngIf="genreOpen == genre.id">
          <div *ngFor="#group of genre.children">

            <div class="title" (click)="onClickGroup(group)">{{group.name}}</div>
            <ion-list *ngIf="groupOpen == group.id">
              <ion-item *ngFor="#category of group.children">

                <ion-label>{{category.name}}</ion-label>
                <ion-toggle (change)="onChangeCategory($event,category)"></ion-toggle>

              </ion-item>
            </ion-list>
            <!-- #categories -->

          </div>
        </div>
        <!-- #groups -->

      </div>
    </div>
    <!-- #genres -->

  </div>
  `,
  directives: [IONIC_DIRECTIVES],
})

export class FieldCategories {
  categoriesToggle[];

  static get parameters() {
    return [[CategoryData]];
  }

  constructor(categoryData) {
    this.categoryData = categoryData;

    this.categories = [];
    this.getCategories();

    this.genreOpen = null;
    this.groupOpen = null;

    this.categoriesSelected = [];

  }

  getCategories() {
    this.categoryData.loadCategories().then((categories) => {
      this.categories = categories;
    })
  }

  onClickGenre(genre) {
    this.genreOpen = this.genreOpen == genre.id ? null : genre.id;
  }

  onClickGroup(group) {
    this.groupOpen = this.groupOpen == group.id ? null : group.id;
  }

  onChangeCategory() {
    console.log('mudou');
  }
}