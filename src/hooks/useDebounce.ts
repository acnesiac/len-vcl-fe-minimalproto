import { useEffect, useRef, useState } from "react";
import { BehaviorSubject } from "rxjs";
import { debounceTime, tap } from "rxjs/operators";

export function useDebounce<T>(initialValue: T, time: number = 400): [T, T, (nextValue: T) => void, boolean] {
  const subjectRef = useRef(new BehaviorSubject<T>(initialValue));
  const [value, setValue] = useState<T>(initialValue);
  const [delayed, setDelayed] = useState<T>(initialValue);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const subscription = subjectRef.current
      .pipe(
        debounceTime(time),
        tap(value => {
          setDelayed(value);
          setLoading(false);
        }),
      )
      .subscribe();
    return () => {
      subscription.unsubscribe();
    };
  }, [time]);

  return [
    value,
    delayed,
    (nextValue: T) => {
      setLoading(true);
      setValue(nextValue);
      subjectRef.current.next(nextValue);
    },
    loading,
  ];
}
