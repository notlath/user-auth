// types.ts
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  LoggedIn: undefined;
};

// Props for each screen
export type LoginScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Login"
>;
export type SignUpScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "SignUp"
>;
export type LoggedInScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "LoggedIn"
>;
