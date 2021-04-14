import KeyboardEventHandler from 'react-keyboard-event-handler';
import lang from 'src/translation/lang';
import onClickOutside from 'react-onclickoutside';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import { ContentRow } from 'src/constants/globalStyles';
import { Customer } from 'src/containers/Portal/Customer/_types';
import { CustomersAll } from 'src/containers/Portal/Lists/Customers/_types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { LineOutlined, PlusOutlined } from '@ant-design/icons';
import { translationPath } from '../../../utils/getPath';
import { useTranslation } from 'react-i18next';
import {
	faChevronDown,
	faChevronUp,
	faTimes,
} from "@fortawesome/pro-light-svg-icons";

interface ICustomerInput {
	formik: any;
	customers: CustomersAll[];
	name: string;
	addCustomer: (data: string) => void;
	loading: boolean;
	newCustomer?: Customer;
}

export const CustomerInput = ({
	newCustomer,
	formik,
	customers,
	name,
	addCustomer,
	loading,
}: ICustomerInput) => {
	const { t } = useTranslation();
	const wrapperRef = useRef(null);
	const customerInput = useRef(null);
	const createCustomerInput = useRef(null);
	const createCustomerButton = useRef(null);
	const dropDownContent = useRef(null);
	const [focused, setFocused] = useState(false);
	const [newCustomerState, setNewCustomerState] = useState("");
	const [currentCustomer, setCurrentCustomer] = useState("");

	useEffect(() => {
		if (newCustomer) {
			formik.setValues({ ...formik.values, CustomerId: newCustomer.Id });
		}
	}, [newCustomer]);

	useEffect(() => {
		function handleClickOutside(event) {
			if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
				dropDownContent.current.style.display = "none";
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [wrapperRef]);

	useEffect(() => {
		function handleEnter(event) {
			if (event.keyCode === 13) {
				event.preventDefault();
				createCustomerButton.current.click();
			}
		}

		function selectAll(ev) {
			var key = ev.which || ev.keyCode;
			var ctrl = ev.ctrlKey ? ev.ctrlKey : key === 17 ? true : false;
			if ((key == 65 || key == 97) && ctrl) {
				if (customerInput.current === document.activeElement) {
					customerInput.current.select();
				}
			} else if (key === 13) {
				ev.preventDefault();
			}
		}

		customerInput &&
			customerInput.current.addEventListener("keydown", selectAll, false);
		createCustomerInput &&
			createCustomerInput.current.addEventListener("keyup", handleEnter);
	}, []);

	useEffect(() => {
		setCurrentCustomer(formik.values[name] || "");
	}, [formik.values]);

	const createCustomer = () => {
		if (newCustomerState.length > 0) {
			addCustomer(newCustomerState);
			formik.setValues({ ...formik.values, Customer: newCustomerState });
			dropDownContent.current.style.display = "none";
			setFocused(false);
		}
	};

	const handleRemoveCustomer = () => {
		setCurrentCustomer("");
		formik.setValues({ ...formik.values, CustomerId: null, Customer: "" });
	};

	const handleFocus = () => {
		setFocused(true);
		dropDownContent.current.style.display = "block";
	};

	const handleClose = (e) => {
		dropDownContent.current.style.display = "none";
		setFocused(false);
	};

	const handleSelect = (name: string, id: string) => () => {
		formik.setValues({ ...formik.values, CustomerId: id, Customer: name });
		dropDownContent.current.style.display = "none";
		setFocused(false);
	};

	const handleNewCustomerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewCustomerState(e.target.value);
	};

	const handleCustomerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCurrentCustomer(e.target.value);
	};

	const selectAll = () => {
		customerInput.current.select();
	};

	console.log(currentCustomer);
	return (
		<DropDown ref={wrapperRef}>
			<Row>
				<KeyboardEventHandler
					handleKeys={["ctrl+a"]}
					onKeyEvent={(key, e) => selectAll()}
				/>
				<Input
					type={"text"}
					name={name}
					value={currentCustomer}
					onFocus={handleFocus}
					onChange={handleCustomerChange}
					ref={customerInput}
					placeholder={t(translationPath(lang.customer.placeholder).path)}
				/>

				<DropDownContent ref={dropDownContent}>
					<CustomerList>
						{customers
							?.filter((e) =>
								e?.Name?.toLowerCase().includes(currentCustomer?.toLowerCase())
							)
							?.map((customer: CustomersAll, key: number) => {
								return (
									<DropDownItem
										key={key}
										isSelected={
											formik.values && formik.values[name] === customer.Name
										}
										onClick={handleSelect(customer?.Name, customer?.Id)}
									>
										{customer.Name}
									</DropDownItem>
								);
							})}
					</CustomerList>
					<NewCustomer>
						<NewCustomerInput
							ref={createCustomerInput}
							type="text"
							placeholder={t(translationPath(lang.customer.newCustomer).path)}
							onChange={handleNewCustomerChange}
							value={newCustomerState}
						/>
						<Create
							ref={createCustomerButton}
							type="primary"
							size="small"
							onClick={createCustomer}
							icon={<PlusOutlined />}
						>
							{t(translationPath(lang.customer.add).path)}
						</Create>
					</NewCustomer>
				</DropDownContent>
				<Delete icon={faTimes as IconProp} onClick={handleRemoveCustomer} />
				<Line />
				{focused ? (
					<Close icon={faChevronUp as IconProp} onClick={handleClose} />
				) : (
					<Open icon={faChevronDown as IconProp} onClick={handleFocus} />
				)}
			</Row>
		</DropDown>
	);
};

