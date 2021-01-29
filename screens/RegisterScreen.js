import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, View, KeyboardAvoidingView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button, Input, Text } from "react-native-elements";
import { auth } from "../firebase";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  /* alternative to setting global styles */
  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Back to Login",
    });
  }, [navigation]);

  const register = () => {
    /* Api call to register user */
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: name,
          photoURL:
            imageUrl ||
            "https://iupac.org/wp-content/uploads/2018/05/default-avatar-300x300.png",
        });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView behavior={"padding"} style={styles.container}>
      <StatusBar style={"light"} />
      <Text h3 style={{ marginBottom: 50 }}>
        Create a Signal Account
      </Text>

      <View style={styles.inputContainer}>
        <Input
          placeholder={"Full Name"}
          autoFocus
          type={"text"}
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Input
          placeholder={"Email"}
          type={"email"}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder={"Password"}
          secureTextEntry
          type="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Input
          placeholder={"Profile Picture Url (Optional)"}
          type={"text"}
          value={imageUrl}
          onChangeText={(text) => setImageUrl(text)}
          onSubmitEditing={
            register
          } /* when you press Enter it will call register func */
        />
      </View>

      <Button
        containerStyle={styles.button}
        raised
        title={"Register"}
        onPress={register}
      />
      {/* trick to give space between keybpard and above buttons */}
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  inputContainer: {
    width: 400,
  },
  button: {
    width: 300,
    marginTop: 10,
  },
});
