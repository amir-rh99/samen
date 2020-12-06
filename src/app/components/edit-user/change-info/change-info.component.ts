import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GeuUserDataService } from 'src/app/services/geu-user-data.service';
import { EditUserComponent } from 'src/app/pages/edit-user/edit-user.component';
import { EditUserService } from 'src/app/services/edit-user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-info',
  templateUrl: './change-info.component.html',
  styleUrls: ['./change-info.component.scss']
})
export class ChangeInfoComponent implements OnInit {
  userId;
  userProfile;
  userInfo;

  profileId;
  countries;
  provinces;
  cities;
  countrySelected = false;
  provinceSelected = false;
  provinceAndCityState = false;
  userSex;
  userPrivate;

  ////// when user selected conutry and city before
  userCountry;
  userProvince;
  userCity;


  @ViewChild('firstName') firstName: ElementRef;
  @ViewChild('lastName') lastName: ElementRef;
  @ViewChild('quote') quote: ElementRef;
  @ViewChild('bloodType') bloodType: ElementRef;
  @ViewChild('country') country: ElementRef;
  @ViewChild('province') province: ElementRef;
  @ViewChild('city') city: ElementRef

  disabledState= false

  constructor(
    private getUserData: GeuUserDataService,
    private editUser: EditUserService
  ) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('id')
    this.getUserData.getUserProfile(this.userId).subscribe((userProfile:any)=>{
      this.userProfile = userProfile;
      this.profileId = this.userProfile.id;
      this.userSex = this.userProfile.sex;
      console.log(this.userProfile, " userProfiiiile");
      this.getUserData.getUserInfo(this.userId).subscribe(info=>{
        this.userInfo = info;
        this.userPrivate = this.userInfo.private;
        console.log(this.userInfo, " infoooooooo");
        
      })

      this.getCountries();
      if(this.userProfile.province !== null){
        this.provinceAndCityState = true;

      }

    })
  }

  saveChanges(){
    let province;
    let city;

    this.disabledState = true;
    // console.log(this.city.nativeElement.value, " city id");

    // console.log(this.country.nativeElement.value, " county");

    if(this.provinceAndCityState === false || this.province.nativeElement.value === "default"){
      province = null;
    } else {
      let result = (this.province.nativeElement.value).split('~');
      province = result[0]
    }

    if((this.provinceAndCityState === false && this.provinceSelected === false) || this.city.nativeElement.value === "default") {
      city = null
    } else {
      city = this.city.nativeElement.value;
    }

    let country = (this.country.nativeElement.value).split('~');
    // let province = (this.province.nativeElement.value).split('~');

    let information={
      first_name: this.firstName.nativeElement.value,
      last_name: this.lastName.nativeElement.value,
      quote: this.quote.nativeElement.value,
      blood_type: this.bloodType.nativeElement.value,

      sex: this.userSex,
      country: country[0],
      province: province,
      city: city,
      private: this.userPrivate
    }
console.log(information, " informationssss");

    this.editUser.updateUserInformation(this.profileId,information).subscribe(Res=>{
      console.log(Res, " infor update");
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
      })
      
      Toast.fire({
        icon: 'success',
        title: 'تغییرات با موفقیت ذخیره شد'
      })
      this.disabledState = false 
    },err=>{
      this.disabledState = false 
    })
    
  }

  getCountries(){
    this.editUser.getCountries().subscribe((countries: any)=>{
      this.countries = countries.data;
      if(this.userProfile.country !== null){
        var result = this.countries.filter(obj=>{
          return obj.id === this.userProfile.country
        })
        if(this.userProfile.country === '30' ){
          this.getProvinces(result[0].country);
        }
        this.userCountry = `${result[0].id}~${result[0].country}`
      }
    })
  }

  onChangeCountry(event: string){
    console.log(event);
    let fields = event.split('~');
    console.log(fields[1]);
    if(fields[0] === '30'){
      this.provinceAndCityState = true;
      this.getProvinces(fields[1])
    } else {
      this.provinceAndCityState = false;
      this.provinceSelected = false;
    }
    // if(event && this.userProfile.province ){
      
    // }    
  }
  onChangeProvince(event){
    let fields = event.split('~');
    if(event){
      this.getCities(fields[1])
    }
  }
  getProvinces(countryName){
    
    this.editUser.getProvinces(countryName).subscribe((province:any)=>{
      this.provinces = province.data;
      if(province.count !== 0){
        this.countrySelected = true;
      }
      console.log(this.userProfile , " prrrofile");
      
      if(this.userProfile.province !== null && this.userProfile.province != 0){
        
        let result = this.provinces.filter(obj=>{
          return obj.id === this.userProfile.province
        })
        this.userProvince = `${result[0].id}~${result[0].code}`;
        this.getCities(result[0].code)
      }
    })
  }
  getCities(provinceCode){
    this.editUser.getCities(provinceCode).subscribe((cities: any)=>{
      this.cities = cities.data;
      this.provinceSelected = true;

      if(this.userProfile.city !== null && this.userProfile.city != 0 && this.userProfile.city !== ""){
        let result = this.cities.filter(obj=>{
          return obj.id === this.userProfile.city
        })
        this.userCity = result[0].id
      }
    })
  }

  getRadioValue(value){
    this.userSex = value;
  }
  getSearchValue(value){
    this.userPrivate = value
    console.log(this.userPrivate);
    
  }
}
