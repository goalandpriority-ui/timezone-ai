import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";

export default function App() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [result, setResult] = useState("");

  const convert = () => {
    setResult(`Converted time from ${from} to ${to}`);
  };

  return (
    <View style={{
      flex:1,
      backgroundColor:"#020617",
      padding:20,
      justifyContent:"center"
    }}>
      
      <Text style={{
        color:"#fff",
        fontSize:26,
        fontWeight:"bold",
        marginBottom:20
      }}>
        TimeZone AI
      </Text>

      <TextInput
        placeholder="From city"
        placeholderTextColor="#94a3b8"
        value={from}
        onChangeText={setFrom}
        style={{
          backgroundColor:"#0f172a",
          color:"#fff",
          padding:15,
          borderRadius:10,
          marginBottom:10
        }}
      />

      <TextInput
        placeholder="To city"
        placeholderTextColor="#94a3b8"
        value={to}
        onChangeText={setTo}
        style={{
          backgroundColor:"#0f172a",
          color:"#fff",
          padding:15,
          borderRadius:10,
          marginBottom:20
        }}
      />

      <TouchableOpacity
        onPress={convert}
        style={{
          backgroundColor:"#2563eb",
          padding:15,
          borderRadius:10
        }}
      >
        <Text style={{
          color:"#fff",
          textAlign:"center",
          fontWeight:"bold"
        }}>
          Convert
        </Text>
      </TouchableOpacity>

      <Text style={{
        color:"#22c55e",
        marginTop:20,
        fontSize:16
      }}>
        {result}
      </Text>

    </View>
  );
            }
