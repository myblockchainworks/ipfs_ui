import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpService} from '../service/http-service.service';
import {Video} from '../model/video';
import {Http} from '@angular/http';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
  providers: [HttpService]
})
export class VideoComponent implements OnInit {

  selectedVideo: Video;
  videos: Video[] = [];

  title: string;
  description: any;
  file: any;

  videUpload: any;
  hideUploadVideo: boolean;

  ipfs_url = 'http://10.0.0.21:9090';

  @ViewChild('fileInput') inputEl: ElementRef;

  constructor(private _httpService: HttpService, private http: Http) {
  }

  ngOnInit() {
    this.hideUploadVideo = true;
    this.selectedVideo = new Video('', '', '', null);
    this.getAllVideos();
  }

  getAllVideos() {
    let url = this.ipfs_url + '/ipfsFile/getAllIpfsFile';

    this._httpService.httGet(url).subscribe(
      data => {
        if (data.status) {
          this.extractVideoDetails(data.data);
        } else {
          alert(data.msg);
        }
      }, error => {
        console.log('error in getting video files');
      }, () => console.log('finished getting all the videos')
    );
  }

  uploadVideo(event) {

    let url = this.ipfs_url + '/ipfs/addFile';
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('file', file, file.name);
      formData.append('title', this.title);
      formData.append('description', this.description);
      // this.videUpload = fileList[0];
      // this.hideUploadVideo = false;

      this._httpService.httpFileUpload(formData, url).subscribe(
        data => {
          if (data.status) {
            this.videos = [];
            this.getAllVideos();
            alert(data.msg);
          } else {
            alert(data.data);
          }
        }, error => {
          alert('error in uploading file');
        }, () => console.log('finished uploading file')
      );
      /*      this.http.post(url, formData).map(res => res.json())
             .subscribe(
              data => {
                if (data.status) {
                  this.videos = [];
                  this.getAllVideos();
                  alert(data.msg);
                } else {
                  alert(data.data);
                }
              }, error => {
                alert('error in uploading file');
              }, () => console.log('finished uploading file')
            );*/
    }
  }

  playVideo(v: Video) {
    console.log(v);
    this.selectedVideo = v;
  }

  extractVideoDetails(list: any) {
    for (let v of list) {
      let video = new Video(v.hash, v.title, v.description, v.uploadedDate);
      this.videos.push(video);
    }
    this.selectedVideo = this.videos[0];

  }
}
