import PostStudent from '../index'

describe('PostStudent', () => {
    it('should have a key property', () => {
        const renderedComponent = shallow(<PostStudent />);
        expect(renderedComponent.prop('key')).toBeDefined();
    });

    it('should have a click post function', () => {
        const renderedComponent = shallow(<PostStudent />);
        expect(renderedComponent.prop('onClick')).toBeDefined();
    });
})