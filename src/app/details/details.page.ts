import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { GlobalConstants } from '../global-constants';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  data: any;
  currentImage: any;
  currentUser: any = [];


  constructor(private route: ActivatedRoute, private router: Router, private camera: Camera, private storage: Storage) {


    //Imports data for a Drug description to be used
    this.route.queryParams.subscribe(params => {

      if (params && params.special) {
        this.data = params.special;
      }

    });
  }

  //Allows the user to take a picture using the phone's camera

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.currentUser = GlobalConstants.currentUser

    this.camera.getPicture(options).then((imageData) => {
      this.currentImage = 'data:image/jpeg;base64,' + imageData;

      for (let element of this.currentUser) {
        for (let section of element["Medication"]) {
          if (this.data == section["desc"]) {

            section["picture"] = this.currentImage

            GlobalConstants.currentUser = this.currentUser

            GlobalConstants.photos.unshift({
              name: section["name"],
              data: this.currentImage
            })
            this.storage.set("photos", GlobalConstants.photos)
          }
        }
      }
    }, (err) => {
      // This is in case of a handling error
      console.log("Camera issue:" + err);
    });
  }


  ngOnInit() {
    for (let element of GlobalConstants.photos) {

      if (element["name"] == this.data) {
        this.currentImage = element["data"]
      }
    }
    for (let element of this.currentUser) {
      for (let section of element["Medication"]) {
        if (this.data == section["desc"]) {
          this.currentImage = section["picture"]

        }
      }
    }
  }


}
