import * as React from 'react';
import styled from 'styled-components';
import { Alert } from 'antd';
import { Box } from '../../../../components/Box';
import { Button } from '../../../../components/Optimify/Button';
import { faCog } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { get } from 'lodash';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Input } from '../../../../constants/enum';
import { lang, WithTranslation } from '../../../../translation/i18n';
import { Organization, OrganizationProxy } from './_types';
import { SelectField } from '../../../../components/Form/SelectField';
import { TextField } from '../../../../components/Form/TextField';
import { useEffect } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import {
	GridItem,
	GridRow,
	PageHeader,
	PageTitle,
	TitleName,
	TitleSection,
} from "../../../../constants/globalStyles";
import {
	Countries,
	Fetch,
	Settings,
	SettingsProxy,
	UserRole,
} from "../../../../types/_types";
import {
	getPath,
	lastPathMember,
	translationPath,
} from "../../../../utils/getPath";
import {
	MainTree,
	MainTreeContent,
	TreeContent,
	TreeScreen,
} from "../../_styles";

export interface StateProps {
	routerState: any;
	settingsEntity: Settings;
	cloud: boolean;
	local: boolean;
	organization: Organization;
	role: string;
}

export interface DispatchProps {
	settingsCall: (data: Fetch) => void;
	updateOrganization: (data: Organization) => void;
	getOrganization: (data: void) => void;
}

export const Component = ({
	organization,
	updateOrganization,
	getOrganization,
	settingsEntity,
	role,
}: WithTranslation & StateProps & DispatchProps) => {
	const admin = role == UserRole.OrganizationAdmin ? true : false;
	const { t } = useTranslation();

	useEffect(() => {
		getOrganization();
	}, []);
	const formik = useFormik({
		initialValues: organization
			? organization
			: {
					Id: "",
					Name: "",
					Crn: "",
					VatRegNo: "",
					CountryId: "",
					RegionName: "",
					CityName: "",
					StreetName: "",
					Zip: "",
					PlaceNumber: "",
			  },
		enableReinitialize: true,
		onSubmit: (values: Organization) => {
			updateOrganization(values);
		},
	});
	return (
		<MainTree>
			<PageHeader>
				<PageTitle>
					<TitleSection>
						<FontAwesomeIcon icon={faCog as IconProp} />
						<TitleName>
							{" "}
							{t(translationPath(lang.common.settings).path)}
						</TitleName>
					</TitleSection>
				</PageTitle>
			</PageHeader>
			<MainTreeContent>
				<TreeScreen>
					<TreeContent>
						<GridRow columns={1}>
							<GridItem fill>
								<Box title={t(translationPath(lang.organization.title).path)}>
									<>
										{!admin && (
											<Alert
												message={t(translationPath(lang.common.notAdmin).path)}
												type="warning"
												showIcon
												closable
											/>
										)}
										<TextField<Organization>
											formik={formik}
											entity={organization}
											name={lastPathMember(OrganizationProxy.Crn).path}
											type={Input.TEXT}
											label={t(translationPath(lang.common.crn).path)}
											disabled={!admin}
										/>
										<TextField<Organization>
											formik={formik}
											entity={organization}
											name={lastPathMember(OrganizationProxy.VatRegNo).path}
											type={Input.TEXT}
											label={t(translationPath(lang.common.vatRegNo).path)}
											disabled={!admin}
										/>
										<TextField<Organization>
											formik={formik}
											entity={organization}
											name={lastPathMember(OrganizationProxy.Name).path}
											type={Input.TEXT}
											label={t(translationPath(lang.common.name).path)}
											disabled={!admin}
										/>
										<TextField<Organization>
											formik={formik}
											entity={organization}
											name={lastPathMember(OrganizationProxy.CityName).path}
											type={Input.TEXT}
											label={t(translationPath(lang.common.cityName).path)}
											disabled={!admin}
										/>
										<TextField<Organization>
											formik={formik}
											entity={organization}
											name={lastPathMember(OrganizationProxy.StreetName).path}
											type={Input.TEXT}
											label={t(translationPath(lang.common.street).path)}
											disabled={!admin}
										/>
										<TextField<Organization>
											formik={formik}
											entity={organization}
											name={lastPathMember(OrganizationProxy.PlaceNumber).path}
											type={Input.TEXT}
											label={t(translationPath(lang.common.placeNumber).path)}
											disabled={!admin}
										/>
										<TextField<Organization>
											formik={formik}
											entity={organization}
											name={lastPathMember(OrganizationProxy.Zip).path}
											type={Input.TEXT}
											label={t(translationPath(lang.common.postcode).path)}
											disabled={!admin}
										/>
										<TextField<Organization>
											formik={formik}
											entity={organization}
											name={lastPathMember(OrganizationProxy.RegionName).path}
											type={Input.TEXT}
											label={t(translationPath(lang.common.region).path)}
											disabled={!admin}
										/>
										<SelectField<Organization>
											formik={formik}
											entity={organization}
											name={lastPathMember(OrganizationProxy.CountryId).path}
											label={t(translationPath(lang.common.country).path)}
											type={Input.SEARCHABLE_SELECT}
											options={
												get(settingsEntity, getPath(SettingsProxy.Countries)) &&
												get(
													settingsEntity,
													getPath(SettingsProxy.Countries)
												).map((value: Countries) => {
													return {
														value: value.Id,
														label: value.EnglishName,
													};
												})
											}
											settings={settingsEntity}
											disabled={!admin}
										/>
									</>
								</Box>
							</GridItem>
						</GridRow>
					</TreeContent>
				</TreeScreen>
			</MainTreeContent>
		</MainTree>
	);
};

export default Component;

export const Setting = styled(Button)`
	color: ${(props) => props.theme.colors.background.content};
	background-color: ${(props) => props.theme.colors.primary.default};
	border: none;
	box-shadow: none;
	padding: 0.5em 0.9em;
	border-radius: 4px;

	&:hover {
		color: ${(props) => props.theme.colors.background.content};
		background-color: ${(props) => props.theme.colors.primary.default};
		border: none;
		box-shadow: none;
	}
`;
