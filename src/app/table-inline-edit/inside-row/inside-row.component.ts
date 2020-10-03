import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-inside-row',
  templateUrl: './inside-row.component.html',
  styleUrls: ['./inside-row.component.css']
})
export class InsideRowComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  goEditInformation() {
    this.router.navigate(["/editrow"]);
  }

}
