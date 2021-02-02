import Loading from '../../../../components/Optimify/Loading';
import Material from './Material/Container';
import Navigation from '../../../../components/NavigationLink';
import Quotations from './Quotations/Container';
import React, { useState } from 'react';
import Summary from './General/Container';
import { faInfo, faInventory, faMoneyBillWave } from '@fortawesome/pro-solid-svg-icons';
import { faMountains } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { HubComponent } from './HubComponent';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
	lang,
	t,
	WithTranslation,
	withTranslation
	} from '../../../../translation/i18n';
import { MainTree } from '../../_styles';
import {
	PageHeader,
	PageTitle,
	TitleName,
	TitleSection
	} from '../../../../constants/globalStyles';
import { Phase } from '../../../../components/Phase';
import {
	Route,
	RouteComponentProps,
	Switch,
	useLocation,
	useParams
	} from 'react-router-dom';
import { Routes } from '../../../../constants/routes';
import { translationPath } from '../../../../utils/getPath';
import { Truss, TrussRequest } from './_types';
export interface StateProps {
	routerState: any;
	truss: Truss;
	token: string;
	local: boolean;
	trussHub: any;
}

export interface DispatchProps {
	getTrussRequest: (data: TrussRequest) => void;
	getTrussImage: (data: string) => void;
	setTruss: (data: Truss) => void;
	priceListsGetAction: (data: void) => void;
}

const Component = ({
	truss,
	token,
	local,
	setTruss,
	getTrussImage,
	priceListsGetAction,
	trussHub,
}: WithTranslation & StateProps & DispatchProps & RouteComponentProps) => {
	const { id } = useParams<{ id: string; type?: string }>();
	const [loading, setLoading] = useState<boolean>(true);
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
					pending={loading}
					margin
				>
					<PageHeader>
						<PageTitle>
							<TitleSection>
								<FontAwesomeIcon icon={faMountains as IconProp} />
								<TitleName>{truss?.General?.Name}</TitleName>
								{truss?.Phases && <Phase phase={truss?.Phases} />}
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
						<Route
							path={Routes.TREE_TRUSS_SUMMARY}
							exact
							component={Summary}
							routerState={location.pathname}
						/>
						<Route
							path={Routes.TREE_TRUSS_MATERIAL}
							exact
							component={Material}
							routerState={location.pathname}
						/>
						<Route
							path={Routes.TREE_TRUSS_QUOTATIONS}
							exact
							component={Quotations}
							routerState={location.pathname}
						/>
						<Route
							path={Routes.TREE_TRUSS}
							component={Summary}
							routerState={location.pathname}
						/>
					</Switch>
				</Loading>
			</MainTree>
		</HubComponent>
	);
};

export default withTranslation()(Component);
