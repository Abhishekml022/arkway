import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match');
      return;
    }

    try {
      const userData = {
        email,
        phone,
        password,
        created: String(new Date()),
        updated: String(new Date()),
      };

      await firestore().collection('users').add(userData);

      Alert.alert('User signed up successfully');
    } catch (error) {
      console.error('Error signing up user:', error);
      Alert.alert('Error signing up user');
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        placeholder="Phone"
        onChangeText={(text) => setPhone(text)}
        value={phone}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <TextInput
        placeholder="Confirm Password"
        secureTextEntry
        onChangeText={(text) => setConfirmPassword(text)}
        value={confirmPassword}
      />
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
};

export default SignUpScreen;