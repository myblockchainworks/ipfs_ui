export class Video {

  public _src: string;
  public _title: string;
  public _des: string;
  public _uploadedDate: Date;


  constructor(src: string, title: string, des: string, uploadedDate: Date) {
    this._src = 'http://10.0.0.21:8080/ipfs/' + src;
    this._title = title;
    this._des = des;
    this._uploadedDate = uploadedDate;
  }


  get src(): string {
    return this._src;
  }

  set src(value: string) {
    this._src = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get des(): string {
    return this._des;
  }

  set des(value: string) {
    this._des = value;
  }

  get uploadedDate(): Date {
    return this._uploadedDate;
  }

  set uploadedDate(value: Date) {
    this._uploadedDate = value;
  }
}
