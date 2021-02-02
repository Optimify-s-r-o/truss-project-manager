import * as React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormRow from './Optimify/Form/FormRow';
import styled from 'styled-components';
import { Button } from './Optimify/Button/index';
import { Countries, Settings, SettingsProxy } from '../types/_types';
import { get } from 'lodash';
import { getPath, translationPath } from '../utils/getPath';
import { lang, t, WithTranslation } from '../translation/i18n';
import { Location } from '../types/_types';
import { NumericInput } from './Optimify/Form/NumericInput';
import { SearchableSelect } from './Optimify/Form/Select';
import { TextInput } from './Optimify/Form/TextInput';
import { withTranslation } from 'react-i18next';
import {
	ContentSpaceBetween,
	GridItem,
	GridRow,
	MainContent,
} from "../constants/globalStyles";

interface OwnProps {
	open: boolean;
	close: () => void;
	setAdress: (value: string, name: string) => void;
	location: Location;
	settings: Settings;
}

const Index = (props: OwnProps & WithTranslation) => {
	const [country, setCountry] = React.useState<{
		value: string;
		label: string;
	} | null>(null);

	React.useEffect(() => {
		const czech: Countries =
			get(props.settings, getPath(SettingsProxy.Countries)) &&
			get(props.settings, getPath(SettingsProxy.Countries)).find(
				(value: Countries) => {
					if (value.EnglishName == "Czechia") {
						return value;
					}
					return null;
				}
			);
		czech && props.setAdress(czech.Id, "CountryId");
		czech && setCountry({ value: czech.Id, label: czech.EnglishName });
		czech && czech.Id && props.setAdress(czech.Id, "CountryId");
	}, [props.settings]);

	const handleClose = () => {
		props.close();
	};

	const onChange = (
		event: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const { value, name } = event.target;
		props.setAdress(value, name);
	};

	const onChangeSelect = (value: any, actionMeta: any) => {
		setCountry(value);
		props.setAdress((value as any).value, "CountryId");
	};

	return (
		<Dialog
			open={props.open}
			onClose={handleClose}
			aria-labelledby="form-dialog-title"
		>
			<MainContent>
				<ContentSpaceBetween>
					<DialogTitle id="form-dialog-title">
						{t(translationPath(lang.common.address))}
					</DialogTitle>
					<Close onClick={handleClose}>
						<CloseIcon />
					</Close>
				</ContentSpaceBetween>
				<DialogContent>
					<FormRow title={t(translationPath(lang.common.country))}>
						<SearchableSelect
							isLoading={!props.settings || !props.settings.Countries}
							options={
								props.settings &&
								props.settings?.Countries &&
								props.settings?.Countries?.map((value: Countries) => {
									return { value: value.Id, label: value.EnglishName };
								})
							}
							onChange={onChangeSelect}
							placeholder={t(translationPath(lang.common.search))}
							value={country}
						/>
					</FormRow>
					<FormRow title={t(translationPath(lang.common.cityName))}>
						<TextInput
							onChange={onChange}
							name="CityName"
							value={props.location && props.location.CityName}
						/>
					</FormRow>
					<FormRow title={t(translationPath(lang.common.postcode))}>
						<TextInput
							onChange={onChange}
							name="Zip"
							value={props.location && props.location.Zip}
						/>
					</FormRow>
					<FormRow title={t(translationPath(lang.common.regionName))}>
						<TextInput
							onChange={onChange}
							name="RegionName"
							value={props.location && props.location.RegionName}
						/>
					</FormRow>
					<GridRow columns={2}>
						<GridItem>
							<FormRow title={t(translationPath(lang.common.streetName))}>
								<TextInput
									onChange={onChange}
									name="StreetName"
									value={props.location && props.location.StreetName}
								/>
							</FormRow>
						</GridItem>
						<GridItem>
							<FormRow title={t(translationPath(lang.common.placeNumber))}>
								<NumericInput
									onChange={onChange}
									name="PlaceNumber"
									value={props.location && props.location.PlaceNumber}
								/>
							</FormRow>
						</GridItem>
					</GridRow>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} type="button">
						{t(translationPath(lang.common.adressModalAdd))}
					</Button>
				</DialogActions>
			</MainContent>
		</Dialog>
	);
};

export const Close = styled.div`
	cursor: pointer;
	margin-right: 10px;
`;

export default withTranslation()(Index);
