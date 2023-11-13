import { Injectable, inject } from '@angular/core';
import { Firestore, collection, getDocs, addDoc, doc, updateDoc, deleteDoc, query, where } from '@angular/fire/firestore';

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
    dish.dishId = docRef.id;
    this.updateDish(dish);
    
  }

  public async updateDish(dish: any) {
    const docRef = await updateDoc(doc(this.firestore, "dishes", dish.dishId), dish);
  }

  public async deleteDish(dish: any) {
    const docRef = await deleteDoc(doc(this.firestore, "dishes", dish.dishId));
  }

  public async getRequests() {
    const requestCollection = collection(this.firestore, 'Request');
    const requestSnapshot = await getDocs(requestCollection);
    const requestList = requestSnapshot.docs.map(doc => doc.data());
    return requestList;
  }

  public async updateState(request: any, estado: any) {
    const data = { state: estado };
    const requestCollection = collection(this.firestore, 'Request');
    const q = query(requestCollection, where("state", "==", request.state), where("uid", "==", request.uid));
    const requestSnapshot = await getDocs(q);
    let document;
    document = requestSnapshot.docs.at(0)
    if (document == undefined) {
      document = { id: 'nulo'}
    }
    const docRef = await updateDoc(doc(this.firestore, "Request", document.id), data);
  }
}
