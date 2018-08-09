import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: './<%= dasherize(name) %>.component.html',
    styleUrls: ['./<%= dasherize(name) %>.component.<%= styleext %>']
})
/**
 * Blank view.
 */
export class <%= classify(name) %>Component implements OnInit {

    /**
     * Component constructor and DI injection point.
     */
    constructor() { }

    /**
     * Called part of the component lifecycle. Best first
     * place to start adding your code.
     */
    ngOnInit() {
    }

}
