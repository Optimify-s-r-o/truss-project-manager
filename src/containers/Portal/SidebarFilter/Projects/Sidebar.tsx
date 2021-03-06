import React, { useEffect } from "react";
import { Hub } from "../../../../constants/hub";
import { WithTranslation, withTranslation } from "../../../../translation/i18n";
import { FilterSettings, TreeType } from "../../../../types/_types";
import { UserData } from "../../Accounts/_types";
import { Grow } from "../../Lists/components/_styles";
import { Reset } from "../components/Reset";
import { SelectType } from "../components/Select";
import { FilterType } from "../index";
import { getProjectsFilters } from "../_services";
import DateRange from "./DateRange";
import General from "./General";
import Price from "./Price";

export interface OwnProps {
	filter: FilterSettings;
	activeTree: TreeType;
	users: UserData[];
	resetTree: () => void;
	activeFilterContent: any;
	activeFilter: FilterType;
	handleChange: (value: FilterType) => void;
	projectPending: boolean;
	handleForm: (newData: any) => void;
	treeHub: any;
	values: any;
	setValues: any;
	setFieldValue: any;
}

const Index = ({
	activeTree,
	filter,
	users,
	resetTree,
	activeFilter,
	handleChange,
	projectPending,
	handleForm,
	treeHub,
	values,
	setValues,
	setFieldValue,
	activeFilterContent,
}: OwnProps & WithTranslation) => {
	useEffect(() => {
		handleForm({ Projects: values });
	}, [values]);

	useEffect(() => {
		if (treeHub) {
			treeHub.on(Hub.TreeResetFinished, (message) => {
				const initialValues: any = getProjectsFilters(filter);
				setValues(initialValues);
			});
		}
	}, [treeHub]);

	useEffect(() => {
		setValues(getProjectsFilters(filter, activeFilterContent));
	}, [filter, activeFilterContent]);

	return (
		<>
			<SelectType activeFilter={activeFilter} handleChange={handleChange} />
			<Grow>
				<General
					values={values}
					setValues={setValues}
					setFieldValue={setFieldValue}
					filter={filter}
					users={users}
				/>
				<DateRange
					values={values}
					filter={filter}
					setFieldValue={setFieldValue}
				/>
				<Price values={values} setFieldValue={setFieldValue} filter={filter} />
			</Grow>
			<Reset
				activeTree={activeTree}
				filter={filter}
				values={values}
				setValues={setValues}
				resetTree={resetTree}
				pending={projectPending}
				activeFilter={activeFilter}
			/>
		</>
	);
};

export default withTranslation()(React.memo(Index));
