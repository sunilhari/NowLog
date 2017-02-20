import { Component } from '@angular/core';
import { Http } from '@angular/http';



@Component({
  selector: 'new-log',
  templateUrl: 'new-log.html'
})
export class NewLog {
  log: {};
  description: String;
  constructor(public http: Http) {
    this.http = http;
  }
  insertLog(log) {
    this.log = {
      user: "Sunil Hari",
      description: this.description,
      date: new Date().getTime()
    }
    console.log("Inserting -->"+JSON.stringify(this.log));
    this.http.post('http://localhost:8080/api/logs', this.log, {}).subscribe(res => {
      this.description = "";
    });
  }
}
