import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.page.html',
  styleUrls: ['./tracker.page.scss'],
})
export class TrackerPage implements OnInit {
  currentUser: any=[];
  displayArray: any=[];

  constructor(private storage:Storage, private alertController: AlertController) { }

  ngOnInit() {
    this.retrieveAndSetMedication()
  }

  async delay(ms: number){
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
 async retrieveAndSetMedication() {
  console.log("This should be happening first!")
  this.storage.get("currentUser").then((result) => {
    this.currentUser = result
    console.log("Inside retrieval: ", this.currentUser)
    

  })
  console.log("Hello",this.currentUser)
  await this.delay(50);
  for(let element of this.currentUser){
    this.displayArray= element["trackedMedicine"]
    console.log(this.displayArray)
  }
  


}

}
