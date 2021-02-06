import { DataService } from './../data.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit, OnDestroy {
  videos: any[] = [];
  vidSub: Subscription;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    // this.dataService.searchResults();
    this.vidSub = this.dataService.getResultsObservable()
    .subscribe((res: any) => {
      this.videos = res.items;
      console.log('comp vid', this.videos);
    })
  }

  playVideo(index) {
    this.dataService.startPlayingVideo(index);
  }

  ngOnDestroy() {
    this.vidSub.unsubscribe();
  }


}
