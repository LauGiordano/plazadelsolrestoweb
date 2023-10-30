import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { DishFormModalComponent } from './components/dish-form-modal/dish-form-modal.component';
import { MatDialog } from '@angular/material/dialog';
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
    private dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
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

  createDish(dish: any): void {
    //this.firestoreService.createDish(dish);
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

  updateserviceDish(dish: any): void {
    //this.firestoreService.updateDish(dish);
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
    //this.firestoreService.deleteDish(dish);
  }

}
