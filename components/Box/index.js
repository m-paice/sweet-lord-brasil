import { View } from "react-native";

export const Box = ({ children, row, center, gap }) => {
  return (
    <View
      style={{
        flexDirection: row ? "row" : "column",
        alignItems: center ? "center" : "",
        justifyContent: center ? "center" : "",
        gap: gap ? gap : 10,
      }}
    >
      {children}
    </View>
  );
};
