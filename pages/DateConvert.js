import React, { useState, useEffect } from "react";
import {
View,
Text,
TextInput,
TouchableOpacity,
FlatList,
Pressable
} from "react-native";

/* TIMEZONES */
const zones = Intl.supportedValuesOf
? Intl.supportedValuesOf("timeZone")
: []

export default function DateConvert(){

const [from,setFrom]=useState("Asia/Kolkata")
const [to,setTo]=useState("America/New_York")

const [date,setDate]=useState("")
const [time,setTime]=useState("12:00")
const [ampm,setAmpm]=useState("PM")

const [result,setResult]=useState("")

const [fromSug,setFromSug]=useState([])
const [toSug,setToSug]=useState([])

/* FILTER */
const filter=(text,setter)=>{
const t=text.toLowerCase()
const f=zones.filter(z =>
z.toLowerCase().includes(t)
)
setter(f.slice(0,8))
}

/* CONVERT */
const convert=()=>{

if(!date) return

const [y,m,d]=date.split("-")
let [hh,mm]=time.split(":")

hh=parseInt(hh)

if(ampm==="PM" && hh!==12) hh+=12
if(ampm==="AM" && hh===12) hh=0

const base=new Date(
`${y}-${m}-${d}T${hh}:${mm}:00`
)

const converted=new Date(
base.toLocaleString("en-US",{timeZone:to})
)

setResult(
converted.toLocaleString("en-US",{
year:"numeric",
month:"short",
day:"numeric",
hour:"2-digit",
minute:"2-digit"
})
)

}

useEffect(()=>{
convert()
},[from,to,date,time,ampm])

/* SWAP */
const swap=()=>{
const a=from
setFrom(to)
setTo(a)
}

/* TODAY */
const setToday=()=>{
const now=new Date()

const y=now.getFullYear()
const m=(now.getMonth()+1).toString().padStart(2,"0")
const d=now.getDate().toString().padStart(2,"0")

setDate(`${y}-${m}-${d}`)
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
fontWeight:"bold",
marginBottom:15
}}>
Date Convert
</Text>

{/* FROM */}
<Text style={{color:"#94a3b8"}}>From Timezone</Text>

<TextInput
value={from}
onChangeText={(t)=>{
setFrom(t)
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
<Text style={{color:"#fff"}}>{item}</Text>
</Pressable>
)}
/>
)}

{/* DATE */}
<Text style={{
color:"#94a3b8",
marginTop:10
}}>
Date
</Text>

<View style={{flexDirection:"row",gap:10}}>

<TextInput
value={date}
onChangeText={setDate}
placeholder="YYYY-MM-DD"
placeholderTextColor="#94a3b8"
style={{
flex:1,
backgroundColor:"#0f172a",
color:"#fff",
padding:14,
borderRadius:10,
marginTop:5
}}
/>

<TouchableOpacity
onPress={setToday}
style={{
backgroundColor:"#1e293b",
paddingHorizontal:14,
justifyContent:"center",
borderRadius:10,
marginTop:5
}}
>
<Text style={{color:"#fff"}}>
📅 Today
</Text>
</TouchableOpacity>

</View>

{/* TIME */}
<Text style={{
color:"#94a3b8",
marginTop:10
}}>
Time
</Text>

<View style={{
flexDirection:"row",
gap:10
}}>

<TextInput
value={time}
onChangeText={setTime}
placeholder="12:30"
placeholderTextColor="#94a3b8"
style={{
flex:1,
backgroundColor:"#0f172a",
color:"#fff",
padding:14,
borderRadius:10,
marginTop:5
}}
/>

{/* AM PM */}
<TouchableOpacity
onPress={()=>setAmpm("AM")}
style={{
backgroundColor:
ampm==="AM" ? "#22c55e" : "#1e293b",
paddingHorizontal:16,
justifyContent:"center",
borderRadius:10,
marginTop:5
}}
>
<Text style={{color:"#fff"}}>AM</Text>
</TouchableOpacity>

<TouchableOpacity
onPress={()=>setAmpm("PM")}
style={{
backgroundColor:
ampm==="PM" ? "#22c55e" : "#1e293b",
paddingHorizontal:16,
justifyContent:"center",
borderRadius:10,
marginTop:5
}}
>
<Text style={{color:"#fff"}}>PM</Text>
</TouchableOpacity>

</View>

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
<Text style={{color:"#94a3b8"}}>To Timezone</Text>

<TextInput
value={to}
onChangeText={(t)=>{
setTo(t)
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
<Text style={{color:"#fff"}}>{item}</Text>
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
color:"#94a3b8"
}}>
Converted
</Text>

<Text style={{
color:"#22c55e",
fontSize:18,
marginTop:5
}}>
{result}
</Text>

</View>

</View>
)
             }
