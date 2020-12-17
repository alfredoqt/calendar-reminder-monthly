// @flow

import type {Action} from 'constants/CalendarActionTypes';
import type {Reminder} from 'constants/ReminderTypes';

import Immutable from 'immutable';
import CalendarRemindersActionTypes from 'actions/CalendarRemindersActionTypes';
import dayjs from 'dayjs';

export type CalendarRemindersStoreState = {
  // Normalization
  byId: Immutable.Map<string, Reminder>,
  ids: Immutable.List<string>,
};

function getAllRemindersIdsInDayOfMonth(
  byId: Immutable.Map<string, Reminder>,
  ids: Immutable.List<string>,
  date: dayjs.Dayjs,
): Immutable.List<string> {
  return ids.filter((id) => {
    const reminder = byId.get(id);
    if (reminder == null) {
      return false;
    }

    if (
      reminder.date.year() === date.year() &&
      reminder.date.month() === date.month() &&
      reminder.date.date() === date.date()
    ) {
      return true;
    }
    return false;
  });
}

function getAllRemindersIdsNotInDayOfMonth(
  byId: Immutable.Map<string, Reminder>,
  ids: Immutable.List<string>,
  date: dayjs.Dayjs,
): Immutable.List<string> {
  return ids.filter((id) => {
    const reminder = byId.get(id);
    if (reminder == null) {
      return false;
    }

    if (
      reminder.date.year() === date.year() &&
      reminder.date.month() === date.month() &&
      reminder.date.date() === date.date()
    ) {
      return false;
    }
    return true;
  });
}

export default function CalendarRemindersReducer(
  state: CalendarRemindersStoreState = {
    byId: Immutable.Map<string, Reminder>(),
    ids: Immutable.List<string>(),
  },
  action: Action,
): CalendarRemindersStoreState {
  switch (action.type) {
    case CalendarRemindersActionTypes.ADD_REMINDER:
      return {
        byId: state.byId.set(action.payload.id, action.payload),
        ids: state.ids.push(action.payload.id),
      };
    case CalendarRemindersActionTypes.REMOVE_REMINDER:
      const indexFound = state.ids.indexOf(action.payload);
      if (indexFound === -1) {
        return state;
      }
      return {
        byId: state.byId.delete(action.payload),
        ids: state.ids.delete(indexFound),
      };
    case CalendarRemindersActionTypes.REMOVE_REMINDERS_IN_DAY:
      return {
        byId: state.byId.deleteAll(
          getAllRemindersIdsInDayOfMonth(state.byId, state.ids, action.payload),
        ),
        ids: getAllRemindersIdsNotInDayOfMonth(state.byId, state.ids, action.payload),
      };
    case CalendarRemindersActionTypes.UPDATE_REMINDER:
      return {
        ...state,
        // Create a new reminder to make sure it's immutable
        byId: state.byId.set(action.payload.id, {
          id: action.payload.id,
          name: action.payload.name,
          date: action.payload.date.clone(),
          color: action.payload.color,
          cityName: action.payload.cityName,
          weather:
            action.payload.weather != null
              ? {
                  averageTemperature: action.payload.weather.averageTemperature,
                  icon: action.payload.weather.icon,
                  weather: action.payload.weather.weather,
                }
              : null,
        }),
      };
    default:
      return state;
  }
}
