import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Observable} from 'rxjs/internal/Observable';
import {of} from 'rxjs/internal/observable/of';

import { New<%= classify(singularize(name)) %>Component } from './<%= dasherize(singularize(name)) %>.new.component';
import { <%= classify(singularize(vo)) %> } from '<%= absoluteSrcPath(voPath) %>/<%= dasherize(singularize(vo)) %>';
import {<%= classify(pluralize(service)) %>Service} from '<%= absoluteSrcPath(servicePath) %>/<%= dasherize(pluralize(service)) %>.service';

<% if(ui.toString() === 'material'){ %>
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule
} from '@angular/material';
<% } %>

describe('New<%= classify(singularize(name)) %>Component', () => {
  let component: New<%= classify(singularize(name)) %>Component;
  let fixture: ComponentFixture<New<%= classify(singularize(name)) %>Component>;
  let service;
  let spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        <%= classify(pluralize(service)) %>Service,
      ],
      declarations: [ New<%= classify(singularize(name)) %>Component ],
      imports: [
          <% if(ui.toString() === 'material'){ %>BrowserAnimationsModule,
          ReactiveFormsModule,
          MatButtonModule,
          MatCardModule,
          MatFormFieldModule,
          MatInputModule,<% } %>
          FormsModule,
          RouterTestingModule,
          HttpClientTestingModule
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(New<%= classify(singularize(name)) %>Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // add spies!
    service = fixture.debugElement.injector.get(<%= classify(pluralize(service)) %>Service);
    spy = spyOn(service, 'create')
      .and.returnValue(of(true));
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('onSubmit', () => {

      it('should redirect to list view on success', () => {
        spy = service.create.and.returnValue(of(true));
        component.onSubmit();
        expect(spy.calls.any()).toBe(true, 'create called');
        fixture.whenStable().then(() => {
          fixture.detectChanges();
          const de = fixture.debugElement.query(By.css('title'));
          const el = de.nativeElement;
          expect(el.textContent()).toBe('<%= classify(pluralize(name)) %> List');
        });
      });

      it('should do nothing on failure', () => {
        spy = service.create.and.returnValue(of(true));
        component.onSubmit();
        expect(spy.calls.any()).toBe(true, 'create called');
        fixture.whenStable().then(() => {
          fixture.detectChanges();
          const de = fixture.debugElement.query(By.css('title'));
          const el = de.nativeElement;
          expect(el.textContent()).toBe('<%= classify(singularize(name)) %> Details');
        });
      });

    });

});
