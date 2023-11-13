import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
const swal = require('sweetalert2');

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit{
  requests: any;
  estados = [{ text: 'En preparación' }, { text: 'Enviado' }, { text: 'Entregado' }];

  constructor(
    private firestoreService: FirestoreService,
    private toastr: ToastrService,
  ) {
    
  }
  
  ngOnInit(): void {
    this.getRequests();
  }

  getRequests() {
    this.requests = this.firestoreService.getRequests();
  }

  statusChanged(request: any, event: any){
    this.updateState(request, event);
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

  updateStateCallback(request: any, estado: any) {
    this.firestoreService.updateState(request, estado)
    .then(() => {
      this.toastr.success('Se editó el plato correctamente');
      this.getRequests()
    },
    (err) => {
      this.toastr.error('Hubo un error al editar el plato');
    })
  }
}
