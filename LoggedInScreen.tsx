import { signOut } from "firebase/auth";
import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import auth from "./firebase";

const LoggedInScreen = ({ navigation }) => {
  const user = auth.currentUser;

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        Alert.alert("Logged out", "You have been successfully logged out.");
        navigation.replace("Login"); // Redirect to login screen
      })
      .catch((error) => {
        Alert.alert("Logout failed", error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {user?.email}!</Text>
      <Text style={styles.subtitle}>You are successfully logged in.</Text>

      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
  },
  logoutButton: {
    backgroundColor: "#456FE8",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default LoggedInScreen;
