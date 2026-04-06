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
london: "Europe/London",
dubai: "Asia/Dubai",
tokyo: "Asia/Tokyo",
sydney: "Australia/Sydney",
paris: "Europe/Paris",
berlin: "Europe/Berlin",
singapore: "Asia/Singapore",
bangkok: "Asia/Bangkok",
seoul: "Asia/Seoul",

"new york": "America/New_York",
"los angeles": "America/Los_Angeles",
chicago: "America/Chicago",
toronto: "America/Toronto"
};

/* AI aliases */
const aliases = {
america: "new york",
usa: "new york",
us: "new york",
uk: "london",
england: "london",
uae: "dubai",
emirates: "dubai",
japan: "tokyo",
australia: "sydney",
france: "paris",
germany: "berlin"
};

const cities = Object.keys(timezones);

export default function App(){

const [from,setFrom]=useState("")
const [to,setTo]=useState("")
const [result,setResult]=useState("")

const [fromSug,setFromSug]=useState([])
const [toSug,setToSug]=useState([])

const normalize = (text)=>{
const t = text.toLowerCase().trim()
return aliases[t] || t
}

const filterCities=(text,setter)=>{
const t=text.toLowerCase()
const filtered=cities.filter(c=>c.includes(t))
setter(filtered.slice(0,5))
}

const convert=()=>{

const fromKey=normalize(from)
const toKey=normalize(to)

if(!timezones[fromKey] || !timezones[toKey]){
setResult("City not supported yet")
return
}

const now=new Date()

const fromTime=now.toLocaleString("en-US",{
timeZone:timezones[fromKey],
hour:"2-digit",
minute:"2-digit"
})

const toTime=now.toLocaleString("en-US",{
timeZone:timezones[toKey],
hour:"2-digit",
minute:"2-digit"
})

setResult(`${fromKey} ${fromTime} → ${toKey} ${toTime}`)
}

return(
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
placeholder="From city / country"
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
renderItem={({item})=>(
<Pressable
onPress={()=>{
setFrom(item)
setFromSug([])
}}
style={{
padding:10,
borderBottomWidth:1,
borderBottomColor:"#1e293b"
}}
>
<Text style={{color:"#fff"}}>{item}</Text>
</Pressable>
)}
/>

<TextInput
placeholder="To city / country"
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
renderItem={({item})=>(
<Pressable
onPress={()=>{
setTo(item)
setToSug([])
}}
style={{
padding:10,
borderBottomWidth:1,
borderBottomColor:"#1e293b"
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
)
  }
