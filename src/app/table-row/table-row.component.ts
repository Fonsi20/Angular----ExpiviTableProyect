import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ConstantsService } from '../services/constants.service';



@Component({
  selector: 'app-table-row',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.css']
})
export class TableRowComponent implements OnInit {

  constructor(
    private _location: Location,
    public _constantsService: ConstantsService,
  ) { }

  public myData: any;
  public name: String;
  public email: String;
  public phone: String;
  public index: number;


  ngOnInit() {
    console.log(this._constantsService.rowData);
    this.myData = this._constantsService.rowData;
    if (this.myData !== undefined) {
      this.name = (this.myData[0]['name'] ? this.myData[0]['name'] : '');
      this.email = (this.myData[0]['email'] ? this.myData[0]['email'] : '');
      this.phone = (this.myData[0]['mobNumber'] ? this.myData[0]['mobNumber'] : '');
      this.index = this.myData[0]['index'];
    }
  }


  goBack() {
    this._location.back();
  }

  save() {
    let datoRowFormated = [
      { name: this.name, email: this.email, mobNumber: this.phone, index: this.index }]
    this._constantsService.rowData = datoRowFormated;
    this._location.back();
  }

}
