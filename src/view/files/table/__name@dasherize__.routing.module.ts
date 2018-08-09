import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {<%= classify(name) %>Component} from './<%= dasherize(name) %>.component';
import {<%= classify(name) %>Guard} from './<%= dasherize(name) %>.guard';

/**
 * Adjust module routing here.
 */
const routes: Routes = [
    {
        path: '<%= basePath %>',
        component: <%= classify(name) %>Component,
        canActivate: [<%= classify(name) %>Guard]
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
