import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FormsModule} from '@angular/forms';

import {<%= classify(name) %>Component } from './<%= dasherize(name) %>.component';

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

describe('<%= classify(name) %>Component', () => {
    let component: <%= classify(name) %>Component;
    let fixture: ComponentFixture<<%= classify(name) %>Component>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ <%= classify(name) %>Component ],
            imports: [
                <% if(ui.toString() === 'material'){ %>BrowserAnimationsModule,
                ReactiveFormsModule,
                MatInputModule,
                MatFormFieldModule,
                MatButtonModule,
                MatCardModule,<% } %>
                FormsModule
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(<%= classify(name) %>Component);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
