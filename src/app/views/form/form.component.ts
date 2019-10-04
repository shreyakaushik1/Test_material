import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

export interface Office{
  name: string;
}


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})

export class FormComponent implements OnInit {

  firstName:string;
  lastName:string;
  gender:string;
  numberOfMiles:number;

  myControl = new FormControl();
  filteredOptions: Observable<Office[]>;
  offices: Office[] = [
    {name: 'Roush'},
    {name: 'Pasta'},
    {name: 'CCD'},
    {name: 'SVC'},
    {name: 'Main Building'},
  ]

  enableAutocomplete = true;

  constructor() { }

  ngOnInit() {
    

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.offices.slice())
      );
  }

  toEnableAutocomplete(){
    console.log(this.enableAutocomplete);

  }

  displayFn(offices?: Office): string | undefined {
    return offices ? offices.name : undefined;
  }

  private _filter(name: string): Office[] {
    const filterValue = name.toLowerCase();

    return this.offices.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  
}
