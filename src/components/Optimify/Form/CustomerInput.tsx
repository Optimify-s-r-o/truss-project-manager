import onClickOutside from 'react-onclickoutside';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import {
	Button,
	Divider,
	Input,
	Select,
	Spin
	} from 'antd';
import { CustomersAll } from 'src/containers/Portal/Lists/Customers/_types';
import { Evidence } from '../../../types/_types';
import { lang } from '../../../translation/i18n';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { translationPath } from '../../../utils/getPath';
import { useTranslation } from 'react-i18next';
const { Option } = Select;

interface ICustomerInput {
	formik: any;
	customers: CustomersAll[];
	name: string;
	addCustomer: (data: string) => void;
	loading: boolean;
	createdEvidence?: Evidence;
}
export const CustomerInput = ({
	createdEvidence,
	formik,
	customers,
	name,
	addCustomer,
	loading,
}: ICustomerInput) => {
	const { t } = useTranslation();
	const [newCustomer, setNewCustomer] = useState("");
	const [customersState, setCustomersState] = useState([]);
	const [open, setOpen] = useState(false);
	const [currentCustomer, setCurrentCustomer] = useState(null);
	const el = useRef(null);
	const ref = useRef(null);

	useEffect(() => {
		if (formik.values && formik.values[name]) {
			setCurrentCustomer(formik.values[name]);
		} else {
			setCurrentCustomer(null);
		}
	}, [formik.values]);

	useEffect(() => {}, [customers]);

	useEffect(() => {
		if (createdEvidence) {
			setTimeout(function () {
				handleSelectChange(createdEvidence?.Id);
			}, 1500);
		}
	}, [createdEvidence]);

	useEffect(() => {
		setCustomersState(customers);
	}, [customers]);

	React.useEffect(() => {
		const handleClickOutside = (event) => {
			if (el && el.current && !el.current.contains(event.target)) {
				if (
					event.target.className !== "ant-input" &&
					event.target.className !== "" &&
					event.target.className !== "ant-select-selection-item" &&
					event.target.className !== "ant-select-item-option-content" &&
					event.target.className !== "ant-btn ant-btn-link"
				) {
					setOpen(false);
				}
			}
		};
		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [open]);

	const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setNewCustomer(event.target.value);
	};

	const addItem = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
		if (newCustomer.length > 0) {
			addCustomer(newCustomer);
			setOpen(false);
		}
	};

	const handleSelectChange = (data: string) => {
		if (data) {
			setCurrentCustomer(data);
			formik.setFieldValue(name, data);
			setNewCustomer("");
		}
	};

	const antIcon = (
		<LoadingOutlined style={{ fontSize: 15, marginRight: 5 }} spin />
	);

	const handleClose = (e) => {
		if (
			e.target.className !== "ant-input" &&
			e.target.className !== "" &&
			e.target.className !== "ant-btn ant-btn-link"
		) {
			// ref.current.blur();
			setOpen(!open);
		}
	};

	return (
		<Blur ref={el}>
			<SSelect
				showSearch
				onClick={(e) => handleClose(e)}
				style={{ width: "100%" }}
				value={currentCustomer}
				open={open}
				onChange={handleSelectChange}
				loading={loading}
				placeholder={t(translationPath(lang.placeholder.customerInput).path)}
				filterOption={(input, option) =>
					option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
				}
				dropdownRender={(menu) => (
					<div>
						{menu}
						<Divider style={{ margin: "4px 0" }} />
						<div style={{ display: "flex", flexWrap: "nowrap", padding: 8 }}>
							<Input
								style={{ flex: "auto" }}
								value={newCustomer}
								onChange={onNameChange}
							/>
							<Button type="link" onClick={addItem} disabled={loading}>
								{loading ? <Spin indicator={antIcon} /> : <PlusOutlined />}{" "}
								{t(translationPath(lang.common.add).path)}
							</Button>
						</div>
					</div>
				)}
			>
				{customersState?.map((item: CustomersAll) => (
					<SOption key={item.Id} value={item.Id}>
						{item.Name}
					</SOption>
				))}
			</SSelect>
		</Blur>
	);
};

export default onClickOutside(CustomerInput);

export const Blur = styled.div`
	width: 100%;
	.ant-select-dropdown {
		background-color: ${(props) =>
			props.theme.colors.background.content} !important;
	}
	.ant-select-selection-item {
		background-color: ${(props) =>
			props.theme.colors.background.content} !important;
	}
	.ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
		background-color: ${(props) =>
			props.theme.colors.background.content} !important;
	}
`;

const SSelect = styled(Select)`
	padding: 0;
	box-shadow: none !important;
	.anticon svg {
		background-color: ${(props) => props.theme.colors.background.content};
		color: ${(props) => props.theme.colors.forms.border};
	}

	.ant-select-selector {
		box-shadow: none !important;

		background-color: ${(props) => props.theme.colors.background.content};
		color: ${(props) => props.theme.colors.contentText};
		padding: 0 !important;
		border-bottom: 1px solid ${(props) => props.theme.colors.forms.border} !important;
		font-size: 16px !important;
		transition: all 0.2s ease-out;

		&::placeholder {
			color: ${(props) => props.theme.colors.secondaryText.default};
			font-size: 0.8em !important;
		}

		&:hover {
			border-bottom-color: ${(props) =>
				props.theme.colors.primary.default} !important;
		}

		.ant-input {
			background-color: ${(props) => props.theme.colors.background.content};
		}
	}
`;

export const SOption = styled(Option)`
	z-index: 9999999;
`;
