import {Component, Output, EventEmitter} from 'angular2/core';
import {IONIC_DIRECTIVES} from 'ionic-framework/index';
import {CategoryData} from '../services/category-data';

@Component({
  selector: 'field-categories',
  template: `
  <div class="categories">
    <div>Categorias de produtos</div>
    <div>
      <div *ngFor="#genre of categories" class="genres">

        <div class="title" (click)="onClickGenre(genre)" [ngClass]="{active: genre.id == genreOpen}">
          <ion-icon [name]="genreIcon(genre)"></ion-icon> {{genre.name}}
        </div>
        <div [ngClass]="{hide: genreOpen != genre.id}" class="groups">
          <div *ngFor="#group of genre.children">

            <div class="title" (click)="onClickGroup(group)" [ngClass]="{active: group.id == groupOpen}">
              <ion-icon [name]="groupIcon(group)"></ion-icon> {{group.name}}
            </div>
            <ion-list [ngClass]="{hide: groupOpen != group.id}">
              <ion-item *ngFor="#category of group.children">

                <ion-label>{{category.name}}</ion-label>
                <ion-checkbox [checked]="existsCategoryInSelecteds(category)" (change)="onChangeCategory($event,category)"></ion-checkbox>

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
  styles: [`
  * {
    color: #fff;
  }
  .title {
    padding: 10px 0;
    border-bottom: 1px solid #CCC;
  }
  .groups {
    padding-left: 20px;
  }
  .categories {
    margin-top: 40px;
  }
  `]
  directives: [IONIC_DIRECTIVES],
})

export class FieldCategories {
  @Output() selectedCategoriesChange = new EventEmitter();

  selectedCategories: array = [];

  static get parameters() {
    return [[CategoryData]];
  }

  constructor(categoryData) {
    this.categoryData = categoryData;

    this.categories = [];
    this.getCategories();

    this.genreOpen = null;
    this.groupOpen = null;
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

  onChangeCategory(event, category) {
    if (event.checked) {
      this.add(category);
    } else {
      this.remove(category);
    }

    this.selectedCategoriesChange.emit(this.selectedCategories);
  }

  add(category) {
    if(!this.existsCategoryInSelecteds(category)) {
      this.selectedCategories.push(category.id);
    }
  }

  remove(category) {
    if(this.existsCategoryInSelecteds(category)) {
      let index = this.selectedCategories.indexOf(category.id);
      this.selectedCategories.splice(index,1);
    }
  }

  existsCategoryInSelecteds(category) {
    return (this.selectedCategories.find((i) => return i == category.id));
  }

  genreIcon(genre) {
    return (genre.id == this.genreOpen) ? 'arrow-dropup' : 'arrow-dropdown';
  }

  groupIcon(group) {
    return (group.id == this.groupOpen) ? 'arrow-dropup' : 'arrow-dropdown';
  }

  getSelecteds() {
    return this.selectedCategories;
  }
}