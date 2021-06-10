import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UtilService } from '@app/services/util.service';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AuthService } from '@app/services/auth.service';
import { environment } from '@environments/environment.prod';
import { EmployeeService, EmployeeWithNavigationPropertiesDto } from '@app/proxy/employees';
import { Constants, ImageDto } from '@app/proxy/shared';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  selected: EmployeeWithNavigationPropertiesDto;
  form: FormGroup;  
  photo: string = null;

  constructor(
    private storage: Storage,
    private fb: FormBuilder,
    private utilService: UtilService,
    private actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    private employeeService: EmployeeService,
    private alertCtrl: AlertController,
    private authService: AuthService
  ) {
    this.buildForm();
  }

  ngOnInit() {
    this.storage.get(`hure_${environment.appName}_employee`)
    .then((employee) => {
      this.selected = employee;
      this.buildForm();
      this.getProfilePicture(this.selected.employee.id);
    });
  }

  buildForm() {
    const {
      code,
      photo,
      firstName,
      middleName,
      lastName,
      fullName,
      description,
      placeOfBirth,
      dateOfBirth,
      gender,
      bloodType,
      religion,
      marital,
      dateOfMarriage,
      nationality,
      address,
      country,
      province,
      city,
      district,
      village,
      postal,
      latitude,
      longitude,
      phone,
      businessPhone,
      email,
      businessEmail,
      employeeNo,
      employeeStatus,
      benefitTemplateId,
      hireDate,
      joinDate,
      exitDate,
      exitReason,
      managerId,
      approved1ById,
      approved2ById,
      approved3ById,
      familyCardNo,
      idCardNo,
      passportNo,
      passportExpiredDate,
      npwpNo,
      ptkp,
      bpjsKsNo,
      bpjsFaskes,
      bpjsKsStatus,
      bpjsTkNo,
      bank,
      bankAccNo,
      bankAccName,
      mobileDeviceId,
      isLocationLockAttendance,
      isSelfieAttendance,
      isThirdPartyAttendance,
      userId,
      userName,
      isDisabled,
      isHasApprovalRole,
      isAttendanceApproval,
      isOvertimeApproval,
      isLeaveApproval,
      isWorkshiftApproval,
      password,
      companyId,
      directorateId,
      divisionId,
      departmentId,
      sectionId,
      projectId,
      locationId,
      jobPositionId,
      jobTitleId,
      educationId,
    } = this.selected?.employee || {};

    this.form = this.fb.group({
      code: [code ?? null, []],
      photo: [photo ?? null, []],
      firstName: [firstName ?? null, [Validators.required]],
      middleName: [middleName ?? null, []],
      lastName: [lastName ?? null, []],
      fullName: [fullName ?? null, []],
      description: [description ?? null, []],
      placeOfBirth: [placeOfBirth ?? null, []],
      dateOfBirth: [dateOfBirth ? new Date(dateOfBirth) : null, []],
      gender: [gender ?? null, []],
      bloodType: [bloodType ?? null, []],
      religion: [religion ?? null, []],
      marital: [marital ?? null, []],
      dateOfMarriage: [dateOfMarriage ? new Date(dateOfMarriage) : null, []],
      nationality: [nationality ?? null, []],
      address: [address ?? null, []],
      country: [country ?? null, []],
      province: [province ?? null, []],
      city: [city ?? null, []],
      district: [district ?? null, []],
      village: [village ?? null, []],
      postal: [postal ?? null, []],
      latitude: [latitude ?? null, []],
      longitude: [longitude ?? null, []],
      phone: [phone ?? null, []],
      businessPhone: [businessPhone ?? null, []],
      email: [email ?? null, []],
      businessEmail: [businessEmail ?? null, []],
      employeeNo: [employeeNo ?? null, []],
      employeeStatus: [employeeStatus ?? null, []],
      benefitTemplateId: [benefitTemplateId ?? null, []],
      hireDate: [hireDate ? new Date(hireDate) : null, []],
      joinDate: [joinDate ? new Date(joinDate) : null, []],
      exitDate: [exitDate ? new Date(exitDate) : null, []],
      exitReason: [exitReason ?? null, []],
      managerId: [managerId ?? null, []],
      approved1ById: [approved1ById ?? null, []],
      approved2ById: [approved2ById ?? null, []],
      approved3ById: [approved3ById ?? null, []],
      familyCardNo: [familyCardNo ?? null, []],
      idCardNo: [idCardNo ?? null, []],
      passportNo: [passportNo ?? null, []],
      passportExpiredDate: [passportExpiredDate ? new Date(passportExpiredDate) : null, []],
      npwpNo: [npwpNo ?? null, []],
      ptkp: [ptkp ?? null, []],
      bpjsKsNo: [bpjsKsNo ?? null, []],
      bpjsFaskes: [bpjsFaskes ?? null, []],
      bpjsKsStatus: [bpjsKsStatus ?? null, []],
      bpjsTkNo: [bpjsTkNo ?? null, []],
      bank: [bank ?? null, []],
      bankAccNo: [bankAccNo ?? null, []],
      bankAccName: [bankAccName ?? null, []],
      mobileDeviceId: [mobileDeviceId ?? null, []],
      isLocationLockAttendance: [isLocationLockAttendance ?? null, []],
      isSelfieAttendance: [isSelfieAttendance ?? null, []],
      isThirdPartyAttendance: [isThirdPartyAttendance ?? null, []],
      userId: [userId ?? null, []],
      userName: [userName ?? null, []],
      isDisabled: [isDisabled ?? null, []],
      isHasApprovalRole: [isHasApprovalRole ?? null, []],
      isAttendanceApproval: [isAttendanceApproval ?? null, []],
      isOvertimeApproval: [isOvertimeApproval ?? null, []],
      isLeaveApproval: [isLeaveApproval ?? null, []],
      isWorkshiftApproval: [isWorkshiftApproval ?? null, []],
      password: [password ?? null, []],
      companyId: [companyId ?? null, []],
      directorateId: [directorateId ?? null, []],
      divisionId: [divisionId ?? null, []],
      departmentId: [departmentId ?? null, []],
      sectionId: [sectionId ?? null, []],
      projectId: [projectId ?? null, []],
      locationId: [locationId ?? null, []],
      jobPositionId: [jobPositionId ?? null, []],
      jobTitleId: [jobTitleId ?? null, []],
      educationId: [educationId ?? null, []],
    });
  }

  getProfilePicture(employeeId: string) {
    this.employeeService.getProfilePicture(employeeId)
    .subscribe((data: ImageDto) => {
      this.photo = this.utilService.base64(data.fileContent);
    });
  }

  // updateProfile() {
  //   this.utilService.loadingPresent('Please wait..')
  //   .then(() => {
  //     this.postModel(this.employeeUpdate, this.form.getRawValue());
  //     this.profileService.update(this.employeeUpdate)
  //       .subscribe(() => {
  //         this.authService.getCurrentEmployeeInformation(this.utilService.guidEmpty(), null)
  //         .subscribe((employee: any) => {
  //           this.employee = employee;
  //           this.utilService.loadingDismiss()
  //           this.storage.set(`hure_${environment.appName}_employee`, this.employee);
  //           this.utilService.toast('Update profile success!', 'top');
  //         });
  //       }, (error) => {
  //         console.log(error)
  //         this.utilService.loadingDismiss()
  //         this.utilService.toast('Update profile failed!', 'top');
  //       })
  //   });
  //}

  async changeAvatar() {
    var languange = window.localStorage.getItem(Constants.KEY_DEFAULT_LANGUAGE);
    const action = await this.actionSheetCtrl.create({
      header: 'Choose options',
      buttons: [
        {
          text: 'Gallery',
          icon: 'image',
          handler: () => {
            this.openGallery();
          }
        },
        {
          text: 'Camera',
          icon: 'camera',
          handler: () => {
            this.openCamera();
          }
        },
      ]
    });

    action.present();
  }

  openGallery() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false,
      allowEdit: true,
      targetWidth: 512,
      targetHeight: 512,
      correctOrientation: true
    }

    this.camera.getPicture(options)
      .then((imageData) => {
        this.changeProfilePicture(imageData);
    }, () => {
      // Handle error
    });
  }

  openCamera() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: false,
      allowEdit: true,
      targetWidth: 512,
      targetHeight: 512,
      correctOrientation: true
    }

    this.camera.getPicture(options)
      .then((imageData) => {
        this.changeProfilePicture(imageData);
      }, () => {
        // Handle error
      });
  }


  changeProfilePicture(imageData: string) {
    this.employeeService.changeProfilePicture({ 
      id: this.selected.employee.id, 
      name: this.selected.employee.id, 
      fileContent: imageData 
    }).subscribe((data: ImageDto) => {
      this.photo = this.utilService.base64(data.fileContent);
    });
  }

  changePassword() {
    let credentials = {
      username: null,
      password: null
    };
    var languange = window.localStorage.getItem(Constants.KEY_DEFAULT_LANGUAGE);
    this.storage.get(`hure_${environment.appName}_credential`)
    .then(async(credential) => {
      credentials = credential;

      let alert = await this.alertCtrl.create({
        header: languange && languange === 'id' ? 'Ubah Kata Sandi' : 'Change Password',
        backdropDismiss: false,
        inputs: [
          {
            name: 'currentPassword',
            placeholder: languange && languange === 'id' ? 'Kata Sandi Saat Ini' : 'Current Password',
            type: 'password'
          },
          {
            name: 'newPassword',
            placeholder: languange && languange === 'id' ? 'Kata Sandi baru' : 'New Password',
            type: 'password'
          },
          {
            name: 'confirmNewPassword',
            placeholder: languange && languange === 'id' ? 'Konfirmasi Kata Sandi' : 'Confirm new password',
            type: 'password'
          }
        ],
        buttons: [
          {
            text: languange && languange === 'id' ? 'Batal' : 'Cancel',
            handler: () => {
              //
            }
          },
          {
            text: languange && languange === 'id' ? 'Simpan' : 'Save',
            handler: (data) => {
              if (data.newPassword !== data.confirmNewPassword) {
                var warning = languange && languange === 'id' ? 'Konfirmasi kata sandi tidak cocok' : "Confirm password don't match"
                this.utilService.toast(warning, 'top');
                return
              }
  
              this.authService.changePassword(data)
                .subscribe(() => {
                  var message = languange && languange === 'id' ? 'Berhasil! Kata sandi Anda telah diubah.' : 'Success! Your password has been changed.'
                  credentials.password = data.newPassword;
                  this.storage.set(`hure_${environment.appName}_credential`, credentials);
                  this.utilService.toast(message, 'top', 3500);
                }, (error) => {
                  console.log(error);
                  let message = error.error.error_description || error.error.error.message;
                  this.utilService.toast(message);
                });
            }
          }
        ]
      });
  
      alert.present();
    });
  }

  // notificationConfiguration(employee: any, tenantId: string) {
  //   let _employee = employee;
  //   if (this.platform.is('cordova')) {
  //     this.notificationService.getToken().then((deviceTokenId) => {
  //       _employee.deviceId = deviceTokenId;
  //       employee = _employee;

  //       Promise.all([
  //         this.notificationService.addTokenToTopic(deviceTokenId, `attendance-${tenantId}`),
  //         this.notificationService.addTokenToTopic(deviceTokenId, `announcement-${tenantId}`),
  //         this.notificationService.addTokenToTopic(deviceTokenId, `news-${tenantId}`)
  //       ]).then(() => {
  //         this.profileService.update(_employee)
  //           .subscribe(() => {
  //             this.storage.set(`hure_${environment.appName}_employee`, employee)
  //             this.storage.set(`hure_${environment.appName}_deviceTokenId`, deviceTokenId);
  //           });
  //       }).catch((error) => {
  //         console.log(error)
  //       })
  //     });
  //   }
  // }
}
