import React, { useState, useEffect } from "react";
import {
View,
Text,
TextInput,
TouchableOpacity,
FlatList,
Pressable
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";

export default function Meetings(){

const [date,setDate]=useState("")
const [time,setTime]=useState("09:00")
const [ampm,setAmpm]=useState("AM")
const [duration,setDuration]=useState("60")

const [start,setStart]=useState("")
const [end,setEnd]=useState("")

const [meetings,setMeetings]=useState([])

/* NOTIFICATION PERMISSION */
useEffect(()=>{
Notifications.requestPermissionsAsync()
},[])

/* SCHEDULE NOTIFICATION */
const scheduleNotification = async (date,start)=>{

try{

const trigger=new Date(`${date} ${start}`)

await Notifications.scheduleNotificationAsync({
content:{
title:"Meeting Reminder",
body:`Meeting at ${start}`
},
trigger
})

}catch(e){}

}

/* CLEAN EXPIRED */
const cleanExpired = (list)=>{

const now=new Date()

return list.filter(m=>{

const endDate=new Date(`${m.date} ${m.end}`)
return endDate>now

})

}

/* LOAD SAVED */
useEffect(()=>{
load()
},[])

const load=async()=>{
const d=await AsyncStorage.getItem("meetings")

if(d){
const parsed=JSON.parse(d)
const clean=cleanExpired(parsed)
setMeetings(clean)

await AsyncStorage.setItem(
"meetings",
JSON.stringify(clean)
)
}
}

/* AUTO CLEAN EVERY 30s */
useEffect(()=>{

const i=setInterval(async()=>{

const d=await AsyncStorage.getItem("meetings")
if(!d) return

const parsed=JSON.parse(d)
const clean=cleanExpired(parsed)

setMeetings(clean)

await AsyncStorage.setItem(
"meetings",
JSON.stringify(clean)
)

},30000)

return ()=>clearInterval(i)

},[])

/* SAVE */
const saveAll=async(list)=>{
setMeetings(list)
await AsyncStorage.setItem("meetings",JSON.stringify(list))
}

/* CALC TIME */
useEffect(()=>{

let [h,m]=time.split(":")
h=parseInt(h)
m=parseInt(m)

if(ampm==="PM" && h!==12) h+=12
if(ampm==="AM" && h===12) h=0

const startDate=new Date(`${date}T00:00:00`)
startDate.setHours(h)
startDate.setMinutes(m)

const endDate=new Date(startDate)
endDate.setMinutes(endDate.getMinutes()+parseInt(duration))

setStart(
startDate.toLocaleTimeString("en-US",{
hour:"2-digit",
minute:"2-digit"
})
)

setEnd(
endDate.toLocaleTimeString("en-US",{
hour:"2-digit",
minute:"2-digit"
})
)

},[time,ampm,duration,date])

/* SAVE MEETING */
const saveMeeting=()=>{

if(!date) return

const item={
id:Date.now().toString(),
date,
start,
end,
duration
}

scheduleNotification(date,start)

const list=[item,...meetings]

saveAll(list)

}

/* DELETE */
const remove=(id)=>{
const list=meetings.filter(m=>m.id!==id)
saveAll(list)
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
Meeting Alerts
</Text>

<Text style={{color:"#94a3b8"}}>Date</Text>

<TextInput
value={date}
onChangeText={setDate}
placeholder="2026-08-10"
placeholderTextColor="#94a3b8"
style={{
backgroundColor:"#0f172a",
color:"#fff",
padding:14,
borderRadius:10,
marginTop:5
}}
/>

<Text style={{
color:"#94a3b8",
marginTop:10
}}>
Time
</Text>

<View style={{flexDirection:"row",gap:10}}>

<TextInput
value={time}
onChangeText={setTime}
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
onPress={()=>setAmpm("AM")}
style={{
backgroundColor:ampm==="AM"?"#22c55e":"#1e293b",
padding:12,
borderRadius:10,
marginTop:5
}}
>
<Text style={{color:"#fff"}}>AM</Text>
</TouchableOpacity>

<TouchableOpacity
onPress={()=>setAmpm("PM")}
style={{
backgroundColor:ampm==="PM"?"#22c55e":"#1e293b",
padding:12,
borderRadius:10,
marginTop:5
}}
>
<Text style={{color:"#fff"}}>PM</Text>
</TouchableOpacity>

</View>

<Text style={{
color:"#94a3b8",
marginTop:10
}}>
Duration (minutes)
</Text>

<TextInput
value={duration}
onChangeText={setDuration}
keyboardType="numeric"
style={{
backgroundColor:"#0f172a",
color:"#fff",
padding:14,
borderRadius:10,
marginTop:5
}}
/>

<View style={{
backgroundColor:"#0f172a",
padding:14,
borderRadius:10,
marginTop:10
}}>

<Text style={{color:"#94a3b8"}}>
Start: {start}
</Text>

<Text style={{color:"#94a3b8"}}>
End: {end}
</Text>

</View>

<TouchableOpacity
onPress={saveMeeting}
style={{
backgroundColor:"#22c55e",
padding:14,
borderRadius:10,
marginTop:10
}}
>
<Text style={{
color:"#000",
textAlign:"center",
fontWeight:"600"
}}>
Save Meeting
</Text>
</TouchableOpacity>

<FlatList
data={meetings}
keyExtractor={(i)=>i.id}
renderItem={({item})=>(
<Pressable
onLongPress={()=>remove(item.id)}
style={{
backgroundColor:"#0f172a",
padding:14,
borderRadius:10,
marginTop:10
}}
>

<Text style={{color:"#fff"}}>
📅 {item.date}
</Text>

<Text style={{color:"#22c55e"}}>
{item.start} → {item.end}
</Text>

<Text style={{color:"#94a3b8"}}>
{item.duration} min
</Text>

</Pressable>
)}
/>

</View>
)
}
