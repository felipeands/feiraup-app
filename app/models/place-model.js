// import { Component, CORE_DIRECTIVES } from 'angular2/angular2';
// import { Http } from 'angular2/http';
// import {App, IonicApp, Platform} from 'ionic/ionic';
// import {App} from 'ionic/ionic';
// import {Http} from 'angular2/http';
import {Http} from 'angular2/http';
import { Injectable } from 'angular2/angular2';

// @component({
//   selector: 'http-app',
//   viewProviders: [HTTP_PROVIDERS]
// });

@Injectable()
export class PlaceModel {

  constructor(http: Http) {

    this.http = http;
    this.http.get('teste.json').subscribe((res:Response) => console.log(res) );

    // this.http.get('teste.json').subscribe((res:Response) => console.log(res) );

    // this.http = http;
// console.log(http);

  // http.get('people.json')
  //     // Call map on the response observable to get the parsed people object
  //     .map(res => res.json())
  //     // Subscribe to the observable to get the parsed people object and attach it to the
  //     // component
  //     .subscribe(people => this.people = people);

  // http.get('people.json').observer({next: (value) => this.people = value});

    // var http.get('teste/teste.json');

    // get.map((responseData) => {
    //   console.log(responseData.json());
    // });

    // this.name = name;
    // this.items = items || [];

    // this.http.get('/api/v1/tasks.json')
    // .map( (responseData) => {
    //   return responseData.json();
    // })
    // // next transform - each element in the
    // // array to a Task class instance
    // .map((tasks: Array<any>) => {
    //   let result:Array<Task> = [];
    //   if (tasks) {
    //     tasks.forEach((task) => {
    //       result.push(new Task(task.id, task.description,
    //        task.dueDate, task.complete));
    //     });
    //   }
    // })
    // // subscribe to output from this observable and bind
    // // the output to the component when received
    // .subscribe( res => this.tasks = res);

  }

  getAll() {
    // this.http.get('teste.json').subscribe((res:Response) => console.log(res) );
  }

  addItem(item) {

    this.items.push({
      name: item,
      checked: false
    });

  }

  removeItem(item) {

    var index = this.items.indexOf(item);
    if(index > -1) {
      this.items.splice(index, 1);
    }

  }

  renameItem(item, name) {

    var index = this.items.indexOf(item);
    if(index > -1) {
      this.items[index].name = name;
    }

  }

  setName(name) {
    this.name = name;
  }

}