import Icon from "@mdi/react";
import { Label } from "../label";
import {
	ListPicker as NativeListPicker,
	type Props as NativeListPickerProps,
} from "./ListPicker";

function createListPicker() {
	return function CreatedListPicker<T>(
		props: NativeListPickerProps<T> & {
			label: string;
			name: string;
			icon?: string;
		},
	) {
		return (
			<section className="flex flex-col gap-2">
				<Label>{props.label ?? props.name}</Label>
				<div className="flex gap-4 items-center">
					{props.icon && <Icon path={props.icon} title={props.icon} size={1} />}
					<div>
						<NativeListPicker
							onChange={props.onChange}
							defaultValue={props.defaultValue}
							options={props.options}
						/>
					</div>
				</div>
			</section>
		);
	};
}

export const ListPicker = createListPicker();
