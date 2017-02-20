import { Component} from '@angular/core'
import { Http } from '@angular/http';
@Component({
  selector: 'back-log',
  templateUrl: 'back-log.html'
})
export class BackLog {  
  logs: Array<{}>;
  constructor(public http: Http) {
    // If we navigated to this page, we will have an item available as a nav param
    this.http = http;
    this.fetchBackLogs();
  };
  //Click for loading the New Log Viewh
  fetchBackLogs() {
    console.log('Fetching Back Logs');
    this.http.get('http://10.21.253.155:8080/api/logs')
      .subscribe(res => {
        this.logs = res.json();
      });
  }
  showNewLog() {
    console.log("Showing NewLog ...");
  }
}
