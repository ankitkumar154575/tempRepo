import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Define the Record interface based on the structure of individual user records in the JSON file
interface Record {
  EntityId: string;
  IsMainEntity: boolean;
  Nationality: string;
  DateOfBirthIncorporatedDate: string;
  EntryId: string;
  EntityName: string;
  Aliases: string[];
  TypeOfProfile: string;
  IsCustomer: boolean;
  CorporateRegistryNumber: string;
  CountryOfIncorporation: string;
  LastModifiedTime: string;
  TotalCount: number;
  ActiveCountAsMainEntity: number;
  ExitedCountAsMainEntity: number;
  NotExitedCountAsMainEntity: number;
  InactiveCountAsMainEntity: number;
  ExpiredCountAsMainEntity: number;
  ActiveCountAsRelatedParty: number;
  ExitedCountAsRelatedParty: number;
  NotExitedCountAsRelatedParty: number;
  InactiveCountAsRelatedParty: number;
  ExpiredCountAsRelatedParty: number;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataUrl = '/assets/dummyData.json';

  constructor(private http: HttpClient) {}

  // Adjust fetchData to map to the 'users' array inside the JSON file
  fetchData(): Observable<Record[]> {
    return this.http.get<{ users: Record[] }>(this.dataUrl).pipe(
      map(data => data.users) // Access the 'users' array in the JSON response
    );
  }

  // Filter data based on criteria, returning only records that match the search criteria
  filterData(records: Record[], criteria: any): Record[] {
    const { entityId, isMainEntity, nationality, dateOfBirthIncorporatedDate } = criteria;
    return records.filter(record =>
      (entityId ? record.EntityId.includes(entityId) : true) &&
      (isMainEntity !== null ? record.IsMainEntity === isMainEntity : true) &&
      (nationality ? record.Nationality === nationality : true) &&
      (dateOfBirthIncorporatedDate ? record.DateOfBirthIncorporatedDate === dateOfBirthIncorporatedDate : true)
    );
  }
}
