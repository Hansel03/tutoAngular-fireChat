import { Component } from '@angular/core';

import { ChatService } from '../../providers/chat.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: []
})
export class LoginComponent {

    constructor(private _chatService: ChatService) { }

    /**
     * Meto para hacer Login
     * @memberof LoginComponent.ingresar
     */
    ingresar(proveedor: string) {
        console.log(proveedor);
        /*Llamamos al servicios de autenticacio, para hacer login */
        this._chatService.login(proveedor);
    }

}
