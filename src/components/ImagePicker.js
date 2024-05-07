import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Alert,
  Pressable,
  Text,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import Button from "./Button";
import ImageViewer from "./ImageViewer";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import SvgComponent from "../../assets/CameraSvg";
import RemoveSvg from "../../assets/RemoveSvg";
import GallerySvg from "../../assets/GallerySvg";

const PlaceholderImage = require("../../assets/favicon.png");

export default function ImagePiker({ onPresspasspropsToParent, setSelectedImage, selectedImage, name, setName }) {
// console.log(selectedImage,"LLLL222L");
  
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
      allowsMultipleSelection: true,
    });
    // console.log(result.assets,"[[[[[[");
    if (result.assets && result.assets.length > 0) {
      const base64Images = await Promise.all(
        result.assets.map((asset) => (asset.uri))
      );
      setSelectedImage(base64Images);
      const imagesInfo = result.assets.map((asset, index) => ({
        // base64: base64Images[index],
        mimeType: asset.type,
        fileName: asset.fileName,
        uri: asset.uri,
      }));
      setName(imagesInfo[0].fileName);
      onPresspasspropsToParent(imagesInfo);
    } 
  };
  const convertToBase64 = async (uri) => {
    try {
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      return `data:image/jpeg;base64,${base64}`;
    } catch (error) {
      console.error(error);
    }
  };

  const captureImageAsync = async () => {
    let cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
    if (cameraPermission.status !== "granted") {
      Alert.alert(
        "Permission required",
        "Camera access is required to take pictures."
      );
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const base64Image = (result.assets[0].uri);
      setSelectedImage(Array (base64Image));
      const asset = result.assets[0];
      // console.log(asset?.fileNamem,"asset.fileName")
      setName(asset?.fileName);

      const imageInfo = {
        // base64: base64Image,
        mimeType: asset.mimeType,
        fileName: asset.fileName,
        uri: asset.uri,
      };

      onPresspasspropsToParent(imageInfo);
    } 
  };

  const removeImage = () => {
    setSelectedImage([]);
    onPresspasspropsToParent([]);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.imageContainer}
      >
        {selectedImage?.length > 0 &&
          selectedImage.map((i,index) => {
            return (
              <>
              <ImageViewer
                placeholderImageSource={PlaceholderImage}
                selectedImage={i}
                key={index}
              />
              </>
              
            );
          })}
      </ScrollView>

      <View style={styles.footerContainer}>
        {selectedImage.length > 0 ? (
          <View style={styles.NamebuttonContainer}>
            <View style={[styles.button, { backgroundColor: "#fff" }]}>
              <Text style={[styles.buttonLabel, { color: "#25292e" }]}>
                {name&& name.slice(0,25)}
              </Text>

              <Pressable onPress={removeImage} style={{ marginLeft: 5 }}>
                <RemoveSvg />
              </Pressable>
            </View>
          </View>
        ) : (
          <>
            <View style={styles.buttonContainer}>
              <Pressable
                style={[styles.button, { backgroundColor: "#fff" }]}
                onPress={pickImageAsync}
              >
                <GallerySvg/>
              </Pressable>
            </View>
            <View
              style={[
                styles.buttonContainer,
                { backgroundColor: "#fff", marginLeft: 10, marginRight: 10 },
              ]}
            >
              <Pressable
                style={[styles.button, { backgroundColor: "#fff" }]}
                onPress={captureImageAsync}
              >
              
                <SvgComponent />
              </Pressable>
            </View>
          </>
        )}
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    borderRadius: 10,
    height: 22,
  },
  imageContainer: {
    paddingVertical: 4,
    flexDirection: "row",
  },
  footerContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  buttonContainer: {
    display: "flex",
    height: 50,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
    borderColor: "#D3D3D3",
    borderRadius: 10,
    borderWidth: 1.4,
    marginLeft: 3,

  },
  NamebuttonContainer: {
    display: "flex",
    height: 40,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 1,
    borderColor: "#D3D3D3",
    borderRadius: 10,
    borderWidth: 1.4,
    marginLeft: 3,
  },
  button: {
    borderRadius: 5,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonLabel: {
    color: "#fff",
    fontSize: 22,
  },
  buttonIcon: {
    paddingRight: 8,
  },
});