export default onClickOutside(CustomerInput);

const Line = styled(LineOutlined)`
	transform: rotate(90deg);
	svg {
		background-color: ${(props) => props.theme.colors.background.content};
	}
`;

const Delete = styled(FontAwesomeIcon)`
	cursor: pointer;
`;

const Open = styled(FontAwesomeIcon)`
	cursor: pointer;
`;

const Close = styled(FontAwesomeIcon)`
	cursor: pointer;
`;

const Row = styled(ContentRow)`
	svg {
		color: ${(props) => props.theme.colors.forms.border};
	}
`;

const DropDownContent = styled.div`
	display: none;
	position: absolute;
	top: 45px;
	width: 100%;

	background-color: ${(props) => props.theme.colors.background.content};
	box-shadow: ${(props) => props.theme.boxShadow};
	color: ${(props) => props.theme.colors.contentText};

	min-width: 160px;
	box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
	z-index: 1;
`;

const CustomerList = styled.div`
	max-height: 300px;
	overflow: auto;
`;

const Input = styled.input`
	width: 100%;
	background-color: ${(props) => props.theme.colors.background.content};

	cursor: pointer;

	border: none;

	padding: 7px 0;

	&:focus {
		/* border-bottom: 1px solid
			${(props) =>
			props.disabled
				? props.theme.colors.forms.border
				: props.theme.colors.primary.default}; */

		${Open} {
			background: red;
			display: none;
		}

		${Close} {
			display: block;
		}
	}

	&:first-child {
		border-radius: 3px 3px 0 0;
	}

	&:last-child {
		border-radius: 0px 0px 3px 3px;
	}

	&::placeholder {
		color: #bfbfbf;
		font-size: 0.9rem;
	}
`;

const DropDown = styled.div`
	position: relative;
	display: inline-block;
	border-bottom: 1px solid ${(props) => props.theme.colors.forms.border};
	transition: all 0.2s ease-out;
	div:first-child {
		border-radius: 3px 3px 0 0;
	}

	div:last-child {
		border-radius: 0 0 3px 3px;
	}
`;

const DropDownItem = styled.div<{ isSelected: boolean }>`
	cursor: pointer;
	padding: 9px;

	background-color: ${(props) =>
		props.isSelected
			? props.theme.colors.primary.default
			: props.theme.colors.background.content};

	color: ${(props) =>
		props.isSelected ? props.theme.colors.background.content : "inherit"};

	&:hover {
		background-color: ${(props) =>
			props.isSelected
				? props.theme.colors.primary.hover
				: "rgba(23, 120, 94, 0.12)"};
		color: ${(props) =>
			props.isSelected ? props.theme.colors.background.content : "inherit"};
	}
`;

const NewCustomerInput = styled.input`
	width: 100%;
	background-color: ${(props) => props.theme.colors.background.content};

	cursor: pointer;

	border: none;
	border-bottom: 1px solid ${(props) => props.theme.colors.forms.border};

	padding: 7px 0;

	&::placeholder {
		color: #bfbfbf;
		font-size: 0.9rem;
	}
`;

const NewCustomer = styled(ContentRow)`
	padding: 7px 3px 7px 10px;
	border-top: 1px solid
		${(props) => props.theme.colors.background.secondaryMenu};
`;

const Create = styled(Button)`
	margin-left: 10px;
	margin-right: 4px;

	svg {
		background: ${(props) => props.theme.colors.primary.default};
		color: ${(props) => props.theme.colors.secondaryText.white};
	}
`;
