import {TestBed, inject} from '@angular/core/testing';
import {<%= classify(name) %>Model} from './<%= dasherize(name) %>.model';

describe('<%= classify(name) %>Model', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [<%= classify(name) %>Model]
    });
  });

  it('is created', inject([<%= classify(name) %>Model], (model: <%= classify(name) %>Model) => {
    expect(model).toBeTruthy();
  }));

});
