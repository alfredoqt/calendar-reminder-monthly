// @flow

import type {PlacePrediction} from 'constants/GoogleAPITypes';

import * as React from 'react';
import {useState} from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import CitySearchAutocomplete from 'components/reminder/CitySearchAutocomplete.react';
import {useDispatch, useMappedState} from 'stores/hooks/CalendarStoreHooks';
import FlexLayout from 'components/shared/FlexLayout.react';
import WeatherOnCity from 'components/reminder/WeatherOnCity.react';

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

const useStyles = makeStyles((theme) => ({
  form: {
    flexBasis: '75%',
    maxWidth: '75%',
    marginRight: theme.spacing(2),
  },
  weather: {
    flexBasis: '25%',
    maxWidth: '25%',
  },
}));

type Props = $ReadOnly<{
  open: boolean,
  onClose: () => void,
}>;

type ReminderFormFields = {
  city: ?PlacePrediction,
};

/**
 * Renders the add/update reminder dialog
 */
export default function ReminderDialog({open, onClose}: Props): React.Node {
  const classes = useStyles();
  const selectedDate = useMappedState((state) => state.currentReminderData.selectedDate);
  const [fields, setFields] = useState<ReminderFormFields>({
    city: null,
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle onClose={onClose}>Modal title</DialogTitle>
      <DialogContent>
        <FlexLayout>
          <div className={classes.form}>
            <CitySearchAutocomplete
              onChange={(value) => setFields({...fields, city: value})}
            />
          </div>
          <div className={classes.weather}>
            <WeatherOnCity selectedDate={selectedDate} city={fields.city} />
          </div>
        </FlexLayout>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onClose}>
          Save changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
