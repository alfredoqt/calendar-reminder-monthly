// @flow

import type {Reminder} from 'constants/ReminderTypes';
import type {CalendarCurrentReminderDataAction} from 'actions/CalendarCurrentReminderDataActionTypes';

import dayjs from 'dayjs';
import CalendarCurrentReminderDataActionTypes from 'actions/CalendarCurrentReminderDataActionTypes';

export function setSelectedDate(date: dayjs.Dayjs): CalendarCurrentReminderDataAction {
  return {
    type: CalendarCurrentReminderDataActionTypes.SET_SELECTED_DATE,
    payload: date,
  };
}

export function removeSelectedDate(): CalendarCurrentReminderDataAction {
  return {
    type: CalendarCurrentReminderDataActionTypes.REMOVE_SELECTED_DATE,
  };
}

export function setSelectedReminder(
  reminder: Reminder,
): CalendarCurrentReminderDataAction {
  return {
    type: CalendarCurrentReminderDataActionTypes.SET_SELECTED_REMINDER,
    payload: reminder,
  };
}

export function removeSelectedReminder(): CalendarCurrentReminderDataAction {
  return {
    type: CalendarCurrentReminderDataActionTypes.REMOVE_SELECTED_REMINDER,
  };
}

export function removeAll(): CalendarCurrentReminderDataAction {
  return {
    type: CalendarCurrentReminderDataActionTypes.REMOVE_ALL,
  };
}
