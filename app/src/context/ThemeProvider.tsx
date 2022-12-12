import * as React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { Appearance, Dimensions } from "react-native";

export const windowDimensions = {
	height: Dimensions.get("window").height,
	width: Dimensions.get("window").width,
};

export const screenDimensions = {
	height: Dimensions.get("screen").height,
	width: Dimensions.get("screen").width,
};

export const ThemeContext = createContext<any>({
	theme: useAllThemes()[0].dark,
	setTheme: () => {},
});

export default function ThemeProvider({ children }) {
	const [theme, setTheme] = useState(getTheme());
	const [scheme, setScheme] = useState("dark");

	useEffect(() => {
		let subscription = Appearance.addChangeListener(({ colorScheme }) => {
			//   console.log("CURRENT COLORSCHEME = " + JSON.stringify(colorScheme));

			setScheme(colorScheme);
		});

		return () => {
			subscription.remove();
		};
	}, []);
	useEffect(() => {
		//   console.log("Mudando Theme" );
		setTheme(getTheme());
	}, [, scheme]);

	function getTheme() {
		// console.log("GET_THEME");
		var selected = useAllThemes()[0].dark;
		
		return selected;
	}
	return (
		<ThemeContext.Provider value={{ theme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme(): { theme: Theme; setTheme: (value: Theme) => void } {
	
	const con = useContext(ThemeContext);
	
	const { theme, setTheme } = con;
	return { theme, setTheme };
}

export function isDarkTheme() {
	const con = useContext(ThemeContext);
	const { theme, setTheme } = con;
	return theme.dark;
}

export function useAllThemes() {
	
	const themes: Array<ThemeType> = [
		{
			label: "Golden",
			light: {
				name: "Golden",
				dark: false,
				background: "#EEEEEE",
				primary: "#F46900",
				secondary: "#1E1E1E",
				warn: "#AA2222",
				text_back: "#333333",
				text_prim: "#EEEEEE",
				text_sec: "#EEEEEE",
			},
			dark: {
				name: "Golden",
				dark: true,
				background: "#1A1B1F",
				primary: "#F46900",
				secondary: "#555555",
				warn: "#AA2222",
				text_back: "#EEEEEE",
				text_prim: "#EEEEEE",
				text_sec: "#F46900",
			},
		}
	];
	return themes;
}
