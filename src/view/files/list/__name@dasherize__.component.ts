import { Component, OnInit } from '@angular/core';
import { <%= classify(singularize(vo)) %> } from '<%= absoluteSrcPath(voPath) %>/<%= dasherize(singularize(vo)) %>';

@Component({
    templateUrl: './<%= dasherize(name) %>.component.html',
    styleUrls: ['./<%= dasherize(name) %>.component.<%= styleext %>']
})
/**
 * List view.
 */
export class <%= classify(name) %>Component implements OnInit {

    /**
     * View bound variable.
     */
    list: <%= classify(singularize(vo)) %>[];

    /**
     * Component constructor and DI injection point.
     */
    constructor() { }

    /**
     * Called part of the component lifecycle. Best first
     * place to start adding your code.
     */
    ngOnInit() {
        this.list = [];
        for (let i = 0, n = 10; i < n; i++) {
            this.list.push(new <%= classify(singularize(vo)) %>());
        }
    }

}
