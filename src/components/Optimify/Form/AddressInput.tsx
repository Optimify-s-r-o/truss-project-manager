import FormRow from './FormRow';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { lang } from '../../../translation/i18n';
import { lastPathMember, translationPath } from '../../../utils/getPath';
import { Location, ProjectProxy } from '../../../types/_types';
import { Modal } from 'antd';
import { TextInput } from './TextInput';
import { useTranslation } from 'react-i18next';
interface IAddressInput {
	formik: any;
	name: string;
}
export const AddressInput = ({ formik, name }: IAddressInput) => {
	const address = useRef(null);
	const [currentAddress, setCurrentAddress] = useState<string>(null);
	const [location, setLocation] = useState<Location | null>(null);
	const [
		locationPersistence,
		setLocationPersistence,
	] = useState<Location | null>(null);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const { t } = useTranslation();
	let autocomplete: google.maps.places.Autocomplete;

	useEffect(() => {
		if (formik.values && formik.values[name]) {
			const address = setAddress(formik.values[name]);
			setLocation(formik.values[name]);
			setLocationPersistence(formik.values[name]);
			setCurrentAddress(address);
		}
	}, [formik.values]);
	useEffect(() => {
		initAutocomplete();
	}, [isModalVisible]);

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleOk = () => {
		setIsModalVisible(false);
		console.log(location);
		formik.setFieldValue(name, location);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
		formik.setFieldValue(name, locationPersistence);
	};

	const initAutocomplete = () => {
		autocomplete = new google.maps.places.Autocomplete(
			document.getElementById("autocomplete") as HTMLInputElement,
			{ types: ["geocode"] }
		);

		autocomplete.setFields(["address_component"]);

		autocomplete.addListener("place_changed", fillInAddress);
	};

	const setAddress = (location) => {
		let address = "";
		if (location.StreetName) {
			address += location.StreetName;
		}

		if (location.PlaceNumber) {
			address += " " + location.PlaceNumber;
		}

		if (location.Zip && location.CityName) {
			address +=
				(!!location.StreetName ? ", " : "") +
				location.Zip +
				" " +
				location.CityName;
		} else if (location.CityName) {
			address += (!!location.StreetName ? ", " : "") + location.CityName;
		}

		if (location.RegionName) {
			address +=
				(location.StreetName ||
				location.PlaceNumber ||
				location.CityName ||
				location.Zip
					? ", "
					: "") + location.RegionName;
		}

		if (location.Country) {
			address +=
				(location.StreetName ||
				location.PlaceNumber ||
				location.CityName ||
				location.Zip ||
				location.RegionName
					? ", "
					: "") + location.Country;
		}
		return address;
	};

	const fillInAddress = () => {
		const place = autocomplete.getPlace();
		let location = {
			StreetName: null,
			PlaceNumber: null,
			CityName: null,
			Zip: null,
			RegionName: null,
			Country: null,
		};
		for (const component of place.address_components as google.maps.GeocoderAddressComponent[]) {
			const addressType = component.types[0];
			if (addressType === "route") {
				location.StreetName = component.long_name;
			} else if (addressType === "street_number") {
				location.PlaceNumber = component.long_name;
			} else if (
				addressType === "sublocality_level_1" ||
				addressType === "locality"
			) {
				location.CityName = component.long_name;
			} else if (addressType === "postal_code") {
				location.Zip = component.long_name;
			} else if (
				addressType === "administrative_area_level_2" ||
				addressType === "neighborhood"
			) {
				location.RegionName = component.long_name;
			} else if (addressType === "country") {
				location.Country = component.long_name;
			}
		}

		setCurrentAddress(setAddress(location));
		setLocation(location);
	};

	const locate = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				const geolocation = {
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				};
				const circle = new google.maps.Circle({
					center: geolocation,
					radius: position.coords.accuracy,
				});
				autocomplete.setBounds(circle.getBounds());
			});
		}
	};

	document.body.addEventListener(
		"keydown",
		(ev) => {
			var key = ev.which || ev.keyCode;
			var ctrl = ev.ctrlKey ? ev.ctrlKey : key === 17 ? true : false;
			if ((key == 65 || key == 97) && ctrl) {
				if (address.current === document.activeElement) {
					const input = document.getElementById(
						"autocomplete"
					) as HTMLInputElement;
					input.select();
				}
			} else if (key === 13) {
				ev.preventDefault();
			}
		},
		false
	);

	const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCurrentAddress(e.target.value);
	};

	const onChange = (
		event: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const { value, name } = event.target;
		const newAddress = { ...location, [name]: value };
		console.log(newAddress);
		setLocation(newAddress);
		setCurrentAddress(setAddress(newAddress));
	};

	return (
		<>
			<Span onClick={() => showModal()}>
				<span>
					{formik.values &&
					formik.values[name] &&
					setAddress(formik.values[name]) ? (
						setAddress(formik.values[name])
					) : (
						<Placeholder>
							{t(translationPath(lang.placeholder.addressInput).path)}
						</Placeholder>
					)}
				</span>
			</Span>
			<Modal
				title={t(translationPath(lang.common.address).path)}
				visible={isModalVisible}
				onCancel={handleCancel}
				onOk={handleOk}
				cancelText={t(translationPath(lang.common.cancel).path)}
			>
				<Div id="locationField">
					<TextField
						ref={address}
						id="autocomplete"
						onFocus={locate}
						onChange={handleAddressChange}
						value={currentAddress}
						type="text"
						placeholder={t(translationPath(lang.placeholder.addressInput).path)}
					/>
				</Div>
				<FormRow title={t(translationPath(lang.common.streetName).path)}>
					<TextInput
						onChange={onChange}
						name={lastPathMember(ProjectProxy.Location.StreetName).path}
						value={location?.StreetName}
					/>
				</FormRow>
				<FormRow title={t(translationPath(lang.common.placeNumber).path)}>
					<TextInput
						onChange={onChange}
						name={lastPathMember(ProjectProxy.Location.PlaceNumber).path}
						value={location?.PlaceNumber}
					/>
				</FormRow>
				<FormRow title={t(translationPath(lang.common.cityName).path)}>
					<TextInput
						onChange={onChange}
						name={lastPathMember(ProjectProxy.Location.CityName).path}
						value={location?.CityName}
					/>
				</FormRow>
				<FormRow title={t(translationPath(lang.common.postcode).path)}>
					<TextInput
						onChange={onChange}
						name={lastPathMember(ProjectProxy.Location.Zip).path}
						value={location?.Zip}
					/>
				</FormRow>
				<FormRow title={t(translationPath(lang.common.regionName).path)}>
					<TextInput
						onChange={onChange}
						name={lastPathMember(ProjectProxy.Location.RegionName).path}
						value={location?.RegionName}
					/>
				</FormRow>
				<FormRow title={t(translationPath(lang.common.country).path)}>
					<TextInput
						onChange={onChange}
						name={lastPathMember(ProjectProxy.Location.Country).path}
						value={location?.Country}
					/>
				</FormRow>
			</Modal>
		</>
	);
};

const TextField = styled.input`
	width: 100%;
	height: 32px;
	margin: 4px 0;
	padding: 0;

	background-color: transparent;
	border: 0;
	border-bottom: 1px solid ${(props) => props.theme.colors.forms.border};
	font-size: 16px;

	transition: all 0.2s ease-out;

	&::placeholder {
		color: #bfbfbf;
		font-size: 0.9rem;
	}

	&:hover {
		border-bottom-color: ${(props) => props.theme.colors.primary.default};
	}
`;

const Span = styled.span`
	display: flex;
	align-items: center;

	width: 100%;
	height: 32px;
	margin: 8px 0;
	padding: 0;

	background-color: transparent;
	border: 0;
	border-bottom: 1px solid ${(props) => props.theme.colors.forms.border};
	font-size: 16px;

	transition: all 0.2s ease-out;

	&::placeholder {
		color: #bfbfbf;
		font-size: 0.9rem;
	}

	&:hover {
		border-bottom-color: ${(props) => props.theme.colors.primary.default};
	}
`;

const Div = styled.div`
	margin-bottom: 0.5em;
`;

const Placeholder = styled.div`
	color: #bfbfbf;
	font-size: 0.9rem;
`;
