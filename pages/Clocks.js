import React, { useState, useEffect } from "react";
import {
View,
Text,
TouchableOpacity,
Pressable,
TextInput,
Share,
ScrollView
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
timeZone:zone,
hour:"2-digit",
minute:"2-digit",
second:"2-digit"
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
setBestTime(`${h}:00`)
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
text+=`${f} ${t}\n`
})

await Share.share({message:text})
}

return(
<ScrollView style={{flex:1,backgroundColor:"#020617"}} contentContainerStyle={{padding:20}}>

<Text style={{
color:"#fff",
fontSize:28,
fontWeight:"700",
marginBottom:15
}}>
Clocks & Meeting
</Text>

{/* QUICK ADD */}
<View style={{
backgroundColor:"#0f172a",
borderRadius:16,
padding:16,
marginBottom:15
}}>
<Text style={{color:"#94a3b8",marginBottom:10}}>
Quick Add
</Text>

<View style={{
flexDirection:"row",
flexWrap:"wrap"
}}>

{Object.keys(zones).map(c=>(
<TouchableOpacity
key={c}
onPress={()=>setFavorites([c,...favorites])}
style={{
backgroundColor:"#020617",
paddingHorizontal:12,
paddingVertical:8,
borderRadius:20,
marginRight:8,
marginBottom:8
}}>
<Text style={{color:"#fff"}}>
{getFlag(c)} {c}
</Text>
</TouchableOpacity>
))}

</View>
</View>

{/* PINNED */}
{pinned.length>0 && (
<View style={{
backgroundColor:"#0f172a",
borderRadius:16,
padding:16,
marginBottom:15
}}>
<Text style={{color:"#94a3b8",marginBottom:10}}>
Pinned
</Text>

{pinned.map(p=>(
<Pressable
key={p}
onLongPress={()=>unpin(p)}
style={{
flexDirection:"row",
justifyContent:"space-between",
backgroundColor:"#020617",
padding:14,
borderRadius:12,
marginBottom:8
}}>
<Text style={{color:"#fff"}}>
{getFlag(p)} {p}
</Text>

<Text style={{color:"#22c55e"}}>
{getClock(zones[p])}
</Text>

</Pressable>
))}

</View>
)}

{/* WORLD CLOCK */}
<View style={{
backgroundColor:"#0f172a",
borderRadius:16,
padding:16,
marginBottom:15
}}>
<Text style={{color:"#94a3b8",marginBottom:10}}>
World Clock
</Text>

{favorites.map(f=>(
<Pressable
key={f}
onLongPress={()=>pin(f)}
style={{
flexDirection:"row",
justifyContent:"space-between",
backgroundColor:"#020617",
padding:14,
borderRadius:12,
marginBottom:8
}}>
<Text style={{color:"#fff"}}>
{getFlag(f)} {f}
</Text>

<Text style={{color:"#22c55e"}}>
{getClock(zones[f])}
</Text>

</Pressable>
))}

</View>

{/* MEETING */}
<View style={{
backgroundColor:"#0f172a",
borderRadius:16,
padding:16
}}>
<Text style={{color:"#94a3b8",marginBottom:10}}>
Meeting Planner
</Text>

<TextInput
value={meetingTime}
onChangeText={setMeetingTime}
style={{
backgroundColor:"#020617",
color:"#fff",
padding:14,
borderRadius:12,
marginBottom:10
}}
/>

<Text style={{
color:"#22c55e",
marginBottom:10
}}>
Best time: {bestTime}
</Text>

<TouchableOpacity
onPress={shareMeeting}
style={{
backgroundColor:"#22c55e",
padding:14,
borderRadius:12
}}>
<Text style={{
color:"#020617",
textAlign:"center",
fontWeight:"600"
}}>
Share Meeting
</Text>
</TouchableOpacity>

</View>

</ScrollView>
)
}
