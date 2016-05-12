import {Component} from 'angular2/core';
import {IONIC_DIRECTIVES, NavController, ActionSheet} from 'ionic-framework/index';
import {Camera} from 'ionic-native';

@Component({
  selector: 'photo-upload',
  template: `
  <button primary (click)="onUploadPhoto()">Foto</button>
  `,
  styles: [`
  `]
  directives: [IONIC_DIRECTIVES],
})

export class PhotoUpload {

  static get parameters() {
    return [[NavController]];
  }

  constructor(nav) {
    this.nav = nav;
    this.photo = null;
  }

  onUploadPhoto() {
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
    Camera.getPicture(options).then((imageData) => {
      let base64Image = "data:image/jpeg;base64," + imageData;
      console.log(base64Image);
    })
  }

}