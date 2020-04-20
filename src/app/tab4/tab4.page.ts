import { Component, OnInit } from '@angular/core';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  user: any;
  retrieveData: any;
  updateLogin: any;
  userArray: any;
  update: boolean;
  scheduled=[];

  retrieveCurrentUser() {
    this.retrieveData = localStorage.getItem("currentUser");
    this.user = JSON.parse(this.retrieveData);
    console.log(this.user);
  }

  retrieveUserLogins(){
    this.retrieveData = localStorage.getItem("userLogins");
    this.updateLogin = JSON.parse(this.retrieveData);
    console.log("This is update logins from the retrieve section: ", this.updateLogin);
  

    
  }
  saveLoggedOutUser(profile){
    localStorage.setItem("userLogins", JSON.stringify(profile));
  }
  updateCurrentUser(profile){
    localStorage.setItem("currentUser", JSON.stringify(profile));


  }
  signOut(){
    
    this.retrieveCurrentUser();
    this.retrieveUserLogins();
    console.log("This is the userlogins: ", this.updateLogin)
    this.update= false;
    for(let x of this.user){
      console.log("Updating")
      //this.updateLogin.push(x)
      console.log("This is the name: ", x["username"])
      for(let i of this.updateLogin){
        console.log("This is i username: ", i["username"])
        if(i["username"]==x["username"]){
          i["username"]=x["username"]
          i["password"]=x["password"]
          i["dob"]=x["dob"]
          i["Medication"]=x["Medication"]
          i["trackedMedicine"]=x["trackedMedicine"]
        }
      }
      if(x["username"]==this.updateLogin["username"]){console.log("TESTING")}
    }
    this.saveLoggedOutUser(this.updateLogin)
    this.retrieveUserLogins()
    console.log("This has been saved: ", this.updateLogin)
    console.log("this is updateLogin: ",this.updateLogin)
    console.log("This is the first current user: ", this.user)
    for (let section of this.user){
      section["username"]="";
      section["password"]="";
      section["dob"]="";
      section["Medication"]="";
      section["trackedMedicine"]=[]
      this.updateCurrentUser(section)
    }
    window.location.reload()
    this.retrieveCurrentUser();
    console.log("This is the second current user: ", this.user)
  }
  
  constructor(private localNotifications: LocalNotifications) { 


  }
  deleteUserData(){
    this.retrieveUserLogins()
    this.updateLogin=[]
    console.log("This is updateLogins", this.updateLogin)
    this.saveLoggedOutUser(this.updateLogin)


  }
  ngOnInit() {
  }
  scheduleNotif(time: number){
    this.localNotifications.schedule({id: 5, 
      title: "Tester", 
      text: "This is a test",
      trigger:{
        in: time, 
        unit: ELocalNotificationTriggerUnit.SECOND
      }


  })

}}
