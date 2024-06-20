"use client";

import { Button, Form, FormProps } from "@/components/ui";
import {
	useGeneratePlan,
	type GeneratedPlanResults,
	type Type,
} from "../hooks/useGeneratePlan";
import { useState } from "react";

export function GeneratePlan() {
	const [response, setResponse] = useState<GeneratedPlanResults>();
	const { onSubmit, schema, fields } = useGeneratePlan({
		onCompleted: (results) => {
			setResponse(results);
		},
	});

	if (response) {
		return (
			<div className="flex flex-col w-full gap-4 place-items-center">
				<div
					// biome-ignore lint/security/noDangerouslySetInnerHtml: I know what i am doing 😅
					dangerouslySetInnerHTML={{ __html: response }}
					className="text-xs w-full"
				/>
				<Button onClick={() => setResponse(undefined)} variant="destructive">
					Restart
				</Button>
			</div>
		);
	}

	return (
		<div className="grid w-full mx-auto">
			<Form
				onSubmit={onSubmit}
				initialValues={{}}
				schema={schema}
				// biome-ignore lint/suspicious/noExplicitAny: This is dynamic
				fields={fields as any}
				actionText="Generate plan"
			/>
		</div>
	);
}
