import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileService } from './file';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  files: any[] = [];
  selectedFile: File | null = null;
  message = '';

  constructor(private fileService: FileService) {}

  ngOnInit() {
    this.loadFiles();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  upload() {
    if (!this.selectedFile) return;

    this.fileService.upload(this.selectedFile).subscribe({
      next: () => {
        this.message = 'Upload feito com sucesso!';
        this.loadFiles();
      },
      error: (err) => this.message = err.error.message || 'Erro no upload'
    });
  }

  loadFiles() {
    this.fileService.getFiles().subscribe(res => this.files = res.files);
  }

  deleteFile(name: string) {
    this.fileService.deleteFile(name).subscribe(() => this.loadFiles());
  }
}

