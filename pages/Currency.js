import React, { useState, useEffect } from "react";
import {
View,
Text,
TextInput,
TouchableOpacity,
FlatList,
Pressable,
ActivityIndicator
} from "react-native";

import BannerAd from "../components/BannerAd";

/* COUNTRY -> CURRENCY */
const countryCurrency={
IN:"INR",
US:"USD",
GB:"GBP",
AE:"AED",
SA:"SAR",
JP:"JPY",
CN:"CNY",
AU:"AUD",
CA:"CAD",
SG:"SGD",
MY:"MYR",
TH:"THB",
KR:"KRW",
BR:"BRL",
ZA:"ZAR",
MX:"MXN",
CH:"CHF",
HK:"HKD",
NZ:"NZD",
EU:"EUR"
}

/* FLAGS */
const flags={
USD:"🇺🇸",INR:"🇮🇳",EUR:"🇪🇺",GBP:"🇬🇧",JPY:"🇯🇵",
CNY:"🇨🇳",AUD:"🇦🇺",CAD:"🇨🇦",SGD:"🇸🇬",AED:"🇦🇪",
SAR:"🇸🇦",MYR:"🇲🇾",THB:"🇹🇭",KRW:"🇰🇷",BRL:"🇧🇷",
ZAR:"🇿🇦",MXN:"🇲🇽",CHF:"🇨🇭",HKD:"🇭🇰",NZD:"🇳🇿"
}

export default function Currency(){

const [from,setFrom]=useState("USD")
const [to,setTo]=useState("INR")
const [amount,setAmount]=useState("1")
const [result,setResult]=useState("")

const [rates,setRates]=useState({})
const [list,setList]=useState([])
const [loading,setLoading]=useState(true)

const [country,setCountry]=useState("")

const [fromSug,setFromSug]=useState([])
const [toSug,setToSug]=useState([])

/* AUTO DETECT COUNTRY */
useEffect(()=>{

const detect=async()=>{
try{

const r=await fetch("https://ipapi.co/json/")
const j=await r.json()

setCountry(j.country)

const cur=countryCurrency[j.country]
if(cur) setFrom(cur)

}catch(e){}

}

detect()

},[])

/* FETCH RATES */
useEffect(()=>{

const load=async()=>{
try{

const res=await fetch(
"https://open.er-api.com/v6/latest/USD"
)

const json=await res.json()

setRates(json.rates)
setList(Object.keys(json.rates))
setLoading(false)

}catch(e){
setLoading(false)
}

}

load()

},[])

/* FILTER */
const filter=(text,setter)=>{
const t=text.toUpperCase()
const f=list.filter(c=>c.includes(t))
setter(f.slice(0,8))
}

/* CONVERT */
const convert=()=>{

if(!rates[from] || !rates[to]) return

const usd=parseFloat(amount||"0")/rates[from]
const out=usd*rates[to]

setResult(out.toFixed(2))
}

useEffect(()=>{
convert()
},[from,to,amount,rates])

/* SWAP */
const swap=()=>{
const a=from
setFrom(to)
setTo(a)
}

if(loading){
return(
<View style={{
flex:1,
backgroundColor:"#020617",
justifyContent:"center",
alignItems:"center"
}}>
<ActivityIndicator size="large" color="#22c55e"/>
<Text style={{color:"#fff",marginTop:10}}>
Loading currencies...
</Text>
</View>
)
}

return(
<View style={{
flex:1,
backgroundColor:"#020617",
padding:20
}}>

<Text style={{
color:"#fff",
fontSize:26,
fontWeight:"bold"
}}>
Currency AI
</Text>

<Text style={{
color:"#22c55e",
marginBottom:10
}}>
📍 Detected: {country} → {from}
</Text>

{/* FROM */}
<Text style={{color:"#94a3b8"}}>From</Text>

<TextInput
value={from}
onChangeText={(t)=>{
setFrom(t.toUpperCase())
filter(t,setFromSug)
}}
style={{
backgroundColor:"#0f172a",
color:"#fff",
padding:14,
borderRadius:10,
marginTop:5
}}
/>

{fromSug.length>0 &&(
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
borderBottomWidth:1,
borderBottomColor:"#1e293b"
}}
>
<Text style={{color:"#fff"}}>
{flags[item]||"🌍"} {item}
</Text>
</Pressable>
)}
/>
)}

{/* AMOUNT */}
<Text style={{
color:"#94a3b8",
marginTop:10
}}>
Amount
</Text>

<TextInput
value={amount}
onChangeText={setAmount}
keyboardType="numeric"
style={{
backgroundColor:"#0f172a",
color:"#fff",
padding:14,
borderRadius:10,
marginTop:5
}}
/>

{/* SWAP */}
<TouchableOpacity
onPress={swap}
style={{
backgroundColor:"#1e293b",
padding:12,
borderRadius:10,
marginTop:10,
marginBottom:10
}}
>
<Text style={{
color:"#fff",
textAlign:"center"
}}>
🔁 Swap
</Text>
</TouchableOpacity>

{/* TO */}
<Text style={{color:"#94a3b8"}}>To</Text>

<TextInput
value={to}
onChangeText={(t)=>{
setTo(t.toUpperCase())
filter(t,setToSug)
}}
style={{
backgroundColor:"#0f172a",
color:"#fff",
padding:14,
borderRadius:10,
marginTop:5
}}
/>

{toSug.length>0 &&(
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
borderBottomWidth:1,
borderBottomColor:"#1e293b"
}}
>
<Text style={{color:"#fff"}}>
{flags[item]||"🌍"} {item}
</Text>
</Pressable>
)}
/>
)}

{/* RESULT */}
<View style={{
backgroundColor:"#0f172a",
padding:18,
borderRadius:12,
marginTop:20
}}>

<Text style={{
color:"#94a3b8",
fontSize:14
}}>
Converted Amount
</Text>

<Text style={{
color:"#22c55e",
fontSize:28,
fontWeight:"bold",
marginTop:5
}}>
{result} {to}
</Text>

<Text style={{
color:"#94a3b8",
marginTop:5
}}>
{amount} {from} → {to}
</Text>

</View>

{/* BANNER AD */}
<BannerAd/>

</View>
)
}
