import React, { Component } from 'react';
import Helmet from 'react-helmet'

export default class Header extends Component {
	render () {
		const { props } = this;

		return (
			<div>
				<Helmet
					htmlAttributes={{lang: "en", amp: undefined}} // amp takes no value
          title="Life of bagels"
          titleTemplate={props.title}
          defaultTitle="My Default Title"
					meta={[
                {property: 'og:title', content: 'About'},
            ]}
					/>
				<h1 {...props}>
					{props.title}
				</h1>
			</div>
		);
	}
}
