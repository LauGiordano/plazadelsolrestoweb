import { Injectable, inject } from '@angular/core';
import { Firestore, collection, getDocs, addDoc, doc, updateDoc, deleteDoc, query, where } from '@angular/fire/firestore';
import {format} from 'date-fns';

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
    dish.price = parseInt(dish.price);
    const docRef = await addDoc(collection(this.firestore, "dishes"), dish);
    dish.dishId = docRef.id;
    this.updateDish(dish);
    
  }

  public async updateDish(dish: any) {
    dish.price = parseInt(dish.price);
    const docRef = await updateDoc(doc(this.firestore, "dishes", dish.dishId), dish);
  }

  public async deleteDish(dish: any) {
    const docRef = await deleteDoc(doc(this.firestore, "dishes", dish.dishId));
  }

  public async getRequests() {
    const requestCollection = collection(this.firestore, 'Request');
    let date = new Date();
    const result = format(date, 'yyyy/MM/dd');
    const q = query(requestCollection, where('state', 'not-in', ['Cancelado', 'Enviado', 'Entregado']),
    where("date", "==", result));
    
    const requestSnapshot = await getDocs(q);
    const dishesList = requestSnapshot.docs.map(doc => doc.data());
    return dishesList;
  }

  public async updateState(request: any, estado: string) {
    const requestCollection = collection(this.firestore, 'Request');
    const q = query(requestCollection, where("state", "==", request.state), where("uid", "==", request.uid));
    const requestSnapshot = await getDocs(q);
    let document;
    document = requestSnapshot.docs.at(0)
    if (document == undefined) {
      document = { id: 'nulo'}
    } else {
      const data = { state: estado };
      const docRef = await updateDoc(doc(this.firestore, "Request", document.id), data);
    }
  }

  public async getUser(email: string, password: string) {
    const userCollection = collection(this.firestore, 'admin');
    const q = query(userCollection, where("user", "==", email), where("password", "==", password));
    const userSnapshot = await getDocs(q);
    let document;
    document = userSnapshot.docs.at(0)
    if (document != undefined) {
      return true;
    }
    return false;
  }

  public async getAllRequests() {
    const requestCollection = collection(this.firestore, 'Request');
    const requestSnapshot = await getDocs(requestCollection);
    const requestList = requestSnapshot.docs.map(doc => doc.data());
    return requestList;
  }

}
