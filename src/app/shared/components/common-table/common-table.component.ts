import {
  Component,
  OnInit,
  ViewChild,
  Input,
  EventEmitter,
  Output,
  ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Sort } from '@angular/material/sort';

import { TableSelectedCell } from './common-table.interfaces';

@Component({
  selector: 'app-common-table',
  templateUrl: './common-table.component.html',
  styleUrls: ['./common-table.component.scss']
})
export class CommonTableComponent implements OnInit {

  @Input()
  displayedColumns: string[];

  @Input()
  dataSource: MatTableDataSource<any>;

  @Input()
  selectedCellValue: TableSelectedCell;

  @Input()
  isLoadingResults: boolean;

  @Output()
  sort: EventEmitter<Sort> = new EventEmitter<Sort>();

  @Output()
  rowClick: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('tableDiv',  { static: false })
  tableDiv: ElementRef;

  constructor () {}

  ngOnInit() {
  }

  sortData(sort: Sort) {
    this.sort.emit(sort);
  }

  rowHandler(row) {
    this.rowClick.emit(row);
  }

  getLastCellValue(value: any) {
    console.log(value);
  }
}
