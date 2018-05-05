import React, { PureComponent } from 'react'
import { Button, ButtonIcon } from 'rmwc/Button';

import { LoginButton } from './styles'

export default class MyButton extends PureComponent {
	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		const { id, text, width } = this.props
		return (
			<LoginButton
				id={id}
				width={width}>
					{text}
			</LoginButton>
		)
	}
}