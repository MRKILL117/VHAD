import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(
    private http: HttpService
  ) { }

  public UploadFile(file: any, folder: string) {
    return new Promise<string>((res, rej) => {
      let params = new FormData();
      const fileExtension = file.name.split('.').pop();
      let fileName = `${uuidv4()}.${fileExtension}`;
      params.append('file', file, fileName);
      this.http.UploadFormDataFile(`/Folders/${folder}/upload`, params).subscribe((uploaded) => {
        res(`Folders/${folder}/download/${fileName}`);
      }, err => rej(err));
    })
  }
}
