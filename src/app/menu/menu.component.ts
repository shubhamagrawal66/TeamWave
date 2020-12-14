import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit 
{
  detailsQuesId: any= '123456';

  constructor() 
  { 
    
  }



  ngOnInit(): void 
  {
    // console.log("inside menu", this.data);
  }

  closeDetailsDiv() {

  }
}