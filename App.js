import React, { useState } from "react";
import {
View,
Text,
TextInput,
TouchableOpacity,
FlatList,
Pressable
} from "react-native";

const timezones = {
india: "Asia/Kolkata",
"new york": "America/New_York",
"los angeles": "America/Los_Angeles",
chicago: "America/Chicago",
london: "Europe/London",
dubai: "Asia/Dubai",
tokyo: "Asia/Tokyo",
sydney: "Australia/Sydney",
toronto: "America/Toronto",
paris: "Europe/Paris",
berlin: "Europe/Berlin",
singapore: "Asia/Singapore",
bangkok: "Asia/Bangkok",
seoul: "Asia/Seoul",
rome: "Europe/Rome",
madrid: "Europe/Madrid",
moscow: "Europe/Moscow",
beijing: "Asia/Shanghai",
delhi: "Asia/Kolkata",
mumbai: "Asia/Kolkata"
};

const cities = Object.keys(timezones);

export default function App() {

const [from, setFrom] = useState("");
const [to, setTo] = useState("");
const [result, setResult] = useState("");

const [fromSug,setFromSug]=useState([])
const [toSug,setToSug]=useState([])

const filterCities = (text,setter)=>{
const filtered = cities.filter(c =>
c.includes(text.toLowerCase())
)
setter(filtered.slice(0,5))
}

const convert = () => {
const fromKey = from.toLowerCase().trim();
const toKey = to.toLowerCase().trim();

if (!timezones[fromKey] || !timezones[toKey]) {
setResult("City not supported yet");
return;
}

const now = new Date();

const fromTime = now.toLocaleString("en-US", {
timeZone: timezones[fromKey],
hour: "2-digit",
minute: "2-digit"
});

const toTime = now.toLocaleString("en-US", {
timeZone: timezones[toKey],
hour: "2-digit",
minute: "2-digit"
});

setResult(`${from} ${fromTime} → ${to} ${toTime}`);
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

{/* FROM */}
<TextInput
placeholder="From city"
placeholderTextColor="#94a3b8"
value={from}
onChangeText={(t)=>{
setFrom(t)
filterCities(t,setFromSug)
}}
style={{
backgroundColor:"#0f172a",
color:"#fff",
padding:15,
borderRadius:10
}}
/>

<FlatList
data={fromSug}
keyExtractor={(i)=>i}
renderItem={({item})=>(
<Pressable
onPress={()=>{
setFrom(item)
setFromSug([])
}}
style={{
padding:10,
backgroundColor:"#020617",
borderBottomColor:"#1e293b",
borderBottomWidth:1
}}
>
<Text style={{color:"#fff"}}>{item}</Text>
</Pressable>
)}
/>


{/* TO */}
<TextInput
placeholder="To city"
placeholderTextColor="#94a3b8"
value={to}
onChangeText={(t)=>{
setTo(t)
filterCities(t,setToSug)
}}
style={{
backgroundColor:"#0f172a",
color:"#fff",
padding:15,
borderRadius:10,
marginTop:10
}}
/>

<FlatList
data={toSug}
keyExtractor={(i)=>i}
renderItem={({item})=>(
<Pressable
onPress={()=>{
setTo(item)
setToSug([])
}}
style={{
padding:10,
backgroundColor:"#020617",
borderBottomColor:"#1e293b",
borderBottomWidth:1
}}
>
<Text style={{color:"#fff"}}>{item}</Text>
</Pressable>
)}
/>

<TouchableOpacity
onPress={convert}
style={{
backgroundColor:"#2563eb",
padding:15,
borderRadius:10,
marginTop:20
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
