import React from 'react';
import { shallow } from 'enzyme';

import { StudentPosts } from '../index';

describe('<StudentPosts />', () => {

  it('should render the Page title and have the createPostTable method', () => {
    const renderedComponent = shallow(<StudentPosts />);
    expect(renderedComponent.contains(
      <BodyWrapper>
				<CenteredSection>
					<br />
					<H1> Your Posts </H1>
					<Img src={Cap} alt="Graduation Cap" />
					<h3> Here are your current active posts. Delete a post to stop receiving incoming tutoring requests </h3>
					<hr /> <br />
					{this.createPostsTable()}

					<Button onClick={() => this.props.history.goBack()}> Back </Button>
				</CenteredSection>
			</BodyWrapper>
    )).toEqual(false);
  });

  it('should render the sidebar', () => {
    const renderedComponent = shallow(<StudentPosts />);
    expect(renderedComponent.contains(
      <CheckboxTableStyle>

				<Button onClick={() => this.props.history.push("/studentFeed")}> Back to Feed </Button>
				<Button onClick={() => {window.scrollTo({ top: 0, behavior: "smooth" })} }> Back To Top </Button>

			</CheckboxTableStyle>
    )).toEqual(false);
  });
});
