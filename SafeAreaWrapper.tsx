import { ReactNode } from "react";
import { Platform, SafeAreaView, StatusBar, View } from "react-native";

const SafeAreaWrapper = ({
  children,
  ...props
}: {
  children: ReactNode;
  [key: string]: any;
}) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#03294E" }}>
      <View
        {...props}
        style={{
          flex: 1,
          paddingTop:
            Platform.OS === "android" ? StatusBar.currentHeight! + 24 : 0,
          ...props.style,
        }}
      >
        {children}
      </View>
    </SafeAreaView>
  );
};

export default SafeAreaWrapper;
