import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ApicallService } from './apicall.service';
import { Users } from './users';
import { Title } from '@angular/platform-browser';

// export interface DialogData {
//   question_id_dialog: any;
// }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Scribe';
  response: any;

  apicallform: FormGroup;
  totalResult: any;
  isEmptyResult = false;
  showTotalResult = false;
  showQuestionList = false;
  showAnswerList = false;

  selectedQuestion: any = '';
  selectedTag: any = '';
  selectedSortBy: any = '';
  selectedSortOrder: any = '';
  selectedMinAnswers: any = '';
  selectedBody: any = '';
  selectedTitle: any = '';
  selecteduserId: any = '';
  selectedUrl: any = '';
  selectedView: any = '';
  selectedAccept: any = '';
  selectedClosed: any = '';
  selectedMigrated: any = '';
  selectedWiki: any = '';

  detailsQuesId: any;
  detailsQuesOwner: any;
  detailsQuesOwnerLink: any;
  detailsQuesAskedon: any;
  detailsQuesClosedon: any;
  detailsQuesLastedit: any;
  detailsQuesAnsby: any;
  detailsQuesAnsList: any = [];
  detailsQuesAnsbyLink: any;
  detailsQueslink: any;
  detailsQuesdetail: any;
  detailsQuesDesc: any;
  isDetailsQuesAnswered: any;
  

  pagesize = 10;
  config: any;

  page = 1;
  count = 0;
  tableSize = 10;

  constructor(private apiService: ApicallService, private fb: FormBuilder, private viewportScroller: ViewportScroller, private titleService: Title) { }

  ngOnInit() {

    this.titleService.setTitle('TeamWave - Stack Exchange API');
    this.apicallform = this.fb.group({
      question: new FormControl(''),
      anscount: new FormControl(''),
      body: new FormControl(''),
      tag: new FormControl(''),
      title: new FormControl(''),
      userid: new FormControl(''),
      url: new FormControl(''),
      view: new FormControl(''),
      accepted: new FormControl(''),
      closed: new FormControl(''),
      migrated: new FormControl(''),
      wiki: new FormControl(''),
      sortby: new FormControl('activity'),
      orderby: new FormControl('asc'),

    });

    let user = new Users;
    user.user_email = 'shubhamagrawal66@gmail.com';
    user.user_password = 'e7dbd5638e7e1e4114b6226525d3a5dcd5878b7e3b6e9ee8e312baa6fa6f1d5c51c8b488992d018ea58bf5a4e16d8240b89850a14207a9da5eb39aa8a0a240de';

    // this.apiService.userSignIn(user).subscribe(response => {
    //   console.log(response);
    // });

    // this.apiService.getcall1().subscribe(data => {
    //   console.log(data);
    // })

    // this.apiService.getQuestions().subscribe(data => {
    //   console.log(data);
    // })

    // this.apiService.searchQuestion().subscribe(data => {
    //   // this.response = data['items'];
    //   // console.log(this.response);
    //   console.log(data);
    // }) 
  }
  search(apiform)
  {
      console.log(apiform);
      console.log(this.apicallform.invalid);
    this.isEmptyResult = false;
    this.showTotalResult = false;
    this.selectedQuestion = apiform.value.question;
    this.selectedTag = apiform.value.tag;
    this.selectedSortBy = apiform.value.sortby;
    this.selectedSortOrder = apiform.value.orderby;
    this.selectedMinAnswers = apiform.value.anscount;
    this.selectedBody = apiform.value.body;
    this.selectedTitle = apiform.value.title;
    this.selecteduserId = apiform.value.userid;
    this.selectedUrl = apiform.value.url;
    this.selectedView = apiform.value.view;
    this.selectedAccept = apiform.value.accepted;
    this.selectedClosed = apiform.value.closed;
    this.selectedMigrated = apiform.value.migrated;
    this.selectedWiki = apiform.value.wiki;
    
    this.apiService.countQuestions(this.selectedQuestion,this.selectedTag,this.selectedSortBy,this.selectedSortOrder,this.selectedMinAnswers,this.selectedBody,this.selectedTitle,this.selecteduserId,this.selectedUrl,this.selectedView,this.selectedAccept,this.selectedClosed,this.
      selectedMigrated,this.selectedWiki).subscribe(data => {
        this.totalResult = data;
        this.totalResult = this.totalResult.total;
        if(this.totalResult==0)
        {
          this.isEmptyResult = true;
        }
        else
        {
          this.showTotalResult = true;
          this.showResult(apiform);
          this.config = {
            itemsPerPage: 10,
            totalItems: this.totalResult
          };
        }
      });
  }

  scrollToQuestionList(elementId: string): void {

    this.showQuestionList = true;
    setTimeout(() => {
      this.viewportScroller.scrollToAnchor(elementId);
    }, 300);
  }

  scrollToAnswerList(ques_id: string): void {

    this.openDialog(ques_id);
    this.showAnswerList = true;
    setTimeout(() => {
      this.viewportScroller.scrollToAnchor('');
    }, 300);
  }

  showResult(apiform)
  {
    this.selectedQuestion = apiform.value.question;
    this.selectedTag = apiform.value.tag;
    this.selectedSortBy = apiform.value.sortby;
    this.selectedSortOrder = apiform.value.orderby;
    this.selectedMinAnswers = apiform.value.anscount;
    this.selectedBody = apiform.value.body;
    this.selectedTitle = apiform.value.title;
    this.selecteduserId = apiform.value.userid;
    this.selectedUrl = apiform.value.url;
    this.selectedView = apiform.value.view;
    this.selectedAccept = apiform.value.accepted;
    this.selectedClosed = apiform.value.closed;
    this.selectedMigrated = apiform.value.migrated;
    this.selectedWiki = apiform.value.wiki;


    this.apiService.searchQuestion(this.selectedQuestion, this.selectedTag, this.selectedSortBy, this.selectedSortOrder, this.selectedMinAnswers, this.selectedBody, this.selectedTitle, this.selecteduserId, this.selectedUrl, this.selectedView, this.selectedAccept, this.selectedClosed, this.selectedMigrated, this.selectedWiki,this.page, this.pagesize).subscribe(data => {
      this.response = data['items'];
        // this.totalResult = this.totalResult.total;
        console.log(this.response);
      });
  }
  onTableDataChange(event) {
    console.log(event);
    this.page = event;
    this.apiService.searchQuestion(this.selectedQuestion, this.selectedTag, this.selectedSortBy, this.selectedSortOrder, this.selectedMinAnswers, this.selectedBody, this.selectedTitle, this.selecteduserId, this.selectedUrl, this.selectedView, this.selectedAccept, this.selectedClosed, this.selectedMigrated, this.selectedWiki, this.page, this.pagesize).subscribe(data => {
      this.response = data['items'];
      // this.totalResult = this.totalResult.total;
      console.log(this.response);
    });
  }

  openDialog(ques_id = null) {

    console.log("inside opendialog", ques_id);
    this.detailsQuesId = ques_id;
    this.apiService.fetchQuestion(this.detailsQuesId).subscribe(data => {
      console.log(data['items']);
      this.detailsQuesdetail = data['items'][0].title;
      this.detailsQueslink = data['items'][0].link;
      this.detailsQuesDesc = data['items'][0].body;

      this.detailsQuesAskedon = this.convertSecondsToDate(data['items'][0].creation_date);

      if (data['items'][0].last_edit_date) {
        this.detailsQuesLastedit = this.convertSecondsToDate(data['items'][0].last_edit_date);
      }
      else {
        // console.log("Not closed");
        this.detailsQuesLastedit = '-';
      }

      if (data['items'][0].closed_date)
      {
        // console.log("closed");
        this.detailsQuesClosedon = this.convertSecondsToDate(data['items'][0].closed_date);
      }
      else
      {
        // console.log("Not closed");
        this.detailsQuesClosedon = 'Not Closed Yet';
      }

      this.detailsQuesOwner = data['items'][0]['owner'].display_name;
      this.detailsQuesOwnerLink = data['items'][0]['owner'].link;

      this.isDetailsQuesAnswered = data['items'][0].is_answered;

      if (this.isDetailsQuesAnswered){
        if (data['items'][0].accepted_answer_id)
        {
          this.apiService.fetchBestAnswer(data['items'][0].accepted_answer_id).subscribe(data => {
            this.detailsQuesAnsby = data['items'][0]['owner'].display_name;
            this.detailsQuesAnsbyLink = data['items'][0]['owner'].link;

            this.apiService.fetchAnswers(this.detailsQuesId).subscribe(data => {
              console.log(data['items']);
              this.detailsQuesAnsList = data['items'];
            });
          });

          this.showAnswerList = true;
          setTimeout(() => {
            this.viewportScroller.scrollToAnchor('scrollPointAnswer');
          }, 300);
        }
        else
        {
          this.detailsQuesAnsby = "-";
          this.apiService.fetchAnswers(this.detailsQuesId).subscribe(data => {
            console.log(data['items']);
            this.detailsQuesAnsList = data['items'];
          });
          this.showAnswerList = true;
          setTimeout(() => {
            this.viewportScroller.scrollToAnchor('scrollPointAnswer');
          }, 300);
        }
      }
      else{
        this.detailsQuesAnsby = "Not Answered Yet";
        this.showAnswerList = true;
        setTimeout(() => {
          this.viewportScroller.scrollToAnchor('scrollPointAnswer');
        }, 300);
      }
    });

  }
  convertSecondsToDate(sec)
  {
    var t = new Date(1970, 0, 1);
    t.setSeconds(sec);
    return t.toString().slice(4, 15);
  }

}
