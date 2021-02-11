import React from 'react';
import styled from 'styled-components';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Switch } from 'antd';

interface IOwnProps {
	name: string;
	formik: any;
}

export const FormikSwitch = ({ name, formik }: IOwnProps) => {
	const handleChange = (checked: boolean, _event: MouseEvent) => {
		formik.setFieldValue(name, checked);
	};
	console.log(formik.values);
	return (
		<Content>
			<SSwitch
				checkedChildren={<CheckOutlined />}
				unCheckedChildren={<CloseOutlined />}
				onChange={handleChange}
				checked={formik.values && formik.values[name] ? true : false}
			/>
		</Content>
	);
};

export const Content = styled.div`
	margin: 0 0 4px 0;
`;

export const SSwitch = styled(Switch)`
	.anticon svg {
		background-color: transparent !important;
	}
`;
