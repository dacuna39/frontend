import React from 'react';
import { shallow } from 'enzyme';

import { StudentFeed } from '../index';

describe('<StudentFeed />', () => {

  it('should render the new post modal', () => {
    const renderedComponent = shallow(<StudentFeed />);
    expect(renderedComponent.contains(
					<Modal show={this.state.isOpen} onClose={this.toggleModal}>
						<H1> New Post </H1>
						<NewPostForm />
					</Modal>
    )).toBe(true);
  });

  it('should render the my post button/link', () => {
    const renderedComponent = shallow(<StudentFeed />);
    expect(renderedComponent.contains(
        <Button onClick={() => this.props.history.push("/studentPosts") }> My Posts </Button>
    )).toBe(true);
  });

  it('should have the render posts method in its return function', () => {
    const renderedComponent = shallow(<StudentFeed />)
    expect(renderedComponent.contains(
      <FeedContainer>
				{/* Load student posts */}
				{this.printPosts()}
			</FeedContainer>
    )).toBe(true);
  });


});
