import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';

@Injectable()
export class AppErrorHandler implements ErrorHandler {
  constructor(private injector: Injector, private zone: NgZone) { }

  // inside your error handler service (think to inject NgZone)
  // this.zone.run(() => this.router.navigate(["/error"]));

  // https://medium.com/@amcdnl/global-error-handling-with-angular2-6b992bdfb59c
  // https://hackernoon.com/hook-into-angular-initialization-process-add41a6b7e
  // https://stackoverflow.com/questions/39767019/app-initializer-raises-cannot-instantiate-cyclic-dependency-applicationref-w/39767492
  // https://stackoverflow.com/questions/46036554/angular-4-custom-error-handler-di-cannot-instantiate-cyclic-dependency/46037172
  // https://github.com/angular/angular/issues/20290

  handleError(error: any) {
    // 401 Unauthorized
    if (error.status && error.status === 401) {
    //  let redirect = 'notauthorized';
    //  if (auth.status.role === 'admin') {
    //    redirect = 'admin/notauthorized';
    //  }
    //  if (auth.status.role === 'user') {
    //    redirect = 'user/notauthorized';
    //  }
    //  if (auth.status.role === 'guest') {
    //    redirect = 'guest/notauthorized';
    //  }
    //  this.zone.run(() => { router.navigate([redirect]); });
      alert('Accesso non autorizzato / 401');
      return;
    }
    // 401 Unauthorized

    // 403 Forbidden
    if (error.status && error.status === 403) {
    //  let redirect = 'notauthorized';
    //  if (auth.status.role === 'admin') {
    //    redirect = 'admin/notauthorized';
    //  }
    //  if (auth.status.role === 'user') {
    //    redirect = 'user/notauthorized';
    //  }
    //  if (auth.status.role === 'guest') {
    //    redirect = 'guest/notauthorized';
    //  }
    //  this.zone.run(() => { router.navigate([redirect]); });
      alert('Accesso non autorizzato / 403');
      return;
    }
    // 403 Forbidden

     // 404 Not found
     if (error.status && error.status === 404) {
      //  let redirect = 'notauthorized';
      //  if (auth.status.role === 'admin') {
      //    redirect = 'admin/notauthorized';
      //  }
      //  if (auth.status.role === 'user') {
      //    redirect = 'user/notauthorized';
      //  }
      //  if (auth.status.role === 'guest') {
      //    redirect = 'guest/notauthorized';
      //  }
      //  this.zone.run(() => { router.navigate([redirect]); });
        alert('Pagina non trovata / 404');
        return;
      }
      // 404 Not found

    // 500 server-error
    if (error.status && error.status === 500) {
      //  let redirect = 'notauthorized';
      //  if (auth.status.role === 'admin') {
      //    redirect = 'admin/notauthorized';
      //  }
      //  if (auth.status.role === 'user') {
      //    redirect = 'user/notauthorized';
      //  }
      //  if (auth.status.role === 'guest') {
      //    redirect = 'guest/notauthorized';
      //  }
      //  this.zone.run(() => { router.navigate([redirect]); });
        alert('Si è verificato un errore sul server (500)');
        return;
      }
      // 500 server-error

    // console.log("** error ** =>" + error);
    throw error;
  }
}
