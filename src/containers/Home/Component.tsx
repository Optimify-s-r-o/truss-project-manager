import * as React from 'react';
import Carousel from './components/Carousel';
import Cloud from './Cloud/Container';
import LostPassword from './LostPassword/Container';
import Menu from '@material-ui/core/Menu';
import { faCloud, faGlobeAfrica } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GlobalNotification } from '../../components/Toast/_types';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Route, Switch } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { Routes } from '../../constants/routes';
import { translationPath } from '../../utils/getPath';
import { useToasts } from 'react-toast-notifications';
import {
	NavBar,
	NavButton,
	NavItems,
	NavLink,
} from "../../constants/globalStyles";
import {
	getLanguage,
	lang,
	t,
	WithTranslation,
	withTranslation,
} from "../../translation/i18n";
import {
	CarouselContainer,
	Container,
	Login,
	LoginContainer,
	MenuItemStyled,
	Navigation,
} from "./_styles";

enum Server {
	CLOUD = "CLOOUD",
	LOCAL = "LOCAL",
}

export interface StateProps {
	path: string;
	local: boolean;
	cloud: boolean;
	toast: GlobalNotification;
}

export interface DispatchProps {
	setCloud: (data: boolean) => void;
	clearToast: () => void;
}

const Index = (
	props: WithTranslation & StateProps & RouteComponentProps & DispatchProps
) => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [language, setLanguage] = React.useState(getLanguage());
	const { addToast } = useToasts();

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleChange = (lng: string) => (
		_event: React.MouseEvent<HTMLLIElement, MouseEvent>
	) => {
		setLanguage(lng);
		props.i18n.changeLanguage(lng);
		handleClose();
	};

	React.useEffect(() => {
		if (props.toast) {
			addToast(props.toast.message, {
				appearance: props.toast.code,
				autoDismiss: true,
			});
			props.clearToast();
		}
	}, [props.toast]);

	let pathname = props.location.pathname;

	return (
		<>
			<CarouselContainer>
				<Carousel />
			</CarouselContainer>
			<LoginContainer>
				<Login>
					<Navigation>
						<NavBar>
							<NavItems>
								<div>
									<NavLink
										to={Routes.HOME}
										active={pathname === Routes.HOME ? 1 : 0}
									>
										<FontAwesomeIcon icon={faCloud as IconProp} />
										<span className="xsHide">
											&nbsp;&nbsp;
											{t(translationPath(lang.common.cloud))}
										</span>
									</NavLink>
								</div>
								<div>
									<NavButton
										aria-controls="simple-menu"
										aria-haspopup="true"
										onClick={handleClick}
										slim={true}
									>
										<FontAwesomeIcon icon={faGlobeAfrica as IconProp} />
										<span className="xsHide">
											&nbsp;&nbsp;
											{language === "cs-CZ"
												? "CZ"
												: language === "de-DE"
												? "DE"
												: "EN"}
										</span>
									</NavButton>
									<Menu
										id="simple-menu"
										anchorEl={anchorEl}
										keepMounted
										open={Boolean(anchorEl)}
										onClose={handleClose}
									>
										<MenuItemStyled onClick={handleChange("cs-CZ")}>
											{t(translationPath(lang.common.czech))}
										</MenuItemStyled>
										<MenuItemStyled onClick={handleChange("en-GB")}>
											{t(translationPath(lang.common.english))}
										</MenuItemStyled>
										<MenuItemStyled onClick={handleChange("de-DE")}>
											{t(translationPath(lang.common.german))}
										</MenuItemStyled>
									</Menu>
								</div>
							</NavItems>
						</NavBar>
					</Navigation>

					<Container>
						<Switch>
							<Route path={Routes.LOST_PASSWORD} component={LostPassword} />
							<Route exact path={Routes.HOME} component={Cloud} />
						</Switch>
					</Container>
				</Login>
			</LoginContainer>
		</>
	);
};

export default withTranslation()(Index);
