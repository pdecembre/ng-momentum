import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.<%= styleext %>']
})
/**
 * Default home view. Fine to remove.
 */
export class HomeComponent implements OnInit {

    /**
     * Component constructor and DI injection point.
     */
    constructor() {
    }

    /**
     * Called part of the component lifecycle. Best first
     * place to start adding your code.
     */
    ngOnInit() {
    }

}
