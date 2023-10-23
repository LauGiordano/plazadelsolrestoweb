import { Injectable, inject } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  firestore: Firestore = inject(Firestore);

  constructor() { }
  
  public async getDishes() {
    const dishesCollection = collection(this.firestore, 'dishes');
    const dishesSnapshot = await getDocs(dishesCollection);
    const dishesList = dishesSnapshot.docs.map(doc => doc.data());
    return dishesList;
  }

  public async createDish(dish: any) {
    const docRef = await addDoc(collection(this.firestore, "dishes"), dish);
  }

  public async updateDish(dish: any) {
    const docRef = await updateDoc(doc(this.firestore, "dishes", dish.id), dish);
  }

  public async deleteDish(dish: any) {
    const docRef = await deleteDoc(doc(this.firestore, "dishes", dish.id));
  }
}
