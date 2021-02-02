import { EvidenceStateType } from './_types';
import { getType } from 'typesafe-actions';
import {
  evidenceCustomerType,
  getEvidenceCustomer,
  saveEvidenceCustomer,
} from './_actions';

const initialState: EvidenceStateType = {
  error: null,
  pending: false,
  evidence: null,
};

export default (
  state: EvidenceStateType = initialState,
  action: evidenceCustomerType
): EvidenceStateType => {
  switch (action.type) {
    case getType(getEvidenceCustomer.request):
    case getType(saveEvidenceCustomer.request):
      return {
        ...initialState,
        error: null,
        pending: true,
      };
    case getType(saveEvidenceCustomer.success):
      return {
        ...state,
        pending: false,
      };
    case getType(getEvidenceCustomer.success):
      return {
        ...state,
        pending: false,
        evidence: action.payload,
      };
    case getType(getEvidenceCustomer.failure):
    case getType(saveEvidenceCustomer.failure):
      return {
        ...initialState,
        error: action.payload.ErrorMessage,
        pending: false,
      };
    default:
      return state;
  }
};
