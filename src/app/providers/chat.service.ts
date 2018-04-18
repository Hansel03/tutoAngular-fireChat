import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Mensaje } from './../interfaces/mensaje.interface';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class ChatService {

    private itemsCollection: AngularFirestoreCollection<Mensaje>;
    public chats: Mensaje[] = [];
    public usuario: any = {};


    constructor(
        private afs: AngularFirestore,
        public afAuth: AngularFireAuth
    ) {

        /*nos subcribimos a un observable de angularFireAut
        para escuchar cualqueir cambio en el estado de la autenticacion*/
        this.afAuth.authState.subscribe(user => {
            console.log('Estado del usuario: ', user);

            if (!user) {
                return;
            }

            this.usuario.nombre = user.displayName;
            this.usuario.uid = user.uid;

        });

    }

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

    /**
     * Funcion para hacer login en la app
     * @memberof ChatService.login
     */
    login(proveedor: string) {
        /*por defecto tra la autenticacion por google */
        if (proveedor === 'google') {
            this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
        }

        if (proveedor === 'twitter') {
            this.afAuth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
        }

    }

    /**
     * funcion para cerrar session en la app
     * @memberof ChatService.logout
     */
    logout() {
        this.afAuth.auth.signOut();
    }

}
