import VectorIcon from "react-native-vector-icons/FontAwesome";

export const Icon = ({ name, size = 30, onPress }) => (
  <VectorIcon onPress={onPress} name={name} size={size} color="#E62948" />
);
