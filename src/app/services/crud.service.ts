import { Injectable } from '@angular/core';

import { HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CRUDService {

  base_url = 'http://api.hrplan.ir';

  constructor() { }

  headers = new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('Application', 'wKvWyMJV5ab85DMYKpOD')
  .set('Accept', 'application/json');
}