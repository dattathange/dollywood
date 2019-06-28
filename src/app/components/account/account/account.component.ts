import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../../globalservices/account/account.service'
import {Router} from '@angular/router'
import {defaultUserImage} from '../../../configurations/configuration'
import {Navigationshared} from '../../../globalservices/sharedservices/navigationshared.service'

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  userId: string = "";
  userProfileData : any;
  gender: string = "Male";
  errorMessage: string = "";
  status: boolean = true;
  nothingLoading = true;
  defaultImage = defaultUserImage;
    updateProfileImage: any;
    showAccountModal:any=false;
    removeProfilePictureButtonClicked = false;
  
    constructor(private accountService: AccountService, private router: Router,
    private navigationSharedService: Navigationshared) { }

  ngOnInit() {
    this.navigationSharedService.receiveNavigationChanged('accounts');
    this.bindUserWatchList();
    this.bindPageTitle();
  }

  bindUserWatchList() {
    
    let uid = sessionStorage.getItem('ud');
            //console.log(uid);
    if (uid !== undefined && uid != null) {
      this.userId = uid;
      this.accountService.getUserProfile(uid)
        .subscribe(
          result => {
          //    console.log(result);
              if(result != undefined)
                this.userProfileData = result;
              else
                this.userProfileData = {};

              if(this.userProfileData.gender == "")
                this.userProfileData.gender = "Male";
          }
      );
    }
    else {
      this.router.navigate(['']);
    }
  }

  openAccountModal(){
    this.showAccountModal = true;
   }
   
   hideAccountModal(){
        this.showAccountModal = false;
   }
  
    
  saveProfileDetails() {
    if(this.updateProfileImage){
        this.saveImage();
    } else {
        this.updateProfile();
    }
   }
   
  updateProfile() {
    this.errorMessage = "";
    if(this.userId != undefined &&
    this.userId.length > 0) {
    
    this.userProfileData.uid = this.userId;
    this.userProfileData.fullname = this.userProfileData.full_name;
    this.userProfileData.about = this.userProfileData.about;
    this.userProfileData.gender = this.userProfileData.gender;

      this.nothingLoading = false;
      this.accountService.updateUserProfile(this.userProfileData)
        .subscribe(
          result => {
              if(result.status != undefined && result.status == true)
              {
                this.errorMessage = "Profile updated successfully";
                this.status = true;
              }
              else {
                this.errorMessage = "Some problem while updating the profile, please try again";
                this.status = false;
              }

              this.nothingLoading = true;
              
          }
      );
    }
  }
  
    updateProfilePicture(event) {
  
        this.errorMessage = "";
        if(this.userId != undefined &&
        this.userId.length > 0) {
            let fileList: FileList = event.target.files;
            if(fileList.length > 0) {

                if(event.target.files[0].type == "image/gif" || event.target.files[0].type == "image/jpg"  || event.target.files[0].type == "image/png" || event.target.files[0].type == "image/jpeg" ) {

                    let file: File = fileList[0];

                    var reader = new FileReader();

                    reader.onload = (event: ProgressEvent) => {
                     // this.url = (<FileReader>event.target).result;

                     this.userProfileData.picture = (<FileReader>event.target).result;    //set temp image 
                    }

                    reader.readAsDataURL(event.target.files[0]);

                    this.updateProfileImage = new FormData();
                    this.updateProfileImage.append('picture', file, file.name);



                    this.errorMessage = event.target.files[0].name + " is temporary upload, please click on save button";
                    this.status = true;     
               }
               else {
                    this.errorMessage = "Sorry, " + event.target.files[0].name + " is invalid, allowed extensions are: png,jpg,gif";
                    this.status = false;
                }      

                    this.showAccountModal = false;           
            }
        }

    }
  
    saveImage(){

        this.nothingLoading = false;
        this.accountService.updateUserProfilePicture(this.updateProfileImage,this.userId)
        .subscribe(
          result => {

              if(result.status != undefined && result.status == true)
              {

                this.errorMessage = "Profile photo updated successfully";
                this.status = true;

                this.updateProfile();

              }
              else {
                this.errorMessage = "Some problem while updating the profile photo, please try again";
                this.status = false;
              }

              this.nothingLoading = true;


          }
        );

    }
  
  
    removeProfilePicture() {
  
        this.removeProfilePictureButtonClicked = false;

        this.errorMessage = "";
        if(this.userId != undefined && this.userId.length > 0) {

            this.nothingLoading = false;
            this.accountService.removeUserProfilePicture(this.userId)
            .subscribe(
              result => {
                  if(result.status != undefined && result.status == true) {
                    this.userProfileData.picture = defaultUserImage;//set default image
                    this.errorMessage = "Profile photo deleted successfully";
                    this.status = true;
                  } else {
                    this.errorMessage = "Some problem while deleting the profile photo, please try again";
                    this.status = false;
                  }
                  this.nothingLoading = true;
                  this.showAccountModal = false;
                }
            );

        }
    }
  
  
    removeProfilePictureClicked() {

      this.showAccountModal = false;  

      this.removeProfilePictureButtonClicked = true;
    }
  
    cancelProfilePicture() {
     this.showAccountModal = true; 
        this.removeProfilePictureButtonClicked = false;
    }
    
    bindPageTitle() {
        this.navigationSharedService.routerDataLoaded('My Account');
    }
  

}
