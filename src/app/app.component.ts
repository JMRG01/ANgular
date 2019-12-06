import { Component, OnInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, ReactiveFormsModule } from '@angular/forms';


export interface PeriodicElement {
  name?: string;
  position?: number;
  weight?: number;
  category?: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Ivan', weight: 1.0079, category: 'personas'},
  {position: 2, name: 'Hector', weight: 4.0026, category: 'personas'},
  {position: 3, name: 'Kristian', weight: 6.941, category: 'personas'},
  {position: 4, name: 'Isac', weight: 9.0122, category: 'personas'},
  {position: 5, name: 'Boron', weight: 10.811, category: 'elementos'},
  {position: 6, name: 'Carbon', weight: 12.0107, category: 'elementos'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, category: 'elementos'},
  {position: 8, name: 'Oxygen', weight: 15.9994, category: 'elementos'},
  {position: 9, name: 'Fluorine', weight: 18.9984, category: 'elementos'},
  {position: 11, name: 'jassiel', weight: 20.1797, category: 'personas'},
  {position: 12, name: 'elvis', weight: 20.1797, category: 'personas'},
  {position: 13, name: 'yeimi', weight: 20.1797, category: 'personas'},
  {position: 14, name: 'isabel', weight: 20.1797, category: 'personas'},
  {position: 15, name: 'marcelino', weight: 20.1797, category: 'personas'},
  {position: 16, name: 'marcelino', weight: 20, category: 'elementos'},

];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class TableFilteringExample implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'category'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  categoryFilter = new FormControl();
  nameFilter = new FormControl();
  globalFilter = '';

  filteredValues = {
    position: '', name: '', weight: '',
    category: ''
  };
  ngOnInit() {

    this.categoryFilter.valueChanges.subscribe((positionFilterValue) => {
      this.filteredValues['category'] = positionFilterValue;
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
      return data.category.toString().trim().indexOf(searchString.category) !== -1 &&
        data.name.toString().trim().toLowerCase().indexOf(searchString.name.toLowerCase()) !== -1;
    }
    return myFilterPredicate;
  }
}
