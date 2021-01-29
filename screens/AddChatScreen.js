import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { db } from "../firebase";

const AddChatScreen = ({ navigation }) => {
  const [input, setInput] = useState("");

  const createChat = async () => {
    try {
      const chatCreated = await db.collection("chats").add({
        chatName: input,
      });

      if (chatCreated) {
        navigation.goBack();
      } else {
        return;
      }
    } catch (err) {
      alert(err);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a new Chat",
      headerBackTitle: "Chats",
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Input
        value={input}
        onChangeText={(text) => setInput(text)}
        placeholder="Enter chat name"
        onSubmitEditing={createChat}
        leftIcon={
          <Icon name="wechat" type="antdessign" size={24} color="black" />
        }
      />
      <Button onPress={createChat} title="Create new chat" />
    </View>
  );
};

export default AddChatScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",
    padding: 20,
  },
});
