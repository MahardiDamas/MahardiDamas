import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { EmployeeService, EmployeeWithNavigationPropertiesDto } from '@app/proxy/employees';
import { ImageDto } from '@app/proxy/shared';
import { UtilService } from '@app/services/util.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  @Input() employee: EmployeeWithNavigationPropertiesDto = null;

  photo: string = null;

  constructor(
    private employeeService: EmployeeService,
    private utilService: UtilService ) { }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if(changes.employee) {
      if(changes.employee.currentValue != null 
        && this.employee.employee.id !== null) {
        this.getProfilePicture();
      }
    }
  }

  getProfilePicture() {
    this.employeeService.getProfilePicture(this.employee.employee.userId)
    .subscribe((data: ImageDto) => {
      this.photo = this.utilService.base64(data.fileContent);
    });
  }

}
