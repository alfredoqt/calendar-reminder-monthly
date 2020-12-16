// @flow

import * as React from 'react';
import {useContext} from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import GoogleMapsJSAPIContext from 'components/shared/GoogleMapsJSAPIContext.react';

// Leaving this components here instead of their separate files
// since they are pretty small
const useTitleStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

type TitleProps = $ReadOnly<{
  children: React.Node,
  onClose: () => void,
}>;

function DialogTitle({children, onClose}: TitleProps): React.Node {
  const classes = useTitleStyles();
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      <IconButton className={classes.closeButton} onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </MuiDialogTitle>
  );
}

// Using HOCs to make it easier
const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

type Props = $ReadOnly<{
  open: boolean,
  onClose: () => void,
}>;

/**
 * Renders the add/update reminder dialog
 */
export default function ReminderDialog({open, onClose}: Props): React.Node {
  const google = useContext(GoogleMapsJSAPIContext);
  console.log(google);
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle onClose={onClose}>Modal title</DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
          facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac,
          vestibulum at eros.
        </Typography>
        <Typography gutterBottom>
          Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus
          sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
        </Typography>
        <Typography gutterBottom>
          Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna,
          vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper
          nulla non metus auctor fringilla.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onClose}>
          Save changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
