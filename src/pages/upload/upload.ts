import {Component, Input} from '@angular/core';
import {Http, Response} from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import 'rxjs/add/observable/throw';
import {Observable} from "rxjs";
import {LoadingController, Loading, ToastController} from "ionic-angular";
import {Camera} from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

@Component({
  selector: 'upload',
  templateUrl: 'upload.html'
})
export class uploadPage {
  @Input() imgUrls: any[];
  public myPhoto: any;
  public myPhotoURL: any;
  public error: string;
  private loading: Loading;
  // imgUrls : any[];

  constructor(private readonly http: Http,
              private readonly loadingCtrl: LoadingController,
              private readonly toastCtrl: ToastController,
              private readonly camera: Camera,
              private readonly file: File,
              private transfer: FileTransfer,
              // private readonly filest: FileEntry
  ) {
  }

  // 拍照
  takePhoto() {
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.PNG,
      saveToPhotoAlbum: true
    }).then(imageData => {
      // alert(imageData)
      // this.myPhoto = imageData;
      this.uploadPhoto(imageData);


    }, error => {
      this.error = JSON.stringify(error);
    });
  }

  // 选择图片
  selectPhoto(): void {
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.PNG,
      // targetWidth: ,
      // targetHeight:
    }).then(imageData => {

      this.uploadPhoto(imageData);
    }, error => {
      this.error = JSON.stringify(error);
    });
  }


  // 上传图片
  private uploadPhoto(imageFileUri: any): void {
    this.error = null;
    this.loading = this.loadingCtrl.create({
      content: '上传图片中...'
    });
    this.loading.present();

    const fileTransfer: FileTransferObject = this.transfer.create();

    fileTransfer.upload(imageFileUri, encodeURI('http://121.40.40.226:8888'))
      .then((entry) => {
          // alert(JSON.stringify(entry))
          // alert(entry)
          this.showToast(true);
          this.myPhoto = imageFileUri;
          this.loading.dismiss();
          let ll = JSON.parse(entry.response);
          alert(ll.files[0].largeUrl);
          // this.imgUrls.push(entry.response.files.

        },
        (error) => {
          // alert(JSON.stringify(error));
          this.showToast(false);
          this.loading.dismiss();
        }
      )
      ;


    // this.file.resolveLocalFilesystemUrl(imageFileUri)
    //   .then(entry => (<FileEntry>entry).file(file => this.readFile(file)))
    //   .catch(err => console.log(err));
  }


  // private readFile(file: any) {
  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     const formData = new FormData();
  //     const imgBlob = new Blob([reader.result], {type: file.type});
  //     formData.append('file', imgBlob, file.name);
  //     this.postData(formData);
  //   };
  //   reader.readAsArrayBuffer(file);
  // }
  //
  // private postData(url) {
  //   this.http.post("http://121.40.40.226:8888/", url)
  //     .catch((e) => this.handleError(e))
  //     .map(response => response.text())
  //     .finally(() => this.loading.dismiss())
  //     .subscribe(ok => this.showToast(ok));
  // }

  private showToast(ok: boolean) {
    if (ok) {
      const toast = this.toastCtrl.create({
        message: 'Upload successful',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
    else {
      const toast = this.toastCtrl.create({
        message: 'Upload failed',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
  }

  // private handleError(error: Response | any) {
  //   let errMsg: string;
  //   if (error instanceof Response) {
  //     const body = error.json() || '';
  //     const err = body.error || JSON.stringify(body);
  //     errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
  //   } else {
  //     errMsg = error.message ? error.message : error.toString();
  //   }
  //   this.error = errMsg;
  //   return Observable.throw(errMsg);
  // }

}
