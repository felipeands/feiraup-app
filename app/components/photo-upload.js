import {Component, Output, EventEmitter} from 'angular2/core';
import {IONIC_DIRECTIVES, NavController, ActionSheet, Platform} from 'ionic-framework/index';
import {Camera} from 'ionic-native';
import {ImageData} from '../services/image-data';

@Component({
  selector: 'photo-upload',
  template: `
  <button primary (click)="onClickButton()">Foto</button>
  <div *ngIf="photoPreview">
    <img class="preview" src="{{photoPreview}}"/>
  </div>
  `,
  styles: [`
  `]
  directives: [IONIC_DIRECTIVES],
})

export class PhotoUpload {
  @Output() photoChange = new EventEmitter();

  static get parameters() {
    return [[NavController],[Platform],[ImageData]];
  }

  constructor(nav, platform, imageData) {
    this.nav = nav;
    this.platform = platform;
    this.imageData = imageData;
    this.photo = null;
    this.photoPreview = null;
  }

  onClickButton() {
    let actionSheet = ActionSheet.create({
      title: 'Escolha uma opção',
      buttons: [
      {
        text: 'Câmera',
        handler: () => {
          this.onStartCamera();
        }
      }, {
        text: 'Galeria',
        handler: () => {
          this.onOpenPhotoLibrary();
        }
      }, {
        text: '',
        role: 'cancel',
        handler: () => {}
      }
      ]
    })
    this.nav.present(actionSheet);
  }

  onOpenPhotoLibrary() {
    let options = {
      quality: 80,
      saveToPhotoAlbum: false
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: false,
      encodingType: Camera.EncodingType.JPEG,
      saveToPhotoAlbum: false
    }
    this.startCameraPlugin(options);
  }

  onStartCamera() {
    let options = {
      quality: 80,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: false,
      encodingType: Camera.EncodingType.JPEG,
    };
    this.startCameraPlugin(options);
  }

  startCameraPlugin(options) {
    options = this.preparePlatform(options);
    Camera.getPicture(options).then((image) => {
      this.uploadPhoto(image);
    });
  }

  preparePlatform(options) {
    if(this.platform.is('ios')) {
      options.destinationType = Camera.DestinationType.NATIVE_URI;
    }
    if(this.platform.is('android')) {
      options.destinationType = Camera.DestinationType.FILE_URI;
    }
    return options;
  }

  uploadPhoto(image) {
    this.imageData.uploadImage(image).then((res) => {
      this.photo = res;
      this.photoPreview = this.imageData.getCloudinaryPreview(res);
      this.photoChange.emit(res);
    });
  }

}