import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { ICustomButton } from "./types";
import { styles } from "./styles";

export default function CustomButton({
  title,
  containerStyles,
  textStyles,
  isLoading,
  ...props
}: ICustomButton) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.container,
        { backgroundColor: props.disabled ? '#999' : '#2C7429' },
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
          style={[styles.loading, { marginLeft: 8 }]}
        />
      )}
    </TouchableOpacity>
  );
};