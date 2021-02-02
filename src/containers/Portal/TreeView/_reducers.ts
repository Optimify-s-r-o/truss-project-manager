import { getType } from 'typesafe-actions';
import { TreeStateType } from './_types';
import {
  customerTree,
  jobTree,
  projectTree,
  treeFirstLayerActionType,
  treeReset,
  trussTree,
  setExpandedKeys,
  setSelectedKeys,
} from './_actions';

const initialState: TreeStateType = {
  error: null,
  pending: false,
  jobTree: null,
  projectTree: null,
  customerTree: null,
  trussTree: null,
  firstRecordOnPage: null,
  lastRecordOnPage: null,
  currentPage: 0,
  totalPages: null,
  totalRecords: null,
  isFilterActive: null,
  selectedKeys: [],
  expandedKeys: [],
};

export default (
  state: TreeStateType = initialState,
  action: treeFirstLayerActionType
): TreeStateType => {
  switch (action.type) {
    case getType(setExpandedKeys):
      return {
        ...state,
        expandedKeys: action.payload,
      };
    case getType(setSelectedKeys):
      return {
        ...state,
        selectedKeys: action.payload,
      };
    case getType(projectTree.request):
      return {
        ...initialState,
        error: null,
        pending: true,
        customerTree: null,
      };
    case getType(projectTree.success):
      return {
        ...initialState,
        pending: false,
        projectTree: action.payload,
        customerTree: null,
        firstRecordOnPage: action.payload.FirstRecordOnPage,
        lastRecordOnPage: action.payload.LastRecordOnPage,
        currentPage: action.payload.CurrentPage,
        totalPages: action.payload.TotalPages,
        totalRecords: action.payload.TotalRecords,
        isFilterActive: action.payload.IsFilterActive,
      };

    case getType(projectTree.failure):
      return {
        ...initialState,
        error: action.payload.ErrorMessage,
        pending: false,
        customerTree: null,
      };
    case getType(customerTree.request):
      return {
        ...initialState,
        pending: true,
        projectTree: null,
      };
    case getType(customerTree.success):
      return {
        ...initialState,
        pending: false,
        customerTree: action.payload,
        projectTree: null,
        firstRecordOnPage: action.payload.FirstRecordOnPage,
        lastRecordOnPage: action.payload.LastRecordOnPage,
        currentPage: action.payload.CurrentPage,
        totalPages: action.payload.TotalPages,
        totalRecords: action.payload.TotalRecords,
        isFilterActive: action.payload.IsFilterActive,
      };
    case getType(customerTree.failure):
      return {
        ...initialState,
        error: action.payload.ErrorMessage,
        pending: false,
        customerTree: null,
        projectTree: null,
      };
    case getType(jobTree.request):
      return {
        ...initialState,
        pending: true,
        jobTree: null,
      };
    case getType(jobTree.success):
      return {
        ...initialState,
        pending: false,
        jobTree: action.payload,
        firstRecordOnPage: action.payload.FirstRecordOnPage,
        lastRecordOnPage: action.payload.LastRecordOnPage,
        currentPage: action.payload.CurrentPage,
        totalPages: action.payload.TotalPages,
        totalRecords: action.payload.TotalRecords,
        isFilterActive: action.payload.IsFilterActive,
      };
    case getType(jobTree.failure):
      return {
        ...initialState,
        error: action.payload.ErrorMessage,
        pending: false,
      };
    case getType(trussTree.request):
      return {
        ...initialState,
        pending: true,
        jobTree: null,
      };
    case getType(trussTree.success):
      return {
        ...initialState,
        pending: false,
        trussTree: action.payload,
        firstRecordOnPage: action.payload.FirstRecordOnPage,
        lastRecordOnPage: action.payload.LastRecordOnPage,
        currentPage: action.payload.CurrentPage,
        totalPages: action.payload.TotalPages,
        totalRecords: action.payload.TotalRecords,
        isFilterActive: action.payload.IsFilterActive,
      };
    case getType(trussTree.failure):
      return {
        ...initialState,
        error: action.payload.ErrorMessage,
        pending: false,
      };
    case getType(treeReset.request):
      return {
        ...initialState,
        pending: true,
      };
    case getType(treeReset.success):
      return {
        ...initialState,
      };
    case getType(treeReset.failure):
      return {
        ...initialState,
        error: action.payload.ErrorMessage,
        pending: false,
      };
    default:
      return state;
  }
};
