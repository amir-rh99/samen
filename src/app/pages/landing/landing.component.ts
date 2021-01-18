import { Component, OnInit } from '@angular/core';
import { CRUDService } from 'src/app/services/crud.service';
import { GetServicesService } from 'src/app/services/get-services.service';
import { version } from '../../config'
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  public version: string = version;
  public bpInfo: any;
  public base_url: string;
  constructor(
    private getServices: GetServicesService,
    private crudService: CRUDService
  ) { }

  ngOnInit(): void {
    this.base_url = this.crudService.base_url;
    this.getServices.bpInfo.subscribe(res=>{
      this.bpInfo = res;
      console.log(this.bpInfo, " ****bpppapsdp");
      
    })
  }

}
