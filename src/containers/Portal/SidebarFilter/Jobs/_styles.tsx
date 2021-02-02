import * as React from 'react';
import styled from 'styled-components';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';

export const Main = styled.div`
  position: relative;
  flex-grow: 1;
`;

export const AntTabs = withStyles({
  root: {
    borderBottom: '1px solid #e8e8e8',
    minHeight: '36px !important'
  },
  indicator: {
    backgroundColor: '#1890ff'
  }
})(Tabs);

export const AntTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: 'none',
      minWidth: 72,
      minHeight: '36px !important',
      fontWeight: theme.typography.fontWeightRegular,
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"'
      ].join(','),
      '&:hover': {
        color: '#mediumseagreen',
        opacity: 1
      },
      '&$selected': {
        color: '#1890ff',
        fontWeight: theme.typography.fontWeightMedium
      },
      '&:focus': {
        color: '#40a9ff'
      }
    },
    selected: {}
  })
)((props: StyledTabProps) => <Tab disableRipple {...props} />);

interface StyledTabProps {
  label?: string;
}
