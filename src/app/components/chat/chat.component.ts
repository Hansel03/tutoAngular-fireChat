import { element } from 'protractor';

import { Component, OnInit } from '@angular/core';
import { ChatService } from './../../providers/chat.service';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styles: []
})
export class ChatComponent implements OnInit {

    mensaje: string;
    elemento: any;

    constructor(public _cs: ChatService) {
        this._cs.cargarMensajes()
            .subscribe(() => {
                /*Mantener el scroll abajo */
                setTimeout(() => {
                    this.elemento.scrollTop = this.elemento.scrollHeight;
                }, 20);
            });
    }

    ngOnInit() {
        /*Capturar el Id para mover el scroll hasta abajo*/
        this.elemento = document.getElementById('app-mensajes');
    }

    enviar_mensaje() {
        console.log(this.mensaje);
        if (this.mensaje.length !== 0) {
            this._cs.agregarMensaje(this.mensaje)
                .then(
                    () => this.mensaje = ''
                )
                .catch(
                    (err) => console.log('Error al enviar')
                );

        }
    }



}
