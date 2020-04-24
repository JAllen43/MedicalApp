import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  data: any;

  constructor(private route: ActivatedRoute, private router: Router) {
    
    //Imports data for a Drug description to be used
    this.route.queryParams.subscribe(params => {
      
      if (params && params.special) {
        this.data = params.special;
      }

    });
  }

  ngOnInit() {
  }

}
