import Loading from '../../../../components/Optimify/Loading';
import Material from './Material/Container';
import Navigation from '../../../../components/NavigationLink';
import ProtectedRoute from '../../../../components/ProtectedRoute';
import Quotations from './Quotations/Container';
import React from 'react';
import Summary from './General/Container';
import { faMountains } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { HubComponent } from './HubComponent';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { MainTree } from '../../_styles';
import { Phase } from '../../../../components/Phase';
import { Routes } from '../../../../constants/routes';
import { translationPath } from '../../../../utils/getPath';
import { Truss } from './_types';
import {
	faInfo,
	faInventory,
	faMoneyBillWave,
} from "@fortawesome/pro-solid-svg-icons";
import {
	RouteComponentProps,
	Switch,
	useLocation,
	useParams,
} from "react-router-dom";
import {
	PageHeader,
	PageTitle,
	TitleName,
	TitleSection,
} from "../../../../constants/globalStyles";
import {
	lang,
	t,
	WithTranslation,
	withTranslation,
} from "../../../../translation/i18n";
export interface StateProps {
	routerState: any;
	truss: Truss;
	token: string;
	local: boolean;
	trussHub: any;
	loadingPage: boolean;
}

export interface DispatchProps {
	getTrussImage: (data: string) => void;
	setTruss: (data: Truss) => void;
	priceListsGetAction: (data: void) => void;
	setLoading: (data: boolean) => void;
}

const Component = ({
	truss,
	token,
	local,
	setTruss,
	getTrussImage,
	priceListsGetAction,
	trussHub,
	loadingPage,
	setLoading,
}: WithTranslation & StateProps & DispatchProps & RouteComponentProps) => {
	const { id } = useParams<{ id: string; type?: string }>();
	const location = useLocation();

	const getTruss = (id: string) => {
		getTrussImage(id);
		priceListsGetAction();
	};

	return (
		<HubComponent
			token={token}
			local={local}
			setTruss={setTruss}
			getTruss={getTruss}
			setLoading={setLoading}
			id={id}
			trussHub={trussHub}
		>
			<MainTree>
				<Loading
					text={t(translationPath(lang.common.loading))}
					pending={loadingPage}
					margin
				>
					<PageHeader>
						<PageTitle>
							<TitleSection>
								<FontAwesomeIcon
									icon={faMountains as IconProp}
									color={"#fff"}
								/>
								<TitleName>{truss?.TrussName}</TitleName>
								{truss?.Status && <Phase phase={[truss?.Status]} />}
							</TitleSection>
						</PageTitle>
						<Navigation
							items={[
								{
									to: Routes.TREE_LINK_TRUSS + id + "/summary/persist",
									active:
										location.pathname.includes("summary") ||
										(!location.pathname.includes("material") &&
											!location.pathname.includes("quotations")),

									text: t(translationPath(lang.common.summary)),
									icon: faInfo,
								},
								{
									to: Routes.TREE_LINK_TRUSS + id + "/material/persist",
									active: location.pathname.includes("material"),
									text: t(translationPath(lang.common.material)),
									icon: faInventory,
								},
								{
									to: Routes.TREE_LINK_TRUSS + id + "/quotations/persist",
									active: location.pathname.includes("quotations"),
									text: t(translationPath(lang.common.quotation)),
									icon: faMoneyBillWave,
								},
							]}
						/>
					</PageHeader>
					<Switch>
						<ProtectedRoute
							path={Routes.TREE_TRUSS_SUMMARY}
							exact
							component={Summary}
						/>
						<ProtectedRoute
							path={Routes.TREE_TRUSS_MATERIAL}
							exact
							component={Material}
						/>
						<ProtectedRoute
							path={Routes.TREE_TRUSS_QUOTATIONS}
							exact
							component={Quotations}
						/>
						<ProtectedRoute path={Routes.TREE_TRUSS} component={Summary} />
					</Switch>
				</Loading>
			</MainTree>
		</HubComponent>
	);
};

export default withTranslation()(Component);
