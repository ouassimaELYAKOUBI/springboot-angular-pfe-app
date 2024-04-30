import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-espace-encadrant',
  templateUrl: './espace-encadrant.component.html',
  styleUrls: ['./espace-encadrant.component.css']
})
export class EspaceEncadrantComponent {
  public sessionStorage = sessionStorage;

  public isConfirmed:boolean = false;

  public isAuthenticated:boolean = false;

  public constructor(private router:Router) {
    if (this.sessionStorage.getItem('encadrantConfirmed') ===null) {
      this.isAuthenticated = false;
      this.router.navigate(['/login-encadrant']);
    }
    else
      this.isAuthenticated = true;
  }

  public clear() {
    sessionStorage.clear();
  }
}
