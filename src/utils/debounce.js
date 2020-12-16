// @flow

export default function debounce<Args: $ReadOnlyArray<mixed>>(
  fn: (...args: Args) => mixed,
  wait: number,
  context?: mixed = null,
): (...Args) => void {
  let timer;
  return function debouncer(...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, wait);
  };
}
