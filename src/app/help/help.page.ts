import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import{GlobalConstants} from '../global-constants';


@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage implements OnInit {
  state: boolean;

  constructor(private route: Router) { }

  ngOnInit() {
    this.state=GlobalConstants.activeUser
  }
  goToMedHelp() {
    this.route.navigate(['medicationhelp'])
  }
  goToLoginHelp() {
    this.route.navigate(['loginhelp'])
  }

  goToProfileHelp() {
    this.route.navigate(['profilehelp'])
  }
  goToTrackerHelp() {
    this.route.navigate(['trackerhelp'])
  }

  goToDetailsHelp() {
    this.route.navigate(['detailshelp'])
  }


}
