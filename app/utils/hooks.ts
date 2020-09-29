import { useState, useCallback } from 'react';

type RSetter<T> = React.Dispatch<React.SetStateAction<T>>;
type RInputEv = React.ChangeEvent<HTMLInputElement>;

export const useInput = (initialValue: string): readonly [string, (e: RInputEv) => void, RSetter<string>] => {
  const [value, setValue] = useState(initialValue);
  const onChange = useCallback((e: RInputEv) => setValue(e.target.value), []);
  return [value, onChange, setValue] as const;
};
