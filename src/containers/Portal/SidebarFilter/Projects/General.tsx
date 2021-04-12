import * as React from 'react';
import FilterSection from '../../Lists/components/FilterSection';
import IncludeNotSetCheckbox from '../../../../components/Optimify/Form/IncludeNotSetCheckbox';
import Tooltip from '../../../../components/Optimify/Tooltip';
import { ContentRowEnd } from '../../../../constants/globalStyles';
import { FilterContentSection } from '../../Lists/components/_styles';
import { FilterSettings, FilterSettingsProxy } from '../../../../types/_types';
import { FormikCheckbox } from '../components/FormikCheckbox';
import { NestedInput } from '../../../../components/Form/NestedInput';
import { NestedSelect } from '../../../../components/Form/NestedSelect';
import { ProjectsFilterProxy } from '../_types';
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
	values: any;
	setValues: (values: unknown, shouldValidate?: boolean) => void;
	setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
	filter: FilterSettings;
	users: UserData[];
}

const Index = (props: OwnProps & WithTranslation) => {
	const { values, setFieldValue, users, filter } = props;

	return (
		<FilterSection
			title={t(translationPath(lang.common.filterGeneral))}
			values={values}
			filter={filter}
			formikCheckboxes={[
				getPath(ProjectsFilterProxy.ProjectStateFilter.ProjectStates),
			]}
			checkboxes={[getPath(FilterSettingsProxy.Project.ProjectStates)]}
			input={[
				getPath(ProjectsFilterProxy.NameFilter),
				getPath(ProjectsFilterProxy.UserFilter.Name),
			]}
		>
			<FilterContentSection withoutMargin>
				<NestedInput
					name={getPath(ProjectsFilterProxy.NameFilter.Name)}
					value={values?.NameFilter.Name}
					title={t(translationPath(lang.common.projectName))}
				/>
				<NestedSelect
					name={getPath(ProjectsFilterProxy.UserFilter.Name).join(".")}
					setFieldValue={setFieldValue}
					values={values}
					filter={getPath(ProjectsFilterProxy.UserFilter)}
					title={t(translationPath(lang.common.user))}
					options={
						users?.length > 0
							? users?.map((value: UserData) => {
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
								values={values}
								setFieldValue={setFieldValue}
								name={lastPathMember(ProjectsFilterProxy.UserFilter).path}
								property={
									lastPathMember(ProjectsFilterProxy.UserFilter.IncludeNotSet)
										.path
								}
								erase={lastPathMember(ProjectsFilterProxy.UserFilter.Name).path}
							/>
						</Tooltip>
					</ContentRowEnd>
				</NestedSelect>
				<NestedInput
					name={getPath(ProjectsFilterProxy.AddressFilter.Location)}
					value={values?.AddressFilter?.Location}
					title={t(translationPath(lang.common.address))}
				>
					<ContentRowEnd>
						<Tooltip
							title={t(translationPath(lang.common.tooltip.addressFilter))}
							placement={"left"}
						>
							<IncludeNotSetCheckbox
								checked={false}
								values={values}
								setFieldValue={setFieldValue}
								name={lastPathMember(ProjectsFilterProxy.AddressFilter).path}
								property={
									lastPathMember(
										ProjectsFilterProxy.AddressFilter.IncludeNotSet
									).path
								}
								erase={
									lastPathMember(ProjectsFilterProxy.AddressFilter.Location)
										.path
								}
							/>
						</Tooltip>
					</ContentRowEnd>
				</NestedInput>
			</FilterContentSection>
			<FormikCheckbox
				values={values}
				setFieldValue={setFieldValue}
				filter={filter}
				filterPath={getPath(FilterSettingsProxy.Project.ProjectStates)}
				name={getPath(ProjectsFilterProxy.ProjectStateFilter.ProjectStates)}
				pathName={
					lastPathMember(ProjectsFilterProxy.ProjectStateFilter.ProjectStates)
						.path
				}
				path={getPath(ProjectsFilterProxy.ProjectStateFilter)}
				title={t(translationPath(lang.common.projectState))}
				value={values?.ProjectStateFilter?.ProjectStates}
			/>
		</FilterSection>
	);
};

export default withTranslation()(React.memo(Index));
