import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

/**
 * Main app routing. Includes the initial empty redirect.
 * @type {[{path: string; redirectTo: string; pathMatch: string}]}
 */
const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {enableTracing: true})],
    exports: [RouterModule],
    providers: []
})

export class AppRoutingModule {
}
