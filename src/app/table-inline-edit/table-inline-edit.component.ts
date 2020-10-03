import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ConstantsService } from '../services/constants.service';




@Component({
  selector: 'app-table-inline-edit',
  templateUrl: './table-inline-edit.component.html',
  styleUrls: ['./table-inline-edit.component.css']
})
export class TableInlineEditComponent implements OnInit {

  userForm: FormGroup;
  newUserForm: FormGroup;
  collapsed = {};
  editable = {};
  @ViewChild('myModal') myModal;
  showModal = false;
  showData = false;
  dataSource: any = {};
  data: any = {};
  text: string = '';
  constructor(
    private fb: FormBuilder,
    public _constantsService: ConstantsService,
  ) { }

  inputFields = [
    {
      name: 'name',
      input: 'input',
      type: 'text',
      placeholder: 'Name'
    },
    {
      name: 'email',
      input: 'input',
      type: 'email',
      placeholder: 'Email'
    },
    {
      name: 'mobNumber',
      input: 'select',
      type: '',
      placeholder: '',
      value: {

      }
    }
  ];

  ngOnInit() {

    if (this._constantsService.rowData !== undefined) {
      this.insertChanges();
    }
    //call service
    if (this.initialData.length === 0) {
      this.showData = false;
    }
    else {
      this.showData = true;
    }

    this.userForm = this.fb.group({
      users: this.fb.array([])
    });

    this.newUserForm = this.fb.group({
      users: this.fb.array([])
    });

    this.renderUser();
  }

  insertChanges() {
    var i = 0;
    console.log(this._constantsService.rowData[0]['index'])
    for (let dataCheck of this.initialData) {
      if (this._constantsService.rowData[0]['index'] === i) {
        this.initialData[i]['name'] = this._constantsService.rowData[0]['name'];
        this.initialData[i]['email'] = this._constantsService.rowData[0]['email'];
        this.initialData[i]['mobNumber'] = this._constantsService.rowData[0]['mobNumber'];
      }
      i++;
    }
    this._constantsService.rowData
  }

  showModel() {
    this.showModal = true;
  }

  // Add form field row with initial data
  formRowWithData(data): FormGroup {
    return this.fb.group({
      name: [data.name, Validators.required],
      email: data.email,
      mobNumber: data.mobNumber
    });
  }

  // Add form field row with no data
  formRowWithOutData(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      email: [''],
      //startDate: [{}],
      // startTime: [null, Validators.required],
      mobNumber: ['']
    });
  }

  // Dummy json 
  initialData = [
    { name: "cookies", email: "aaa@expivi.com", mobNumber: "1111" },
    { name: "donuts", email: "bbb@expivi.com", mobNumber: "2222" },
    { name: "chips", email: "ccc@expivi.com", mobNumber: "3333" }
  ]

  // Add new row in form
  addUser() {
    const control = <FormArray>this.newUserForm.get('users');
    control.push(this.formRowWithOutData());
  }

  // Render initial data
  renderUser() {
    const control = <FormArray>this.userForm.get('users');
    var i = 0;
    if (this.text === undefined || this.text === null || this.text === '' || (this.initialData.length > this.data.length && this.text === undefined || this.text === null)) {
      this.data = this.initialData;
    }

    for (let data of this.data) {
      control.push(this.formRowWithData(data));
      this.editable[i] = {};
      i++;
    }
    this.dataSource = new MatTableDataSource(this.data);
  }

  // Remove desired user row
  remove(index: number) {
    const control = <FormArray>this.userForm.get('users');
    control.removeAt(index);

    // Romove Index row that are recorded as change
    let elementIndexToRemove = this.rowNeedToUpdate.indexOf(index);


    if (elementIndexToRemove >= 0) {
      this.rowNeedToUpdate.splice(elementIndexToRemove, 1);
    }

    // Managing rows array as we remove one elemement
    this.data.splice(elementIndexToRemove, 1);

  }


  newremove(index: number) {
    const control = <FormArray>this.newUserForm.get('users');

    control.removeAt(index);

    // Romove Index row that are recorded as change
    let elementIndexToRemove = this.rowNeedToUpdate.indexOf(index);


    if (elementIndexToRemove >= 0) {
      this.rowNeedToUpdate.splice(elementIndexToRemove, 1);
    }

    // Managing rows array as we remove one elemement
    for (let i = elementIndexToRemove; i < this.rowNeedToUpdate.length; i++) {
      this.rowNeedToUpdate[i] = this.rowNeedToUpdate[i] - 1;
    }
  }

  // Get form data
  save() {
    var dataToSend = [];
    for (let i = 0; i < this.rowNeedToUpdate.length; i++) {
      dataToSend.push(this.userForm.value.users[this.rowNeedToUpdate[i]]);
    }
    this.dataToInsert(this.newUserForm.value.users);

  }

  // Get row only for updation
  rowNeedToUpdate = [];
  dataToUpdate(rowIndex: any) {

    if (this.rowNeedToUpdate.includes(rowIndex)) {
      return false;
    }
    this.rowNeedToUpdate.push(rowIndex);

  }


  dataToInsert(rowIndex: any) {

    for (let i = 0; i < rowIndex.length; i++) {
      this.initialData.push(rowIndex[i]);
    }

    this.dataSource.filteredData = [];
    this.ngOnInit()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    this.data = [];
    if (filterValue === undefined || filterValue === null || filterValue.length === 0) {
      for (let i = 0; i < this.initialData.length; i++) {
        this.data.push(this.initialData[i]);
        this.dataSource.filteredData = [];
      }
    } else {
      for (let i = 0; i < this.dataSource.filteredData.length; i++) {
        this.data.push(this.dataSource.filteredData[i]);
      }
    }
    this.ngOnInit()
  }

  saveInfoRow(dataRow: any, index: number): void {
    console.log(index);
    let datoRowFormated = [
      { name: dataRow.get('name').value, email: dataRow.get('email').value, mobNumber: dataRow.get('mobNumber').value, index: index }]
    this._constantsService.rowData = datoRowFormated;
  }
}
