import {Component, ViewChild} from '@angular/core';
import {NgxCsvParser, NgxCSVParserError} from 'ngx-csv-parser';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild('fileImportInput') fileImportInput: any;

  csvRecords: any[] = [];

  header = true;

  columnsAll: string[];

  massNumeric: string[] = [];

  massString: string[] = [];

  columns = new FormControl();

  shown = false;

  constructor(private ngxCsvParser: NgxCsvParser) {

  }

  fileChangeListener($event: any): void {

    const files = $event.srcElement.files;

    this.ngxCsvParser
      .parse(files[0], { header: this.header, delimiter: ',' })
      .subscribe((result: Array<any>) => {
      this.csvRecords = result;
      this.columnsAll = Object.keys(this.csvRecords[0]);
    }, (error: NgxCSVParserError) => {
      console.log('Error', error);
    });
  }

  checkedColumn(selected): void{

    this.massString = [];
    this.massNumeric  = [];

    const generalColumns = selected.map( nameColumn => {
        return [nameColumn, this.csvRecords.map(row => row[nameColumn])];
    });
    generalColumns.map(arr => {
        if (parseInt(arr[1][0])) {
          this.massNumeric.push(arr);
        }
        else {this.massString.push(arr); }
      });
    this.shown = true;
  }
}
