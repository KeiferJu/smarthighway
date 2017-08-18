import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from "@angular/http";



import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ShowInfo } from '../pages/show-info/showInfo';
import { uploadPage } from '../pages/upload/upload';


import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';
import { File } from "@ionic-native/file";
// import { Transfer } from '@ionic-native/transfer';
import { FileTransfer } from '@ionic-native/file-transfer';

import { CallNumber } from '@ionic-native/call-number';



@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ShowInfo,
    uploadPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ShowInfo
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    Camera,
    File,
    FileTransfer,
    CallNumber,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
