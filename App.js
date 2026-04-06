import React, { useState } from "react";
import {
View,
Text,
TouchableOpacity
} from "react-native";

import Convert from "./pages/Convert";
import Currency from "./pages/Currency";
import DateConvert from "./pages/DateConvert";
import Meetings from "./pages/Meetings";
import More from "./pages/More";

export default function App(){

const [page,setPage]=useState("convert")
const [dark,setDark]=useState(true)

const bg = dark ? "#020617" : "#f8fafc"

const Tab = ({id,label})=>(
<TouchableOpacity
onPress={()=>setPage(id)}
style={{
flex:1,
paddingVertical:14,
borderBottomWidth:2,
borderBottomColor:
page===id ? "#22c55e" : "transparent"
}}
>
<Text style={{
color: page===id ? "#22c55e" : "#94a3b8",
textAlign:"center",
fontWeight:"600",
fontSize:13
}}>
{label}
</Text>
</TouchableOpacity>
)

return(
<View style={{flex:1,backgroundColor:bg}}>

<View
style={{
flexDirection:"row",
backgroundColor:bg,
borderBottomWidth:1,
borderBottomColor:"#1e293b"
}}
>

<Tab id="convert" label="🌍 Convert" />
<Tab id="date" label="📅 Date" />
<Tab id="meetings" label="⏰ Meetings" />
<Tab id="currency" label="💱 Currency" />
<Tab id="more" label="⚙ More" />

</View>

{page==="convert" && <Convert dark={dark}/>}
{page==="date" && <DateConvert dark={dark}/>}
{page==="meetings" && <Meetings dark={dark}/>}
{page==="currency" && <Currency dark={dark}/>}
{page==="more" && <More dark={dark} setDark={setDark}/>}

</View>
)
  }
