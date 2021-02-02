import * as React from 'react';
import styled from 'styled-components';
interface OwnProps {
	formik: any;
	name?: string;
}

const ErrorMessage = (props: OwnProps) => {
	const { formik, name } = props;
	if (
		formik &&
		formik.errors &&
		name &&
		formik.touched &&
		formik.touched[name] &&
		formik.errors[name]
	) {
		return <Message>{formik.errors[name]}</Message>;
	}
	return null;
};

export default ErrorMessage;

export const Message = styled.div`
	color: ${(props) => props.theme.colors.status.failed};
	font-size: 0.6em;
	margin-left: 2px;
	marign-top: -3px;
`;
