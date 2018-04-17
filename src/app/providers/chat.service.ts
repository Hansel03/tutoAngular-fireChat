import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Mensaje } from './../interfaces/mensaje.interface';

@Injectable()
export class ChatService {

    private itemsCollection: AngularFirestoreCollection<Mensaje>;
    public chats: Mensaje[] = [];


    constructor(private afs: AngularFirestore) { }

    cargarMensajes() {
        /*indicamos una query con el ref para que ordene por fecha ascendente y limite el get a 5 datos */
        this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('fecha', 'desc').limit(5));

        /*estamos pendiente de todos los cambios que sucedan en este nodo */
        return this.itemsCollection.valueChanges()
            .map((data: Mensaje[]) => {
                console.log(data);
                this.chats = [];

                for (const mensaje of data) {
                    this.chats.unshift(mensaje);
                }

                return this.chats;
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
        return this.itemsCollection.add(mensaje);
    }

}
