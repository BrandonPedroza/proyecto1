import { TipoOperador, TipoParametro } from "./tipificacion";

export class parametroXpath {
    Value:string;
    ID:string;
    Tipo: TipoParametro;
    Operador:TipoOperador;
    constructor(id:string,value:string,tipo:TipoParametro,operador:TipoOperador){
        this.ID = id;
        this.Value = value;
        this.Tipo = tipo;
        this.Operador = operador;
    }

}