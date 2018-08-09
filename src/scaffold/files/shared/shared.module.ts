import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [],
    exports: [
        CommonModule,
        FormsModule,
    ]
})

/**
 * Shares common components, directives, and pipes that
 * may not be as application specific.
 *
 * @see https://angular.io/guide/ngmodule#shared-modules
 */
export class SharedModule {
}
