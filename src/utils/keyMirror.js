// @flow

// $ObjMapi calls (at the type level) the function F in $ObjMap<T, F>
// for every (key, value) and returns the object type for those (key, value)
// In this case, it will return the type of the key
// {...} would be similar to {[string]: any}
export default function keyMirror<T: {...}>(obj: T): $ObjMapi<T, <K>(K) => K> {
  const result = {};
  for (const key in obj) {
    result[key] = key;
  }
  return result;
}
