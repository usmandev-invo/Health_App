import React from "react";
import {StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View} from "react-native";
import {Colors, FontFamily} from "@theme";
import {FunctionComponent} from "@typings/function-component.ts";
import styled from "styled-components";

interface Props extends TouchableOpacityProps {}

export const Button: FunctionComponent<Props> = ({children, disabled, ...props}) => {
  return (
    <TouchableOpacity disabled={disabled} {...props}>
      <Container disabled={disabled}>
        {typeof children === "string" ? <Text style={styles.text}>{children}</Text> : children}
      </Container>
    </TouchableOpacity>
  );
};

const Container = styled(View)<{disabled?: boolean}>`
  background-color: ${({disabled}) => (disabled ? Colors.TextGrey : Colors.Primary)};
  padding: 7.5px 20px;
  border-radius: 30px;
  height: 43px;
  align-items: center;
  justify-content: center;
`;

const styles = StyleSheet.create({
  text: {
    color: Colors.White,
    textAlign: "center",
    fontFamily: FontFamily.Medium,
    fontSize: 16,
    letterSpacing: 0.32
  }
});
