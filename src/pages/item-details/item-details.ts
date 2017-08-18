import {Component, OnInit} from '@angular/core';

import {NavController, NavParams} from 'ionic-angular';

import smartmapx  from 'smartmapx/smartmapx';

import {LoadingController, Loading, ToastController} from 'ionic-angular';

import {Geolocation} from '@ionic-native/geolocation';
import 'com-badrit-macaddress/www/MacAddress.js'
import {Platform} from 'ionic-angular';

import {map} from "rxjs/operator/map";

import {ShowInfo} from '../show-info/showInfo'

import {uploadPage} from '../upload/upload'

import {Http, Response} from "@angular/http";


declare let cordova: any;

@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html'
})
export class ItemDetailsPage implements OnInit {
  map: any;
  currentPosition: any;
  selectedItem: any;


  // 信息
  uName: any;
  uDesc: any;
  uNum: any;
  coords: any;
  type: number;
  uHead: number;
  uPhone: any;
  uAltitude: any;
  isBroken: boolean = false;
  imgUrls: any;


  students: any = [
    {
      type: 1,
      title: '拖车'
    },
    {
      type: 2,
      title: '吊车'
    },
    {
      type: 3,
      title: '轮胎抢修'
    },
    {
      type: 4,
      title: '其它'
    }
  ];


  // 构造
  constructor(private readonly http: Http,
              public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              platform: Platform,
              private readonly toastCtrl: ToastController,
              geolocation: Geolocation) {


    this.selectedItem = navParams.get('item');


    platform.ready().then(() => {
      geolocation.getCurrentPosition().then((location) => {
        console.log(location)
        console.log(location.coords);
        this.coords = location.coords;
        this.currentPosition = '[' + location.coords.longitude + ',' + location.coords.latitude + ']处';

        this.map.on('load', () => {

          // 添加标注
          this.addMarker();
        });
      }).catch((error) => {

        console.log('Error getting location', error);

      });
    });
  }

  // 初始化
  ngOnInit() {

    this.map = new smartmapx.Map({
      container: 'map',
      style: 'http://59.110.157.48/map/style.json',
    });
  }


  // 添加标注
  addMarker() {
    console.log(this.coords)
    var el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundImage = 'url(http://59.110.157.48/docs/static/map/images/default_marker.png)';
    el.style.width = '20px';
    el.style.height = '56px';
    new smartmapx.Marker(el, {offset: [-10, -28]})
    // .setLngLat([location.coords.longitude, location.coords.latitude])
      .setLngLat([this.coords.longitude, this.coords.latitude])
      .addTo(this.map);

    this.map.flyTo({
      center: [this.coords.longitude, this.coords.latitude]
    });
  }

  // 上传图片
  uploadPicture() {
    (<any>window).MacAddress.getMacAddress(
      function (macAddress) {
        alert(macAddress);
      }, function (fail) {
        alert(fail);
      }
    );
  }

  //上传视频
  uploadVideo() {
    (<any>window).MacAddress.getMacAddress(
      function (macAddress) {
        alert(macAddress);
      }, function (fail) {
        alert(fail);
      }
    );
  }

  // 上传
  presentLoading() {
    if (!this.uName) {

    } else {
      // 上传服务器
      let loader = this.loadingCtrl.create({
        content: "上报中,请稍后...",
        // duration: 3000
      });

      loader.present();

      let body = {
        tag: '1',
        data: {
          // instruct_id:'',
          type: this.type,
          memo: this.uDesc,
          target_name: this.uNum,
          u_name: this.uName,
          u_phone: this.uPhone,
          // create_time: '',
          status: 1,
          content: {
            num: '',
            isBroken: this.isBroken,
            imgUrl: this.imgUrls
          },
          latitude: this.coords.latitude,
          longitude: this.coords.longitude,
          altitude: this.uAltitude,// ?
          head: this.uHead,
          // update_time: ''
        }
      }

      alert()
        // this.http.post('/services/1.0/execute/69d9ba8c-f92f-4b9e-9c75-827221ce6f22', body)
        this.http.post('http://172.17.60.20:8080/services/1.0/execute/69d9ba8c-f92f-4b9e-9c75-827221ce6f22', body)
        // .map(res => res.json())
          .subscribe(
            (data) => {
              // console.log(body)
              loader.dismiss();
              this.navCtrl.push(ShowInfo, {
                item: {
                  title: {},
                  data: body
                }
              });
            },
            (err) => {
              loader.dismiss();
              // alert(JSON.stringify(err))
              this.showToast(false);
            }
          );

    }


  }

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


}
