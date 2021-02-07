import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  videos = new BehaviorSubject<any>([]);
  valueOfTheSearch: string = '';
  constructor(private http: HttpClient) {
  }

  searchResults(searchValue: string) {
    this.http.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${searchValue}&key=${environment.youtubeApiKey}`)
    .subscribe((res: any) => {
      this.videos.next(res);
      this.valueOfTheSearch = searchValue;
    })
  }

  getResultsObservable() {
    return this.videos.asObservable();
  }

  findCurrentVideoId() {
    return this.http.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${this.valueOfTheSearch}&key=${environment.youtubeApiKey}`);

  }




}

