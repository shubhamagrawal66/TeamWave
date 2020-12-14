import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-stack-api',
  templateUrl: './stack-api.component.html',
  styleUrls: ['./stack-api.component.css']
})
export class StackApiComponent implements OnInit {

  mockurl = 'https://api.stackexchange.com/2.2/answers/65246606?order=desc&sort=activity&site=stackoverflow';
  answerkey = "65246606";

  authurl: any;
  client_id: any;
  clientSecret: any;
  redirect_uri: any;
  state: any;
  code: any;
  token: any;
  scope: any;
  postId: any;
  errorMessage: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // return this.http.get(this.mockurl);
    // this.http.get(this.mockurl).subscribe(data => {
    //   console.log(data);
    // })
    // this.authentication();

    this.http.post<any>('https://jsonplaceholder.typicode.com/posts', { title: 'Angular POST Request Example' }).subscribe(data => {
      console.log(data);
    });    
  }

  authentication()
  {
    this.authurl = 'https://stackoverflow.com/oauth';
    this.client_id = '19303';
    this.scope = 'no_expiry';
    this.redirect_uri = 'http://localhost:4200/';

    let headers = new Headers();
    headers.append('client_id', this.client_id);
    headers.append('scope', this.scope);
    headers.append('redirect_uri', this.redirect_uri);

    let param = new HttpParams().set("client_id", this.client_id).set("scope", this.scope).set("redirect_uri", this.redirect_uri); //Create new HttpParams

    console.log(headers);
    console.log(param);

    this.http.get(this.authurl, {params: param }).subscribe(data => {
      console.log(data);
    })



    this.code = 'KMet8VbEMm3yMaqJi3eVmA))';
    this.token = 'SOnC*UMi5Uk9qRtt1M1eYg))';


    this.clientSecret = ')GLEiGN04ARASL7a3f0BVA((';
  }

  // getAllPosts(): Observable<Post[]> {
  //   return this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
  // }
}