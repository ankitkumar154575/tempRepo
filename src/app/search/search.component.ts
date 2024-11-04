import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;
  filteredRecords: any[] = [];
  noRecordsFound = false;

  constructor(private fb: FormBuilder, private dataService: DataService) {
    this.searchForm = this.fb.group({
      entityId: ['', Validators.required], // Required field
      isMainEntity: [null], // Optional field
      nationality: ['', Validators.required], // Required field
      dateOfBirthIncorporatedDate: ['1999-01-01', Validators.required] // Required field
    });
  }

  ngOnInit() {}

  onSearch() {
    if (this.searchForm.invalid) {
      this.searchForm.markAllAsTouched(); // Mark all fields as touched to show validation errors
      return;
    }

    this.dataService.fetchData().subscribe(records => {
      this.filteredRecords = this.dataService.filterData(records, this.searchForm.value);
      this.noRecordsFound = this.filteredRecords.length === 0;
    });
  }
}
