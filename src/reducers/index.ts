import CustomerReducer from '../containers/Portal/Customer/_reducers';
import CustomersReducer from '../containers/Portal/Lists/Customers/_reducers';
import JobMultipleReducer from '../containers/Portal/TreeView/Jobs/_reducers';
import JobReducer from '../containers/Portal/TreeView/Job/_reducers';
import LoadingReducer from './loadingReducer/_reducers';
import ProjectMultipleReducer from '../containers/Portal/TreeView/Projects/_reducers';
import ProjectReducer from '../containers/Portal/Project/_reducers';
import ProjectViewReducer from '../containers/Portal/TreeView/Project/_reducers';
import QuotationReducer from '../containers/Portal/Quotations/_reducers';
import SearchedReducer from '../containers/Portal/FastNavigation/_reducers';
import SettingsReducer from '../containers/Portal/_reducers';
import toastReducer from '../components/Toast/_reducers';
import TrussReducer from '../containers/Portal/TreeView/Truss/_reducers';
import UserReducer from '../containers/Portal/Accounts/_reducers';
import { AuthReducer } from '../containers/Home/_reducers';
import { combineReducers } from 'redux';
import { connectRouter, RouterActionType } from 'connected-react-router';
import { History } from 'history';
import { HubReducer } from './hubReducer/_reducers';
import { OrganizationReducer } from '../containers/Portal/Settings/Organization/_reducers';
import { PriceListsReducer } from '../containers/Portal/PriceLists/_reducers';
import { StateType } from 'typesafe-actions';
import { ViewerReducer } from '../containers/Portal/TreeView/Job/Viewer/_reducers';
import {
	default as FilterReducer,
	default as TrussesReducer,
} from "../containers/Portal/SidebarFilter/_reducers";
import {
	default as TreeFirstLayerReducer,
	default as TreeReducer,
} from "../containers/Portal/TreeView/_reducers";
let reducers;

const createRootReducer = (history: History) =>
	combineReducers({
		router: connectRouter(history),
		TreeReducer,
		JobReducer,
		ProjectReducer,
		toastReducer,
		CustomersReducer,
		CustomerReducer,
		SettingsReducer,
		JobMultipleReducer,
		ProjectMultipleReducer,
		ProjectViewReducer,
		TreeFirstLayerReducer,
		TrussReducer,
		SearchedReducer,
		AuthReducer,
		FilterReducer,
		UserReducer,
		TrussesReducer,
		LoadingReducer,
		QuotationReducer,
		OrganizationReducer,
		ViewerReducer,
		PriceListsReducer,
		HubReducer,
	});

export default createRootReducer;

export type RootStateType = StateType<typeof reducers>;

export interface RouterReducerType {
	router: {
		location: any;
		action: RouterActionType;
	};
}
