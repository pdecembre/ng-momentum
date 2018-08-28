import {TestBed, inject} from '@angular/core/testing';
import { <%= classify(singularize(vo)) %> } from '<%= absoluteSrcPath(voPath) %>/<%= dasherize(singularize(vo)) %>';
import {<%= classify(singularize(name)) %>Model} from './<%= dasherize(singularize(name)) %>.model';
import { <%= classify(pluralize(service)) %>Service } from '<%= absoluteSrcPath(servicePath) %>/<%= dasherize(pluralize(service)) %>.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Observable} from 'rxjs/internal/Observable';
import {of} from 'rxjs/internal/observable/of';

describe('<%= classify(singularize(name)) %>Model', () => {

  const item: <%= classify(singularize(vo)) %> = new <%= classify(singularize(vo)) %>();
  item.id = 1;
  const itemCreate: <%= classify(singularize(vo)) %> = new <%= classify(singularize(vo)) %>();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [<%= classify(singularize(name)) %>Model, <%= classify(pluralize(service)) %>Service]
    });
  });

  it('is created', inject(
      [<%= classify(singularize(name)) %>Model], 
      (model: <%= classify(singularize(name)) %>Model) => {
    expect(model).toBeTruthy();
  }));

  describe('show', () => {
    it('requests one', inject(
        [<%= classify(singularize(name)) %>Model, <%= classify(pluralize(service)) %>Service], 
        (model: <%= classify(singularize(name)) %>Model, service: <%= classify(pluralize(service)) %>Service) => {
      const spy = spyOn(service, 'show').and.returnValue(of(item));
      model.selected = item;
      model.load().subscribe((results:<%= classify(singularize(vo)) %>) => {
        expect(results).toEqual(item);
        expect(spy).toHaveBeenCalledWith(1);
        expect(model.selected).toEqual(item);
      });
    }));

    it('needs selected set', inject(
        [<%= classify(singularize(name)) %>Model, <%= classify(pluralize(service)) %>Service], 
        (model: <%= classify(singularize(name)) %>Model, service: <%= classify(pluralize(service)) %>Service) => {
      const spy = spyOn(service, 'show').and.returnValue(of(item));
      //model.selected = item;
      model.load().subscribe(() => {}, (err) => {
        expect(err).toEqual('no selected value');
        expect(spy).not.toHaveBeenCalled();
        expect(model.selected).toBeUndefined();
      });
    }));
  });

  describe('save', () => {
    it('create', inject(
        [<%= classify(singularize(name)) %>Model, <%= classify(pluralize(service)) %>Service], 
        (model: <%= classify(singularize(name)) %>Model, service: <%= classify(pluralize(service)) %>Service) => {
      const spyCreate = spyOn(service, 'create').and.returnValue(of(item));
      const spyUpdate = spyOn(service, 'update').and.returnValue(of(item));
      model.selected = itemCreate;
      model.save().subscribe((results:<%= classify(singularize(vo)) %>) => {
        expect(results).toEqual(item);
        expect(spyCreate).toHaveBeenCalledWith(itemCreate);
        expect(spyUpdate).not.toHaveBeenCalled();
        expect(model.selected).toEqual(item);
      });
    }));

    it('update', inject(
        [<%= classify(singularize(name)) %>Model, <%= classify(pluralize(service)) %>Service], 
        (model: <%= classify(singularize(name)) %>Model, service: <%= classify(pluralize(service)) %>Service) => {
      const spyCreate = spyOn(service, 'create').and.returnValue(of(item));
      const spyUpdate = spyOn(service, 'update').and.returnValue(of(item));
      model.selected = item;
      model.load().subscribe((results:<%= classify(singularize(vo)) %>) => {
        expect(results).toEqual(item);
        expect(spyCreate).not.toHaveBeenCalled();
        expect(spyUpdate).toHaveBeenCalledWith(item);
        expect(model.selected).toEqual(item);
      });
    }));

    it('needs selected set', inject(
        [<%= classify(singularize(name)) %>Model, <%= classify(pluralize(service)) %>Service], 
        (model: <%= classify(singularize(name)) %>Model, service: <%= classify(pluralize(service)) %>Service) => {
      const spyCreate = spyOn(service, 'create').and.returnValue(of(item));
      const spyUpdate = spyOn(service, 'update').and.returnValue(of(item));
      //model.selected = item;
      model.load().subscribe(() => {}, (err) => {
        expect(err).toEqual('no selected value');
        expect(spyCreate).not.toHaveBeenCalled();
        expect(spyUpdate).not.toHaveBeenCalled();
        expect(model.selected).toBeUndefined();
      });
    }));
  });

  describe('destroy', () => {
    it('destroys one', inject(
        [<%= classify(singularize(name)) %>Model, <%= classify(pluralize(service)) %>Service], 
        (model: <%= classify(singularize(name)) %>Model, service: <%= classify(pluralize(service)) %>Service) => {
      const spy = spyOn(service, 'destroy').and.returnValue(of(null));
      model.selected = item;
      model.destroy().subscribe((results:any) => {
        expect(results).toBeNull();
        expect(spy).toHaveBeenCalledWith(1);
        expect(model.selected).toBeNull();
      });
    }));

    it('needs selected set', inject(
        [<%= classify(singularize(name)) %>Model, <%= classify(pluralize(service)) %>Service], 
        (model: <%= classify(singularize(name)) %>Model, service: <%= classify(pluralize(service)) %>Service) => {
      const spy = spyOn(service, 'destroy').and.returnValue(of(item));
      //model.selected = item;
      model.destroy().subscribe(() => {}, (err) => {
        expect(err).toEqual('no selected value');
        expect(spy).not.toHaveBeenCalled();
        expect(model.selected).toBeUndefined();
      });
    }));
  });

});
