import styled from "styled-components";
import {ScrollView as ScrollViewBase} from "react-native";

export const ScrollView = styled(ScrollViewBase).attrs(() => ({
  keyboardShouldPersistTaps: "always"
}))``;
