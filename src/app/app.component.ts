import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { observable } from 'rxjs';
import {sentenciaXpath} from '../app/Estructuras/sentenciaXpath'
import {Objeto} from '../Expresiones/Objeto'
import { OperacionXpath } from './Estructuras/OperacionXpath';
import { ParametroOperacionXpath } from './Estructuras/ParametroOperacionXpath';
import { parametroXpath } from './Estructuras/parametroXpath';
import {TipoParametro, TipoOperador, TipoNodo} from './Estructuras/tipificacion';
declare var require: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'proyecto1';
  txtXpath = "/biblioteca/libro/fechaPublicacion[@año=1969]";
  consoleValue = "";
  parser;
  listaDescendientes:string[] = [];
  xmlOriginal:Objeto[];
  parserXml;
  xmlText = `<?xml version="1.0" encoding="UTF-8"?>
  <biblioteca>
    <libro>
      <titulo>La vida esta en otra parte</titulo>
      <autor>Milan Kundera</autor>
      <fechaPublicacion año="1973"/>
    </libro>
    <libro>
      <titulo>Pantaleon y las visitadoras</titulo>
      <autor fechaNacimiento="28/03/1936">Mario Vargas Llosa</autor>
      <fechaPublicacion año="1973"/>
    </libro>
    <libro>
      <titulo>Conversacion en la catedral</titulo>
      <autor fechaNacimiento="28/03/1936">Mario Vargas Llosa</autor>
      <fechaPublicacion año="1969"/>
    </libro>
  </biblioteca>`;
  
  private httpClient: HttpClient;
  constructor(http: HttpClient) {
    this.httpClient = http;
    //this.parser = require("./Gramatica/gramatica");
    this.parser = require("./Gramatica/xpathGramatica");
    this.parserXml = require("./Gramatica/gramatica");
  }

  Compilar() {
    this.consoleValue ="";
    var xmlObject = this.parserXml.parse(this.xmlText) as Objeto[];
    var xPathObject = this.parser.parse(this.txtXpath) as sentenciaXpath[];
    //console.log('xPathObject');
    //console.log(xPathObject);
    //Agregamos para cada sentencia su sentencia hija para simular lista doblemente enlazada (padre,hijo)
    var elementoActual:sentenciaXpath; 
    this.xmlOriginal = xmlObject;
    this.consoleValue = '';
    xPathObject.forEach(element => {
      elementoActual = element;
      element.Hijo = null;
      while(elementoActual.Padre !=null){
        elementoActual.Padre.Hijo = elementoActual;
        elementoActual = elementoActual.Padre;
      }
      this.listaDescendientes = [];
     
      this.consoleValue += this.ProcesarNodoRaiz(elementoActual,xmlObject,null);
    });
    //elementoActual en este momento es la raiz de la entrada Xpath
   
    
  }

  ProcesarNodoRaiz(raiz:sentenciaXpath, xml:Objeto[],padre:Objeto[]):string{
    var xmlActual:Objeto[];
    var result = "";
    switch(raiz.Tipo.Tipo){
      case TipoNodo.Raiz :
        { 
          
          if(raiz.Hijo != null)
            return this.ProcesarNodoRaiz(raiz.Hijo,xml,padre);
          else 
            throw new Error("Error por manejar luego del nodo / debe de venir un el nombre de un elemento");
        };break;
        case TipoNodo.ID :
        { 
          if(raiz.Hijo == null){
            if(raiz.Padre.Tipo.Tipo == TipoNodo.Descendiente){
              this.listaDescendientes.push(raiz.Tipo.Valor);
              return this.BuscarValorDescendiente(xml);
            }
            else{
              if(raiz.Parametro!= null){
                var param = Object.getPrototypeOf(raiz.Parametro);
                var obj:any = raiz.Parametro;
                console.log(param);
                if( param.constructor.name === "ParametroOperacionXpath"){
                  console.log('es ParametroOperacionXpath');
                  var parametro = obj as ParametroOperacionXpath;
                  switch(parametro.Tipo){
                    case TipoParametro.Entero:{
                      var meta = Number(parametro.Valor);
                      var elements = [];
                      xml.forEach(element => {
                        if(element.identificador == raiz.Tipo.Valor){
                          
                          elements.push(element);
                        }
                      });
                      if(elements.length>= meta){
                        result +=this.GetXmlText(elements[meta-1]);
                      }else{
                        result = 'no existe elemento en la posicion: ' + meta;
                      }
                    }break; 
                  }
                }else if(param.constructor.name === "parametroXpath"){
                  var operacion = obj as parametroXpath;
                  console.log('es operacion');
                  var valor = this.ResolverOperacion(operacion);
                  console.log('valor');
                  console.log(valor);
                  if(valor.length <= 1){
                    var elements = [];
                    xml.forEach(element => {
                      if(element.identificador == raiz.Tipo.Valor){
                        
                        elements.push(element);
                      }
                    });
                    if(elements.length>= valor[0]){
                      result +=this.GetXmlText(elements[valor[0] - 1]);
                    }else{
                      result = 'no existe elemento en la posicion: ' + valor;
                    }
                  }else{
                    console.log('operacion logica');
                    switch(valor[2]){
                      case "=":{
                        xml.forEach(element => {
                          if(element.identificador == raiz.Tipo.Valor){
                            element.listaAtributos.forEach(atr => {
                              if(atr.identificador == valor[valor[3]])
                                {let re = /\"/gi;
                                  if(valor[3] == 0 ){
                                    if(atr.valor.replace(re,'') == valor[1].toString())
                                    {
                                      result +=this.GetXmlText(element);
                                    }
                                  }else{
                                    if(atr.valor == valor[0].toString())
                                    {
                                      result +=this.GetXmlText(element);
                                    }
                                  }
                                  
                                }
                            });
                          }
                        });
                      }break;
                      case ">":{
                        xml.forEach(element => {
                          if(element.identificador == raiz.Tipo.Valor){
                            element.listaAtributos.forEach(atr => {
                              if(atr.identificador == valor[valor[3]])
                                {let re = /\"/gi;
                                  if(valor[3] == 0 ){
                                    if(Number(atr.valor.replace(re,'')) > Number(valor[1]))
                                    {
                                      result +=this.GetXmlText(element);
                                    }
                                  }else{
                                    if(Number(atr.valor.replace(re,'')) > Number(valor[0]))
                                    {
                                      result +=this.GetXmlText(element);
                                    }
                                  }
                                  
                                }
                            });
                          }
                        });
                      }break;
                      case "<":{
                        xml.forEach(element => {
                          if(element.identificador == raiz.Tipo.Valor){
                            element.listaAtributos.forEach(atr => {
                              if(atr.identificador == valor[valor[3]])
                                {let re = /\"/gi;
                                  if(valor[3] == 0 ){
                                    if(Number(atr.valor.replace(re,'')) < Number(valor[1]))
                                    {
                                      result +=this.GetXmlText(element);
                                    }
                                  }else{
                                    if(Number(atr.valor.replace(re,'')) < Number(valor[0]))
                                    {
                                      result +=this.GetXmlText(element);
                                    }
                                  }
                                  
                                }
                            });
                          }
                        });
                      }break;
                      case ">=":{
                        xml.forEach(element => {
                          if(element.identificador == raiz.Tipo.Valor){
                            element.listaAtributos.forEach(atr => {
                              if(atr.identificador == valor[valor[3]])
                                {let re = /\"/gi;
                                  if(valor[3] == 0 ){
                                    if(Number(atr.valor.replace(re,'')) >= Number(valor[1]))
                                    {
                                      result +=this.GetXmlText(element);
                                    }
                                  }else{
                                    if(Number(atr.valor.replace(re,'')) >= Number(valor[0]))
                                    {
                                      result +=this.GetXmlText(element);
                                    }
                                  }
                                  
                                }
                            });
                          }
                        });
                      }break;
                      case "<=":{
                        xml.forEach(element => {
                          if(element.identificador == raiz.Tipo.Valor){
                            element.listaAtributos.forEach(atr => {
                              if(atr.identificador == valor[valor[3]])
                                {let re = /\"/gi;
                                  if(valor[3] == 0 ){
                                    if(Number(atr.valor.replace(re,'')) <= Number(valor[1]))
                                    {
                                      result +=this.GetXmlText(element);
                                    }
                                  }else{
                                    if(Number(atr.valor.replace(re,'')) <= Number(valor[0]))
                                    {
                                      result +=this.GetXmlText(element);
                                    }
                                  }
                                  
                                }
                            });
                          }
                        });
                      }break;
                      case "!=":{
                        xml.forEach(element => {
                          if(element.identificador == raiz.Tipo.Valor){
                            element.listaAtributos.forEach(atr => {
                              if(atr.identificador == valor[valor[3]])
                                {let re = /\"/gi;
                                  if(valor[3] == 0 ){
                                    if(atr.valor.replace(re,'') != valor[1].toString())
                                    {
                                      result +=this.GetXmlText(element);
                                    }
                                  }else{
                                    if(atr.valor.replace(re,'') != valor[0].toString())
                                    {
                                      result +=this.GetXmlText(element);
                                    }
                                  }
                                  
                                }
                            });
                          }
                        });
                      }break;
                    }
                  }
                  

                }
              }else{
                xml.forEach(element => {
                  if(element.identificador == raiz.Tipo.Valor){
                    
                    result +=this.GetXmlText(element);
                  }
                });
              }

             
           }
          }else{
            if(raiz.Padre.Tipo.Tipo == TipoNodo.Descendiente){
             // var xmlTemp = this.BuscarValorEtiqueta(xml,raiz.Tipo.Valor);
              
              this.listaDescendientes.push(raiz.Tipo.Valor);
              //posiblemnte halla que buscar el mandar al parser el xml temporal y las siguiente instrucciones y mandarlo a evaluar aqui mismo

            }else{
              xml.forEach(element => {
                if(element.identificador == raiz.Tipo.Valor){
                  if(element.listaObjetos!=null && element.listaObjetos!=undefined)
                      xmlActual = element.listaObjetos;
                  result += this.ProcesarNodoRaiz(raiz.Hijo,xmlActual,xml);
                }
              });
            }
            
            
          }
        };break;
        case TipoNodo.Atributo:{
          if(padre !=null){
            console.log('atributo');
            console.log(padre);
            padre.forEach(element => {
              element.listaAtributos.forEach(atr => {
              if(atr.identificador == raiz.Tipo.Valor){
                result += atr.identificador + '='+ atr.valor + '\n';
              }
              });
            });
          }else{
            if(raiz.Padre.Tipo.Tipo == TipoNodo.Descendiente){

              result += this.GetAtributosDescendencia(xml, raiz.Tipo.Valor);
            }
            
          }
            //if(raiz.Padre.Tipo.Tipo == TipoNodo.Descendiente){

            
            //}else{
             
            //}
        }; break;
        case TipoNodo.Descendiente:{
          if(raiz.Hijo == null){
            throw new Error("Error por manejar luego del nodo // debe de venir un el nombre de un elemento");
          }else{
            return this.ProcesarNodoRaiz(raiz.Hijo,xml,padre);
          }
        };break;
        case TipoNodo.NodoPadre:{
          var sentencia = raiz;
          try{
            var aux:sentenciaXpath;
            sentencia.Padre.Padre.Hijo = raiz.Hijo;
            aux = sentencia;
            while(aux.Padre!=null){
              aux = aux.Padre;
            }
            return this.ProcesarNodoRaiz(aux,this.xmlOriginal,null);
          }catch {
              return 'xPath invalido ? X_X';
          }
         
         
        };break;
    }


    return result;
  }

  ResolverOperacion(operacion: parametroXpath):any[]{
    switch (operacion.Operacion.TipoOperador){
      case TipoOperador.Mas: {
        var izquierdo :number;
        var derecho :number;
        if(operacion.Operacion.ParametroIzquierdo.Operacion == null){
          if(operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Decimal
            && operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Entero
            && operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Funtion_Last){
              throw new Error('Error expresion invalida.' + operacion.Operacion.ParametroIzquierdo.Valor + '+' + operacion.Operacion.ParametroDerecho.Valor);
          }
          izquierdo = Number(operacion.Operacion.ParametroIzquierdo.Valor);
        }else{
          izquierdo = this.ResolverOperacion(operacion.Operacion.ParametroIzquierdo)[0];
        }
        if(operacion.Operacion.ParametroDerecho.Operacion == null){
          if(operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Decimal
            && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Entero
            && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Funtion_Last){
              throw new Error('Error expresion invalida.' + operacion.Operacion.ParametroIzquierdo.Valor + '+' + operacion.Operacion.ParametroDerecho.Valor);
          }
          derecho = Number(operacion.Operacion.ParametroDerecho.Valor);
        }else{
          derecho = this.ResolverOperacion(operacion.Operacion.ParametroDerecho)[0];
        }
        var ret = [];
        ret.push(izquierdo + derecho);
        return ret;
      } break;
      case TipoOperador.Menos: {
        var izquierdo :number;
        var derecho :number;
        if(operacion.Operacion.ParametroIzquierdo.Operacion == null){
          if(operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Decimal
            && operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Entero
            && operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Funtion_Last){
              throw new Error('Error expresion invalida.' + operacion.Operacion.ParametroIzquierdo.Valor + '+' + operacion.Operacion.ParametroDerecho.Valor);
          }
          izquierdo = Number(operacion.Operacion.ParametroIzquierdo.Valor);
        }else{
          izquierdo = this.ResolverOperacion(operacion.Operacion.ParametroIzquierdo)[0];
        }
        if(operacion.Operacion.ParametroDerecho.Operacion == null){
          if(operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Decimal
            && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Entero
            && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Funtion_Last){
              throw new Error('Error expresion invalida.' + operacion.Operacion.ParametroIzquierdo.Valor + '+' + operacion.Operacion.ParametroDerecho.Valor);
          }
          derecho = Number(operacion.Operacion.ParametroDerecho.Valor);
        }else{
          derecho = this.ResolverOperacion(operacion.Operacion.ParametroDerecho)[0];
        }
        var ret = [];
        ret.push(izquierdo - derecho);
        return ret;

      } break;
      case TipoOperador.Por: {
        var izquierdo :number;
        var derecho :number;
        if(operacion.Operacion.ParametroIzquierdo.Operacion == null){
          if(operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Decimal
            && operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Entero
            && operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Funtion_Last){
              throw new Error('Error expresion invalida.' + operacion.Operacion.ParametroIzquierdo.Valor + '+' + operacion.Operacion.ParametroDerecho.Valor);
          }
          izquierdo = Number(operacion.Operacion.ParametroIzquierdo.Valor);
        }else{
          izquierdo = this.ResolverOperacion(operacion.Operacion.ParametroIzquierdo)[0];
        }
        if(operacion.Operacion.ParametroDerecho.Operacion == null){
          if(operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Decimal
            && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Entero
            && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Funtion_Last){
              throw new Error('Error expresion invalida.' + operacion.Operacion.ParametroIzquierdo.Valor + '+' + operacion.Operacion.ParametroDerecho.Valor);
          }
          derecho = Number(operacion.Operacion.ParametroDerecho.Valor);
        }else{
          derecho = this.ResolverOperacion(operacion.Operacion.ParametroDerecho)[0];
        }
        var ret = [];
        ret.push(izquierdo * derecho);
        return ret;
      } break;
      case TipoOperador.Div: {
        var izquierdo :number;
        var derecho :number;
        if(operacion.Operacion.ParametroIzquierdo.Operacion == null){
          if(operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Decimal
            && operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Entero
            && operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Funtion_Last){
              throw new Error('Error expresion invalida.' + operacion.Operacion.ParametroIzquierdo.Valor + '+' + operacion.Operacion.ParametroDerecho.Valor);
          }
          izquierdo = Number(operacion.Operacion.ParametroIzquierdo.Valor);
        }else{
          izquierdo = this.ResolverOperacion(operacion.Operacion.ParametroIzquierdo)[0];
        }
        if(operacion.Operacion.ParametroDerecho.Operacion == null){
          if(operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Decimal
            && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Entero
            && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Funtion_Last){
              throw new Error('Error expresion invalida.' + operacion.Operacion.ParametroIzquierdo.Valor + '+' + operacion.Operacion.ParametroDerecho.Valor);
          }
          derecho = Number(operacion.Operacion.ParametroDerecho.Valor);
        }else{
          derecho = this.ResolverOperacion(operacion.Operacion.ParametroDerecho)[0];
        }
        var ret = [];
        ret.push(izquierdo / derecho);
        return ret;
      } break;

      case TipoOperador.Mayor: {
        if(operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Atributo
          && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Punto
          &&operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Atributo
          && operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Punto){
            throw new Error('Error expresion invalida con operador \'>\'');
        }
        if(operacion.Operacion.ParametroIzquierdo.Tipo == TipoParametro.Atributo
          || operacion.Operacion.ParametroIzquierdo.Tipo == TipoParametro.Punto){
           
            if(operacion.Operacion.ParametroDerecho.Operacion == null){
              if(operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Decimal
                && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Entero
                && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Funtion_Last){
                  throw new Error('Error expresion invalida.' + operacion.Operacion.ParametroIzquierdo.Valor + '>' + operacion.Operacion.ParametroDerecho.Valor);
              }
              derecho = Number(operacion.Operacion.ParametroDerecho.Valor);
            }else{
              derecho = this.ResolverOperacion(operacion.Operacion.ParametroDerecho)[0];
            }
            var ret = [];
            ret.push(operacion.Operacion.ParametroIzquierdo.Valor);
            ret.push(derecho);
            ret.push(">");
            ret.push(0);
           return ret;
        }else{

          if(operacion.Operacion.ParametroIzquierdo.Operacion == null){
            if(operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Decimal
              && operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Entero
              && operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Funtion_Last){
                throw new Error('Error expresion invalida.' + operacion.Operacion.ParametroIzquierdo.Valor + '>' + operacion.Operacion.ParametroDerecho.Valor);
            }
            izquierdo = Number(operacion.Operacion.ParametroIzquierdo.Valor);
          }else{
            izquierdo = this.ResolverOperacion(operacion.Operacion.ParametroIzquierdo)[0];
          }
          var ret = [];
          ret.push(izquierdo);
          ret.push(operacion.Operacion.ParametroDerecho.Valor);
          ret.push(">");
          ret.push(1);
         return ret;
        }

      } break;
      case TipoOperador.Menor: {
        if(operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Atributo
          && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Punto
          &&operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Atributo
          && operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Punto){
            throw new Error('Error expresion invalida con operador \'<\'');
        }
        if(operacion.Operacion.ParametroIzquierdo.Tipo == TipoParametro.Atributo
          || operacion.Operacion.ParametroIzquierdo.Tipo == TipoParametro.Punto){
           
            if(operacion.Operacion.ParametroDerecho.Operacion == null){
              if(operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Decimal
                && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Entero
                && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Funtion_Last){
                  throw new Error('Error expresion invalida.' + operacion.Operacion.ParametroIzquierdo.Valor + '<' + operacion.Operacion.ParametroDerecho.Valor);
              }
              derecho = Number(operacion.Operacion.ParametroDerecho.Valor);
            }else{
              derecho = this.ResolverOperacion(operacion.Operacion.ParametroDerecho)[0];
            }
            var ret = [];
            ret.push(operacion.Operacion.ParametroIzquierdo.Valor);
            ret.push(derecho);
            ret.push("<");
            ret.push(0);
           return ret;
        }else{

          if(operacion.Operacion.ParametroIzquierdo.Operacion == null){
            if(operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Decimal
              && operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Entero
              && operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Funtion_Last){
                throw new Error('Error expresion invalida.' + operacion.Operacion.ParametroIzquierdo.Valor + '<' + operacion.Operacion.ParametroDerecho.Valor);
            }
            izquierdo = Number(operacion.Operacion.ParametroIzquierdo.Valor);
          }else{
            izquierdo = this.ResolverOperacion(operacion.Operacion.ParametroIzquierdo)[0];
          }
          var ret = [];
          ret.push(izquierdo);
          ret.push(operacion.Operacion.ParametroDerecho.Valor);
          ret.push("<");
          ret.push(1);
         return ret;
        }
      } break;
      case TipoOperador.MenorIgual: {
        if(operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Atributo
          && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Punto
          &&operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Atributo
          && operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Punto){
            throw new Error('Error expresion invalida con operador \'<=\'');
        }
        if(operacion.Operacion.ParametroIzquierdo.Tipo == TipoParametro.Atributo
          || operacion.Operacion.ParametroIzquierdo.Tipo == TipoParametro.Punto){
           
            if(operacion.Operacion.ParametroDerecho.Operacion == null){
              if(operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Decimal
                && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Entero
                && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Funtion_Last){
                  throw new Error('Error expresion invalida.' + operacion.Operacion.ParametroIzquierdo.Valor + '<=' + operacion.Operacion.ParametroDerecho.Valor);
              }
              derecho = Number(operacion.Operacion.ParametroDerecho.Valor);
            }else{
              derecho = this.ResolverOperacion(operacion.Operacion.ParametroDerecho)[0];
            }
            var ret = [];
            ret.push(operacion.Operacion.ParametroIzquierdo.Valor);
            ret.push(derecho);
            ret.push("<=");
            ret.push(0);
           return ret;
        }else{

          if(operacion.Operacion.ParametroIzquierdo.Operacion == null){
            if(operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Decimal
              && operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Entero
              && operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Funtion_Last){
                throw new Error('Error expresion invalida.' + operacion.Operacion.ParametroIzquierdo.Valor + '<=' + operacion.Operacion.ParametroDerecho.Valor);
            }
            izquierdo = Number(operacion.Operacion.ParametroIzquierdo.Valor);
          }else{
            izquierdo = this.ResolverOperacion(operacion.Operacion.ParametroIzquierdo)[0];
          }
          var ret = [];
          ret.push(izquierdo);
          ret.push(operacion.Operacion.ParametroDerecho.Valor);
          ret.push("<=");
          ret.push(1);
         return ret;
        }
      } break;
      case TipoOperador.MayorIgual: {
        if(operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Atributo
          && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Punto
          &&operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Atributo
          && operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Punto){
            throw new Error('Error expresion invalida con operador \'>=\'');
        }
        if(operacion.Operacion.ParametroIzquierdo.Tipo == TipoParametro.Atributo
          || operacion.Operacion.ParametroIzquierdo.Tipo == TipoParametro.Punto){
           
            if(operacion.Operacion.ParametroDerecho.Operacion == null){
              if(operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Decimal
                && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Entero
                && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Funtion_Last){
                  throw new Error('Error expresion invalida.' + operacion.Operacion.ParametroIzquierdo.Valor + '>=' + operacion.Operacion.ParametroDerecho.Valor);
              }
              derecho = Number(operacion.Operacion.ParametroDerecho.Valor);
            }else{
              derecho = this.ResolverOperacion(operacion.Operacion.ParametroDerecho)[0];
            }
            var ret = [];
            ret.push(operacion.Operacion.ParametroIzquierdo.Valor);
            ret.push(derecho);
            ret.push(">=");
            ret.push(0);
           return ret;
        }else{

          if(operacion.Operacion.ParametroIzquierdo.Operacion == null){
            if(operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Decimal
              && operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Entero
              && operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Funtion_Last){
                throw new Error('Error expresion invalida.' + operacion.Operacion.ParametroIzquierdo.Valor + '>=' + operacion.Operacion.ParametroDerecho.Valor);
            }
            izquierdo = Number(operacion.Operacion.ParametroIzquierdo.Valor);
          }else{
            izquierdo = this.ResolverOperacion(operacion.Operacion.ParametroIzquierdo)[0];
          }
          var ret = [];
          ret.push(izquierdo);
          ret.push(operacion.Operacion.ParametroDerecho.Valor);
          ret.push(">=");
          ret.push(1);
         return ret;
        }
      } break;
      case TipoOperador.Igual: {
        if(operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Atributo
          && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Punto
          && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Cadena
          &&operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Atributo
          && operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Punto
          && operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Cadena){
            throw new Error('Error expresion invalida con operador \'=\'');
        }
        if(operacion.Operacion.ParametroIzquierdo.Tipo == TipoParametro.Atributo
          ||operacion.Operacion.ParametroIzquierdo.Tipo == TipoParametro.Nodo
          || operacion.Operacion.ParametroIzquierdo.Tipo == TipoParametro.Punto){
           
            if(operacion.Operacion.ParametroDerecho.Operacion == null){
              if(operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Decimal
                && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Cadena
                && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Entero
                && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Funtion_Last){
                  throw new Error('Error expresion invalida.' + operacion.Operacion.ParametroIzquierdo.Valor + '=' + operacion.Operacion.ParametroDerecho.Valor);
              }
              if(operacion.Operacion.ParametroDerecho.Tipo == TipoParametro.Cadena){
                var ret = [];
                ret.push(operacion.Operacion.ParametroIzquierdo.Valor);
                ret.push(operacion.Operacion.ParametroDerecho.Valor);
                ret.push("=");
                ret.push( 0);
               return ret;
              }else{
                derecho = Number(operacion.Operacion.ParametroDerecho.Valor);
              }
              
            }else{
              if(operacion.Operacion.ParametroDerecho.Tipo == TipoParametro.Cadena){
                var ret = [];
                ret.push(operacion.Operacion.ParametroIzquierdo.Valor);
                ret.push(operacion.Operacion.ParametroDerecho.Valor);
                ret.push("=");
                ret.push( 0);
               return ret;
              }else{
                derecho = this.ResolverOperacion(operacion.Operacion.ParametroDerecho)[0];
              }
              
            }
            var ret = [];
            ret.push(operacion.Operacion.ParametroIzquierdo.Valor);
            ret.push(derecho);
            ret.push("=");
            ret.push( 0);
           return ret;
        }else{

          if(operacion.Operacion.ParametroIzquierdo.Operacion == null){
            if( operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Decimal
              && operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Cadena
              && operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Entero
              && operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Funtion_Last){
                throw new Error('Error expresion invalida.' + operacion.Operacion.ParametroIzquierdo.Valor + '=' + operacion.Operacion.ParametroDerecho.Valor);
            }
            if(operacion.Operacion.ParametroIzquierdo.Tipo == TipoParametro.Cadena){
              var ret = [];
              ret.push(operacion.Operacion.ParametroIzquierdo.Valor);
              ret.push(operacion.Operacion.ParametroDerecho.Valor);
              ret.push("=");
              ret.push( 0);
             return ret;
            }else{
              izquierdo = Number(operacion.Operacion.ParametroIzquierdo.Valor);
            }
            
            
          }else{
            if(operacion.Operacion.ParametroIzquierdo.Tipo == TipoParametro.Cadena){
              var ret = [];
              ret.push(operacion.Operacion.ParametroIzquierdo.Valor);
              ret.push(operacion.Operacion.ParametroDerecho.Valor);
              ret.push("=");
              ret.push( 0);
             return ret;
            }else{
              izquierdo = this.ResolverOperacion(operacion.Operacion.ParametroIzquierdo)[0];
            }
          }
          var ret = [];
          ret.push(izquierdo);
          ret.push(operacion.Operacion.ParametroDerecho.Valor);
          ret.push("=");
          ret.push(1);
         return ret;
        }
      } break;
      case TipoOperador.Diferente: {
        if(operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Atributo
          && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Punto
          &&operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Atributo
          && operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Punto){
            throw new Error('Error expresion invalida con operador \'!=\'');
        }
        if(operacion.Operacion.ParametroIzquierdo.Tipo == TipoParametro.Atributo
          || operacion.Operacion.ParametroIzquierdo.Tipo == TipoParametro.Punto){
           
            if(operacion.Operacion.ParametroDerecho.Operacion == null){
              if(operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Decimal
                && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Entero
                && operacion.Operacion.ParametroDerecho.Tipo != TipoParametro.Funtion_Last){
                  throw new Error('Error expresion invalida.' + operacion.Operacion.ParametroIzquierdo.Valor + '!=' + operacion.Operacion.ParametroDerecho.Valor);
              }
              derecho = Number(operacion.Operacion.ParametroDerecho.Valor);
            }else{
              derecho = this.ResolverOperacion(operacion.Operacion.ParametroDerecho)[0];
            }
            var ret = [];
            ret.push(operacion.Operacion.ParametroIzquierdo.Valor);
            ret.push(derecho);
            ret.push("!=");
            ret.push(0);
           return ret;
        }else{

          if(operacion.Operacion.ParametroIzquierdo.Operacion == null){
            if(operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Decimal
              && operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Entero
              && operacion.Operacion.ParametroIzquierdo.Tipo != TipoParametro.Funtion_Last){
                throw new Error('Error expresion invalida.' + operacion.Operacion.ParametroIzquierdo.Valor + '!=' + operacion.Operacion.ParametroDerecho.Valor);
            }
            izquierdo = Number(operacion.Operacion.ParametroIzquierdo.Valor);
          }else{
            izquierdo = this.ResolverOperacion(operacion.Operacion.ParametroIzquierdo)[0];
          }
          var ret = [];
          ret.push(izquierdo);
          ret.push(operacion.Operacion.ParametroDerecho.Valor);
          ret.push("!=");
          ret.push(1);
         return ret;
        }
      } break;

      case TipoOperador.And: {} break;
      case TipoOperador.Or: {} break;
    }
  }
  GetAtributosDescendencia(xml:Objeto[],etiqueta:string):string{
    var ret = "" ;
      xml.forEach(element => {
        element.listaAtributos.forEach(atr => {
        if(atr.identificador == etiqueta){
          ret += atr.identificador + '='+ atr.valor + '\n';
        }
        });
        ret +=this.GetAtributosDescendencia(element.listaObjetos,etiqueta);
      });
    return ret;
  }

  BuscarValorDescendiente(xml:Objeto[]):string{
    var result = "";
    var temp = xml;
    this.listaDescendientes.forEach(item => {
      var aux:Objeto[] = [];
      temp.forEach(element => {
        if(element.identificador == item){
          aux.push(element);
        }else{
          aux = aux.concat(this.BuscarEtiqueta(element.listaObjetos,item));
        }
      });

      temp = aux;
    });

    result = this.BuscarValorEtiqueta(temp,this.listaDescendientes[this.listaDescendientes.length -1]);

   
    return result;
  }

  BuscarEtiqueta(xml:Objeto[],etiqueta:string):Objeto[]{
    var ret:Objeto[]=[];
    xml.forEach(element => {
      if(element.identificador == etiqueta){
        ret.push(element);
      }else{
        if(element.listaObjetos.length > 0)
        ret = ret.concat( this.BuscarEtiqueta(element.listaObjetos,etiqueta));
      }
    });
    return ret;
  }
  BuscarValorEtiqueta(xml:Objeto[],etiqueta:string):string{
    var result = "";
    xml.forEach(element => {
      if(element.identificador == etiqueta){
        result += this.GetXmlText(element);
      }else{
        result+= this.BuscarValorEtiqueta(element.listaObjetos,etiqueta);
      }
    });
    return result;
  }
  GetXmlText(xml:Objeto):string{
    var xmlText = "<" +xml.identificador;
    xml.listaAtributos.forEach(element => {
      xmlText +=" " + element.identificador +" = " + element.valor;
    });
    xmlText +=">";
    xmlText +=xml.texto;
    xml.listaObjetos.forEach(element => {
      xmlText += this.GetXmlText(element);
    });
    xmlText +="</" +xml.identificador+ ">";
    return xmlText + '\n';
  }

  openFile(){
    document.querySelector('input').click()
  }
  handle(e){
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    // if (!file.type.match(pattern)) {
    //   alert('invalid format');
    //   return;
    // }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsText(file);
  }
  _handleReaderLoaded(e) {
    console.log(e);
    let reader = e.target;
    this.xmlText = reader.result;
  }

  expFile() {
    var fileName = "xml.txt";
    this.saveTextAsFile(this.xmlText , fileName);
    }
    saveTextAsFile (data, filename){

          if(!data) {
                console.error('Console.save: No data')
                return;
            }

            if(!filename) filename = 'console.json'

            var blob = new Blob([data], {type: 'text/plain'}),
                e    = document.createEvent('MouseEvents'),
                a    = document.createElement('a')
      // FOR IE:

      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(blob, filename);
      }
      else{
          var e = document.createEvent('MouseEvents'),
              a = document.createElement('a');

          a.download = filename;
          a.href = window.URL.createObjectURL(blob);
          a.dataset.downloadurl = ['text/plain', a.download, a.href].join(':');
          e.initEvent('click', true, false);
          a.dispatchEvent(e);
      }
  }

}
