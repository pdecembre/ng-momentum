import { Component, Input, OnInit } from '@angular/core';
import { <%= classify(singularize(vo)) %> } from '<%= absoluteSrcPath(voPath) %>/<%= dasherize(singularize(vo)) %>';
<% if(ui.toString() === 'material'){ %>
import {Validators, FormGroup, FormBuilder} from '@angular/forms';
<% } %>

@Component({
    templateUrl: './<%= dasherize(name) %>.component.html',
    styleUrls: ['./<%= dasherize(name) %>.component.<%= styleext %>']
})
/**
 * Form view.
 */
export class <%= classify(name) %>Component implements OnInit {

    /**
     * Input bound variable.
     */
    @Input() selected<%= classify(singularize(vo)) %>: <%= classify(singularize(vo)) %>;
<% if(ui.toString() === 'material'){ %>
    /**
     * Form Group.
     */
    <%= camelize(name) %>Form: FormGroup;
<% parameters.forEach(function(parameter){ %>
    /**
     * <%= parameter %> form field.
     */
    get <%= parameter %>() {
        return this.<%= camelize(name) %>Form.get('<%= parameter %>');
    }
<% }) %><% } %>
    /**
     * Component constructor and DI injection point.
     <% if(ui.toString() === 'material'){ %>* @param {FormBuilder} formBuilder<% } %>
     */
    constructor(<% if(ui.toString() === 'material'){ %>private formBuilder: FormBuilder<% } %>) { }

    /**
     * Called part of the component lifecycle. Best first
     * place to start adding your code.
     */
    ngOnInit() {
        this.selected<%= classify(singularize(vo)) %> = new <%= classify(singularize(vo)) %>();
<% if(ui.toString() === 'material'){ %>
        this.<%= camelize(name) %>Form = this.formBuilder.group({<% parameters.forEach(function(parameter){ %>
            <%= parameter %>: [this.selected<%= classify(singularize(vo)) %>.<%= parameter %>, Validators.required],<% }) %>
        });
<% } %>
    }

    /**
     * Responds to the form submit request.
     */
    onSubmit() {
        console.warn('implement');
    }

}
