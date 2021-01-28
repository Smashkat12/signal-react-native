import React, { useState } from "react";
import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button, Image, Input } from "react-native-elements";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = () => {
    /* API call for authentication */
  };

  return (
    <KeyboardAvoidingView behavior={"padding"} style={styles.container}>
      {/* StatusBar holds network, battery and time infor/icons */}
      <StatusBar style="light" />

      <Image
        source={{
          uri:
            "https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png",
        }}
        style={{ width: 200, height: 200 }}
      />
      <View style={styles.inputContainer}>
        <Input
          placeholder="Email"
          type="email"
          autoFocus
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          type="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      {/* For react native elements, you need to reference a prop called containerStyle instead of style */}
      <Button containerStyle={styles.button} onPress={signIn} title={"Login"} />
      <Button
        containerStyle={styles.button}
        type={"outline"}
        title={"Register"}
        onPress={() => navigation.navigate("Register")}
      />
      {/* trick to give space between keybpard and above buttons */}
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1 /* use up entire height -> remember, by default native app have a flex direction of column */,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: 400,
  },
  button: {
    width: 300,
    marginTop: 10,
  },
});
