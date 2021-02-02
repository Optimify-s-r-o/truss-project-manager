import {
  ContentColumn,
  ContentSpaceBetween,
} from '../../../../../constants/globalStyles';

import styled from 'styled-components';

export const EmptyViewer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 2em;
  padding-bottom: 3em;
`;

export const ViewerTitleSection = styled(ContentSpaceBetween)`
  padding: 3px 0 10px 0;
`;

export const ViewerColumn = styled(ContentColumn)`
  padding-top: 4em;
  align-items: center;
  justify-content: center;
`;
