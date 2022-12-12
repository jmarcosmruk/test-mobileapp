import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableRipple } from "react-native-paper";
import { useTheme } from "../context/ThemeProvider";

const Button = ({
	style = {} || [{}],
	textStyle = {} || [],
	title,
	onPress,
	disabled = false,
	shadow = true,
	rounded = true,
	disabled_textStyle = {} || [{}],
	height = 30,
	border = true,
}) => {
	const { theme } = useTheme();

	const styles = createStyles(border, disabled, height, theme);

	return (
		<View
			style={[
				shadow && styles.shadow,
				rounded && styles.rounded,
				style,
				{ overflow: "hidden" },
			]}
		>
			<TouchableRipple
				rippleColor={"#FFF"}
				style={[
					shadow && styles.shadow,
					rounded && styles.rounded,
					styles.inner,
				]}
				disabled={disabled}
				onPress={onPress}
			>
				<Text
					style={[
						styles.txt,
						textStyle,
						disabled && disabled_textStyle,
					]}
				>
					{title}
				</Text>
			</TouchableRipple>
		</View>
	);
};
export default Button;

function createStyles(border, disabled, height, theme?: Theme) {
	return StyleSheet.create({
		inner: {
			backgroundColor: disabled ? theme.secondary : theme.primary,
			height: height,
			justifyContent: "center",
			borderColor: theme.dark ? theme.primary : theme.secondary,
			borderWidth: border ? StyleSheet.hairlineWidth : 0,
		},
		txt: {
			textAlign: "center",
			color: disabled ? theme.text_sec : theme.text_prim,
			fontSize: 20,
			fontFamily: "century-gothic",
		},
		shadow: {
			shadowColor: "#000",
			shadowOffset: {
				width: 1,
				height: 1,
			},
			shadowOpacity: 0.5,
			shadowRadius: 1.3,
			elevation: 2,
		},
		rounded: {
			borderRadius: height,
			// width: '125%'
		},
	});
}
