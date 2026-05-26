import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private apiUrl = 'http://localhost:3000/arquivo';

  constructor(private http: HttpClient) {}

  upload(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.apiUrl}/upload`, formData);
  }

  getFiles(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  deleteFile(filename: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/nome/${filename}`);
  }
}