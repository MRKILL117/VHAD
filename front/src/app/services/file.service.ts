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

  private GenerateParcialFileUrl(folder: string, fileName: string): string {
    return `/Folders/${folder}/download/${fileName}`;
  }

  public UploadFiles(files: FileList | Array<any>, folder: string) {
    return new Promise<Array<string>>((res, rej) => {
      let params = new FormData();
      let filesRoutes: Array<string> = [];
      const arrayFiles = Array.from(files);
      if(!arrayFiles || !arrayFiles.length) return res(filesRoutes);
      arrayFiles.forEach((file, i) => {
        const fileExtension = file.name.split('.').pop();
        let fileName = `${uuidv4()}.${fileExtension}`;
        params.append(`file_${i+1}`, file, fileName);
        filesRoutes.push(this.GenerateParcialFileUrl(folder, fileName));
      });
      this.http.UploadFormDataFile(`/Folders/${folder}/upload`, params).subscribe((uploaded) => {
        res(filesRoutes);
      }, err => rej(err));
    });
  }

  public UploadFile(file: File, folder: string) {
    return new Promise<string | null>((res, rej) => {
      if(!file) res(null);
      let params = new FormData();
      const fileExtension = file.name.split('.').pop();
      let fileName = `${uuidv4()}.${fileExtension}`;
      params.append('file', file, fileName);
      this.http.UploadFormDataFile(`/Folders/${folder}/upload`, params).subscribe((uploaded) => {
        res(this.GenerateParcialFileUrl(folder, fileName));
      }, err => rej(err));
    });
  }
  
  public DeleteFile(fileName: string, folder: string) {
    return new Promise<boolean>((res, rej) => {
      this.http.Delete(`/Folders/${folder}/files/${fileName}`).subscribe((deleted) => {
        res(true);
      }, err => rej(err));
    });
  }

  public OnFileChange(event: any): Array<any> {
    if(!event || !event.target) return [];
    return event.target.files;
  }

}
