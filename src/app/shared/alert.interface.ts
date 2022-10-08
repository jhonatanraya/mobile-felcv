export interface ALERT{
    id?:string;
    victima:{
        apellidoV: string;
        documentoId: string
        edad: number;
        extencionId: string
        genero:string
        nombreV: string
        sexo: string
        telefono: string
    }
    ubicacion:{
        lat:number;
        lng:number;
    }
    estado:string;
    
}