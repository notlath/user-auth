import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import auth from "./firebase";

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignUp = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!emailRegex.test(email)) {
      Alert.alert("Invalid email", "Please enter a valid email address");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password should be at least 6 characters");
      return;
    }

    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        Alert.alert("Sign up successful!", `Welcome, ${user.email}`);
        navigation.navigate("Login");
      })
      .catch((error) => {
        Alert.alert("Sign up failed!", error.message);
      })
      .finally(() => setIsLoading(false));
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Sign Up</Text>
      </View>
      <View>
        <Text style={styles.titleLogin}>Create a new account</Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <MaterialIcons
            name="mail"
            size={20}
            color="#9d9d9d"
            style={styles.icon}
          />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.textInput}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputWrapper}>
          <MaterialIcons
            name="lock"
            size={20}
            color="#9d9d9d"
            style={styles.icon}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!isPasswordVisible}
            style={styles.textInput}
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <MaterialIcons
              name={isPasswordVisible ? "visibility" : "visibility-off"}
              size={20}
              color="#9d9d9d"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.inputWrapper}>
          <MaterialIcons
            name="lock"
            size={20}
            color="#9d9d9d"
            style={styles.icon}
          />
          <TextInput
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!isPasswordVisible}
            style={styles.textInput}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.registerContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.registerText}>
              Already have an account?{" "}
              <Text style={styles.registerLink}>Login</Text>
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleSignUp} disabled={isLoading}>
          <View style={styles.loginButton}>
            <Text style={styles.loginButtonText}>
              {isLoading ? "Creating account..." : "Sign Up"}
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.errorMessageContainer}>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        </View>
      </View>
    </View>
  );
};

// Reuse the same styles from LoginScreen with minor adjustments
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#5F5F5F",
    fontSize: 25,
    fontWeight: "600",
  },
  titleLogin: {
    color: "#5F5F5F",
    fontSize: 15,
    marginTop: 10,
  },
  inputContainer: {
    width: "80%",
    marginTop: 20,
    gap: 20,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    borderWidth: 0.2,
    borderRadius: 5,
  },
  textInput: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  registerContainer: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  registerText: {
    color: "#5F5F5F",
  },
  registerLink: {
    color: "#456FE8",
    fontWeight: "600",
  },
  loginButton: {
    backgroundColor: "#456FE8",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 15,
  },
  errorMessageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  errorMessage: {
    color: "red",
  },
});

export default SignUpScreen;
