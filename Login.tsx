import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import {
  Alert,
  Text,
  TextInput,
  View,
  Pressable,
  Platform,
  ActivityIndicator,
} from "react-native";
import auth from "./firebase";
import { ArrowLeft } from "lucide-react-native";
import SafeAreaWrapper from "./SafeAreaWrapper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogin = () => {
    setIsLoading(true);

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!email || !password) {
      setIsLoading(false);
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (!emailRegex.test(email)) {
      setIsLoading(false);
      Alert.alert("Invalid email", "Please re-enter email");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        Alert.alert("Login successful!", `Hello, ${user.email}`);
        navigation.replace("LoggedIn"); // Redirect to logged-in screen
        setIsLoading(false);
      })
      .catch((error) => {
        if (error && (error as any).code) {
          if ((error as any).code === "auth/invalid-email") {
            Alert.alert("Login failed!", "Please enter a valid email address");
          } else if ((error as any).code === "auth/user-not-found") {
            Alert.alert("Login failed!", "Please check your email address");
          } else if ((error as any).code === "auth/wrong-password") {
            Alert.alert("Login failed!", "Please check your password");
          } else if ((error as any).code === "auth/invalid-credential") {
            Alert.alert("Login failed!", "Please check your password");
          } else {
            Alert.alert("Login failed!", error.message);
          }
        }

        setIsLoading(false);
      });
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: "#03294E" }}>
      <SafeAreaWrapper
        style={{
          flex: 1,
          paddingHorizontal: 16,
          paddingTop: Platform.OS === "ios" ? 32 : 84,
          paddingBottom: 32,
          gap: 16,
        }}
      >
        <Pressable
          style={{
            aspectRatio: 1,
            borderWidth: 2,
            borderColor: "#81A4CD",
            width: 48,
            borderRadius: 24,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft color="#ffffff" />
        </Pressable>
        <View style={{ gap: 8, marginTop: 24 }}>
          <Text
            style={{
              fontSize: 32,
              color: "#ffffff",
              fontFamily: "IBMPlexSans_700Bold",
            }}
          >
            Welcome back!
          </Text>
          <Text
            style={{
              color: "#81A4CD",
              fontSize: 16,
              fontFamily: "IBMPlexSans_400Regular",
            }}
          >
            Enter your details to log in to your account
          </Text>
        </View>
        <View>
          <TextInput
            placeholder="Email address"
            style={{
              borderWidth: 2,
              borderRadius: 8,
              borderColor: "#81A4CD",
              paddingHorizontal: 16,
              paddingVertical: 16,
              fontSize: 16,
              color: "#ffffff",
              fontFamily: "IBMPlexSans_400Regular",
            }}
            placeholderTextColor="#81A4CD"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View
          style={{
            borderWidth: 2,
            borderRadius: 8,
            borderColor: "#81A4CD",
            paddingHorizontal: 14,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TextInput
            secureTextEntry={!isPasswordVisible}
            placeholder="Password"
            style={{
              paddingVertical: 16,
              fontSize: 16,
              color: "#ffffff",
              fontFamily: "IBMPlexSans_400Regular",
              flex: 1,
            }}
            placeholderTextColor="#81A4CD"
            value={password}
            onChangeText={setPassword}
          />
          <Pressable>
            <MaterialIcons
              name={isPasswordVisible ? "visibility" : "visibility-off"}
              size={24}
              color="#81A4CD"
              onPress={togglePasswordVisibility}
            />
          </Pressable>
        </View>
        <View style={{ gap: 16, marginTop: 48 }}>
          <Pressable
            style={{
              backgroundColor: "#FF810A",
              padding: 16,
              borderRadius: 8,
              alignItems: "center",
              width: "100%",
            }}
            onPress={handleLogin}
          >
            {!isLoading ? (
              <Text
                style={{
                  color: "#03294E",
                  fontFamily: "IBMPlexSans_500Medium",
                }}
              >
                Login
              </Text>
            ) : (
              <ActivityIndicator color="#03294E" />
            )}
          </Pressable>
          <Pressable onPress={() => navigation.navigate("SignUp")}>
            <Text
              style={{
                color: "#81A4CD",
                fontSize: 16,
                textAlign: "center",
                fontFamily: "IBMPlexSans_400Regular",
              }}
            >
              Don't have an account yet?
            </Text>
          </Pressable>
        </View>
      </SafeAreaWrapper>
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;
