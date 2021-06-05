export class PARAMETRO{
    Identificador:string;
    Valor:string;
    TipoDato:string;
}
export class NodoXml {
    Texto:string;
    Identificador:string;
    Hijos:NodoXml[];
    Padre:NodoXml;
    Parametros:PARAMETRO[];
    constructor(identificador:string){
        this.Identificador = identificador;
        this.Padre = null;
    }
    AgregarParametro(identificador: string, valor: string, tipoDato: string) {
        let parametro = new PARAMETRO();
        parametro.Identificador = identificador;
        parametro.TipoDato = tipoDato;
        parametro.Valor = valor;
        this.Parametros.push(parametro);
    }
    GetValorParametro(identificador: string): string {
        this.Parametros.forEach(element => {
            if(element.Identificador == identificador){
                return element.Valor;
            }
        });
        return 'No se encontro el parámetro con nombre: ' + identificador;
    }
    GetTexto(){
        return this.Texto;
    }
    SetTexto(texto: string){
        this.Texto = texto;
    }
    AddHijo(hijo:NodoXml){
        hijo.Padre = this;
        this.Hijos.push(hijo);
    }
    GetHijo(identificador: string){
      this.Hijos.forEach(element => {
          if(element.Identificador == identificador){
              return element;
          }
      });
      return null;
    }

}