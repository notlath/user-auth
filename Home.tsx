import SafeAreaWrapper from "./SafeAreaWrapper";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

export default function Index({ navigation }: any) {
  return (
    <SafeAreaWrapper
      style={{
        flex: 1,
        justifyContent: "space-between",
        paddingTop: 0,
      }}
    >
      <ScrollView style={{ flex: 1 }}>
        <Image
          source={require("./assets/images/books.png")}
          style={{
            height: 509,
            width: "100%",
            resizeMode: "cover",
          }}
        />
        <View style={{ gap: 16, paddingHorizontal: 16 }}>
          <View style={{ gap: 8, marginTop: 24 }}>
            <Text
              style={{
                fontSize: 32,
                color: "#ffffff",
                fontFamily: "IBMPlexSans_700Bold",
              }}
            >
              Master powerful concepts in{" "}
              <Text style={{ color: "#FF810A" }}>15 minutes flat!</Text>
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: "#81A4CD",
                fontFamily: "IBMPlexSans_400Regular",
              }}
            >
              Start your journey to smarter thinking with quick, engaging
              lessons designed to fit your busy life.
            </Text>
          </View>
          <Pressable
            onPress={() => navigation.navigate("SignUp")}
            style={{
              backgroundColor: "#FF810A",
              padding: 16,
              borderRadius: 8,
              alignItems: "center",
              width: "100%",
            }}
          >
            <Text
              style={{
                color: "#04252c",
                fontFamily: "IBMPlexSans_500Medium",
              }}
            >
              Get started
            </Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("Login")}
            style={{
              backgroundColor: "#0A355F",
              padding: 16,
              borderRadius: 8,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#ffffff",
                fontFamily: "IBMPlexSans_500Medium",
              }}
            >
              Login
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
}
