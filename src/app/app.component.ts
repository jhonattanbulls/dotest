import { Component } from '@angular/core';
import { Platform, Events, NavController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LanguageService } from './core/services';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    public events: Events,
    public router: Router,
    public navCtrl: NavController,
    private androidPermissions: AndroidPermissions,
    private languageService: LanguageService,
  )
  {
    this.initializeApp();
  }
  async initializeApp() {
    await this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.languageService.setInitialAppLanguage();
      this.permisos();
    });
  }
  permisos() {
    this.androidPermissions.requestPermissions([
        this.androidPermissions.PERMISSION.CAMERA,
        this.androidPermissions.PERMISSION.MODIFY_AUDIO_SETTINGS,
        this.androidPermissions.PERMISSION.RECORD_AUDIO,
        this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE,
        this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE
    ]);
  }
}
