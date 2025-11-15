// filepath: c:\Users\apple\Projects\testt\index.web.js
// new file: ensure this runs before expo-router loads
import { StyleSheet } from 'react-native';
if (StyleSheet.setFlag) {
  StyleSheet.setFlag('darkMode', 'class');
}
import 'expo-router/entry';