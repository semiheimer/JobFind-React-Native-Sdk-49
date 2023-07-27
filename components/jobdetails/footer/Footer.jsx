import { View, Text, Pressable, Image, Linking } from "react-native";
import styles from "./footer.style";
import { icons } from "../../../constants";
import { useState } from "react";

const Footer = ({ url }) => {
  const [isPressed, setIsPressed] = useState(false);
  return (
    <View style={styles.container}>
      <Pressable
        style={[
          styles.likeBtn,
          isPressed ? { backgroundColor: "#F37453" } : null,
        ]}
        onPress={() => setIsPressed((prev) => !prev)}
      >
        <Image
          source={icons.heartOutline}
          resizeMode="contain"
          style={[
            styles.likeBtnImage,
            isPressed ? { tintColor: "white" } : null,
          ]}
        />
      </Pressable>

      <Pressable style={styles.applyBtn} onPress={() => Linking.openURL(url)}>
        <Text style={styles.applyBtnText}>Apply for job</Text>
      </Pressable>
    </View>
  );
};

export default Footer;
