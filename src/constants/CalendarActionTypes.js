/* eslint-disable no-use-before-define */
// @flow

import type {CalendarCurrentReminderDataAction} from 'actions/CalendarCurrentReminderDataActionTypes';
import type {CalendarRemindersAction} from 'actions/CalendarRemindersActionTypes';
import type {CalendarStoreState} from 'stores/CalendarStore';

export type Dispatch = (action: Action | ThunkAction) => void;

export type Action = CalendarCurrentReminderDataAction | CalendarRemindersAction;

export type ThunkGetState = () => CalendarStoreState;

export type ThunkAction = (
  dispatch: Dispatch,
  getState: ThunkGetState,
) => void | Promise<void>;
