import {Component} from '@angular/core';

import {NavController, NavParams} from 'ionic-angular';

import {ItemDetailsPage} from '../item-details/item-details';

import { CallNumber } from '@ionic-native/call-number';

@Component({
  selector: 'show-info',
  templateUrl: 'showInfo.html'
})
export class ShowInfo {
  // selectedItem: any;
  // icons: string[];
  info: any;
  type: any;
  status: any;
  //   = {
  //   status: '前往中',
  //   time: '20 : 30',
  //   data: [
  //     {
  //       title: '姓名',
  //       body: '章程'
  //     },
  //     {
  //       title: '车牌号',
  //       body: '64378579'
  //     },
  //     {
  //       title: '车辆类型',
  //       body: '雷克萨斯'
  //     },
  //     {
  //       title: '等待时间',
  //       body: '20 : 30'
  //     },
  //     {
  //       title: '现场描述',
  //       body: '北京到天津方向,沙河100处第二车道发生碰撞'
  //     }
  //   ],
  //   img: [
  //     {url: '../assets/icon/icon_1.png'},
  //     {url: '../assets/icon/icon_2.png'},
  //     {url: '../assets/icon/icon_3.png'},
  //     {url: '../assets/icon/icon_4.png'},
  //     {url: '../assets/icon/icon_5.png'},
  //   ]
  // }

  constructor(public navParams: NavParams,private callNumber: CallNumber) {
    this.info = navParams.get('item').data.data;
    switch (this.info.type){
      case 1: this.type = '拖车';break;
      case 2: this.type = '吊车';break;
      case 3: this.type = '轮胎抢修';break;
      case 4: this.type = '其它';break;
      default : this.type = '未知';
    }
    switch (this.info.status){
      case 1: this.status = '用户上报';break;
      case 2: this.status = '系统预报';break;
      case 3: this.status = '已审核';break;
      case 4: this.status = '已派遣';break;
      case 5: this.status = '已救援';break;
      case 6: this.status = '已忽略';break;
      default : this.status = '未知';
    }
  }


  call(){
    this.callNumber.callNumber("119", true)
      .then(() => console.log('Launched dialer!'))
      .catch(() => console.log('Error launching dialer'));
  }

}
