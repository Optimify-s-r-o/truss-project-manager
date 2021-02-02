import React from 'react';
import SectionsPanel from '../../../../components/Optimify/Panel/SectionsPanel';
import { RouteComponentProps, withRouter } from 'react-router';
import { Routes } from '../../../../constants/routes';
import { translationPath } from '../../../../utils/getPath';
import {
	faFolders,
	faHomeLgAlt,
	faMountains,
	faSearch,
} from "@fortawesome/pro-light-svg-icons";
import {
	lang,
	t,
	WithTranslation,
	withTranslation,
} from "../../../../translation/i18n";

interface OwnProps {
	children: React.ReactNode;
	path: string;
	activeFilter?: boolean;
}

const SidebarNavigation = withTranslation()(
	(props: OwnProps & WithTranslation & RouteComponentProps) => {
		return (
			<SectionsPanel
				direction={"left"}
				initialSize={300}
				minSize={250}
				activeFilter={props.activeFilter}
			>
				{props.children}
			</SectionsPanel>
		);
	}
);

export default withRouter((props: OwnProps & RouteComponentProps) => {
	return <SidebarNavigation {...props} />;
});
