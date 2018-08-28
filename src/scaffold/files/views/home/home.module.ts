import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home.component';
import {HomeGuard} from './home.guard';

<% if(ui.toString() === 'bootstrap'){ %>
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
<% } %>

/**
 * Add module routing here.
 * @type {[{path: string; component: HomeComponent; canActivate: [HomeGuard]}]}
 */
const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [HomeGuard]
    }
];

@NgModule({
    declarations: [
        HomeComponent,
    ],
    imports: [
        <% if(ui.toString() === 'bootstrap'){ %>NgbModule,
        <% } %>RouterModule.forChild(routes)
    ],
    exports: [RouterModule],
    providers: [HomeGuard]
})

export class HomeModule {
}
