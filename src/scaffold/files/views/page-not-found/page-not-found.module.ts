import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

<% if(ui.toString() === 'bootstrap'){ %>
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
<% } %>

import {PageNotFoundComponent} from './page-not-found.component';

/**
 * Add module routing here.
 * @type {[{path: string; component: PageNotFoundComponent}]}
 */
const routes: Routes = [
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

@NgModule({
    imports: [
        <% if(ui.toString() === 'bootstrap'){ %>NgbModule,
        <% } %>RouterModule.forChild(routes)
    ],
    declarations: [PageNotFoundComponent],
    exports: [RouterModule],
})
export class PageNotFoundModule {
}
