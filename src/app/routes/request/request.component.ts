import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Observable, from, map } from 'rxjs';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
const swal = require('sweetalert2');

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit{
  estados = ['En preparación', 'Enviado', 'Entregado'];
  

  displayedColumns: string[] = ['date', 'destination', 'dishes', 'state', 'actions'];
  dataSource: MatTableDataSource<any[]> = new MatTableDataSource<any[]>([]);

  request$?: Observable<any[]>;
  private paginator: MatPaginator | undefined;
  private sort: MatSort | undefined;

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  length = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  isLoading: boolean = true;

  pageEvent: PageEvent | undefined;

  constructor(
    private firestoreService: FirestoreService,
    private toastr: ToastrService,
  ) {
    
  }

  
  ngOnInit(): void {
    this.getRequests();
  }

  statusChanged(request: any, event: any){
    this.updateState(request, event.value);
  }

  updateState(request: any, estado: string): void {
    swal.fire({
      title: "¿Está seguro?",
      text: "¿Está seguro que desea cambiar el estado del pedido seleccionado?",
      icon: "warning",
      dangerMode: true,
      showCancelButton: true,
      cancelButtonText: "Cancelar"
    })
    .then((data: any) => {
      if (!!data.isConfirmed) {
        this.updateStateCallback(request, estado);
      }
    });
  }

  updateStateCallback(request: any, estado: string) {
    this.firestoreService.updateState(request, estado)
    .then(() => {
      this.toastr.success('Se cambió el estado correctamente');
      this.getRequests()
    },
    (err) => {
      this.toastr.error('Hubo un error al cambiar es estado');
    })
  }

  getRequests() {
    this.request$ = from(this.firestoreService.getRequests());
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
    }
  }

}
