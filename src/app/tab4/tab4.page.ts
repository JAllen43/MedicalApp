import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  user: any;
  retrieveData: any;
  defaultMeds=[
    { "name": "bluep inhaler", "desc": "Use it throughout the day", "toggleswitch": "No" },
    { "name": "brown inhaler", "desc": "Use it at the beginning and end of everyday", "toggleswitch": "No" }
  ];

  retrieveCurrentUser() {
    this.retrieveData = localStorage.getItem("currentUser");
    this.user = JSON.parse(this.retrieveData);
    console.log(this.user);
  }
  saveLoggedOutUser(profile){
    localStorage.setItem("currentUser", JSON.stringify(profile));


  }
  signOut(){
    
    this.retrieveCurrentUser();
    console.log("This is the first current user: ", this.user)
    for (let section of this.user){
      section["username"]="";
      section["password"]="";
      section["dob"]="";
      section["Medication"]=this.defaultMeds;
      section[""]
      this.saveLoggedOutUser(section)
    }
    window.location.reload()
    this.retrieveCurrentUser();
    console.log("This is the second current user: ", this.user)
  }
  
  constructor() { }

  ngOnInit() {
  }

}
