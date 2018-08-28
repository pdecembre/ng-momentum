import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
<% if(ui.toString() === 'bootstrap'){ %>
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
<% } %>
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app.routing.module';
import {CoreModule} from './core/core.module';
<% if(includePwa === true) { %>
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
<% } %>
import {HttpClientModule} from '@angular/common/http';

<% if(ui.toString() === 'material'){ %>import {MatButtonModule, MatToolbarModule} from '@angular/material';
<% } %>

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule.forRoot()<% if(ui.toString() === 'bootstrap'){ %>,
	NgbModule.forRoot(), // <-- this should always go after your ui modules<% } %><% if(ui.toString() === 'material'){ %>,
    MatToolbarModule,
    MatButtonModule<% } %>
  ],
  providers: [],
  bootstrap: [AppComponent],
})

/**
 * Main app module. Import your submodules here.
 */
export class AppModule {
}
