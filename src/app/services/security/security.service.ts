import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  private currentUser: string = '';

  constructor() { }

  saveUser(user: string): void {
    this.currentUser = user;
  }

  getCurrentUser(): string {
    return this.currentUser;
  }
}
