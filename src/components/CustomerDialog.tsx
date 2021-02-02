import * as React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import KeyHandler, { KEYPRESS } from 'react-key-handler';
import SearchIcon from '@material-ui/icons/Search';
import styled from 'styled-components';
import { Button } from './Optimify/Button/index';
import { ContentSpaceBetween, MainContent } from '../constants/globalStyles';
import { Customer } from '../types/_types';
import { CustomersAll } from '../containers/Portal/Lists/Customers/_types';
import { faUser } from '@fortawesome/pro-light-svg-icons';
import { Icon } from './Icon';
import { IconButton, InputBase } from '@material-ui/core';
import { lang, t, WithTranslation } from '../translation/i18n';
import { translationPath } from '../utils/getPath';
import { withTranslation } from 'react-i18next';

interface OwnProps {
	all: CustomersAll[];
	open: boolean;
	customers: Customer[];
	close: () => void;
	addCustomerId: (id: string) => void;
	addCustomer: (customer: string) => void;
}

const Index = (props: OwnProps & WithTranslation) => {
	const [searchedText, setSearchedText] = React.useState("");
	const [loading, setLoading] = React.useState(false);
	const [searchedCustomers, setSearchedCustomers] = React.useState<
		CustomersAll[] | null
	>(null);

	React.useEffect(() => {
		setSearchedCustomers(props.all);
		setLoading(false);
	}, [props.all]);

	const handleClose = () => {
		props.close();
	};

	const handleAdd = (id: string) => {
		props.addCustomerId(id);
		props.close();
	};

	const newCustomer = () => {
		setLoading(true);
		props.addCustomer(searchedText);
		props.close();
		setLoading(false);
	};

	const search = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
		const found: CustomersAll[] = props.all.filter((it: CustomersAll) => {
			if (it.Name.toLowerCase().includes(searchedText.toLowerCase())) {
				return it;
			}
		});
		setSearchedCustomers(found);
	};

	const onChange = (event: any) => {
		const { value } = event.target;
		setSearchedText(value);
		let found = props.all;
		if (value !== "") {
			found = props.all.filter((it: CustomersAll) => {
				if (it.Name.toLowerCase().includes(searchedText.toLowerCase())) {
					return it;
				}
			});
		}
		setSearchedCustomers(found);
	};

	const getCustomer = (id: string) => (
		_event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
	) => {
		handleAdd(id);
	};

	const toggleMenu = (event: any) => {
		event.preventDefault();
		newCustomer();
	};

	return (
		<Dialog
			open={props.open}
			onClose={handleClose}
			aria-labelledby="form-dialog-title"
		>
			<KeyHandler
				keyEventName={KEYPRESS}
				keyValue="Enter"
				onKeyHandle={toggleMenu}
			/>
			<MainContent>
				<ContentSpaceBetween>
					<DialogTitle id="form-dialog-title">
						{t(translationPath(lang.common.customer))}
					</DialogTitle>
					<Close onClick={handleClose}>
						<CloseIcon />
					</Close>
				</ContentSpaceBetween>
				<DialogContent>
					<Row>
						<InputSearch onChange={onChange}>
							<Input
								placeholder={t(translationPath(lang.common.find))}
								value={searchedText}
							/>
							<IconButton onClick={search} type="submit" aria-label="search">
								<SearchIconStyled />
							</IconButton>
						</InputSearch>
					</Row>
					<TextArea>
						{searchedCustomers &&
							searchedCustomers.map((value: CustomersAll, index: number) => {
								return (
									<Center onClick={getCustomer(value.Id)}>
										<Icon icon={faUser} />
										<Name>{value.Name}</Name>
									</Center>
								);
							})}
					</TextArea>
				</DialogContent>
				<DialogActions>
					<Button onClick={newCustomer} loading={loading}>
						{t(translationPath(lang.common.customerModalDescription))}
					</Button>
				</DialogActions>
			</MainContent>
		</Dialog>
	);
};

export const Input = styled(InputBase)`
	color: ${(props) => props.theme.colors.contentText} !important;
`;

export const SearchIconStyled = styled(SearchIcon)`
	color: ${(props) => props.theme.colors.primary.default};
`;

export const Close = styled.div`
	cursor: pointer;
	margin-right: 10px;
`;

export const InputSearch = styled.div`
	padding: 0 4px;
	margin-left: 5px;
	width: 100%;
	border-bottom: 1px solid ${(props) => props.theme.colors.forms.border};
	color: ${(props) => props.theme.colors.contentText};
`;

export const Row = styled.div`
	width: 100%;
	margin-top: 5px;
`;

export const Name = styled.div`
	margin-left: 8px;
`;

export const TextArea = styled.div`
	overflow-y: auto;
	display: flex;
	flex-direction: column;
	color: ${(props) => props.theme.colors.contentText};

	margin: 5px 4px;
`;

export const Center = styled.button`
	display: flex;
	flex-direction: row;
	align-items: center;

	padding: 5px 4px;

	border: 0;
	background: ${(props) => props.theme.colors.background.content};
	color: ${(props) => props.theme.colors.contentText};

	cursor: pointer;

	&:hover {
		background: ${(props) => props.theme.colors.primary.default};
		color: white;

		> svg {
			color: white !important;
		}
	}
`;

export default withTranslation()(Index);
