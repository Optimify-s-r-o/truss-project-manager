import * as React from 'react';
import CheckBox from '../../../../components/Optimify/Form/CheckBox';
import { FilterSettings } from '../../../../types/_types';
import { get } from 'lodash';
import { lang } from '../../../../translation/i18n';
import { translationPath } from '../../../../utils/getPath';
import { useTranslation } from 'react-i18next';
import {
	FilterContentSection,
	FilterTitle,
} from "../../Lists/components/_styles";
export interface OwnProps {
	values: any;
	setFieldValue: (field: any, value: any, shouldValidate?: boolean) => void;
	name: (string | number | symbol)[];
	path: (string | number | symbol)[];
	filterPath: (string | number | symbol)[];
	filter: FilterSettings;
	title: string;
	pathName: string;
	value: string[] | string;
}

export const FormikCheckbox = ({
	values,
	setFieldValue,
	filter,
	title,
	name,
	value,
	path,
	pathName,
	filterPath,
}: OwnProps) => {
	const { t } = useTranslation();

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			setFieldValue(path, {
				[pathName]: [...get(values, name), event.target.name],
				IncludeNotSet: false,
				Active: true,
			});
		} else {
			const currentValues = get(values, name);
			if (currentValues) {
				const newArr = currentValues.filter((value: string) => {
					if (value != event.target.name) return value;
				});
				setFieldValue(path, {
					[pathName]: newArr,
					IncludeNotSet: false,
					Active: newArr.length > 0 ? true : false,
				});
			}
		}
	};

	return (
		<>
			{get(filter, filterPath) && (
				<FilterContentSection>
					<FilterTitle>{title}</FilterTitle>
					{get(filter, filterPath).map((i: string) => {
						return (
							<CheckBox
								checked={false}
								label={t(translationPath(lang.common[i]).path)}
								handleChange={handleChange}
								value={value}
								name={i}
							/>
						);
					})}
				</FilterContentSection>
			)}
		</>
	);
};
