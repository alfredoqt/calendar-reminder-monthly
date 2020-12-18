// @flow

import * as React from 'react';
import {useCallback, useEffect} from 'react';
import Calendar from 'components/calendar/Calendar.react';
import ReminderDialog from 'components/reminder/ReminderDialog.react';
import useBoolean from 'hooks/useBoolean';
import {useDispatch, useMappedState} from 'stores/hooks/CalendarStoreHooks';
import {removeAll, setSelectedDate} from 'actions/CalendarCurrentReminderDataActions';

export default function CalendarApp(): React.Node {
  const {value: open, setFalse: setOpenFalse, setTrue: setOpenTrue} = useBoolean(false);
  const dispatch = useDispatch();
  const onSelectActiveDate = useCallback((date) => dispatch(setSelectedDate(date)), [
    dispatch,
  ]);
  const selectedDate = useMappedState((state) => state.currentReminderData.selectedDate);
  const selectedReminder = useMappedState(
    (state) => state.currentReminderData.selectedReminder,
  );
  const onDialogClose = useCallback(() => {
    dispatch(removeAll());
    setOpenFalse();
  }, [dispatch, setOpenFalse]);
  useEffect(() => {
    // It is never undefined, only null
    if (selectedDate !== null || selectedReminder !== null) {
      setOpenTrue();
    }
  }, [selectedDate, setOpenTrue, selectedReminder]);

  return (
    <>
      <Calendar onSelectActiveDate={onSelectActiveDate} />
      <ReminderDialog open={open} onClose={onDialogClose} />
    </>
  );
}
