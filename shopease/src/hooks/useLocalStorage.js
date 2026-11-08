
import { useState, useEffect } from 'react';

export default function useLocalStorage(key, initialValue) {
  // Read the saved value when the component first loads.
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const savedValue = localStorage.getItem(key);

      return savedValue !== null
        ? JSON.parse(savedValue)
        : initialValue;
    } catch (error) {
      console.error(
        `Unable to read LocalStorage key: ${key}`,
        error
      );

      return initialValue;
    }
  });

  // Update LocalStorage whenever the React state changes.
  useEffect(() => {
    try {
      localStorage.setItem(
        key,
        JSON.stringify(storedValue)
      );
    } catch (error) {
      console.error(
        `Unable to save LocalStorage key: ${key}`,
        error
      );
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
