//import liraries
import React, { Component, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Button,
  Alert,
} from 'react-native';

// create a component
const Get = ({ navigation }) => {
  const [user, setUser] = useState();

  const getUserData = async () => {
    try {
      let response = await fetch('https://jsonplaceholder.typicode.com/posts');
      let json = await response.json();
      setUser(json.slice(0, 10));
    } catch (error) {
      console.error(error);
    }
  };

  useState(() => {
    getUserData();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Detail', {
            item: item,
          })
        }
      >
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
            padding: 5,
          }}
        >
          <Text style={{ fontWeight: 'bold' }}>user Id : {item.id}</Text>
          <Text>title: {item.title}</Text>
          <Button
            onPress={() => {
              console.log('item.id', item.id);
              fetch(`https://jsonplaceholder.typicode.com/posts/${item.id}`, {
                method: 'DELETE',
              }).then(() => {
                Alert.alert('Delete success');
              });
            }}
            title="Delete user"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={user}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //     backgroundColor: '#fff',
  //   },
});

//make this component available to the app
export default Get;
