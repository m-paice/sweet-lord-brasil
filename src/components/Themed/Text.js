import React from "react";
import { Text, StyleSheet } from "react-native";

export const ThemedText = ({
  children,
  color = "primary",
  size = "md",
  center = false,
}) => {
  const getColor = (themeColor) => {
    switch (themeColor) {
      case "primary":
        return "#fff";
      case "secondary":
        return "#E62948";
      case "tertiary":
        return "#FBF2C0";

      default:
        return "#333";
    }
  };

  const getSize = (themeSize) => {
    switch (themeSize) {
      case "xsm":
        return 16;
      case "sm":
        return 20;
      case "md":
        return 26;
      case "lg":
        return 32;

      default:
        return 16;
    }
  };

  const textColor = getColor(color);
  const textSize = getSize(size);

  return (
    <Text
      style={[
        {
          color: textColor,
          fontSize: textSize,
          textAlign: center ? "center" : "left",
        },
      ]}
    >
      {children}
    </Text>
  );
};
