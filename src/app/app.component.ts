import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

declare var require: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'proyecto1';
  Tabs = [];
  textValues = [];
  consoleValue = "";
  contadorTabs = 1;
  activeTab = 1;
  parser;
  
  private httpClient: HttpClient;
  constructor(http: HttpClient) {
    this.httpClient = http;
    this.Tabs.push(this.contadorTabs);

    this.parser = require("./Gramatica/gramatica");
  
  }
  exec (input) {
    return this.parser.parse(input);
}
  CrearTab() {
    this.contadorTabs++;
    this.Tabs.push(this.contadorTabs);
    this.textValues.push();
  }

  tabChanged(id) {
    this.activeTab = id+1;
    console.log(id);
  }

  Compilar() {
    //this.consoleValue += this.parser.parse(this.textValues[this.activeTab]) + "\r\n";
    console.log(this.parser.parse(this.textValues[this.activeTab]));
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
    this.textValues[this.activeTab] = reader.result;
  }

  expFile() {
    var fileName = "Tab" + this.activeTab+".txt";
    this.saveTextAsFile(this.textValues[this.activeTab] , fileName);
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
