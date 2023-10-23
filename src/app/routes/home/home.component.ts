import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dishes: any;

  constructor(
    private firestoreService: FirestoreService
  ) {

  }

  ngOnInit(): void {
    this.dishes = this.firestoreService.getDishes();
  }

  addDish() {
    //TODO: modal para agregar plato
    let dish = {};
    this.firestoreService.createDish(dish);
  }

  updateDish(dish: any) {
    this.firestoreService.updateDish(dish);
  }

  deleteDish(dish: any) {
    this.firestoreService.deleteDish(dish);
  }

  


}
