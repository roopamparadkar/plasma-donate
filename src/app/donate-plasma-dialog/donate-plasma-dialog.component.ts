import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs/internal/Observable';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-donate-plasma-dialog',
  templateUrl: './donate-plasma-dialog.component.html',
  styleUrls: ['./donate-plasma-dialog.component.css']
})
export class DonatePlasmaDialogComponent implements OnInit {

  constructor(private http: HttpClient,public dialogRef: MatDialogRef<DonatePlasmaDialogComponent>) { }

  bloodGroups = [
    "A+",
    "A-",
    "B+",
    "B-",
    "O+",
    "O-",
    "AB+",
    "AB-"
  ];
  
  allCities = [];
  filteredOptions: Observable<string[]>;
  
  donateForm = new FormGroup({
    name: new FormControl('',Validators.required),
    phone: new FormControl('',[Validators.required,Validators.maxLength(10),Validators.pattern("^[0-9]*$")]),
    age: new FormControl('',[Validators.required,Validators.maxLength(2),Validators.minLength(2),Validators.pattern("^[0-9]*$") ]),
    gender: new FormControl('',Validators.required),
    city: new FormControl('',Validators.required),
    bloodGroup: new FormControl('',Validators.required),
    revealPhone: new FormControl(false),
  });

  ngOnInit(): void {
    this.getAllCities();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allCities.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  getAllCities() {
    this.http
      .post('https://countriesnow.space/api/v0.1/countries/cities', {
        country: 'India',
      })
      .subscribe((result: any) => {
        this.allCities = result.data;
        this.allCities.push("chhindwara")
        this.filteredOptions = this.donateForm.controls['city'].valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value))
        );  
      });
  }

  submitForm(){
    this.dialogRef.close(this.donateForm.value)
  }
  
  closeForm(){
    this.dialogRef.close();
  }
}
