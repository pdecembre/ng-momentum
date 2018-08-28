import { Component, OnInit, Input } from '@angular/core';
import {Router} from '@angular/router';
<% if(ui.toString() === 'material'){ %>
import {Validators, FormGroup, FormBuilder} from '@angular/forms';
<% } %>

import { <%= classify(singularize(vo)) %> } from '<%= absoluteSrcPath(voPath) %>/<%= dasherize(singularize(vo)) %>';
import {<%= classify(pluralize(service)) %>Service} from '<%= absoluteSrcPath(servicePath) %>/<%= dasherize(pluralize(service)) %>.service';

@Component({
  templateUrl: './<%= dasherize(singularize(name)) %>.new.component.html',
  styleUrls: ['./<%= dasherize(singularize(name)) %>.new.component.<%= styleext %>']
})
/**
 * Create form view.
 */
export class New<%= classify(singularize(name)) %>Component implements OnInit {

  /**
   * Input binding for object.
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
   * @param {Router} router
   <% if(ui.toString() === 'material'){ %>* @param {FormBuilder} formBuilder<% } %>
   * @param {<%= classify(pluralize(service)) %>Service} service
   */
  constructor(private router: Router,
              <% if(ui.toString() === 'material'){ %>private formBuilder: FormBuilder,<% } %>
              private service: <%= classify(pluralize(service)) %>Service) { }

  /**
   * Called part of the component lifecycle. Best first
   * place to start adding your code.
   */
  ngOnInit() {
    this.selected<%= classify(singularize(vo)) %> = new <%= classify(singularize(vo)) %>();
<% if(ui.toString() === 'material'){ %>
    this.<%= camelize(name) %>Form = this.formBuilder.group({
    <% parameters.forEach(function(parameter){ %>   <%= parameter %>: [this.selected<%= classify(singularize(vo)) %>.<%= parameter %>, Validators.required],
    <% }) %>});<% } %>
  }

  /**
   * Responds to submitting the form.
   */
  onSubmit() {
    const router = this.router;
    this.service.create(this.selected<%= classify(singularize(vo)) %>).subscribe(
      function (result) {
        router.navigate(['/<%= dasherize(name) %>']);
      }
    );
  }

}
