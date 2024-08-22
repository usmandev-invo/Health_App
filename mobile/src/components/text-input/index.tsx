import React from "react";
import { View, TextInput as TextInputBase, StyleSheet } from "react-native";
import { FunctionComponent } from "@typings/function-component";
import { Props } from "./typings/text-input-props";
import {
  textInputBorderRadius,
  textInputBorderWidth,
  textInputFontSize,
  textInputHeight,
  textInputPadding,
} from "./constants";
import { Colors, FontFamily } from "@theme";

export const TextInput: FunctionComponent<Props> = ({
  textInputStyle,
  style,
  ...props
}) => {
  return (
    <View style={[styles.container, style]}>
      <TextInputBase
        placeholderTextColor={Colors.Primary}
        {...props}
        style={[styles.textInput, textInputStyle]}
      />
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    height: textInputHeight,
    borderWidth: textInputBorderWidth,
    borderColor: Colors.Black ,
    backgroundColor: Colors.Secondary,
    borderRadius: textInputBorderRadius,
    overflow: "hidden",
    width: "88%",
    alignSelf: "center",
    flexDirection: "row",
  },
  textInput: {
    paddingHorizontal: textInputPadding,
    flex: 1,
    color: Colors.Black,
    fontFamily: FontFamily.Regular,
    fontSize: textInputFontSize,
  },
  content: {
    justifyContent: "center",
    height: "100%",
  },
  leftContent: {
    paddingLeft: textInputPadding,
  },
  rightContent: {
    alignItems: "flex-end",
    paddingRight: textInputPadding,
  },
});
