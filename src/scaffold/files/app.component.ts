import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.<%= styleext %>'],
})

/**
 * Main App Component.
 */
export class AppComponent implements OnInit {

    /**
     * Shown title of view.
     * @type {string}
     */
    title = 'app';

    /**
     * Called part of the component lifecycle. Best first
     * place to start adding your code.
     */
    ngOnInit(): void {
    }

}
