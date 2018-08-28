import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';

import { <%= classify(pluralize(name)) %>ListComponent } from './<%= dasherize(pluralize(name)) %>.list.component';
import { <%= classify(singularize(vo)) %> } from '<%= absoluteSrcPath(voPath) %>/<%= dasherize(singularize(vo)) %>';

<% if(ui.toString() === 'material'){ %>
import {
    MatButtonModule,
    MatTableModule,
    MatCardModule,
} from '@angular/material';
<% } %>

describe('<%= classify(pluralize(name)) %>ListComponent', () => {
    let component: <%= classify(pluralize(name)) %>ListComponent;
    let fixture: ComponentFixture<<%= classify(pluralize(name)) %>ListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: ActivatedRoute, useValue: {
                        snapshot: {
                            data: {
                            <%= camelize(pluralize(vo)) %>: [
                                new <%= classify(singularize(vo)) %>(),
                                new <%= classify(singularize(vo)) %>(),
                                new <%= classify(singularize(vo)) %>()
                            ]
                            }
                        }
                    }
                },
            ],
            imports: [
                <% if(ui.toString() === 'material'){ %>MatButtonModule,
                MatTableModule,
                MatCardModule,
                <% } %>RouterTestingModule
            ],
            declarations: [ <%= classify(pluralize(name)) %>ListComponent ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(<%= classify(pluralize(name)) %>ListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
        expect(component.list.length).toBe(3);
    });
});
