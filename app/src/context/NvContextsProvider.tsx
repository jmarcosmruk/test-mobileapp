import * as React from "react";
import NvPermissionsProvider from "./NvPermissionsProvider";
import ThemeProvider from "./ThemeProvider";

export default function NvContextsProvider({ children }) {
	return (
		<ThemeProvider>
			<NvPermissionsProvider>{children}
			</NvPermissionsProvider>
		</ThemeProvider>
	);
}
