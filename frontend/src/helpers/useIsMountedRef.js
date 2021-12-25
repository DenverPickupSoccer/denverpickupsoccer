import { useEffect, useRef } from 'react'

// The purpose of this helper function is to make sure that an unmounted component
// isn't updated. This can happen when a `state` is updated within the `useEffect`
// of a component after the component has been unmounted.
//
// To use this function within a component, simply set the result of this function
// to a variable and check `isMountedRef.current` is true before making state updates.
//
// const isMountedRef = useIsMountedRef();
// useEffect(() => {
//   fetchSomeData()
//   .then(data => {
//     if (isMountedRef.current) setData(data)
//   })
// }, [isMountedRef])
const useIsMountedRef = () => {
  const isMountedRef = useRef(null);
  useEffect(() => {
    isMountedRef.current = true;
    return () => isMountedRef.current = false;
  }, []);
  return isMountedRef;
}

export default useIsMountedRef;
