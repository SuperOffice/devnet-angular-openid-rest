import { Component, Input, Output, EventEmitter } from "@angular/core";
import { FileUploadService } from '../services'

@Component({
  selector: "app-file-upload",
  templateUrl: "./file-upload.component.html",
  styleUrls: ["./file-upload.component.css"]
})
export class FileUploadComponent {

  fileToUpload: File = null;
  public documentId: number;
  public fileName: string = "";

  @Output() fileNameEvent = new EventEmitter<string>();

  constructor(private fileSvc: FileUploadService) {}

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.fileNameEvent.emit(this.fileToUpload.name);
  }

  uploadFileToActivity(docId: number) {
    this.fileSvc.putFile(docId, this.fileToUpload).subscribe(
      data => {
        // do something, if upload success
        alert('Document upload complete!')
      },
      error => {
        console.log(error);
      }
    );
  }
}
