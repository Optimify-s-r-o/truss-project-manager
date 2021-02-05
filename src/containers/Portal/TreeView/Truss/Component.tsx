import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faMountains } from "@fortawesome/pro-light-svg-icons";
import {
	faInfo,
	faInventory,
	faMoneyBillWave,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import {
	Route,
	RouteComponentProps,
	Switch,
	useLocation,
	useParams,
} from "react-router-dom";
import Navigation from "../../../../components/NavigationLink";
import Loading from "../../../../components/Optimify/Loading";
import { Phase } from "../../../../components/Phase";
import {
	PageHeader,
	PageTitle,
	TitleName,
	TitleSection,
} from "../../../../constants/globalStyles";
import { Routes } from "../../../../constants/routes";
import {
	lang,
	t,
	WithTranslation,
	withTranslation,
} from "../../../../translation/i18n";
import { translationPath } from "../../../../utils/getPath";
import { MainTree } from "../../_styles";
import Summary from "./General/Container";
import { HubComponent } from "./HubComponent";
import Material from "./Material/Container";
import Quotations from "./Quotations/Container";
import { Truss } from "./_types";
export interface StateProps {
	routerState: any;
	truss: Truss;
	token: string;
	local: boolean;
	trussHub: any;
}

export interface DispatchProps {
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
								<FontAwesomeIcon
									icon={faMountains as IconProp}
									color={"#fff"}
								/>
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
