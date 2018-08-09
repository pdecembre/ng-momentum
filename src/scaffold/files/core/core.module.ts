import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {HomeModule} from '../views/home/home.module';
import {PageNotFoundModule} from '../views/page-not-found/page-not-found.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HomeModule,
        // add your modules here
        PageNotFoundModule,
    ],
    declarations: [],
    exports: [],
    providers: [
        // put your services here, ensures they are actually singletons
    ]
})

/**
 * Main/singular application module for the application. Good
 * place to add in services and application specific views/models/etc.
 *
 * @see https://angular.io/guide/ngmodule#the-core-module.
 */
export class CoreModule {

    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error('CoreModule is already loaded. Import it in the AppModule only');
        }
    }

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: [
                // add in service config providers
                // {provide: MyServiceConfig, useValue: config}
            ]
        };
    }

}
