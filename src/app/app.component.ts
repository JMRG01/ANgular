import { Component, OnInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, ReactiveFormsModule } from '@angular/forms';


export interface PeriodicElement {
  position?: number;
  name?: string;
  age?: number;
  city?: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1,  name: 'Ivan',      age: 35, city: 'Gutiérrez Zamora'},
  {position: 2,  name: 'Hector',    age: 4.0026, city: 'Gutiérrez Zamora'},
  {position: 3,  name: 'Kristian',  age: 6.941, city: 'Gutiérrez Zamora'},
  {position: 4,  name: 'Isac',      age: 9.0122, city: 'Gutiérrez Zamora'},
  {position: 5,  name: 'Boron',     age: 10.811, city: 'Poza Rica'},
  {position: 6,  name: 'Carbon',    age: 12.0107, city: 'Poza Rica'},
  {position: 7,  name: 'Nitrogen',  age: 14.0067, city: 'Poza Rica'},
  {position: 8,  name: 'Oxygen',    age: 15.9994, city: 'Poza Rica'},
  {position: 9,  name: 'Fluorine',  age: 18.9984, city: 'Poza Rica'},
  {position: 11, name: 'jassiel',   age: 20.1797, city: 'Gutiérrez Zamora'},
  {position: 12, name: 'elvis',     age: 20.1797, city: 'Gutiérrez Zamora'},
  {position: 13, name: 'yeimi',     age: 20.1797, city: 'Gutiérrez Zamora'},
  {position: 14, name: 'isabel',    age: 20.1797, city: 'Gutiérrez Zamora'},
  {position: 15, name: 'marcelino', age: 20.1797, city: 'Gutiérrez Zamora'},
  {position: 16, name: 'marcelino', age: 20, city: 'Poza Rica'},

];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class TableFilteringExample implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'age', 'city'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  cityFilter = new FormControl();
  nameFilter = new FormControl();
  globalFilter = '';

  filteredValues = {
    position: '', name: '', age: '',
    city: ''
  };
  ngOnInit() {

    this.cityFilter.valueChanges.subscribe((positionFilterValue) => {
      this.filteredValues['city'] = positionFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
      console.log(this.dataSource.filter);
    });

    this.nameFilter.valueChanges.subscribe((nameFilterValue) => {
      this.filteredValues['name'] = nameFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.dataSource.filterPredicate = this.customFilterPredicate();


  }

  applyFilter(filter) {
    this.globalFilter = filter;
    this.dataSource.filter = JSON.stringify(this.filteredValues);
  }

  customFilterPredicate() {
    const myFilterPredicate = (data: PeriodicElement, filter: string): boolean => {
      var globalMatch = !this.globalFilter;

      if (this.globalFilter) {
        // search all text fields
        globalMatch = data.name.toString().trim().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1;
      }

      if (!globalMatch) {
        return;
      }

      let searchString = JSON.parse(filter);
      return data.city.toString().trim().indexOf(searchString.city) !== -1 &&
        data.name.toString().trim().toLowerCase().indexOf(searchString.name.toLowerCase()) !== -1;
    }
    return myFilterPredicate;
  }
}
