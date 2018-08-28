import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {By} from '@angular/platform-browser';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Observable} from 'rxjs/internal/Observable';
import {of} from 'rxjs/internal/observable/of';

import { <%= classify(singularize(name)) %>Component } from './<%= dasherize(singularize(name)) %>.details.component';
import { <%= classify(singularize(vo)) %> } from '<%= absoluteSrcPath(voPath) %>/<%= dasherize(singularize(vo)) %>';
import {<%= classify(pluralize(service)) %>Service} from '<%= absoluteSrcPath(servicePath) %>/<%= dasherize(pluralize(service)) %>.service';

<% if(ui.toString() === 'material'){ %>
import {
    MatButtonModule,
    MatCardModule,
    MatListModule
} from '@angular/material';
<% } %>

describe('<%= classify(singularize(name)) %>Component', () => {
  let component: <%= classify(singularize(name)) %>Component;
  let fixture: ComponentFixture<<%= classify(singularize(name)) %>Component>;
  let service;
  let spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ActivatedRoute, useValue: {
          snapshot: {
            data: {
            <%= camelize(singularize(vo)) %>: new <%= classify(singularize(vo)) %>()
            }
          }
        }
        },
        <%= classify(pluralize(service)) %>Service,
      ],
      declarations: [ <%= classify(singularize(name)) %>Component ],
      imports: [
          <% if(ui.toString() === 'material'){ %>MatButtonModule,
          MatCardModule,
          MatListModule,<% } %>
          RouterTestingModule,
          HttpClientTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(<%= classify(singularize(name)) %>Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // add spies!
    service = fixture.debugElement.injector.get(<%= classify(pluralize(service)) %>Service);
    spy = spyOn(service, 'destroy')
      .and.returnValue(of(true));
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
    expect(component.selected<%= classify(singularize(vo)) %>).not.toBeUndefined();
  });

  describe('onDestroy', () => {

      it('should redirect to list view on success', () => {
        spy = service.destroy.and.returnValue(of(true));
        component.onDestroy();
        expect(spy.calls.any()).toBe(true, 'destroy called');
        fixture.whenStable().then(() => {
          fixture.detectChanges();
          const de = fixture.debugElement.query(By.css('title'));
          const el = de.nativeElement;
          expect(el.textContent()).toBe('<%= classify(name) %> List');
        });
      });

      it('should do nothing on failure', () => {
        spy = service.destroy.and.returnValue(of(true));
        component.onDestroy();
        expect(spy.calls.any()).toBe(true, 'destroy called');
        fixture.whenStable().then(() => {
          fixture.detectChanges();
          const de = fixture.debugElement.query(By.css('title'));
          const el = de.nativeElement;
          expect(el.textContent()).toBe('<%= classify(name) %> Details');
        });
      });

    });

});
