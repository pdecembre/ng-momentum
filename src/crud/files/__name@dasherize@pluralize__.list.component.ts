import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import { <%= classify(singularize(vo)) %> } from '<%= absoluteSrcPath(voPath) %>/<%= dasherize(singularize(vo)) %>';

@Component({
  templateUrl: './<%= dasherize(pluralize(name)) %>.list.component.html',
  styleUrls: ['./<%= dasherize(pluralize(name)) %>.list.component.<%= styleext %>']
})
/**
 * List view.
 */
export class <%= classify(pluralize(name)) %>ListComponent implements OnInit {

  /**
   * View bound variable.
   */
  list: <%= classify(singularize(vo)) %>[];
<% if(ui.toString() === 'material'){ %>
  /**
   * Columns to display in the UI.
   */
  columnsToDisplay: string[] = [<% parameters.forEach(function(parameter){ %>'<%= parameter %>', <% }) %> 'action'];
<% } %>
  /**
   * Component constructor and DI injection point.
   * @param {ActivatedRoute} route
   */
  constructor(private route: ActivatedRoute) { }

  /**
   * Called part of the component lifecycle. Best first
   * place to start adding your code.
   */
  ngOnInit() {
    this.list = this.route.snapshot.data['<%= camelize(pluralize(vo)) %>'];
  }

}
