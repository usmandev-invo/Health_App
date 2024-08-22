import { SafeAreaView as SafeAreaViewBase } from "react-native";
import styled from "styled-components";
import { Colors } from "@theme";

export const SafeAreaView = styled(SafeAreaViewBase)`
  background-color: ${Colors.White};
  flex: 1;
`;
