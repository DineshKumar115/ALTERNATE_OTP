import { Component,OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';
import { Router,ActivatedRoute, NavigationEnd} from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  // title = 'authVerify';

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private titleService: Title) { }
  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    ).subscribe(() => {
     
    });
  }
}


