import { Injectable } from '@angular/core';
import { CRUDService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private crud: CRUDService
  ) { }

  base_url = this.crud.base_url;

  hash = localStorage.getItem('hash');
  headers = new CRUDService().headers.set('x-auth', this.hash);
}
