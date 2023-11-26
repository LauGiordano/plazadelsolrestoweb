import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Observable, from } from 'rxjs';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';

@Component({
  selector: 'app-all-request',
  templateUrl: './all-request.component.html',
  styleUrls: ['./all-request.component.css']
})
export class AllRequestComponent implements OnInit{
  requests: any;
  estados = ['En preparación', 'Enviado', 'Entregado'];
  

  displayedColumns: string[] = ['date', 'destination', 'dishes', 'state'];
  dataSource: MatTableDataSource<any[]> = new MatTableDataSource<any[]>([]);

  request$?: Observable<any[]>;
  private paginator: MatPaginator | undefined;
  private sort: MatSort | undefined;

  length = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  isLoading: boolean = true;

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }


  constructor(
    private firestoreService: FirestoreService,
    private toastr: ToastrService,
  ) {
    
  }

  
  ngOnInit(): void {
    this.getRequests();
  }

  getRequests() {
    this.request$ = from(this.firestoreService.getAllRequests());
    this.request$.subscribe(
      request => {
        this.isLoading = false;
        this.length = request.length;
        this.dataSource = new MatTableDataSource<any>(request);
        return this.dataSource;
      });
  }

  setDataSourceAttributes() {
    if (this.paginator && this.sort) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.applyFilter('');
    }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
}

}
