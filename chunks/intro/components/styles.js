import styled from 'styled-components'

export const LoginButton =  styled.button`
	background-color: red;
	width: ${props => props.width ? props.width : '200px'};
	line-height: 30px;
	font-size: 14px;
	height: 30px;
`;