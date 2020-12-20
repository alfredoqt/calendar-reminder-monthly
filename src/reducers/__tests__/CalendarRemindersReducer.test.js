// @flow

import type {Reminder} from 'constants/ReminderTypes';
import type {CalendarRemindersStoreState} from 'reducers/CalendarRemindersReducer';

import {addReminder} from 'actions/CalendarRemindersActions';
import Immutable from 'immutable';
import dayjs from 'dayjs';
import {REMINDER_COLORS} from 'constants/ReminderTypes';
import CalendarRemindersReducer from 'reducers/CalendarRemindersReducer';

// $FlowFixMe
describe('CalendarRemindersReducer', () => {
  // $FlowFixMe
  it('should add reminder', () => {
    // Initialize mockstore with empty state
    const initialState: CalendarRemindersStoreState = {
      byId: Immutable.Map<string, Reminder>(),
      ids: Immutable.List<string>(),
    };

    const reminder: Reminder = {
      id: '123',
      forecast: null,
      city: {
        description: 'test',
        place_id: 'test',
        structured_formatting: {
          main_text: 'test',
          secondary_text: 'test',
        },
      },
      color: REMINDER_COLORS.blue,
      name: 'test',
      date: dayjs('2018-04-04T16:00:00.000Z'),
    };

    // $FlowFixMe
    expect(CalendarRemindersReducer(initialState, addReminder(reminder))).toEqual({
      ids: Immutable.List<string>().push(reminder.id),
      byId: Immutable.Map<string, Reminder>().set(reminder.id, reminder),
    });
  });
});
