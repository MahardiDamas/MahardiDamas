import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeWithNavigationPropertiesDto } from '@app/proxy/employees';
import { SalesPersonWithNavigationPropertiesDto } from '@app/proxy/sales-persons';

@Component({
  selector: 'app-sales-person-detail',
  templateUrl: './sales-person-detail.page.html',
  styleUrls: ['./sales-person-detail.page.scss'],
})
export class SalesPersonDetailPage implements OnInit {

  title: string = null;

  selected?: SalesPersonWithNavigationPropertiesDto = null;

  employee: EmployeeWithNavigationPropertiesDto;  

  constructor(
    private activeRoute: ActivatedRoute    
  ) { }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe((params) => {
      this.title = params.title; 
      this.selected = params.data;
    });
  }
}
