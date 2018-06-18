import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { RestapiProvider } from '../../providers/restapi/restapi';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  LatLng
} from '@ionic-native/google-maps';

import { LaunchNavigator } from '@ionic-native/launch-navigator';


@IonicPage()
@Component({
  selector: 'page-project-details',
  templateUrl: 'project-details.html',
})
export class ProjectDetailsPage {

  @ViewChild('map')
  private mapElement: ElementRef;
  private map: GoogleMap;
  private location: LatLng;

  details: any;
  id2: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public rest: RestapiProvider,
    platform: Platform,
    public launchNavigator: LaunchNavigator) {

    this.details = this.navParams.data.details;
    this.id2 = this.zeroFill(this.details.id, 11);
    // console.log(this.details);
    platform.ready().then(() => {
      this.loadMap();
    })

  }
  ionViewDidLoad() {
  }

  zeroFill(number, width) {
    width -= number.toString().length;
    if (width > 0) {
      return new Array(width + (/\./.test(number) ? 2 : 1)).join('0') + number;
    }
    return number + "";
  }

  loadMap() {
    this.location = new LatLng(this.details.latitude, this.details.longitude);
    let element = this.mapElement.nativeElement;

    if (this.location.lat === null || this.location.lng === null) {
      element.innerHTML = '<div>Harita bilgisi yok</div>';
      console.log(element.innerHTML);
      return;
    }
    else {
      let mapOptions: GoogleMapOptions = {
        camera: {
          target: this.location,
          zoom: 18,
          tilt: 30
        }
      };
      this.map = GoogleMaps.create('map', mapOptions);
      this.map.one(GoogleMapsEvent.MAP_READY)
        .then(() => {
          this.map.addMarker({
            title: this.details.title,
            icon: 'blue',
            animation: 'DROP',
            position: this.location
          })
            .then(marker => {
              marker.on(GoogleMapsEvent.MARKER_CLICK)
                .subscribe(() => {
                  this.launchNavigator.navigate([this.location.lat, this.location.lng]);
                });
            });
        });

    }
  }
}
