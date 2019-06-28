import { Injectable } from '@angular/core';
import {NavigationModel} from '../models/navigation';
import { 
    AuthService,
    FacebookLoginProvider, 
    GoogleLoginProvider,
    LinkedinLoginProvider,
    SocialUser
} from 'ng4-social-login';

@Injectable()
export class GlobalNavData {
  data: NavigationModel;
  searchQuery: string;
  private authService: AuthService;
  setAuthService(authService: AuthService) {
    this.authService = authService;
  }

  returnAuthService(): AuthService {
      return this.authService;
  }
} 