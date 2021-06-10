import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {sentenciaXpath} from '../app/Estructuras/sentenciaXpath'
import {Objeto} from '../Expresiones/Objeto'
import {TipoParametro, TipoOperador, TipoNodo} from './Estructuras/tipificacion';
declare var require: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'proyecto1';
  txtXpath = "/biblioteca/libro/autor/@fechaNacimiento";
  consoleValue = "";
  parser;
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
    console.log(xmlObject);
    console.log(xPathObject);
    //Agregamos para cada sentencia su sentencia hija para simular lista doblemente enlazada (padre,hijo)
    var elementoActual:sentenciaXpath; 
    xPathObject.forEach(element => {
      elementoActual = element;
      element.Hijo = null;
      while(elementoActual.Padre !=null){
        elementoActual.Padre.Hijo = elementoActual;
        elementoActual = elementoActual.Padre;
      }
    });
    //elementoActual en este momento es la raiz de la entrada Xpath
    this.consoleValue = this.ProcesarNodoRaiz(elementoActual,xmlObject,null);
    console.log(elementoActual);
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
        };
        case TipoNodo.ID :
        { 
          if(raiz.Hijo == null){
            if(raiz.Padre.Tipo.Tipo == TipoNodo.Descendiente){
              return this.BuscarValorEtiqueta(xml,raiz.Tipo.Valor);
            }
            else{
              xml.forEach(element => {
                if(element.identificador == raiz.Tipo.Valor){
                  result +=this.GetXmlText(element);
                }
              });
           }
          }else{
            if(raiz.Padre.Tipo.Tipo == TipoNodo.Descendiente){
              var xmlTemp = this.BuscarValorEtiqueta(xml,raiz.Tipo.Valor);
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
        };
        case TipoNodo.Atributo:{
          if(padre !=null)
            padre.forEach(element => {
              element.listaAtributos.forEach(atr => {
              if(atr.identificador == raiz.Tipo.Valor){
                result += atr.identificador + '='+ atr.valor + '\n';
              }
              });
            });
        };
        case TipoNodo.Descendiente:{
          if(raiz.Hijo == null){
            throw new Error("Error por manejar luego del nodo // debe de venir un el nombre de un elemento");
          }else{
            return this.ProcesarNodoRaiz(raiz.Hijo,xml,padre);
          }
        };
    }


    return result;
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
