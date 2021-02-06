import { DataService } from './../data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  input: string = '';
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

  search(inputValue: string) {
    if (inputValue !== '') {
      this.dataService.searchResults(inputValue);
      this.input = inputValue;
    }

  }

}
