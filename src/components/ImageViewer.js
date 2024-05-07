import React from "react";
import { StyleSheet, Image, View } from "react-native";
import PlaceholderImage from "../../assets/favicon.png";

export default function ImageViewer({ selectedImage }) {
  // Determine the image source URI
  const imageUri = selectedImage && selectedImage ? selectedImage : "null";

  console.log("imageUri", imageUri);

  return (
    <View style={{ marginHorizontal: 2 }}>
      {/* <Image source={{ uri: imageUri }} defaultSource={PlaceholderImage} style={styles.image} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 70,
    borderRadius: 10,
  },
});
