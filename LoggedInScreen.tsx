import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { Alert, Text, Pressable, ActivityIndicator } from "react-native";
import auth from "./firebase";
import SafeAreaWrapper from "./SafeAreaWrapper";

const LoggedInScreen = ({ navigation }: any) => {
  const user = auth.currentUser;
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = () => {
    setIsLoading(true);

    signOut(auth)
      .then(() => {
        setTimeout(() => {
          setIsLoading(false);
          Alert.alert("Logged out", "You have been successfully logged out.");
          navigation.replace("Home");
        }, 1000);
      })
      .catch((error) => {
        setIsLoading(false);
        Alert.alert("Logout failed", error.message);
      });
  };

  return (
    <SafeAreaWrapper
      style={{
        paddingHorizontal: 16,
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
      }}
    >
      <Text
        style={{
          fontSize: 28,
          color: "#ffffff",
          textAlign: "center",
          fontFamily: "IBMPlexSans_700Bold",
        }}
      >
        Welcome to the app, {user?.displayName}!
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: "#81A4CD",
          textAlign: "center",
          fontFamily: "IBMPlexSans_400Regular",
        }}
      >
        Email: {user?.email}
      </Text>
      <Pressable
        onPress={handleSignOut}
        style={{
          backgroundColor: "#FF810A",
          padding: 16,
          borderRadius: 8,
          alignItems: "center",
          marginTop: 32,
          width: 150,
        }}
      >
        {!isLoading ? (
          <Text
            style={{
              color: "#04252c",
              fontFamily: "IBMPlexSans_500Medium",
            }}
          >
            Log out
          </Text>
        ) : (
          <ActivityIndicator color="#04252c" />
        )}
      </Pressable>
    </SafeAreaWrapper>
  );
};

export default LoggedInScreen;
