import {parametroXpath} from './parametroXpath';

export class sentenciaXpath {
    name = "";
    Tipo = "";
    Parametro: parametroXpath;
    
    constructor(tipo:string, parametro:parametroXpath){
        this.Tipo = tipo;
        this.Parametro = parametro;
    }
}
