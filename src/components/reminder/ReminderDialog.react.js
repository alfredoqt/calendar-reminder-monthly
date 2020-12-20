// @flow

import type {PlacePrediction} from 'constants/GoogleAPITypes';
import type {OpenWeatherForecastDay} from 'constants/OpenWeatherTypes';
import type {ReminderColor} from 'constants/ReminderTypes';

import * as React from 'react';
import {useCallback, useEffect, useState} from 'react';
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
import {
  addReminder,
  updateReminder,
  removeReminder,
} from 'actions/CalendarRemindersActions';
import DeleteIcon from '@material-ui/icons/Delete';

// Leaving this components here instead of their separate files
// since they are pretty small
const useTitleStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    flexGrow: 1,
  },
  button: {
    marginRight: theme.spacing(1),
  },
}));

type TitleProps = $ReadOnly<{
  children: React.Node,
  onClose: () => void,
  enableDelete: boolean,
  onDelete: () => void,
}>;

function DialogTitle({
  children,
  enableDelete = false,
  onClose,
  onDelete,
}: TitleProps): React.Node {
  const classes = useTitleStyles();
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography className={classes.title} variant="h6">
        {children}
      </Typography>
      {enableDelete ? (
        <IconButton className={classes.button} onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      ) : null}
      <IconButton className={classes.button} onClick={onClose}>
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
  const selectedReminder = useMappedState(
    (state) => state.currentReminderData.selectedReminder,
  );
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
      setFields({
        city: null,
        forecast: null,
        name: '',
        color: REMINDER_COLORS.blue,
        date: selectedDate.hour(0).minute(0).second(0),
      });
    } else if (selectedReminder != null) {
      setFields({
        city: selectedReminder.city,
        forecast: selectedReminder.forecast,
        name: selectedReminder.name,
        color: selectedReminder.color,
        date: selectedReminder.date.hour(0).minute(0).second(0),
      });
    }
  }, [selectedDate, selectedReminder]);

  const handleClose = useCallback(() => {
    setFields({
      city: null,
      forecast: null,
      name: '',
      color: REMINDER_COLORS.blue,
      date: null,
    });
    onClose();
  }, [setFields, onClose]);

  const onDelete = useCallback(() => {
    if (selectedReminder != null) {
      dispatch(removeReminder(selectedReminder.id));
      handleClose();
    }
  }, [dispatch, selectedReminder, handleClose]);

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

    if (selectedReminder != null) {
      dispatch(
        updateReminder({
          id: selectedReminder.id,
          city: nullthrows(fields.city),
          date: nullthrows(fields.date),
          color: fields.color,
          name: fields.name,
          forecast: fields.forecast,
        }),
      );
    } else {
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
    }
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle
        enableDelete={selectedReminder != null}
        onClose={handleClose}
        onDelete={onDelete}
      >
        {selectedReminder != null ? 'Update Reminder' : 'Add Reminder'}
      </DialogTitle>
      <DialogContent>
        <FlexLayout>
          <div className={classes.form}>
            <Typography gutterBottom>{`Date: ${
              selectedReminder != null || selectedDate != null
                ? selectedReminder != null
                  ? selectedReminder.date.format('LL')
                  : nullthrows(selectedDate?.format('LL'))
                : ''
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
            {fields.date != null &&
            (selectedDate != null || selectedReminder?.date != null) ? (
              <ReminderTimeSelect
                selectedDate={
                  selectedReminder?.date != null
                    ? nullthrows(selectedReminder?.date.hour(0).minute(0).second(0))
                    : nullthrows(selectedDate?.hour(0).minute(0).second(0))
                }
                value={nullthrows(fields.date)}
                onChange={(value) => setFields({...fields, date: value})}
              />
            ) : null}
            <CitySearchAutocomplete
              value={fields.city}
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
