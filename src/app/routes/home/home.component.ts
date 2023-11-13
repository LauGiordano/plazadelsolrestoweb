import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { DishFormModalComponent } from './components/dish-form-modal/dish-form-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
const swal = require('sweetalert2');

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dishes: any;
  showModal: boolean = false;

  constructor(
    private firestoreService: FirestoreService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {

  }

  ngOnInit(): void {
    this.getDishes();
  }

  getDishes() {
    this.dishes = this.firestoreService.getDishes();
  }

  addDish(): void {
    const dialogRef = this.dialog.open(DishFormModalComponent, {
      width: '400px',
      data: {
        data: null,
        callback: (data: any) => this.createDish(data)
      },
      disableClose: true
    });
  }

  createDish(dish: any) {
    return new Promise((resolve) => {
      this.firestoreService.createDish(dish)
      .then(() => {
        this.toastr.success('Se agregó un nuevo plato');
        this.getDishes();
        resolve({
          type: 'sucess'
        });
      },
      (err) => {
        this.toastr.error('Hubo un error al crear un nuevo plato');
        resolve({
          type: 'error',
          data: err
        });
      })
    })
  }

  updateDish(dish: any): void {
    const dialogRef = this.dialog.open(DishFormModalComponent, {
      width: '400px',
      data: {
        data: dish,
        callback: (data: any) => this.updateserviceDish(dish)
      },
      disableClose: true
    });
  }

  updateserviceDish(dish: any) {
    return new Promise((resolve) => {
      this.firestoreService.updateDish(dish)
      .then(() => {
        this.toastr.success('Se editó el plato correctamente');
        this.getDishes();
        resolve({
          type: 'sucess'
        });
      },
      (err) => {
        this.toastr.error('Hubo un error al editar el plato');
        resolve({
          type: 'error',
          data: err
        });
      })
    })
  }

  deleteDish(dish: any): void {
    swal.fire({
      title: "¿Está seguro?",
      text: "¿Está seguro que desea eliminar el plato seleccionado?",
      icon: "warning",
      dangerMode: true,
      showCancelButton: true,
      cancelButtonText: "Cancelar"
    })
    .then((data: boolean) => {
      if (data) {
        this.deleteDishCallback(dish);
      }
    });
  }

  deleteDishCallback(dish: any) {
    return new Promise((resolve) => {
      this.firestoreService.deleteDish(dish)
      .then(() => {
        this.toastr.success('Se eliminó el plato correctamente');
        this.getDishes();
        resolve({
          type: 'sucess'
        });
      },
      (err) => {
        this.toastr.error('Hubo un error al eliminar el plato');
        resolve({
          type: 'error',
          data: err
        });
      })
    })
  }

}
