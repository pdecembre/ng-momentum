import { <%= classify(singularize(name)) %> } from './<%= dasherize(singularize(name)) %>';

describe('<%= classify(singularize(name)) %>', () => {
    it('should create an instance', () => {
        expect(new <%= classify(singularize(name)) %>()).toBeTruthy();
    });
});
