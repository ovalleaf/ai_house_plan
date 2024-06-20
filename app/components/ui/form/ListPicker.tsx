import { useState } from "react";

export function ListPicker<T>({ options, onChange, defaultValue }: Props<T>) {
	const [selected, setSelected] = useState(defaultValue);

	const handleChange = (newValue: T) => {
		setSelected(newValue);
		onChange(newValue);
	};

	return (
		<div className="flex gap-4">
			{options.map((option) => (
				<button
					type="button"
					onClick={() => handleChange(option.value)}
					key={option.value as string}
					className={`text-sm rounded-md py-2 px-4 shadow-sm border border-gray-700 ${
						selected === option.value
							? "border-primary text-white"
							: "bg-gray-700/10 opacity-50"
					}`}
				>
					{option.label}
				</button>
			))}
		</div>
	);
}
export interface Props<T> {
	defaultValue?: T;
	options: { label: string; value: T }[];
	onChange: (value: T) => void;
}
