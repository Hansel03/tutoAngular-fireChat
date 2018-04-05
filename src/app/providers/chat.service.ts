import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Mensaje } from './../interfaces/mensaje.interface';

@Injectable()
export class ChatService {

    private itemsCollection: AngularFirestoreCollection<Mensaje>;
    public chats: Mensaje[] = [];


    constructor(private afs: AngularFirestore) { }

    cargarMensajes() {
        this.itemsCollection = this.afs.collection<Mensaje>('chats');

        /*estamos pendiente de todos los cambios que sucedan en este nodo */
        return this.itemsCollection.valueChanges()
            .map((data: Mensaje[]) => {
                console.log(data);
                this.chats = data;
            });

    }


    agregarMensaje(texto: string) {
        const mensaje: Mensaje = {
            nombre: 'Demo',
            mensaje: texto,
            fecha: new Date().getTime()
        };
        /*Con esto le decimos que inserte un mensaje a la collecion chats */
        /*Esto retorna una promesa para vlaidar si se inserto o fallo con then o catch*/
        this.itemsCollection.add(mensaje);
    }

}
