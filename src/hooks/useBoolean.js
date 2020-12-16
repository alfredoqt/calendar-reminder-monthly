// @flow

import {useState, useCallback} from 'react';

export default function useBoolean(
  initialValue: boolean,
): $ReadOnly<{|
  value: boolean,
  set: (boolean | ((boolean) => boolean)) => void,
  toggle: () => void,
  setTrue: () => void,
  setFalse: () => void,
|}> {
  const [value, setValue] = useState(initialValue);

  return {
    set: setValue,
    value,
    toggle: useCallback(() => setValue((v) => !v), []),
    setTrue: useCallback(() => setValue(true), []),
    setFalse: useCallback(() => setValue(false), []),
  };
}
