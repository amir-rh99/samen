import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import * as $ from "jquery";
import Typed from 'typed.js';

// $(function () {
//   ($('[data-toggle="tooltip"]')).tooltip()
// })

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));




  // var typed = new Typed('.element', {
  //   /**
  //    * @property {array} strings strings to be typed
  //    * @property {string} stringsElement ID of element containing string children
  //    */
  //   strings: [
  //     'These are the default values...',
  //     'You know what you should do?',
  //     'Use your own!',
  //     'Have a great day!'
  //   ],
  //   stringsElement: null,
  
  //   /**
  //    * @property {number} typeSpeed type speed in milliseconds
  //    */
  //   typeSpeed: 400,
  // })   

