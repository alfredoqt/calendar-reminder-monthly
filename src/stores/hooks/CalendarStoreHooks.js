// @flow

import type {Action, Dispatch} from 'constants/CalendarActionTypes';
import type {CalendarStore, CalendarStoreState} from 'stores/CalendarStore';
import type {ReduxReactHooks} from 'redux-react-hook';

import {create} from 'redux-react-hook';
import shallowEqual from 'shallowequal';

// Example in Flow where you have defined IState and Action
export const {StoreContext, useDispatch, useMappedState} = (create({
  defaultEqualityCheck: shallowEqual,
}): ReduxReactHooks<CalendarStoreState, Action, Dispatch, CalendarStore>);
