import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DashboardService, ActivityGroupByTotalDto, GetDashboardsInput } from '@app/proxy/dashboards';
import { SalesPersonWithNavigationPropertiesDto } from '@app/proxy/sales-persons';
import { PagedResultDto } from '@app/proxy/shared';
import * as moment from 'moment';
import { zip } from 'rxjs';

@Component({
  selector: 'app-sales-activity-overview',
  templateUrl: './sales-activity-overview.page.html',
  styleUrls: ['./sales-activity-overview.page.scss'],
})
export class SalesActivityOverviewPage implements OnInit, OnChanges {

  @Input() salesPerson: SalesPersonWithNavigationPropertiesDto = null;

  filters = { companyId: '', employeeId: ''} as GetDashboardsInput;

  salesActivityByCustomer: PagedResultDto<ActivityGroupByTotalDto> = {
    items: [],
    totalCount: 0,
  };

  salesActivityByCustomerSegment: PagedResultDto<ActivityGroupByTotalDto> = {
    items: [],
    totalCount: 0,
  };

  salesActivityByType: PagedResultDto<ActivityGroupByTotalDto> = {
    items: [],
    totalCount: 0,
  };

  salesActivityByStatus: PagedResultDto<ActivityGroupByTotalDto> = {
    items: [],
    totalCount: 0,
  };

  salesActivityByAvgTotalTime: PagedResultDto<ActivityGroupByTotalDto> = {
    items: [],
    totalCount: 0,
  };

  minDate = moment().subtract(365, 'days').format('YYYY-MM-DD');
  maxDate = moment().add(1, 'days').format('YYYY-MM-DD');

  constructor(
    private dashboardService: DashboardService
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes && changes.salesPerson.currentValue !== null) {      
      const employee = changes.salesPerson.currentValue.employee;
      this.filters.companyId = employee.companyId;
      this.filters.employeeId = employee.id;
      this.filters.startDate = moment().subtract(30, 'days').endOf('date').toISOString();
      this.filters.endDate = moment().subtract(-1, 'days').endOf('date').toISOString(); 
      this.getOverview();
    }
  }

  refresh() {
    this.filters.startDate = new Date(this.filters.startDate).toISOString();
    this.filters.endDate = new Date(this.filters.endDate).toISOString();
    this.getOverview();
  }

  changeDateStart(date: any) {
    //this.getOverview();
  }

  changeDateEnd(date: any) {
    //this.getOverview();
  }

  getOverview() {

    let source$ = zip(
      this.dashboardService.getSalesActivityByCustomer(this.filters),
      this.dashboardService.getSalesActivityByCustomerSegment(this.filters),
      this.dashboardService.getSalesActivityByType(this.filters),
      this.dashboardService.getSalesActivityByStatus(this.filters),
      this.dashboardService.getSalesActivityByAvgTotalTime(this.filters)      
    )
    source$.subscribe(([byCustomer, byCustomerSegment, byType, byStatus, byAvgTotalTime]) => {
      this.salesActivityByCustomer = byCustomer;
      this.salesActivityByCustomerSegment = byCustomerSegment;
      this.salesActivityByType = byType;
      this.salesActivityByStatus = byStatus;
      this.salesActivityByAvgTotalTime = byAvgTotalTime;
    });
  
  }

  percentage(n: number, t: number) {
    return (Math.floor((n/t) * 100)) + '%';
  }

}
