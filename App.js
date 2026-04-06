import React, { useState, useEffect } from "react";
import {
View,
Text,
TextInput,
TouchableOpacity,
FlatList,
Pressable,
Share
} from "react-native";

import * as Location from "expo-location";

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
germany: "berlin",
pakistan: "asia/karachi",
china: "asia/shanghai",
greenland: "america/godthab",
nepal: "asia/kathmandu",
srilanka: "asia/colombo"
};

/* COMMON CITIES */
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

/* COUNTRY MAP */
const countryMap = {
pakistan:"Asia/Karachi",
china:"Asia/Shanghai",
greenland:"America/Godthab",
india:"Asia/Kolkata",
nepal:"Asia/Kathmandu",
"sri lanka":"Asia/Colombo",
uae:"Asia/Dubai",
saudi:"Asia/Riyadh",
qatar:"Asia/Qatar",
kuwait:"Asia/Kuwait",
oman:"Asia/Muscat",
iran:"Asia/Tehran",
iraq:"Asia/Baghdad",
afghanistan:"Asia/Kabul",
bangladesh:"Asia/Dhaka",
thailand:"Asia/Bangkok",
vietnam:"Asia/Ho_Chi_Minh",
malaysia:"Asia/Kuala_Lumpur",
indonesia:"Asia/Jakarta",
philippines:"Asia/Manila",
japan:"Asia/Tokyo",
korea:"Asia/Seoul",
singapore:"Asia/Singapore",
australia:"Australia/Sydney",
"new zealand":"Pacific/Auckland",
uk:"Europe/London",
france:"Europe/Paris",
germany:"Europe/Berlin",
spain:"Europe/Madrid",
italy:"Europe/Rome",
netherlands:"Europe/Amsterdam",
sweden:"Europe/Stockholm",
norway:"Europe/Oslo",
denmark:"Europe/Copenhagen",
finland:"Europe/Helsinki",
poland:"Europe/Warsaw",
turkey:"Europe/Istanbul",
egypt:"Africa/Cairo",
kenya:"Africa/Nairobi",
nigeria:"Africa/Lagos",
"south africa":"Africa/Johannesburg",
canada:"America/Toronto",
mexico:"America/Mexico_City",
brazil:"America/Sao_Paulo",
argentina:"America/Argentina/Buenos_Aires",
chile:"America/Santiago",
usa:"America/New_York"
};

