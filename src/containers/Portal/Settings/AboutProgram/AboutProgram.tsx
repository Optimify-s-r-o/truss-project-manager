import * as React from 'react';
import Data from '../../../../components/Data/Data';
import styled from 'styled-components';
import { Box } from '../../../../components/Box';
import { GridItem, GridRow } from '../../../../constants/globalStyles';
import { lang } from '../../../../translation/i18n';
import { translationPath } from '../../../../utils/getPath';
import { UnitType } from '../../../../components/Data/Unit';
import { useTranslation } from 'react-i18next';

export interface AboutProgram {
	currentAppVersion: string;
}

export const AboutProgram = ({ currentAppVersion }: AboutProgram) => {
	const { t } = useTranslation();
	const openFineUrl = (
		_event: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		const { shell } = window.require("electron");
		shell.openExternal("https://fine.cz/");
	};

	const openFineEmail = (
		_event: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		const { shell } = window.require("electron");
		shell.openExternal("mailto:hotline@finesoftware.eu");
	};

	return (
		<GridRow columns={1}>
			<GridItem fill>
				<Box title={t(translationPath(lang.settings.aboutProgram).path)}>
					<Data
						title={t(translationPath(lang.settings.programName).path)}
						unit={UnitType.EMPTY}
						data={<div>Truss Project Manager</div>}
					/>
					<Data
						title={t(translationPath(lang.settings.programVersion).path)}
						unit={UnitType.EMPTY}
						data={<div>v{currentAppVersion}</div>}
					/>
					<Data
						title={"Hotline"}
						unit={UnitType.EMPTY}
						data={<div>+420 233 324 889</div>}
					/>
					<Data
						title={t(translationPath(lang.common.phone).path)}
						unit={UnitType.EMPTY}
						data={<div>+420 233 324 890</div>}
					/>
					<Data
						title={"Internet"}
						unit={UnitType.EMPTY}
						data={<Link onClick={openFineUrl}>www.finesoftware.eu</Link>}
					/>
					<Data
						title={t(translationPath(lang.common.email).path)}
						unit={UnitType.EMPTY}
						data={<Link onClick={openFineEmail}>hotline@finesoftware.eu</Link>}
					/>
				</Box>
			</GridItem>
		</GridRow>
	);
};

const Link = styled.div`
	text-decoration: underline;
	color: ${(props) => props.theme.colors.secondaryText.hover};
	cursor: pointer;
`;
