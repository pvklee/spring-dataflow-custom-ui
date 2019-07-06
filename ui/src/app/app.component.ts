import { Component } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { RoutingStateService } from './shared/services/routing-state.service';

//---------- portal
import { Subscription } from 'rxjs'; 
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
//------------


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {

  //------------ portal
  subscription: Subscription;
  //---------------

  constructor(private renderer: Renderer2,
              private routingStateService: RoutingStateService,
              //--------------- portal
              private router: Router
              //--------------------
              ) {
  }

  ngOnInit() {
    this.routingStateService.watchRouting();
    //------------- portal
    this.subscription = this.router.events
            .pipe(
                filter(event => event instanceof NavigationEnd)
            )
            .subscribe(() => window.scrollTo(0, 0));
    //---------------
  }

  //------------- portal
  ngOnDestroy() {
    if (this.subscription) {
        this.subscription.unsubscribe();
    }
  }
  //---------------
  
}
