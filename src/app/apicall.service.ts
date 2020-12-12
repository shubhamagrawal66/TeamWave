import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Users } from './users';
import * as Rx from "rxjs/Rx";
import { from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApicallService {

  apiUrl: string = `https://api.stackexchange.com/2.2/search/advanced`;

  access__token = '4GbISfcWwoH1AR5gTCWJmQ))';
  key__ = 'o8eFCDYRRKrs)PgtXwEXHQ((';
  code = 'fTvPueTwwJfbIxwyFQisHA))';
  client_id = '19303';


  constructor(private http: HttpClient) { }

  searchQuestion(selectedQuestion, selectedTag, selectedSortBy, selectedSortOrder, selectedMinAnswers, selectedBody, selectedTitle, selecteduserId, selectedUrl, selectedView, selectedAccept, selectedClosed, selectedMigrated, selectedWiki,page,pagesize)
  {
    const params = new HttpParams()
      .set('page', page)
      .set('pagesize', pagesize)
      .set('site', 'stackoverflow')
      .set('filter', 'withbody')
      .set('access_token', this.access__token)
      .set('key', this.key__)
      .set('order', selectedSortOrder)
      .set('sort', selectedSortBy)
      .set('q', selectedQuestion)
      .set('accepted', selectedAccept)
      .set('answers', selectedMinAnswers)
      .set('body', selectedBody)
      .set('closed', selectedClosed)
      .set('migrated', selectedMigrated)
      .set('tagged', selectedTag)
      .set('title', selectedTitle)
      .set('user', selecteduserId)
      .set('url', selectedUrl)
      .set('views', selectedView)
      .set('wiki', selectedWiki)
    return this.http.get(this.apiUrl, { params });
  }

  countQuestions(selectedQuestion, selectedTag, selectedSortBy, selectedSortOrder, selectedMinAnswers, selectedBody, selectedTitle, selecteduserId, selectedUrl, selectedView, selectedAccept, selectedClosed, selectedMigrated, selectedWiki)
  {
    const params = new HttpParams()
      .set('site', 'stackoverflow')
      .set('filter', 'total')
      .set('access_token', this.access__token)
      .set('key', this.key__)
      .set('order', selectedSortOrder)
      .set('sort', selectedSortBy)
      .set('q', selectedQuestion)
      .set('accepted', selectedAccept)
      .set('answers', selectedMinAnswers)
      .set('body', selectedBody)
      .set('closed', selectedClosed)
      .set('migrated', selectedMigrated)
      .set('tagged', selectedTag)
      .set('title', selectedTitle)
      .set('user', selecteduserId)
      .set('url', selectedUrl)
      .set('views', selectedView)
      .set('wiki', selectedWiki)
    return this.http.get(this.apiUrl, { params });
  }


  fetchQuestion(ques_id)
  {
    const params = new HttpParams()
      .set('site', 'stackoverflow')
      .set('filter', 'withbody')
      .set('access_token', this.access__token)
      .set('key', this.key__)
      .set('order', 'desc')
      .set('sort', 'activity')

    return this.http.get(`https://api.stackexchange.com/2.2/questions/` + ques_id, { params });
  }


  fetchBestAnswer(ans_id) {
    const params = new HttpParams()
      .set('site', 'stackoverflow')
      .set('filter', 'withbody')
      .set('access_token', this.access__token)
      .set('key', this.key__)
      .set('order', 'desc')
      .set('sort', 'activity')

    return this.http.get(`https://api.stackexchange.com/2.2/answers/` + ans_id, { params });
  }

  fetchAnswers(ques_id) {
    const params = new HttpParams()
      .set('site', 'stackoverflow')
      .set('filter', 'withbody')
      .set('access_token', this.access__token)
      .set('key', this.key__)
      .set('order', 'desc')
      .set('sort', 'votes')

    return this.http.get(`https://api.stackexchange.com/2.2/questions/` + ques_id + '/answers', { params });
  }
}