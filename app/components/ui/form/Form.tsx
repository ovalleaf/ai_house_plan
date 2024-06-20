import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import {
	useForm as useNativeForm,
	type DefaultValues,
	type Path,
} from "react-hook-form";
import type { TypeOf, z } from "zod";

import { Loader } from "../Loader";
import { Button } from "../button";
import {
	FormControl,
	FormItem,
	FormMessage,
	Form as NativeForm,
	FormField as NativeFormField,
} from "../native-form";
import { ListPicker } from "./FormField";

const ComponentLookup = {
	ListPicker: ListPicker,
} as const;

export function Form<T extends z.ZodObject<any, any>>(props: FormProps<T>) {
	const form = useNativeForm<z.infer<typeof props.schema>>({
		resolver: zodResolver(props.schema),
		defaultValues: (props.initialValues || {}) as DefaultValues<TypeOf<T>>,
	});

	const unhandledErrors = useMemo(() => {
		const { errors } = form.formState;
		return Object.keys(errors)
			.reduce((all, key) => {
				if (!props.fields.some((v) => v.name === key)) {
					all.push(`${key}: ${errors[key]?.message}`);
				}

				return all;
			}, [] as string[])
			.join("\n");
	}, [form.formState, props.fields]);
	const loading = form.formState.isSubmitting || form.formState.isLoading;

	return (
		<NativeForm {...form}>
			<form
				onSubmit={form.handleSubmit(props.onSubmit)}
				className="flex flex-col w-full gap-8"
			>
				<section className="grid grid-cols-2 gap-8">
					{props.fields.map(
						({ name, className, label, type, ...rest }, index) => (
							<NativeFormField
								key={name.toString()}
								control={form.control}
								name={name as Path<z.infer<T>>}
								render={({ field }) => {
									const Component = ComponentLookup[type];

									return (
										<FormItem className={className ?? "col-span-2"}>
											<FormControl>
												<Component {...field} {...rest} label={label} />
											</FormControl>
											<FormMessage />
										</FormItem>
									);
								}}
							/>
						),
					)}
				</section>
				{unhandledErrors && (
					<span className="py-2 text-sm font-bold text-destructive text-center">
						{unhandledErrors}
					</span>
				)}
				{loading ? (
					<Loader />
				) : (
					<Button size="lg" type="submit">
						{props.actionText || "Save changes"}
					</Button>
				)}
			</form>
		</NativeForm>
	);
}

export interface FormProps<T extends z.ZodObject<any, any>> {
	schema: T;
	initialValues?: Partial<z.infer<T>>;
	onSubmit: (data: z.infer<T>) => void;
	fields: FieldProps<T>[];
	actionText?: string;
}

export type FieldProps<T extends z.ZodObject<any, any>> = {
	name: keyof z.infer<T>;
	label?: string;
	className?: string;
	icon?: string;
} & {
	type: "ListPicker";
	options: { label: string; value: string }[];
};

export interface FormFieldProps<T> {
	initialValue?: T;
	label?: string;
	onChange: (update: T) => void;
}
