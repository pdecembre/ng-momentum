import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import { <%= classify(singularize(vo)) %> } from '<%= absoluteSrcPath(voPath) %>/<%= dasherize(singularize(vo)) %>';
import {<%= classify(pluralize(service)) %>Service} from '<%= absoluteSrcPath(servicePath) %>/<%= dasherize(pluralize(service)) %>.service';

@Component({
  templateUrl: './<%= dasherize(singularize(name)) %>.details.component.html',
  styleUrls: ['./<%= dasherize(singularize(name)) %>.details.component.<%= styleext %>']
})
/**
 * Show details view.
 */
export class <%= classify(singularize(name)) %>Component implements OnInit {

  /**
   * View bound variable.
   */
  selected<%= classify(singularize(vo)) %>: <%= classify(singularize(vo)) %>;

  /**
   * Component constructor and DI injection point.
   * @param {ActivatedRoute} route
   * @param {Router} router
   * @param {<%= classify(pluralize(service)) %>Service} service
   */
  constructor(private route: ActivatedRoute,
    private router: Router,
    private service: <%= classify(pluralize(service)) %>Service) { }

  /**
   * Called part of the component lifecycle. Best first
   * place to start adding your code.
   */
  ngOnInit() {
    this.selected<%= classify(singularize(vo)) %> = this.route.snapshot.data['<%= camelize(singularize(vo)) %>'];
  }

  /**
   * Responds to the destroy request.
   */
  onDestroy() {
    const router = this.router;
    this.service.destroy(this.selected<%= classify(singularize(vo)) %>.id).subscribe(
      function (result) {
        router.navigate(['/<%= dasherize(name) %>']);
      }
    );
  }

}
