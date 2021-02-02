import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Switch } from 'antd';

interface IOwnProps {
	name: string;
	formik: any;
}

export const FormikSwitch = ({ name, formik }: IOwnProps) => {
	const [checked, setChecked] = useState(false);
	useEffect(() => {
		if (formik.values && formik.values[name]) {
			setChecked(formik.values[name]);
		}
	}, [formik.values]);

	const handleChange = (checked: boolean, _event: MouseEvent) => {
		setChecked(checked);
		formik.setFieldValue(name, checked);
	};
	return (
		<Content>
			<SSwitch
				checkedChildren={<CheckOutlined />}
				unCheckedChildren={<CloseOutlined />}
				onChange={handleChange}
				checked={checked}
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
