// entity-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-entity-detail',
  templateUrl: './entity-detail.component.html',
})
export class EntityDetailComponent implements OnInit {
  entityData: any;
  entryId: string | null = null;

  constructor(private route: ActivatedRoute, private dataService: DataService) {}

  ngOnInit(): void {
    // Get the entryId from the route parameters
    this.entryId = this.route.snapshot.paramMap.get('entryId');

    // Fetch the data and filter based on entryId
    this.dataService.fetchData().subscribe(users => {
      this.entityData = users.find((user: any) => user.EntryId === this.entryId);
    });
  }
}
