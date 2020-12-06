import { Component, OnInit, ViewChild, ElementRef, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { CRUDService } from 'src/app/services/crud.service';
import { EditUserService } from 'src/app/services/edit-user.service';
import Swal from 'sweetalert2';
//////////////// 
import { lyl, WithStyles, StyleRenderer, ThemeVariables, LyTheme2  } from '@alyle/ui';
import {
  LyImageCropper,
  ImgCropperConfig,
  ImgCropperEvent,
  ImgCropperErrorEvent
} from '@alyle/ui/image-cropper';
import { Platform } from '@angular/cdk/platform';

const STYLES = (_theme: ThemeVariables) => {

  return {
    cropper: lyl `{
      height: 300px
      max-width: 400px
      margin: 0 auto
    }`,
    sliderContainer: lyl `{
      text-align: center
      max-width: 700px
      margin: 14px,

    }`,
    cropResult: lyl `{
      border-radius: 50%
    }`,
    slider: lyl `{

    }`
  };
};

@Component({
  selector: 'app-change-avatar',
  templateUrl: './change-avatar.component.html',
  styleUrls: ['./change-avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class ChangeAvatarComponent implements  OnInit,WithStyles, AfterViewInit {

  classes = this.sRenderer.renderSheet(STYLES);

  croppedImage?: string;
  scale: number;
  ready: boolean;
  minScale: number;
  @ViewChild(LyImageCropper, { static: true }) readonly cropper: LyImageCropper;
  myConfig: ImgCropperConfig = {
    resizableArea: true,
    width: 300, // Default `250`
    height: 300, // Default `200`
    fill: '#ff2997', // Default transparent if type = png else #000
    type: 'image/png', // Or you can also use `image/jpeg`
    round: true,
    output: {
      width: 200,
      height: 200
    }
  };

  base_url;
  userId;
  imgUrl = null;
  state = false;
  disabledState;
  disabledBtn;

  @ViewChild('userAvatar') userAvatar: ElementRef

  constructor(
    private crud: CRUDService,
    private editUser: EditUserService,

    readonly sRenderer: StyleRenderer,
    private _platform: Platform,
    private theme: LyTheme2
  ) { }

  ngAfterViewInit() {

    // demo: Load image from URL and update position, scale, rotate
    // this is supported only for browsers
    if (this._platform.isBrowser) {
      const config = {
        scale: 0.2,
        position: {
          x: 50,
          y: 20
        }
      };
      this.cropper.setImageUrl(
        '',
        () => {
          this.cropper.setScale(config.scale, true);
          this.cropper.updatePosition(config.position.x, config.position.y);
          // You can also rotate the image
          // this.cropper.rotate(90);
        }
      );
    }

  }
  onCropped(e: ImgCropperEvent) {
    this.croppedImage = e.dataURL;
    this.disabledBtn = false
    console.log('cropped img: ', e);
  }
  onLoaded(e: ImgCropperEvent) {
    console.log('img loaded', e);
  }
  onError(e: ImgCropperErrorEvent) {
    console.warn(`'${e.name}' is not a valid image`, e);
  }

  ngOnInit(): void {
    this.base_url = this.crud.base_url;
    this.userId = localStorage.getItem('id')

    this.imgUrl =`${this.base_url}/users/${this.userId}/avatar`;
    this.disabledBtn = true;
  }

  changeAvatar(){
    // this.disabledState = true;

    let data = this.croppedImage.replace(/^data:image\/(png|jpg);base64,/, "");

    let avatarFile = {
      file: data
    }
    this.editUser.changeAvatar(this.userId, avatarFile).subscribe(Res=>{
    
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
      })
      
      Toast.fire({
        icon: 'success',
        title: 'آواتار شما با موفقیت تغییر کرد'
      })
      setTimeout(()=>{
        this.disabledState = false
      },500)

    }, err=>{
      this.disabledState = false;
    })
  }
 
}
