"use client";

import { GeneratePlan } from "@/generate-plan";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Suspense } from "react";

const House3D = dynamic(
	() => import("@/components/canvas/House3D").then((mod) => mod.House3D),
	{ ssr: false },
);
const View = dynamic(
	() => import("@/components/canvas/View").then((mod) => mod.View),
	{
		ssr: false,
		loading: () => (
			<div className="flex h-96 w-full flex-col items-center justify-center">
				{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
				<svg
					className="-ml-1 mr-3 h-5 w-5 animate-spin text-black"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle
						className="opacity-25"
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						strokeWidth="4"
					/>
					<path
						className="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					/>
				</svg>
			</div>
		),
	},
);
const Common = dynamic(
	() => import("@/components/canvas/View").then((mod) => mod.Common),
	{ ssr: false },
);

export default function Page() {
	return (
		<section className="flex flex-col h-screen p-16">
			<div className="mx-auto flex w-full flex-col flex-wrap items-center md:flex-row  lg:w-4/5">
				{/* jumbo */}
				<div className="flex w-full items-center gap-2">
					<Image
						src="/img/logo.png"
						width={100}
						height={100}
						alt="logo"
						className="h-[13vh] w-auto "
					/>
					<div className="items-center grid">
						<p className="font-semibold text-3xl">Ovalleaf</p>
						<p className="text-sm">
							Get your building plan with <strong>AI</strong>
						</p>
					</div>
				</div>
			</div>

			<div className="mx-auto flex w-full flex-wrap justify-center items-start p-12 gap-4">
				<div className="flex-1">
					<div className="flex flex-col gap-6 shadow-md rounded-xl justify-center bg-gray-900/60 relative p-10 flex-1 mx-auto max-w-lg">
						<span className="flex font-bold text-xl pb-8">
							Let&apos;s get your plan generated
						</span>
						<GeneratePlan />
					</div>
				</div>
				<div className="relative flex-1">
					<View orbit className="relative h-[60vh] sm:w-full">
						<Suspense fallback={null}>
							<House3D
								scale={2}
								position={[0, 0, 0]}
								rotation={[0.3, -0.3, 0]}
							/>
							<Common color={""} />
						</Suspense>
					</View>
				</div>
			</div>
		</section>
	);
}
