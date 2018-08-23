import { Component, OnInit } from '@angular/core';
import { <%= classify(singularize(vo)) %> } from '<%= absoluteSrcPath(voPath) %>/<%= dasherize(singularize(vo)) %>';

@Component({
    templateUrl: './<%= dasherize(name) %>.component.html',
    styleUrls: ['./<%= dasherize(name) %>.component.<%= styleext %>']
})
/**
 * Details view.
 */
export class <%= classify(name) %>Component implements OnInit {

    /**
     * View bound variable.
     */
    selected<%= classify(singularize(vo)) %>: <%= classify(singularize(vo)) %>;

    /**
     * Component constructor and DI injection point.
     */
    constructor() { }

    /**
     * Called part of the component lifecycle. Best first
     * place to start adding your code.
     */
    ngOnInit() {
        this.selected<%= classify(singularize(vo)) %> = new <%= classify(singularize(vo)) %>();
    }

}
