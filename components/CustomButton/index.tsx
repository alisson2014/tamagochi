import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { ICustomButton } from "./types";
import { styles } from "./styles";

export default function CustomButton({
  title,
  containerStyles,
  textStyles,
  ...props
}: ICustomButton) {
  const { disabled: isLoading } = props;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.container,
        { opacity: isLoading ? 80 : 100 }
      ]}
      {...props}
    >
      <Text style={styles.text}>
        {title}
      </Text>

      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          style={styles.loading}
        />
      )}
    </TouchableOpacity>
  );
};