import { Layout } from "@/components/dom/Layout";
import "@/globals.css";

export const metadata = {
	title: "Generate building plan",
	description:
		"Generate building plan using AI to create efficient, sustainable, and aesthetically pleasing architectural designs.",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" className="antialiased">
			<head />
			<body className="dark">
				<div className="dark:bg-gray-950 bg-white dark:text-white text-black h-screen w-screen">
					<Layout>{children}</Layout>
				</div>
			</body>
		</html>
	);
}
