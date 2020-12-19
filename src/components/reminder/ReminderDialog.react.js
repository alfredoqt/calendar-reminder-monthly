// @flow

import type {PlacePrediction} from 'constants/GoogleAPITypes';
import type {OpenWeatherForecastDay} from 'constants/OpenWeatherTypes';
import type {ReminderColor} from 'constants/ReminderTypes';

import * as React from 'react';
import {useEffect, useState} from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CitySearchAutocomplete from 'components/reminder/CitySearchAutocomplete.react';
import {useDispatch, useMappedState} from 'stores/hooks/CalendarStoreHooks';
import FlexLayout from 'components/shared/FlexLayout.react';
import WeatherOnCity from 'components/reminder/WeatherOnCity.react';
import {REMINDER_COLORS} from 'constants/ReminderTypes';
import ReminderColorSelect from 'components/reminder/ReminderColorSelect.react';
import ReminderTimeSelect from 'components/reminder/ReminderTimeSelect.react';
import dayjs from 'dayjs';
import nullthrows from 'utils/nullthrows';
import {v4 as uuidv4} from 'uuid';
import {addReminder} from 'actions/CalendarRemindersActions';

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
  forecast: ?OpenWeatherForecastDay,
  name: string,
  color: ReminderColor,
  date: ?dayjs.Dayjs,
};

/**
 * Renders the add/update reminder dialog
 */
export default function ReminderDialog({open, onClose}: Props): React.Node {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selectedDate = useMappedState((state) => state.currentReminderData.selectedDate);
  const [fields, setFields] = useState<ReminderFormFields>({
    city: null,
    forecast: null,
    name: '',
    color: REMINDER_COLORS.blue,
    date: null,
  });
  const [fieldErrors, setFieldErrors] = useState<{
    [$Keys<ReminderFormFields>]: ?string,
  }>({
    city: null,
    forecast: null,
    name: null,
    color: null,
    date: null,
  });

  useEffect(() => {
    if (selectedDate != null) {
      setFields({...fields, date: selectedDate.hour(0).minute(0).second(0)});
    }
  }, [selectedDate]);

  // useCallback unnecessary due to repetitive memoized function creation
  const onSave = () => {
    let errors: {
      [$Keys<ReminderFormFields>]: ?string,
    } = {
      city: null,
      forecast: null,
      name: null,
      color: null,
      date: null,
    };

    if (fields.city == null) {
      errors = {...errors, city: 'The city must not be empty'};
    }

    if (fields.name === '') {
      errors = {...errors, name: 'Name must not be empty'};
    }

    if (fields.name.length > 30) {
      errors = {...errors, name: 'Length must not be greater than 30'};
    }

    setFieldErrors(errors);

    const noNullErrors = Object.keys(errors).reduce((acc, current) => {
      if (errors[current] == null) {
        return acc;
      }
      acc[current] = errors[current];
      return acc;
    }, {});

    if (Object.keys(noNullErrors).length !== 0) {
      return;
    }

    setFields({
      city: null,
      forecast: null,
      name: '',
      color: REMINDER_COLORS.blue,
      date: null,
    });
    dispatch(
      addReminder({
        id: uuidv4(),
        city: nullthrows(fields.city),
        date: nullthrows(fields.date),
        color: fields.color,
        name: fields.name,
        forecast: fields.forecast,
      }),
    );
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle onClose={onClose}>Modal title</DialogTitle>
      <DialogContent>
        <FlexLayout>
          <div className={classes.form}>
            <Typography gutterBottom>{`Date: ${
              selectedDate != null ? selectedDate.format('LL') : ''
            }`}</Typography>
            <TextField
              id="reminder-name"
              label="Name"
              variant="outlined"
              fullWidth
              margin="dense"
              inputProps={{
                maxLength: 30,
              }}
              value={fields.name}
              onChange={(e) => setFields({...fields, name: e.target.value})}
              error={fieldErrors.name != null}
              helperText={fieldErrors.name}
            />
            {fields.date != null && selectedDate != null ? (
              <ReminderTimeSelect
                selectedDate={selectedDate.hour(0).minute(0).second(0)}
                value={nullthrows(fields.date)}
                onChange={(value) => setFields({...fields, date: value})}
              />
            ) : null}
            <CitySearchAutocomplete
              helperText={fieldErrors.city}
              error={fieldErrors.city != null}
              onChange={(value) => setFields({...fields, city: value})}
            />
            <ReminderColorSelect
              value={fields.color}
              onChange={(value) => setFields({...fields, color: value})}
            />
          </div>
          <div className={classes.weather}>
            <WeatherOnCity
              selectedDate={selectedDate}
              city={fields.city}
              onChange={(value) => setFields({...fields, forecast: value})}
            />
          </div>
        </FlexLayout>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onSave}>
          Save changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
