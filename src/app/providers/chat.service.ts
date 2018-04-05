import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';


@Injectable()
export class ChatService {

    private itemsCollection: AngularFirestoreCollection<any>;
    public chats: any[] = [];


    constructor(private afs: AngularFirestore) { }

    cargarMensajes() {
        this.itemsCollection = this.afs.collection<any>('chats');

        /*estamos pendiente de todos los cambios que sucedan en este nodo */
        return this.itemsCollection.valueChanges();

    }

}
