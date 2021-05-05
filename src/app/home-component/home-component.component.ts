import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DonatePlasmaDialogComponent } from '../donate-plasma-dialog/donate-plasma-dialog.component';
import { FormControl, Validators } from '@angular/forms';
import { SharedDataService } from '../services/shared-data.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css'],
})
export class HomeComponentComponent implements OnInit {
  city = new FormControl('', Validators.required);
  showError = false;
  allCities = [];
  filteredOptions: Observable<string[]>;

  constructor(
    private sharedDataService: SharedDataService,
    private router: Router,
    public dialog: MatDialog,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAllCities();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allCities.filter(
      (option) => option.toLowerCase().indexOf(filterValue) === 0
    );
  }

  getAllCities() {
    this.http
      .post('https://countriesnow.space/api/v0.1/countries/cities', {
        country: 'India',
      })
      .subscribe((result: any) => {
        this.allCities = result.data;
        this.allCities.push('Chhindwara');
        this.filteredOptions = this.city.valueChanges.pipe(
          startWith(''),
          map((value) => this._filter(value))
        );
      });
  }

  findPlasma() {
      this.sharedDataService.nextMessage(this.city.value.trim());
      this.router.navigateByUrl('request-plasma');
  }

  openDonatePlasmaDialog() {
    const donateDialogRef = this.dialog.open(DonatePlasmaDialogComponent, {
      panelClass: 'custom-dialog-container',
    });

    donateDialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let payLoad = {
          name: result.name,
          phone: result.phone,
          revealPhone: result.revealPhone,
          age: result.age,
          city: result.city.toLowerCase(),
          bloodGroup: result.bloodGroup,
          gender: result.gender,
          createdOn: Date.now(),
          verified: false
        };
        this.http
          .post(
            'https://plasmadonate-95f6c-default-rtdb.firebaseio.com/plasma.json',
            payLoad
          )
          .subscribe(
            (result) => {
              this.snackBar.open('Thanks! You Are A Hero 😊', '', {
                horizontalPosition: 'center',
                verticalPosition: 'top',
                duration: 5000,
              });
            },
            (error) => {
              console.log(error);
            }
          );
      }
    });
  }
}
