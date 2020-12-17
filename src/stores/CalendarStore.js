// @flow

import type {CalendarCurrentReminderDataStoreState} from 'reducers/CalendarCurrentReminderDataReducer';
import type {CalendarRemindersStoreState} from 'reducers/CalendarRemindersReducer';
import type {Action, Dispatch} from 'constants/CalendarActionTypes';
import type {Store} from 'redux';

import CalendarCurrentReminderDataReducer from 'reducers/CalendarCurrentReminderDataReducer';
import CalendarRemindersReducer from 'reducers/CalendarRemindersReducer';
import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

export type CalendarStoreState = {
  currentReminderData: CalendarCurrentReminderDataStoreState,
  reminders: CalendarRemindersStoreState,
};

type CalendarRootReducerType = (
  state: CalendarStoreState,
  action: Action,
) => CalendarStoreState;

export type CalendarStore = Store<CalendarStoreState, Action, Dispatch>;

const rootReducer: CalendarRootReducerType = combineReducers({
  currentReminderData: CalendarCurrentReminderDataReducer,
  reminders: CalendarRemindersReducer,
});

const store: CalendarStore = createStore(rootReducer, applyMiddleware(thunk));

export default store;
