import React, { useState } from "react";
import {
View,
Text,
TextInput,
TouchableOpacity
} from "react-native";

const timezones = {
India: "Asia/Kolkata",
"New York": "America/New_York",
"Los Angeles": "America/Los_Angeles",
Chicago: "America/Chicago",
London: "Europe/London",
Dubai: "Asia/Dubai",
Tokyo: "Asia/Tokyo",
Sydney: "Australia/Sydney",
Toronto: "America/Toronto",
Paris: "Europe/Paris",
Berlin: "Europe/Berlin",
Singapore: "Asia/Singapore"
};

export default function App() {
const [from, setFrom] = useState("");
const [to, setTo] = useState("");
const [result, setResult] = useState("");

const convert = () => {
if (!timezones[from] || !timezones[to]) {
setResult("City not supported yet");
return;
}

const now = new Date();

const fromTime = now.toLocaleString("en-US", {
timeZone: timezones[from],
hour: "2-digit",
minute: "2-digit"
});

const toTime = now.toLocaleString("en-US", {
timeZone: timezones[to],
hour: "2-digit",
minute: "2-digit"
});

setResult(`${from}: ${fromTime} → ${to}: ${toTime}`);
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
placeholder="From city (India, London...)"
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
placeholder="To city (New York, Dubai...)"
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
