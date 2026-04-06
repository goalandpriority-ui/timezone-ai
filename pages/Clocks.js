import React, { useState, useEffect } from "react";
import {
View,
Text,
TouchableOpacity,
FlatList,
Pressable,
TextInput,
Share
} from "react-native";

/* FLAGS */
const countryCodes = {
india:"IN",
usa:"US",
uk:"GB",
uae:"AE",
japan:"JP",
australia:"AU",
canada:"CA"
};

const getFlag = (country)=>{
const code = countryCodes[country]
if(!code) return "🌍"
return code
.toUpperCase()
.replace(/./g,char =>
String.fromCodePoint(127397 + char.charCodeAt())
)
}

/* TIMEZONES */
const zones = {
india:"Asia/Kolkata",
usa:"America/New_York",
uk:"Europe/London",
dubai:"Asia/Dubai",
japan:"Asia/Tokyo",
australia:"Australia/Sydney"
}

export default function Clocks(){

const [favorites,setFavorites]=useState(["india","usa"])
const [pinned,setPinned]=useState([])

const [meetingTime,setMeetingTime]=useState("09:00")
const [bestTime,setBestTime]=useState("")

/* CLOCK */
const getClock=(zone)=>{
return new Date().toLocaleTimeString("en-US",{
timeZone:zone
})
}

/* PIN */
const pin=(c)=>{
if(!pinned.includes(c)){
setPinned([c,...pinned])
}
}

const unpin=(c)=>{
setPinned(pinned.filter(p=>p!==c))
}

/* BEST MEETING */
useEffect(()=>{

for(let h=0;h<24;h++){

let ok=true

favorites.forEach(f=>{
const d=new Date()
d.setHours(h)

const z=new Date(
d.toLocaleString("en-US",{timeZone:zones[f]})
)

const hr=z.getHours()
if(hr<9 || hr>18) ok=false
})

if(ok){
setBestTime("${h}:00")
return
}

}

setBestTime("No overlap")

},[favorites])

/* SHARE */
const shareMeeting=async()=>{

let text="Meeting:\n"

favorites.forEach(f=>{
const t=new Date().toLocaleTimeString("en-US",{
timeZone:zones[f]
})
text+="${f} ${t}\n"
})

await Share.share({message:text})
}

return(
<View style={{flex:1,backgroundColor:"#020617",padding:20}}>

<Text style={{
color:"#fff",
fontSize:24,
fontWeight:"bold",
marginBottom:10
}}>
Clocks & Meeting
</Text>

{/* QUICK ADD */}
<View style={{
flexDirection:"row",
flexWrap:"wrap",
marginBottom:10
}}>

{Object.keys(zones).map(c=>(
<TouchableOpacity
key={c}
onPress={()=>setFavorites([c,...favorites])}
style={{
backgroundColor:"#1e293b",
paddingHorizontal:12,
paddingVertical:6,
borderRadius:20,
marginRight:6,
marginBottom:6
}}>
<Text style={{color:"#fff"}}>
{getFlag(c)} {c}
</Text>
</TouchableOpacity>
))}

</View>{/* PINNED */}
{pinned.length>0 && (
<View>
<Text style={{color:"#22c55e"}}>📌 Pinned</Text>

{pinned.map(p=>(
<Pressable
key={p}
onLongPress={()=>unpin(p)}
style={{
flexDirection:"row",
justifyContent:"space-between",
backgroundColor:"#0f172a",
padding:12,
borderRadius:10,
marginTop:5
}}>
<Text style={{color:"#fff"}}>
{getFlag(p)} {p}
</Text>

<Text style={{color:"#22c55e"}}>
{getClock(zones[p])}
</Text>

</Pressable>
))}</View>
)}{/* WORLD CLOCK */}
<View style={{marginTop:10}}>
<Text style={{color:"#22c55e"}}>🕓 World Clock</Text>

{favorites.map(f=>(
<Pressable
key={f}
onLongPress={()=>pin(f)}
style={{
flexDirection:"row",
justifyContent:"space-between",
backgroundColor:"#0f172a",
padding:12,
borderRadius:10,
marginTop:5
}}>
<Text style={{color:"#fff"}}>
{getFlag(f)} {f}
</Text>

<Text style={{color:"#22c55e"}}>
{getClock(zones[f])}
</Text>

</Pressable>
))}</View>{/* MEETING */}
<View style={{marginTop:15}}>

<Text style={{color:"#22c55e"}}>
📅 Meeting Planner
</Text>

<TextInput
value={meetingTime}
onChangeText={setMeetingTime}
style={{
backgroundColor:"#0f172a",
color:"#fff",
padding:10,
borderRadius:10,
marginTop:5
}}
/>

<Text style={{color:"#94a3b8"}}>
🤖 Best: {bestTime}
</Text>

<TouchableOpacity
onPress={shareMeeting}
style={{
backgroundColor:"#2563eb",
padding:10,
borderRadius:10,
marginTop:5
}}>
<Text style={{color:"#fff",textAlign:"center"}}>
Share
</Text>
</TouchableOpacity>

</View></View>
)
}
