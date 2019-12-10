import { Component, OnInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, ReactiveFormsModule } from '@angular/forms';


export interface PeriodicElement {
  position?: number;
  name?: string;
  surnames?: string;
  age?: number;
  city?: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1,  name: 'Ivan',      surnames: 'Ramírez',        age: 35, city: 'Gutiérrez Zamora'},
  {position: 2,  name: 'Hector',    surnames: 'García',        age: 4.0026, city: 'Gutiérrez Zamora'},
  {position: 3,  name: 'Kristian',  surnames: 'Peréz',        age: 6.941, city: 'Gutiérrez Zamora'},
  {position: 4,  name: 'Isac',      surnames: 'Gutiérrez',        age: 9.0122, city: 'Gutiérrez Zamora'},
  {position: 5,  name: 'Boron',     surnames: 'Fernandez',        age: 10.811, city: 'Poza Rica'},
  {position: 6,  name: 'Carbon',    surnames: 'Ramírez',        age: 12.0107, city: 'Poza Rica'},
  {position: 7,  name: 'Nitrogen',  surnames: 'Orduño',        age: 14.0067, city: 'Poza Rica'},
  {position: 8,  name: 'Oxygen',    surnames: 'Orduño',        age: 15.9994, city: 'Poza Rica'},
  {position: 9,  name: 'Fluorine',  surnames: 'Ramírez',        age: 18.9984, city: 'Poza Rica'},
  {position: 11, name: 'jassiel',   surnames: 'Ramírez',        age: 20.1797, city: 'Gutiérrez Zamora'},
  {position: 12, name: 'elvis',     surnames: 'García',        age: 20.1797, city: 'Gutiérrez Zamora'},
  {position: 13, name: 'yeimi',     surnames: 'Ramírez',        age: 20.1797, city: 'Gutiérrez Zamora'},
  {position: 14, name: 'isabel',    surnames: 'Ramírez',        age: 20.1797, city: 'Gutiérrez Zamora'},
  {position: 15, name: 'marcelino', surnames: 'Gutiérrez',        age: 20.1797, city: 'Gutiérrez Zamora'},
  {position: 16, name: 'marcelino', surnames: 'Ramírez',        age: 20, city: 'Poza Rica'},
  {position: 16, name: 'marcelino', surnames: 'Ramírez',        age: 20, city: 'Veracruz'},

];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class TableFilteringExample implements OnInit {
  displayedColumns: string[] = ['position','name', 'surnames', 'age', 'city'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  nameFilter = new FormControl();
  cityFilter = new FormControl();
  surnameFilter = new FormControl();

  globalFilter = '';

  filteredValues = {
    position: '', name: '', surnames: '', age: '',
    city: ''
  };


  ngOnInit() {

    this.nameFilter.valueChanges.subscribe((nameFilterValue) => {
      this.filteredValues['name'] = nameFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.cityFilter.valueChanges.subscribe((cityFilterValue) => {
      this.filteredValues['city'] = cityFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);

    });


    this.surnameFilter.valueChanges.subscribe((surnameFilterValue) => {
      this.filteredValues['surnames'] = surnameFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.dataSource.filterPredicate = this.customFilterPredicate();

  }

  applyFilter(filter: string) {
    this.globalFilter = filter;
    this.dataSource.filter = JSON.stringify(this.filteredValues);
  }

  customFilterPredicate() {
    const myFilterPredicate = (data: PeriodicElement, filter: string): boolean => {
      var globalMatch = !this.globalFilter;

      console.log(globalMatch);

      if (this.globalFilter) {

        globalMatch = data.name.toString().trim().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1;


      }

      if (!globalMatch) {
        return;
      }


      let searchString = JSON.parse(filter);
      console.log(JSON.parse(filter));
      return data.surnames.toString().trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,"").indexOf(searchString.surnames.toLowerCase()) !== -1 &&
      data.city.toString().trim().toLowerCase().indexOf(searchString.city) !== -1 &&
        data.name.toString().trim().toLowerCase().indexOf(searchString.name.toLowerCase()) !== -1;
        ;
    }

    return myFilterPredicate;
  }
}
