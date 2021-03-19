import * as React from 'react';
import FilterSection from '../../Lists/components/FilterSection';
import FormikRow from '../../../../components/Optimify/Form/FormikRow';
import IncludeNotSetCheckbox from '../../../../components/Optimify/Form/IncludeNotSetCheckbox';
import Tooltip from '../../../../components/Optimify/Tooltip';
import { ContentRowEnd } from '../../../../constants/globalStyles';
import { FilterContentSection } from '../../Lists/components/_styles';
import { FilterProxy } from '../_types';
import { FilterSettings, FilterSettingsProxy } from '../../../../types/_types';
import { FormikCheckbox } from '../components/FormikCheckbox';
import { Input } from '../../../../constants/enum';
import { UserData } from '../../Accounts/_types';
import {
	lang,
	t,
	WithTranslation,
	withTranslation,
} from "../../../../translation/i18n";
import {
	getPath,
	lastPathMember,
	translationPath,
} from "../../../../utils/getPath";

export interface OwnProps {
	formik: any;
	filter: FilterSettings;
	users: UserData[];
}

const Index = (props: OwnProps & WithTranslation) => {
	const { formik, users, filter } = props;

	return (
		<FilterSection
			title={t(translationPath(lang.common.filterGeneral))}
			formik={formik}
			filter={filter}
			formikCheckboxes={[
				getPath(FilterProxy.Projects.ProjectStateFilter.ProjectStates),
			]}
			checkboxes={[getPath(FilterSettingsProxy.Project.ProjectStates)]}
			input={[
				getPath(FilterProxy.Projects.NameFilter.Name),
				getPath(FilterProxy.Projects.UserFilter.Name),
			]}
		>
			<FilterContentSection withoutMargin>
				<FormikRow
					formik={formik}
					name={getPath(FilterProxy.Projects.NameFilter.Name)}
					filter={getPath(FilterProxy.Projects.NameFilter)}
					filterName={lastPathMember(FilterProxy.Projects.NameFilter.Name).path}
					title={t(translationPath(lang.common.projectName))}
					type={Input.FILTER_TEXT}
				/>
				<FormikRow
					formik={formik}
					name={getPath(FilterProxy.Projects.UserFilter.Name).join(".")}
					filter={getPath(FilterProxy.Projects.UserFilter)}
					filterName={lastPathMember(FilterProxy.Projects.UserFilter.Name).path}
					title={t(translationPath(lang.common.user))}
					type={Input.SELECT}
					options={
						users
							? users.map((value: UserData) => {
									return {
										value: value.Username,
										label: value.Username,
									};
							  })
							: []
					}
				>
					<ContentRowEnd>
						<Tooltip
							title={t(translationPath(lang.common.tooltip.projectUserFilter))}
							placement={"left"}
						>
							<IncludeNotSetCheckbox
								checked={false}
								formik={formik}
								name={lastPathMember(FilterProxy.Projects.UserFilter).path}
								property={
									lastPathMember(FilterProxy.Projects.UserFilter.IncludeNotSet)
										.path
								}
								erase={
									lastPathMember(FilterProxy.Projects.UserFilter.Name).path
								}
							/>
						</Tooltip>
					</ContentRowEnd>
				</FormikRow>
				<FormikRow
					formik={formik}
					name={getPath(FilterProxy.Projects.AddressFilter.Location)}
					filter={getPath(FilterProxy.Projects.AddressFilter)}
					filterName={
						lastPathMember(FilterProxy.Projects.AddressFilter.Location).path
					}
					title={t(translationPath(lang.common.address))}
					type={Input.FILTER_TEXT}
				>
					<ContentRowEnd>
						<Tooltip
							title={t(translationPath(lang.common.tooltip.addressFilter))}
							placement={"left"}
						>
							<IncludeNotSetCheckbox
								checked={false}
								formik={formik}
								name={lastPathMember(FilterProxy.Projects.AddressFilter).path}
								property={
									lastPathMember(
										FilterProxy.Projects.AddressFilter.IncludeNotSet
									).path
								}
								erase={
									lastPathMember(FilterProxy.Projects.AddressFilter.Location)
										.path
								}
							/>
						</Tooltip>
					</ContentRowEnd>
				</FormikRow>
			</FilterContentSection>
			<FormikCheckbox
				formik={formik}
				filter={filter}
				filterPath={getPath(FilterSettingsProxy.Project.ProjectStates)}
				name={getPath(FilterProxy.Projects.ProjectStateFilter.ProjectStates)}
				pathName={
					lastPathMember(FilterProxy.Projects.ProjectStateFilter.ProjectStates)
						.path
				}
				path={getPath(FilterProxy.Projects.ProjectStateFilter)}
				title={t(translationPath(lang.common.projectState))}
				value={formik.values?.Projects?.ProjectStateFilter?.ProjectStates}
			/>
		</FilterSection>
	);
};

export default withTranslation()(React.memo(Index));
