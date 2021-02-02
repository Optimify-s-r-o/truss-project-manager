import * as React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { translationPath } from '../../utils/getPath';
import {
  lang,
  t,
  WithTranslation,
  withTranslation,
} from '../../translation/i18n';

interface OwnProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  message?: string;
  htmlMessage?: any;
}

export const Index = (props: OwnProps & WithTranslation) => {
  const { open, setOpen, title, message } = props;

  const handleClose = (
    _event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message ? (
            { message }
          ) : (
            <div dangerouslySetInnerHTML={{ __html: props.htmlMessage }}></div>
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          {t(translationPath(lang.common.close))}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default withTranslation()(Index);
