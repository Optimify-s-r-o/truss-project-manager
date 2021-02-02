import * as React from 'react';
import Tooltip from '../../../components/Optimify/Tooltip';
import { ApiURL } from '../../../constants/api';
import { faSearch } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Hub } from '../../../constants/hub';
import { HubConnection } from '@microsoft/signalr';
import { lang, t } from '../../../translation/i18n';
import { Method } from '../../../constants/enum';
import { quickSearch } from './_actions';
import { QuickSearchRequest } from './_types';
import { Routes } from '../../../constants/routes';
import { translationPath } from '../../../utils/getPath';
import { TreeType } from '../../../types/_types';
import { useDebounce } from '../../../utils/useDebounce';
import { useHistory } from 'react-router';
import {
	faArrowLeft,
	faArrowRight,
	faBookUser,
	faFolderPlus,
	faFolderTree,
	faHomeLgAlt,
	faMountain,
} from "@fortawesome/pro-duotone-svg-icons";
import {
	ButtonSearch,
	Divider,
	Filter,
	Header,
	InputElement,
	LinkSpanIcon,
	Show,
	Start,
	TooltipShortcut,
	TooltipText,
} from "./_styles";

interface IHeader {
	quickSearchRequest: (data: QuickSearchRequest) => void;
	setFilter: React.Dispatch<React.SetStateAction<boolean>>;
	filter: boolean;
	connect: HubConnection;
	setActiveFilter: React.Dispatch<React.SetStateAction<boolean>>;
	selectedKeys?: string[];
	selectedPageSize: number;
}

export const IconMenu = ({
	setFilter,
	filter,
	quickSearchRequest,
	connect,
	setActiveFilter,
	selectedKeys,
	selectedPageSize,
}: IHeader) => {
	const [searchedText, setSearchedText] = React.useState(null);
	const debouncedSearchTerm = useDebounce(searchedText, 500);
	const history = useHistory();

	const invokeTreeHub = async (tree: TreeType) => {
		try {
			if (selectedKeys?.length > 0) {
				connect.invoke(
					Hub.RequestTreeWithSelection,
					tree,
					selectedPageSize,
					""
				);
			} else {
				connect.invoke(Hub.RequestNewTree, tree, 0, selectedPageSize, "");
			}
		} catch (err) {
			console.log(err);
		}
	};

	const search = (_event: React.MouseEvent<HTMLElement, MouseEvent>) => {
		searchedText &&
			quickSearchRequest({
				action: quickSearch,
				method: Method.GET,
				param: searchedText,
				path: Routes.SEARCHED,
				url: ApiURL.QUICK_SEARCH,
			});
	};

	React.useEffect(() => {
		searchedText &&
			quickSearchRequest({
				action: quickSearch,
				method: Method.GET,
				param: searchedText,
				path: Routes.SEARCHED,
				url: ApiURL.QUICK_SEARCH,
			});
	}, [debouncedSearchTerm]);

	const onChange = (
		event: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const { value } = event.target;
		setSearchedText(value);
	};

	return (
		<Header>
			<Start>
				<LinkSpanIcon
					onClick={() => {
						history.push(Routes.PROJECT_NEW);
						invokeTreeHub(TreeType.PROJECT);
					}}
				>
					<Tooltip
						title={
							<>
								<TooltipText>
									{t(translationPath(lang.common.newProject))}
								</TooltipText>
								<TooltipShortcut>(Ctrl + N)</TooltipShortcut>
							</>
						}
						placement={"right"}
					>
						<div>
							<FontAwesomeIcon
								icon={faFolderPlus}
								style={{ fontSize: 18 }}
								color={"blue"}
							/>
						</div>
					</Tooltip>
				</LinkSpanIcon>
				<LinkSpanIcon
					onClick={() => {
						history.push(Routes.FILTER_PROJECT);
						invokeTreeHub(TreeType.PROJECT);
					}}
				>
					<Tooltip
						title={
							<>
								<TooltipText>
									{t(translationPath(lang.common.projectList))}
								</TooltipText>
								<TooltipShortcut>(Ctrl + P)</TooltipShortcut>
							</>
						}
						placement={"right"}
					>
						<div>
							<FontAwesomeIcon
								icon={faFolderTree}
								style={{ fontSize: 18 }}
								color={"rgb(150, 45, 147)"}
							/>
						</div>
					</Tooltip>
				</LinkSpanIcon>

				<Divider />
				<LinkSpanIcon
					onClick={() => {
						history.push(Routes.FILTER_JOB);
						invokeTreeHub(TreeType.JOB);
					}}
				>
					<Tooltip
						title={
							<>
								<TooltipText>
									{t(translationPath(lang.common.jobList))}
								</TooltipText>
								<TooltipShortcut>(Ctrl + J)</TooltipShortcut>
							</>
						}
						placement={"right"}
					>
						<div>
							<FontAwesomeIcon
								icon={faHomeLgAlt}
								style={{ fontSize: 16 }}
								color={"red"}
							/>
						</div>
					</Tooltip>
				</LinkSpanIcon>
				<Divider />
				<LinkSpanIcon
					onClick={() => {
						history.push(Routes.FILTER_TRUSS);
						invokeTreeHub(TreeType.TRUSS);
					}}
				>
					<Tooltip
						title={
							<>
								<TooltipText>
									{t(translationPath(lang.common.trussList))}
								</TooltipText>
								<TooltipShortcut>(Ctrl + T)</TooltipShortcut>
							</>
						}
						placement={"right"}
					>
						<div>
							<FontAwesomeIcon
								icon={faMountain}
								style={{ fontSize: 16 }}
								color={"#c1c132"}
							/>
						</div>
					</Tooltip>
				</LinkSpanIcon>
				<Divider />
				<LinkSpanIcon
					onClick={() => {
						history.push(Routes.CUSTOMER_ALL);
						invokeTreeHub(TreeType.CUSTOMER);
					}}
				>
					<Tooltip
						title={
							<>
								<TooltipText>
									{t(translationPath(lang.common.customersList))}
								</TooltipText>
								<TooltipShortcut>(Ctrl + S)</TooltipShortcut>
							</>
						}
						placement={"right"}
					>
						<div>
							<FontAwesomeIcon
								icon={faBookUser}
								style={{ fontSize: 18 }}
								color={"brown"}
							/>
						</div>
					</Tooltip>
				</LinkSpanIcon>
				<Divider />
				<InputElement
					onChange={onChange}
					placeholder={t(translationPath(lang.common.find))}
					value={searchedText}
				/>
				<ButtonSearch onClick={search}>
					<FontAwesomeIcon color="#d9d9d9" icon={faSearch} />
				</ButtonSearch>
			</Start>
			<Filter onClick={() => setFilter(!filter)}>
				<Tooltip
					title={
						<>
							<TooltipText>
								{t(
									translationPath(
										filter ? lang.common.hideFilter : lang.common.showFilter
									)
								)}
							</TooltipText>
							<TooltipShortcut>(F8)</TooltipShortcut>
						</>
					}
					placement={"bottom"}
				>
					<Show>
						{t(
							translationPath(
								filter ? lang.common.hideFilter : lang.common.showFilter
							)
						)}
					</Show>
				</Tooltip>
				<FontAwesomeIcon
					icon={filter ? faArrowRight : faArrowLeft}
					style={{ fontSize: 18 }}
					color={"##17785e"}
				/>
			</Filter>
		</Header>
	);
};
