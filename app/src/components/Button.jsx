import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableRipple } from "react-native-paper";

const Button = ({
	color = "#18A",
	style = {} || [{}],
	textStyle = {} || [],
	title,
	onPress,
	disabled = false,
	disabledColor = "#aaa",
	shadow = true,
	rounded = true,
	disabled_textStyle = {} || [{}],
	height = 30,
}) => {
	const styles = createStyles(disabled ? disabledColor : color, height);

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

function createStyles(color, height) {
	return StyleSheet.create({
		inner: {
			backgroundColor: color,
			height: height,
			justifyContent: "center",
		},
		txt: {
			textAlign: "center",
			color: "#FFF",
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
