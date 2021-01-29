import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button, Image, Input } from "react-native-elements";
import { auth } from "../firebase";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    /* add listener for changes in authentication state */
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        /* user is signed in */

        /* dont use navigation.navigate because we done want user to be able to swipe back to the login screen if already athenticated */
        navigation.replace("Home");
      }
    });

    /* clean up -> unsubscribe to the listener */
    return () => unsubscribe();
  }, []);

  const signIn = () => {
    /* API call for authentication */
    /* noneed for the .then() as we have a listener that listens for auth state changes */
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));
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
          onSubmitEditing={signIn}
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