/* FLAGS */
const countryCodes = {
india:"IN",
pakistan:"PK",
china:"CN",
usa:"US",
uk:"GB",
uae:"AE",
japan:"JP",
australia:"AU",
canada:"CA",
brazil:"BR",
mexico:"MX",
italy:"IT",
spain:"ES",
turkey:"TR",
bangladesh:"BD",
qatar:"QA",
saudi:"SA",
nepal:"NP",
"sri lanka":"LK",
greenland:"GL",
iran:"IR",
iraq:"IQ",
oman:"OM",
kuwait:"KW",
afghanistan:"AF",
malaysia:"MY",
indonesia:"ID",
philippines:"PH",
thailand:"TH",
vietnam:"VN",
argentina:"AR",
chile:"CL",
nigeria:"NG",
kenya:"KE",
sweden:"SE",
norway:"NO",
denmark:"DK",
finland:"FI",
poland:"PL",
netherlands:"NL",
"new zealand":"NZ",
"south africa":"ZA"
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

/* ALL TIMEZONES */
const allZones = Intl.supportedValuesOf
? Intl.supportedValuesOf("timeZone")
: [];

const cities = [
...Object.keys(timezones),
...Object.keys(countryMap),
...allZones.map(z => z.toLowerCase())
];
export default function App(){

const [from,setFrom]=useState("")
const [to,setTo]=useState("")
const [result,setResult]=useState("")
const [myZone,setMyZone]=useState("")
const [favorites,setFavorites]=useState([])

const [fromSug,setFromSug]=useState([])
const [toSug,setToSug]=useState([])

/* NEW STATES (ADDED ONLY) */
const [pinned,setPinned]=useState([])
const [city,setCity]=useState("")
const [country,setCountry]=useState("")

/* MEETING STATES */
const [meetingTime,setMeetingTime]=useState("09:00")
const [workStart,setWorkStart]=useState(9)
const [workEnd,setWorkEnd]=useState(18)
const [bestTime,setBestTime]=useState("")

/* AUTO DETECT TIMEZONE */
useEffect(()=>{
const zone=Intl.DateTimeFormat().resolvedOptions().timeZone
setMyZone(zone)
},[])

/* AUTO CITY DETECT */
useEffect(()=>{

const detect=async()=>{

try{

const {status}=await Location.requestForegroundPermissionsAsync()
if(status!=="granted") return

const loc=await Location.getCurrentPositionAsync({})
const geo=await Location.reverseGeocodeAsync(loc.coords)

if(geo.length>0){
setCity(geo[0].city || "")
setCountry(geo[0].country || "")
}

}catch(e){}

}

detect()

},[])

const normalize = (text)=>{
const t = text.toLowerCase().trim()
return aliases[t] || t
}

const getTimezone = (value)=>{
const key = normalize(value)

if(timezones[key]) return timezones[key]
if(countryMap[key]) return countryMap[key]

const match = allZones.find(z =>
z.toLowerCase().includes(key)
)

return match
}

const filterCities=(text,setter)=>{
const t=text.toLowerCase()
const filtered=cities.filter(c => c.includes(t))
setter(filtered.slice(0,8))
  }
/* CONVERT */
const convert=()=>{
const fromZone=getTimezone(from) || myZone
const toZone=getTimezone(to)

if(!fromZone || !toZone){
setResult("City not supported yet")
return
}

const now=new Date()

const fromTime=now.toLocaleString("en-US",{
timeZone:fromZone,
hour:"2-digit",
minute:"2-digit",
second:"2-digit"
})

const toTime=now.toLocaleString("en-US",{
timeZone:toZone,
hour:"2-digit",
minute:"2-digit",
second:"2-digit"
})

setResult(`${from} ${fromTime} → ${to} ${toTime}`)
}

/* LIVE CLOCK */
useEffect(()=>{
convert()
const i=setInterval(convert,1000)
return ()=>clearInterval(i)
},[from,to,myZone])

/* MULTI CLOCK */
const getClockTime=(zone)=>{
return new Date().toLocaleString("en-US",{
timeZone:zone,
hour:"2-digit",
minute:"2-digit",
second:"2-digit"
})
}

/* MEETING TIME */
const getMeetingTime=(zone)=>{
const [h,m]=meetingTime.split(":")
const base=new Date()

base.setHours(parseInt(h))
base.setMinutes(parseInt(m))
base.setSeconds(0)

return new Date(
base.toLocaleString("en-US",{timeZone:zone})
)
}

/* TIME DIFFERENCE */
const getTimeDiff=(zone)=>{
const local=new Date()
const target=new Date(
local.toLocaleString("en-US",{timeZone:zone})
)

const diff=(target-local)/3600000
return diff.toFixed(1)+"h"
}

/* PIN CLOCK */
const pinClock=(item)=>{
if(!pinned.includes(item)){
setPinned([item,...pinned])
}
}

const unpinClock=(item)=>{
setPinned(pinned.filter(p=>p!==item))
}

/* QUICK ADD */
const quickAdd=(item)=>{
addFavorite(item)
pinClock(item)
}

/* WORK HOURS */
const inWorkHours=(date)=>{
const h=date.getHours()
return h>=workStart && h<=workEnd
}

/* BEST MEETING AI */
const findBestMeeting=()=>{

if(favorites.length===0) return

for(let h=0;h<24;h++){

let ok=true

for(const f of favorites){

const zone=getTimezone(f)
if(!zone) continue

const d=new Date()
d.setHours(h)
d.setMinutes(0)

const z=new Date(
d.toLocaleString("en-US",{timeZone:zone})
)

if(!inWorkHours(z)){
ok=false
break
}

}

if(ok){
setBestTime(`${h.toString().padStart(2,"0")}:00`)
return
}

}

setBestTime("No overlap")
}

useEffect(()=>{
findBestMeeting()
},[favorites])

/* SHARE */
const shareMeeting=async()=>{
let text="Meeting Time:\n"

favorites.forEach(f=>{
const zone=getTimezone(f)
if(!zone) return

const t=getMeetingTime(zone)

text+=`${f} - ${t.toLocaleTimeString()}\n`
})

await Share.share({
message:text
})
}

/* SWAP */
const swap=()=>{
const a=from
setFrom(to)
setTo(a)
}

/* FAVORITES */
const addFavorite=(item)=>{
if(!favorites.includes(item)){
setFavorites([item,...favorites])
}
}

const removeFavorite=(item)=>{
setFavorites(favorites.filter(f=>f!==item))
  }
return(
<View style={{flex:1,backgroundColor:"#020617",padding:20}}>

<Text style={{color:"#fff",fontSize:26,fontWeight:"bold"}}>
TimeZone AI
</Text>

{/* CITY DETECT */}
{city!=="" && (
<Text style={{color:"#22c55e",marginBottom:5}}>
📍 {city}, {country}
</Text>
)}

<Text style={{color:"#94a3b8",marginBottom:10}}>
Your Timezone: {myZone}
</Text>

{/* QUICK ADD */}
<View style={{
flexDirection:"row",
flexWrap:"wrap",
marginBottom:10
}}>

{["india","usa","uk","dubai","japan","australia"].map(q=>(
<TouchableOpacity
key={q}
onPress={()=>quickAdd(q)}
style={{
backgroundColor:"#1e293b",
paddingHorizontal:12,
paddingVertical:6,
borderRadius:20,
marginRight:6,
marginBottom:6
}}>
<Text style={{color:"#fff"}}>
{getFlag(q)} {q}
</Text>
</TouchableOpacity>
))}

</View>

{/* PINNED CLOCKS */}
{pinned.length>0 && (
<View style={{marginBottom:10}}>
<Text style={{color:"#22c55e"}}>
📌 Pinned Clocks
</Text>

{pinned.map(item=>{
const zone=getTimezone(item)
if(!zone) return null

return(
<Pressable
key={"pin-"+item}
onLongPress={()=>unpinClock(item)}
style={{
flexDirection:"row",
justifyContent:"space-between",
backgroundColor:"#020617",
padding:10,
borderRadius:10,
marginTop:5
}}>
<Text style={{color:"#fff"}}>
{getFlag(item)} {item}
</Text>

<Text style={{color:"#22c55e"}}>
{getClockTime(zone)}
</Text>

</Pressable>
)
})}

</View>
)}
{/* FAVORITES */}
{favorites.length>0 && (
<View style={{marginBottom:10}}>
<Text style={{color:"#22c55e"}}>⭐ Favorites</Text>

<FlatList
horizontal
data={favorites}
keyExtractor={(i)=>i}
renderItem={({item})=>(
<Pressable
onPress={()=>setFrom(item)}
onLongPress={()=>removeFavorite(item)}
style={{
backgroundColor:"#0f172a",
padding:10,
borderRadius:10,
marginRight:8
}}>
<Text style={{color:"#fff"}}>
{getFlag(item)} {item}
</Text>
</Pressable>
)}
/>
</View>
)}

{/* WORLD CLOCK */}
{favorites.length>0 && (
<View style={{marginBottom:10}}>
<Text style={{color:"#22c55e"}}>🕓 World Clock</Text>

{favorites.map(item=>{
const zone=getTimezone(item)
if(!zone) return null

return(
<Pressable
key={item}
onLongPress={()=>pinClock(item)}
style={{
flexDirection:"row",
justifyContent:"space-between",
backgroundColor:"#0f172a",
padding:10,
borderRadius:10,
marginTop:5
}}>
<Text style={{color:"#fff"}}>
{getFlag(item)} {item}
</Text>

<Text style={{color:"#22c55e"}}>
{getClockTime(zone)}
</Text>
</Pressable>
)
})}

</View>
)}

{/* MEETING PLANNER */}
{favorites.length>0 && (
<View style={{marginBottom:15}}>

<Text style={{color:"#22c55e"}}>
📅 Meeting Planner
</Text>

<TextInput
value={meetingTime}
onChangeText={setMeetingTime}
placeholder="09:00"
placeholderTextColor="#94a3b8"
style={{
backgroundColor:"#0f172a",
color:"#fff",
padding:12,
borderRadius:10,
marginTop:5
}}
/>

<Text style={{
color:"#94a3b8",
marginTop:5
}}>
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
📤 Share Meeting
</Text>
</TouchableOpacity>

{favorites.map(item=>{
const zone=getTimezone(item)
if(!zone) return null

const t=getMeetingTime(zone)

return(
<View
key={"meet-"+item}
style={{
flexDirection:"row",
justifyContent:"space-between",
backgroundColor:"#020617",
padding:10,
borderRadius:10,
marginTop:5
}}>
<Text style={{color:"#fff"}}>
{getFlag(item)} {item}
</Text>

<Text style={{color:"#22c55e"}}>
{t.toLocaleTimeString()}
</Text>

<Text style={{color:"#94a3b8"}}>
{getTimeDiff(zone)}
</Text>

</View>
)
})}

</View>
)}
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
keyExtractor={(i)=>i}
renderItem={({item})=>(
<Pressable
onPress={()=>{
setFrom(item)
addFavorite(item)
setFromSug([])
}}
style={{
padding:10,
borderBottomWidth:1,
borderBottomColor:"#1e293b"
}}>
<Text style={{color:"#fff"}}>
{getFlag(item)} {item}
</Text>
</Pressable>
)}
/>

<TouchableOpacity
onPress={swap}
style={{
backgroundColor:"#1e293b",
padding:12,
borderRadius:10,
marginTop:10,
marginBottom:10
}}>
<Text style={{color:"#fff",textAlign:"center"}}>
🔁 Swap
</Text>
</TouchableOpacity>

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
borderRadius:10
}}
/>

<FlatList
data={toSug}
keyExtractor={(i)=>i}
renderItem={({item})=>(
<Pressable
onPress={()=>{
setTo(item)
addFavorite(item)
setToSug([])
}}
style={{
padding:10,
borderBottomWidth:1,
borderBottomColor:"#1e293b"
}}>
<Text style={{color:"#fff"}}>
{getFlag(item)} {item}
</Text>
</Pressable>
)}
/>

<Text style={{
color:"#22c55e",
marginTop:20,
fontSize:18
}}>
{result}
</Text>

</View>
)
}
