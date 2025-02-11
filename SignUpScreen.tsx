import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
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
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import SafeAreaWrapper from "./SafeAreaWrapper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ArrowLeft } from "lucide-react-native";

const getPasswordStrength = (password: string) => {
  let score = 1;

  if (password.length === 0) return 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  return score;
};

const mapScoreToLabel = (score: number) => {
  switch (score) {
    case 0:
    case 1:
      return "Weak";
    case 2:
      return "Fair";
    case 3:
      return "Good";
    case 4:
    case 5:
      return "Strong";
    default:
      return "";
  }
};

const getBarColor = (strength: number) => {
  if (strength <= 1) return "#DC2413";
  if (strength === 2) return "#fe8000";
  if (strength === 3) return "#1AAD81";
  if (strength >= 4) return "#0CC40C";

  return "#395b7e";
};

const SignUpScreen = ({ navigation }: any) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [strength, setStrength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const progress = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${progress.value}%`,
    };
  });

  const handlePasswordChange = (text: string) => {
    setPassword(text);

    const newStrength = getPasswordStrength(text);

    setStrength(newStrength);

    progress.value = withTiming((newStrength / 4) * 100, {
      duration: 200,
    });
  };

  const handleSignUp = () => {
    setIsLoading(true);

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!emailRegex.test(email)) {
      Alert.alert("Invalid email", "Please enter a valid email address");
      return;
    }

    if (!firstName || !lastName) {
      Alert.alert("Error", "First name and last name are required");

      setIsLoading(false);

      return;
    }

    if (!mobileNumber) {
      Alert.alert("Error", "Mobile number is required");

      setIsLoading(false);

      return;
    }

    if (!email) {
      Alert.alert("Error", "Email address is required");

      setIsLoading(false);

      return;
    }

    if (!password) {
      Alert.alert("Error", "Password is required");

      setIsLoading(false);

      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");

      setIsLoading(false);

      return;
    }

    if (strength < 2) {
      Alert.alert("Error", "Password is too weak");

      setIsLoading(false);

      return;
    }

    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        updateProfile(user, {
          displayName: `${firstName} ${lastName}`,
        })
          .then(() => {
            Alert.alert("Sign up successful!", `Welcome, ${user.email}`);
            navigation.navigate("LoggedIn");
          })
          .catch((error) => {
            Alert.alert("Sign up failed!", error.message);
          });
      })
      .catch((error) => {
        if (error) {
          if ((error as any).code === "auth/invalid-email") {
            Alert.alert("Sign up failed!", "Invalid email address");
          } else if ((error as any).code === "auth/missing-password") {
            Alert.alert("Sign up failed!", "Password is required");
          } else if ((error as any).code === "auth/weak-password") {
            Alert.alert("Sign up failed!", "Password is too weak");
          } else if ((error as any).code === "auth/email-already-in-use") {
            Alert.alert("Sign up failed!", "Email address is already in use");
          } else {
            Alert.alert("Sign up failed!", error.message);
          }
        }
      })
      .finally(() => setIsLoading(false));
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
            Welcome!
          </Text>
          <Text
            style={{
              color: "#81A4CD",
              fontSize: 16,
              fontFamily: "IBMPlexSans_400Regular",
            }}
          >
            Enter your details to get started
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: 18,
            width: "100%",
            alignContent: "stretch",
          }}
        >
          <View style={{ width: "auto", flex: 1 }}>
            <TextInput
              placeholder="First name"
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
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>
          <View style={{ width: "auto", flex: 1 }}>
            <TextInput
              placeholder="Last name"
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
              value={lastName}
              onChangeText={setLastName}
            />
          </View>
        </View>
        <View>
          <TextInput
            placeholder="Mobile number"
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
            value={mobileNumber}
            onChangeText={setMobileNumber}
          />
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
            onChangeText={(e) => handlePasswordChange(e)}
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
        <View>
          <TextInput
            secureTextEntry={!isPasswordVisible}
            placeholder="Confirm password"
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
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>
        <View style={{ gap: 8 }}>
          <View
            style={{
              height: 10,
              width: "100%",
              backgroundColor: "#395b7e",
              borderRadius: 8,
              overflow: "hidden",
            }}
          >
            <Animated.View
              style={[
                {
                  height: 10,
                  backgroundColor: getBarColor(strength),
                },
                animatedStyle,
              ]}
            />
          </View>
          <Text
            style={{
              color: "#81A4CD",
              fontSize: 16,
              fontFamily: "IBMPlexSans_400Regular",
            }}
          >
            Password strength {password && `: ${mapScoreToLabel(strength)}`}
          </Text>
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
            onPress={handleSignUp}
          >
            {!isLoading ? (
              <Text
                style={{
                  color: "#03294E",
                  fontFamily: "IBMPlexSans_500Medium",
                }}
              >
                Create account
              </Text>
            ) : (
              <ActivityIndicator color="#03294E" />
            )}
          </Pressable>
          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text
              style={{
                color: "#81A4CD",
                fontSize: 16,
                fontFamily: "IBMPlexSans_400Regular",
                textAlign: "center",
              }}
            >
              Already have an account?
            </Text>
          </Pressable>
        </View>
      </SafeAreaWrapper>
    </KeyboardAwareScrollView>
  );
};

export default SignUpScreen;
