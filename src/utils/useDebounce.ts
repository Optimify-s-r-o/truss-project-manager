import { SetStateAction, useEffect, useState } from 'react';

function useDebounce<T>(value: T, delay: number) {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value as SetStateAction<T>);
		}, delay);

		return () => {
			clearTimeout(handler);
		};
	}, [value]);

	return debouncedValue;
}

export { useDebounce };
