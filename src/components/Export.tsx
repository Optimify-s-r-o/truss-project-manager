import * as React from 'react';
import ReactExport from 'react-export-excel';
import styled from 'styled-components';
import { faFileExcel } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Planks } from '../types/_types';
import { WithTranslation } from '../translation/i18n';
import { withTranslation } from 'react-i18next';
import {
	Member,
	Model,
	NailPlate,
	Truss,
} from "../containers/Portal/TreeView/Job/_types";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

interface DataStructure {
	label: string;
	valueName: string;
}

interface OwnProps {
	data: Model[] | Truss[] | NailPlate[] | Member[] | Planks[] | null;
	structure: DataStructure[];
	name: string;
}

const Index = ({ data, structure, name }: WithTranslation & OwnProps) => {
	return (
		<ExcelFile
			element={
				<Click>
					<FontAwesomeIcon icon={faFileExcel as IconProp} />
				</Click>
			}
			fileExtension="xlsx"
			filename={name}
		>
			<ExcelSheet data={data} name="Sheet">
				{structure?.map((val: DataStructure, key: number) => (
					<ExcelColumn key={key} label={val.label} value={val.valueName} />
				))}
			</ExcelSheet>
		</ExcelFile>
	);
};

export default withTranslation()(Index);

const Click = styled.div`
	cursor: pointer;

	svg {
		color: green;
	}
`;
