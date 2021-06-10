import { Injectable } from '@angular/core';
import { Platform, LoadingController, AlertController, ToastController } from '@ionic/angular';
import * as moment from 'moment-timezone';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpService } from '@app/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  private selectedLanguage = new Subject<string>();
  public notificationAuthentication: BehaviorSubject<any>;
  private isLoading = false;;

  constructor(
    private httpService: HttpService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {
    this.notificationAuthentication = new BehaviorSubject(null);
  }

  public getLanguageObservable(): Observable<string> {
    return this.selectedLanguage.asObservable();
  }

  public setLanguageData(data: string) {
    this.selectedLanguage.next(data);
  }

  async loadingPresent(message?: string) {
    this.isLoading = true;
    return await this.loadingCtrl.create({
      message: message ? message : 'Harap tunggu...' 
    }).then(a => {
      a.present().then(() => {
        if (!this.isLoading) {
          a.dismiss();
        }
      });
    });
  }

  async loadingDismiss() {
    this.isLoading = false;
    return await this.loadingCtrl.getTop()
      .then(a => {
          if ( a )
          a.dismiss();
      });
  }

  async alert(message: string, handler?: any) {
    let alert = await this.alertCtrl.create({
      message: message,
      buttons: [{ text: 'OK', role: 'cancel', handler: data => { handler } }]
    });
    alert.present();
  }

  async toast(message: string, position?, duration?: number) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: duration ? duration : 3000,
      position: position, // Accepted values: "top", "middle", "bottom"
      cssClass: "toast",
    });
    toast.present();
  }

  openUrl(url: string): boolean {
    window.open(url, '_system', 'location=yes');
    return false;
  }

  timezoneInfo() {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/resolvedOptions#Browser_compatibility
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  timezoneOffset() {
    var d = new Date();
    return d.getTimezoneOffset();
  }

  isToday(date: Date): boolean {
    let today = new Date(), day = new Date(date);
    return day.getDate() === today.getDate() 
    && day.getMonth() === today.getMonth() 
    && day.getFullYear() === today.getFullYear();
  }

  zeroDate(date: Date): number {
    let today: Date = new Date(date);
    today.setHours(0, 0, 0, 0);
    return today.getTime();
  }

  timeDiff(fDate, sDate, type): number {
    let diff = sDate.getTime() - fDate.getTime();
    switch (type) {
      case 'Day':
        return Math.floor(diff / (1000 * 60 * 60 * 24));
      case 'Hour':
        return Math.floor(diff / (1000 * 60 * 60));
      case 'Minute':
        return Math.floor(diff / (1000 * 60));
      default:
      // Pop Up		            
    }
  }

  guidEmpty() {
    return '00000000-0000-0000-0000-000000000000';
  }

  convertDateWithMoment(date: any, timeZone: string) {
    let today           = timeZone ? moment.tz(date, timeZone) : moment.tz(date, ''),
      years             = `${today.year()}`,
      months            = ('0' + (today.month())).slice(-2),
      dates             = ('0' + (today.date())).slice(-2),
      yearly            = `${years}`,
      monthly           = `${years}/${months}`,
      daily             = `${years}/${months}/${date}`,
      hours             = ('0' + (today.hours())).slice(-2),
      minutes           = ('0' + (today.minutes())).slice(-2),
      seconds           = ('0' + (today.seconds())).slice(-2),
      times             = `${hours}:${minutes}`,
      timeForComparison = `${hours}${minutes}`;
      
    return {
      years             : years,
      months            : months,
      dates             : dates,
      yearly            : yearly,
      monthly           : monthly,
      daily             : daily,
      times             : times,
      hours             : hours,
      minutes           : minutes,
      seconds           : seconds,
      timeForComparison : timeForComparison
    }

    // https://momentjs.com/timezone/
  }

  convertDate(date: any) {
    let today           = new Date(date),
      years             = today.getFullYear().toString(),
      months            = ('0' + (today.getMonth() + 1)).slice(-2),
      dates             = ('0' + (today.getDate())).slice(-2),
      yearly            = `${years}`,
      monthly           = `${years}/${months}`,
      daily             = `${years}/${months}/${date}`;
      
    return {
      years             : years,
      months            : months,
      dates             : dates,
      yearly            : yearly,
      monthly           : monthly,
      daily             : daily
    }
  }

  /**
   * toIsoStringWithTimeZone
   * @param date 
   */
  toIsoStringWithTimeZone(date) {
    let d = date ? new Date(date): null;
    const minutes = d.getMinutes() - d.getTimezoneOffset();
    return d ? new Date(d.setMinutes(minutes)).toISOString(): null;
  }

  /**
   * toDateFromIsoStringWithTimeZone
   * @param date 
   */
  toDateFromIsoStringWithTimeZone(date) {
    let d = date ? new Date(date): null;
    const minutes = d.getMinutes() + d.getTimezoneOffset();
    return d ? new Date(d.setMinutes(minutes)): null;
  }

  getSetting(name: string, settings: Object) {
    return (settings[name]).toLowerCase() == 'true';
  }

  getGranted(name: string, grantedPolicies: Object) {
    return (grantedPolicies[name]);
  }

  base64Raw(base64: string) {
    const b = base64.split(',');
    return b[1];
  }

  base64(base64: string) {
      return base64 ? `data:image/png;base64,${base64}` : null
  }

  getWebLocation(geo: any): Observable<any> {
    return this.httpService.getWebLocation(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${geo.coords.latitude},${geo.coords.longitude}&key=AIzaSyBaTVlHDndpSgbdDnRsCy2xFJt2tB41NB0`);
  }
}
