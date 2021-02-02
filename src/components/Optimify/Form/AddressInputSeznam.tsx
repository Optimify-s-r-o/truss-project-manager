import React, { useEffect } from 'react';
import styled from 'styled-components';

interface IAddressInput {
	formik: any;
	name: string;
}
export const AddressInputSeznam = ({ formik, name }: IAddressInput) => {
	const [loaded, setLoaded] = React.useState(false);
	useEffect(() => {
		if (document.getElementById("map-loader-script")) {
			const script = document.createElement("script");
			script.src = "https://api.mapy.cz/loader.js";
			script.onload = () => {
				//@ts-ignore
				window.Loader.async = true;
				//@ts-ignore
				window.Loader.load(null, { suggest: true }, onMapApiLoaded);
			};
			//@ts-ignore
			document.head.append(scriptTag);
		}
	}, []);

	const onMapApiLoaded = () => {
		setLoaded(true);
	};

	return (
		<div id="wrapper">
			{loaded ? <p>Loading...</p> : <Suggestion formik={formik} name={name} />}
		</div>
	);
};

const Suggestion = ({ formik, name }: IAddressInput) => {
	const [address, setAddress] = React.useState("");

	const joinAddress = (location) => {
		let address = "";
		if (location.StreetName) {
			address += location.StreetName;
		}

		if (location.CityName) {
			address += ", " + location.CityName;
		}

		if (location.ZipCode) {
			address += ", " + location.ZipCode;
		}

		if (location.Country) {
			address += ", " + location.Country;
		}
		return address;
	};

	const splitAddress = (suggestData) => {
		let location = {
			StreetName: "",
			PlaceNumber: "",
			CityName: "",
			Zip: "",
			RegionName: "",
			Country: "",
		};
		location.StreetName = suggestData.phrase;
		const cityAndState = suggestData.data.secondRow
			?.replace("Adresa,", "")
			?.split(",");
		location.CityName = cityAndState[0];
		location.Country = cityAndState[1];
		setAddress(suggestData.phrase + location.CityName + location.Country);
		formik.setFieldValue(name, location);
	};
	useEffect(() => {
		const location = formik.values[name];
		location.StreetName && setAddress(joinAddress(location));
	}, [formik.values[name]]);

	useEffect(() => {
		var inputEl = document.getElementById("suggest");
		//@ts-ignore
		var suggest = new SMap.Suggest(inputEl);
		suggest.urlParams({
			bounds: "48.5370786,12.0921668|51.0746358,18.8927040",
		});
		suggest.addListener("suggest", function (suggestData) {
			splitAddress(suggestData);
		});
	}, []);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setAddress(e.target.value);
	};

	return (
		<Input
			type="text"
			value={address}
			onChange={handleChange}
			placeholder="Zadejte adresu"
			id="suggest"
		/>
	);
};

const Input = styled.input`
	width: 100%;
	height: 32px;
	margin: 8px 0;
	padding: 0;

	background-color: transparent;
	color: ${(props) => props.theme.colors.contentText};
	border: 0;
	border-bottom: 1px solid ${(props) => props.theme.colors.forms.border};
	font-size: 16px;

	transition: all 0.2s ease-out;

	&::placeholder {
		color: ${(props) => props.theme.colors.secondaryText.default};
		font-size: 0.9rem;
	}

	&:hover {
		border-bottom-color: ${(props) => props.theme.colors.primary.default};
	}

	.smap-suggest {
		width: 900px !important;
	}

	.smap-suggest .item {
	}
`;
