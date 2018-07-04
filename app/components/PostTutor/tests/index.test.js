import PostTutor from '../index'

describe('PostTutor', () => {
    it('should have a key property', () => {
        const renderedComponent = shallow(<PostTutor />);
        expect(renderedComponent.prop('key')).toBeDefined();
    });

    it('should have a click post function', () => {
        const renderedComponent = shallow(<PostTutor />);
        expect(renderedComponent.prop('onClick')).toBeDefined();
    });
})