import {Injectable, Inject} from 'angular2/core';
import {Options} from '../options';

@Injectable()

export class ImageData {

  static get parameters() {
    return [[Options]];
  }

  constructor(options) {
    this.options = options;
  }

  uploadImage(fileURL) {
    return new Promise((resolve) => {
      let options = {
        params: {'upload_preset': this.options.cloudinary_preset}
      }
      let uri = encodeURI(this.options.cloudinary_api_url);
      let ft = new FileTransfer();
      ft.upload(fileURL, uri, (data) => {
          let res = JSON.parse(data.response)
          resolve(res.public_id);
        },
        () => {}, options
      );
    })
  }

  getCloudinaryPreview(public_id) {
    return `http://res.cloudinary.com/feira-up/image/upload/t_shops/${public_id}.jpg`;
  }
}