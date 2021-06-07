import {parametroXpath} from './parametroXpath';
import {NodoXpath} from './NodoXpath';
export class sentenciaXpath {
    Tipo:NodoXpath;
    Parametro: parametroXpath;
    Padre:sentenciaXpath;
    constructor(tipo:NodoXpath, parametro:parametroXpath, padre:sentenciaXpath){
        this.Tipo = tipo;
        this.Parametro = parametro;
        this.Padre = padre;
    }
}
