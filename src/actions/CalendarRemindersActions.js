// @flow

import type {Reminder} from 'constants/ReminderTypes';
import type {CalendarRemindersAction} from 'actions/CalendarRemindersActionTypes';

import CalendarRemindersActionTypes from 'actions/CalendarRemindersActionTypes';
import dayjs from 'dayjs';

export function addReminder(reminder: Reminder): CalendarRemindersAction {
  return {
    type: CalendarRemindersActionTypes.ADD_REMINDER,
    payload: reminder,
  };
}

export function removeReminder(id: string): CalendarRemindersAction {
  return {
    type: CalendarRemindersActionTypes.REMOVE_REMINDER,
    payload: id,
  };
}

export function removeRemindersInDay(date: dayjs.Dayjs): CalendarRemindersAction {
  return {
    type: CalendarRemindersActionTypes.REMOVE_REMINDERS_IN_DAY,
    payload: date,
  };
}

export function updateReminder(reminder: Reminder): CalendarRemindersAction {
  return {
    type: CalendarRemindersActionTypes.UPDATE_REMINDER,
    payload: reminder,
  };
}
