import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {<%= classify(pluralize(name)) %>ListComponent} from './<%= dasherize(pluralize(name)) %>.list.component';
import {<%= classify(pluralize(name)) %>ListGuard} from './<%= dasherize(pluralize(name)) %>.list.guard';
import {<%= classify(singularize(name)) %>Component} from './<%= dasherize(singularize(name)) %>.details.component';
import {<%= classify(singularize(name)) %>Guard} from './<%= dasherize(singularize(name)) %>.details.guard';
import {New<%= classify(singularize(name)) %>Component} from './<%= dasherize(singularize(name)) %>.new.component';
import {New<%= classify(singularize(name)) %>Guard} from './<%= dasherize(singularize(name)) %>.new.guard';
import {Edit<%= classify(singularize(name)) %>Component} from './<%= dasherize(singularize(name)) %>.edit.component';
import {Edit<%= classify(singularize(name)) %>Guard} from './<%= dasherize(singularize(name)) %>.edit.guard';

/**
 * Adjust module routing here.
 */
const routes: Routes = [
  {
    path: '<%= basePath %>',
    component: <%= classify(pluralize(name)) %>ListComponent,
    canActivate: [<%= classify(pluralize(name)) %>ListGuard],
    resolve: {
      <%= camelize(pluralize(vo)) %>: <%= classify(pluralize(name)) %>ListGuard
    }
  }, {
    path: '<%= basePath %>new',
    component: New<%= classify(singularize(name)) %>Component,
    canActivate: [New<%= classify(singularize(name)) %>Guard]
  }, {
    path: '<%= basePath %>:id/edit',
    component: Edit<%= classify(singularize(name)) %>Component,
    canActivate: [Edit<%= classify(singularize(name)) %>Guard],
    resolve: {
      <%= camelize(singularize(vo)) %>: Edit<%= classify(singularize(name)) %>Guard
    }
  }, {
    path: '<%= basePath %>:id',
    component: <%= classify(singularize(name)) %>Component,
    canActivate: [<%= classify(singularize(name)) %>Guard],
    resolve: {
      <%= camelize(singularize(vo)) %>: <%= classify(singularize(name)) %>Guard
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class <%= classify(name) %>RoutingModule {
}
