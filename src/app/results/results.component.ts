import { DataService } from './../data.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit, OnDestroy {
  videos: any[] = [];
  vidSub: Subscription;
  currentId: string = '';
  url;
  playingVideo = false;
  videoId;


  constructor(private dataService: DataService,
    private dom: DomSanitizer) {

   }

  ngOnInit(): void {
    this.vidSub = this.dataService.getResultsObservable()
    .subscribe((res: any) => {
      this.videos = res.items;
    })
  }

    playVideo(index) {
    this.playingVideo = true;
    this.dataService.findCurrentVideoId()
    .subscribe(async (res: any) => {
       this.videoId = await res.items[index].id.videoId;
    });

      setTimeout(() => {
      this.currentId = 'https://www.youtube.com/embed/' + this.videoId;
      this.url = this.dom.bypassSecurityTrustResourceUrl(this.currentId);
      }, 1000)


  }



  closeVideo() {
    this.playingVideo = false;
  }




  ngOnDestroy() {
    this.vidSub.unsubscribe();
  }

}
