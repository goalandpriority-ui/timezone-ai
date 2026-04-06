import React, { useState, useEffect } from "react";
import {
View,
Text,
TextInput,
TouchableOpacity,
FlatList,
Pressable
} from "react-native";

import * as Location from "expo-location";
import BannerAdComponent from "./BannerAd";
import showInterstitial from "../components/InterstitialAd"

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

const allZones = Intl.supportedValuesOf
? Intl.supportedValuesOf("timeZone")
: [];

const cities = [
...Object.keys(timezones),
...Object.keys(countryMap),
...allZones.map(z => z.toLowerCase())
];

export default function Convert(){

const [from,setFrom]=useState("")
const [to,setTo]=useState("")
const [result,setResult]=useState("")
const [myZone,setMyZone]=useState("")

const [city,setCity]=useState("")
const [country,setCountry]=useState("")
const [liveTime,setLiveTime]=useState("")

const [fromSug,setFromSug]=useState([])
const [toSug,setToSug]=useState([])

useEffect(()=>{
const zone=Intl.DateTimeFormat().resolvedOptions().timeZone
setMyZone(zone)
},[])

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

useEffect(()=>{
const update=()=>{
const now=new Date()
const t=now.toLocaleTimeString("en-US",{
hour:"2-digit",
minute:"2-digit",
second:"2-digit"
})
setLiveTime(t)
}
update()
const i=setInterval(update,1000)
return ()=>clearInterval(i)
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

const convert=()=>{

showInterstitial()
  
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

useEffect(()=>{
convert()
const i=setInterval(convert,1000)
return ()=>clearInterval(i)
},[from,to,myZone])

const swap=()=>{
const a=from
setFrom(to)
setTo(a)
}

return(
<View style={{flex:1,backgroundColor:"#020617",padding:20}}>

<Text style={{
color:"#fff",
fontSize:28,
fontWeight:"700"
}}>
TimeZone AI
</Text>

{city!=="" && (
<Text style={{color:"#22c55e",marginTop:4}}>
📍 {city}, {country}
</Text>
)}

<Text style={{color:"#22c55e"}}>
🕓 {liveTime}
</Text>

<Text style={{
color:"#94a3b8",
marginBottom:15
}}>
Your Timezone: {myZone}
</Text>

<View style={{
backgroundColor:"#0f172a",
borderRadius:16,
padding:16,
marginBottom:12
}}>
<Text style={{color:"#94a3b8",marginBottom:6}}>From</Text>

<TextInput
placeholder="City or country"
placeholderTextColor="#64748b"
value={from}
onChangeText={(t)=>{
setFrom(t)
filterCities(t,setFromSug)
}}
style={{color:"#fff",fontSize:16}}
/>
</View>

{fromSug.length > 0 && (
<FlatList
data={fromSug}
keyExtractor={(i)=>i}
renderItem={({item})=>(
<Pressable
onPress={()=>{
setFrom(item)
setFromSug([])
}}
style={{padding:12}}>
<Text style={{color:"#fff"}}>
{getFlag(item)} {item}
</Text>
</Pressable>
)}
/>
)}

<TouchableOpacity
onPress={swap}
style={{
backgroundColor:"#0f172a",
padding:14,
borderRadius:16,
alignItems:"center",
marginBottom:12
}}>
<Text style={{color:"#fff"}}>
Swap
</Text>
</TouchableOpacity>

<View style={{
backgroundColor:"#0f172a",
borderRadius:16,
padding:16
}}>
<Text style={{color:"#94a3b8",marginBottom:6}}>To</Text>

<TextInput
placeholder="City or country"
placeholderTextColor="#64748b"
value={to}
onChangeText={(t)=>{
setTo(t)
filterCities(t,setToSug)
}}
style={{color:"#fff",fontSize:16}}
/>
</View>

{toSug.length > 0 && (
<FlatList
data={toSug}
keyExtractor={(i)=>i}
renderItem={({item})=>(
<Pressable
onPress={()=>{
setTo(item)
setToSug([])
}}
style={{padding:12}}>
<Text style={{color:"#fff"}}>
{getFlag(item)} {item}
</Text>
</Pressable>
)}
/>
)}

<View style={{
backgroundColor:"#0f172a",
borderRadius:18,
padding:20,
marginTop:20
}}>
<Text style={{
color:"#22c55e",
fontSize:18,
textAlign:"center",
fontWeight:"600"
}}>
{result}
</Text>
</View>

{/* ADS */}
<BannerAdComponent/>

</View>
)
}
