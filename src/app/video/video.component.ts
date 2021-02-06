import { DataService } from './../data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  currentId: string = '';
  playVid: boolean = false;
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.currentId = this.dataService.videoId;
  }

  play() {
    this.playVid = true;
    this.currentId = 'https://www.youtube.com/embed/' + this.dataService.videoId;
    console.log(this.currentId);
    this.ngOnInit();
  }


}
