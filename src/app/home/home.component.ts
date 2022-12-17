import { ApiRestService } from './../services/api-rest.service';
import { Component, OnInit } from '@angular/core';
import { CognitoUserPool, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  message: string;

  attributes: CognitoUserAttribute[];
  poolData = {
    UserPoolId: environment.UserPoolId, // Your user pool id here
    ClientId: environment.ClientId, // Your client id here
  };

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onLogout(): void {
    var userPool = new CognitoUserPool(this.poolData);
    var currentUser = userPool.getCurrentUser();
    currentUser.signOut();
    this.router.navigate(['']);
  }

  getAttributes(): void {
    var userPool = new CognitoUserPool(this.poolData);
    var currentUser = userPool.getCurrentUser();
    currentUser.getSession((err: any, session: any) => {
      if (err) {
        alert(err.message || JSON.stringify(err));
        return;
      }
      currentUser.getUserAttributes((err, result) => {
        if (err) {
          alert(err.message || JSON.stringify(err));
          return;
        }
        this.attributes = result;
        this.attributes.forEach((attr: CognitoUserAttribute) => console.log(attr.Name + ' = ' + attr.Value));
      });
    });
  }

}
