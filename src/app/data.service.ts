import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  videos = new BehaviorSubject<any>([]);
  videoId = new BehaviorSubject<any>('');
  valueOfTheSearch: string = '';
  constructor(private http: HttpClient) {
  }

  searchResults(searchValue: string) {
    this.http.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${searchValue}&key=${environment.youtubeApiKey}`)
    .subscribe((res: any) => {
      console.log(res.items);
      this.videos.next(res);
      console.log(this.videos);
      this.valueOfTheSearch = searchValue;
    })
  }

  getResultsObservable() {
    return this.videos.asObservable();
  }

  findCurrentVideoId() {
    return this.http.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${this.valueOfTheSearch}&key=${environment.youtubeApiKey}`);

  }

  getIdObservable() {
    return this.videoId.asObservable();
  }

  sendId() {
    return this.videoId;
  }
}



//AIzaSyBT78xPvNmQqgNnoOj2TW5Ww2Jch3byjNI

// https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=surfing&key=[YOUR_API_KEY] HTTP/1.1

// Authorization: Bearer [YOUR_ACCESS_TOKEN]
// Accept: application/json
