import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
@Injectable({
  providedIn: 'root'
})
export class GlobalsService {
  public serviceBaseUrl = environment.apiHost;
  public serviceBaseUrlShare = 'http://dowinners.com';
  public isDebugMode = true;
  public validarEmail = '[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})';
  public validarTelefono = '^(0|[1-9][0-9]*)$';
  constructor(private socialSharing: SocialSharing) {}
  hour(time){
    return new DatePipe('en-Us').transform(time, 'HH:mm');
  }
  async share(user) {
    // tslint:disable-next-line:max-line-length
    const content = 'Hola bienvenido a Dowinners, únete y descarga nuestra aplicación. El usuario ' + user.name+ ' ' + user.last_name + ' te ha invitado, que esperas para unirte a la red social deportiva que revolucionara el mundo del deporte.';
    const image = 'http://dowinners.com/images/logo-letters.png';
    const url = 'http://dowinners.com';
    let status = null;
    await this.socialSharing.share(content, 'Dowinners', image, url ).then(succs =>{
      status = true;
    }).catch(() => {
      // Error!
      status = false;
    });
    return status;
  }
}
