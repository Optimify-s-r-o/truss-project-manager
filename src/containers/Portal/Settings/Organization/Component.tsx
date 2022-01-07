import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faCog } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert } from 'antd';
import { useFormik } from 'formik';
import { get } from 'lodash';
import * as React from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Enter } from 'src/components/KeyBoardEventHandler';
import styled from 'styled-components';

import { Box } from '../../../../components/Box';
import { Button } from '../../../../components/Optimify/Button';
import FormikRow from '../../../../components/Optimify/Form/FormikRow';
import { Input } from '../../../../constants/enum';
import {
    ContentRow,
    Form,
    GridItem,
    GridRow,
    PageHeader,
    PageTitle,
    TitleName,
    TitleSection,
} from '../../../../constants/globalStyles';
import { lang, WithTranslation } from '../../../../translation/i18n';
import { Countries, Fetch, Settings, SettingsProxy, UserRole } from '../../../../types/_types';
import { getPath, lastPathMember, translationPath } from '../../../../utils/getPath';
import { MainTree, MainTreeContent, TreeContent, TreeScreen } from '../../_styles';
import { Organization, OrganizationProxy } from './_types';

export interface StateProps {
	routerState: any;
	settingsEntity: Settings;
	cloud: boolean;
	local: boolean;
	organization: Organization;
	role: string;
	pending: boolean;
}

export interface DispatchProps {
	settingsCall: ( data: Fetch ) => void;
	updateOrganization: ( data: Organization ) => void;
	getOrganization: ( data: void ) => void;
}

export const Component = ( {
	organization,
	updateOrganization,
	getOrganization,
	settingsEntity,
	role,
	pending,
}: WithTranslation & StateProps & DispatchProps ) => {
	const admin = role == UserRole.OrganizationAdmin ? true : false;
	const { t } = useTranslation();

	useEffect( () => {
		getOrganization();
	}, [] );
	const formik = useFormik( {
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
				StorageUsed: "",
			},
		enableReinitialize: true,
		onSubmit: ( values: Organization ) => {
			updateOrganization( values );
		},
	} );
	return (
		<Enter formik={formik}>
			<MainTree>
				<Form onSubmit={formik.handleSubmit}>
					<PageHeader>
						<PageTitle>
							<TitleSection>
								<ContentRow>
									<FontAwesomeIcon icon={faCog as IconProp} />
									<TitleName>
										{" "}
										{t( translationPath( lang.common.settings ).path )}
									</TitleName>
								</ContentRow>
							</TitleSection>
						</PageTitle>
					</PageHeader>
					<MainTreeContent>
						<TreeScreen>
							<TreeContent>
								<GridRow columns={1}>
									<GridItem fill>
										<Box
											title={t( translationPath( lang.organization.title ).path )}
										>
											<>
												{!admin && (
													<Alert
														message={t(
															translationPath( lang.common.notAdmin ).path
														)}
														type="warning"
														showIcon
														closable
													/>
												)}
												<FormikRow
													formik={formik}
													name={lastPathMember( OrganizationProxy.Crn ).path}
													title={t( translationPath( lang.common.crn ).path )}
													type={Input.TEXT}
													disabled={!admin}
												/>
												<FormikRow
													formik={formik}
													name={lastPathMember( OrganizationProxy.VatRegNo ).path}
													title={t( translationPath( lang.common.vatRegNo ).path )}
													type={Input.TEXT}
													disabled={!admin}
												/>
												<FormikRow
													formik={formik}
													name={lastPathMember( OrganizationProxy.Name ).path}
													title={t( translationPath( lang.common.name ).path )}
													type={Input.TEXT}
													disabled={!admin}
												/>
												<FormikRow
													formik={formik}
													name={lastPathMember( OrganizationProxy.CityName ).path}
													title={t( translationPath( lang.common.cityName ).path )}
													type={Input.TEXT}
													disabled={!admin}
												/>
												<FormikRow
													formik={formik}
													name={
														lastPathMember( OrganizationProxy.StreetName ).path
													}
													title={t( translationPath( lang.common.street ).path )}
													type={Input.TEXT}
													disabled={!admin}
												/>
												<FormikRow
													formik={formik}
													name={
														lastPathMember( OrganizationProxy.PlaceNumber ).path
													}
													title={t(
														translationPath( lang.common.placeNumber ).path
													)}
													type={Input.TEXT}
													disabled={!admin}
												/>
												<FormikRow
													formik={formik}
													name={lastPathMember( OrganizationProxy.Zip ).path}
													title={t( translationPath( lang.common.postcode ).path )}
													type={Input.TEXT}
													disabled={!admin}
												/>
												<FormikRow
													formik={formik}
													name={
														lastPathMember( OrganizationProxy.RegionName ).path
													}
													title={t( translationPath( lang.common.region ).path )}
													type={Input.TEXT}
													disabled={!admin}
												/>
												<FormikRow
													formik={formik}
													name={
														lastPathMember( OrganizationProxy.CountryId ).path
													}
													title={t( translationPath( lang.common.country ).path )}
													type={Input.SELECT}
													options={
														get(
															settingsEntity,
															getPath( SettingsProxy.Countries )
														) &&
														get(
															settingsEntity,
															getPath( SettingsProxy.Countries )
														).map( ( value: Countries ) => {
															return {
																value: value.Id,
																label: value.EnglishName,
															};
														} )
													}
													disabled={!admin}
												/>
												<br />
												<FormikRow
													formik={formik}
													name={lastPathMember( OrganizationProxy.StorageUsed ).path}
													title={t( translationPath( lang.common.storageUsed ).path )}
													type={Input.NUMERIC}
													disabled={true}
												/>
												<br />
												{admin && (
													<ButtonsRow>
														<Button level={2} type="submit" loading={pending}>
															{t( translationPath( lang.common.save ).path )}
														</Button>
													</ButtonsRow>
												)}
											</>
										</Box>
									</GridItem>
								</GridRow>
							</TreeContent>
						</TreeScreen>
					</MainTreeContent>
				</Form>
			</MainTree>
		</Enter>
	);
};

export default Component;

export const ButtonsRow = styled.div`
	flex: 0 0 auto;
	align-self: flex-end;

	display: flex;
	justify-content: flex-end;
	align-items: center;
	flex-direction: row;

	width: 100%;
	margin-top: 0.3em;
`;

export const Setting = styled( Button )`
	color: ${ ( props ) => props.theme.colors.background.content };
	background-color: ${ ( props ) => props.theme.colors.primary.default };
	border: none;
	box-shadow: none;
	padding: 0.5em 0.9em;
	border-radius: 4px;

	&:hover {
		color: ${ ( props ) => props.theme.colors.background.content };
		background-color: ${ ( props ) => props.theme.colors.primary.default };
		border: none;
		box-shadow: none;
	}
`;
