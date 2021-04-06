import moment from 'moment';
import { Checkbox } from './Jobs/Component';
import { Data, Tree, TreeType } from '../../../types/_types';
import { FilterContentType } from '../SidebarFilter/_types';
import { fixed } from '../../../utils/formating';
import { get } from 'lodash';
import { lang, t } from '../../../translation/i18n';
import { translationPath } from '../../../utils/getPath';

export const getFilterActiveContent = (
	active: Checkbox[],
	all: Checkbox[],
	activeFilterContent: any
): string[] => {
	return active?.map((value: Checkbox) => {
		return getFilterContent(value, all, activeFilterContent);
	});
};

export const findColumn = (name: string, all: Checkbox[]) => {
	return all.find((e) => e?.name === name);
};

export const getFilterContent = (
	value: Checkbox,
	all: Checkbox[],
	activeFilterContent: any
): string => {
	var column = findColumn(value?.name, all);
	if (column && column.filter) {
		const value = get(activeFilterContent, column.filter);
		if (!value) return "";
		switch (column.filterType) {
			case FilterContentType.ARRAY:
				return value
					?.map((v) => t(translationPath(lang.common[v])))
					?.join(", ");
			case FilterContentType.TEXT:
				return value;
			case FilterContentType.DATE:
				return getDate(value);
			case FilterContentType.RANGE:
				return value?.From && value?.To
					? column.round
						? `${value?.From} - ${value?.To}`
						: `${fixed(value?.From, 2)} - ${fixed(value?.To, 2)}`
					: "";
		}
	}

	return "";
};

const getDate = (value) => {
	if (moment(value?.From)?.isValid() && moment(value?.To)?.isValid()) {
		return `${moment(value?.From).format("D. MM. YYYY")} -
			${moment(value?.To).format("D. MM. YYYY")}`;
	} else if (moment(value?.From)?.isValid()) {
		return `${moment(value?.From).format("D. MM. YYYY")} -
		 X`;
	} else if (moment(value?.To)?.isValid()) {
		return `X -
		${moment(value?.To).format("D. MM. YYYY")}`;
	}
};

export const getTreeType = (
	customerTree: Data<Tree>,
	projectTree: Data<Tree>,
	jobTree: Data<Tree>
): TreeType => {
	return customerTree
		? TreeType.CUSTOMER
		: projectTree
		? TreeType.PROJECT
		: jobTree
		? TreeType.JOB
		: null;
};

export const getStep = (from: number, to: number): number => {
	const count = from + to;
	if (count < 10) {
		return 0.01;
	} else if (count < 40) {
		return 0.01;
	} else if (count < 100) {
		return 0.1;
	} else if (count > 100) {
		return 1;
	}
};
