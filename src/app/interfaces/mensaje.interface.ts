

export interface Mensaje {
    nombre: string;
    mensaje: string;
    fecha?: number; /* el signo de interrogacion indica que es opcional */
    uid?: string;
}
