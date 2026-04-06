import React, { useState } from "react";
import {
View,
Text,
TouchableOpacity
} from "react-native";

import Convert from "./pages/Convert";
import Currency from "./pages/Currency";
import Clocks from "./pages/Clocks";
import More from "./pages/More";

export default function App(){

const [page,setPage]=useState("convert")

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
fontSize:14
}}>
{label}
</Text>
</TouchableOpacity>
)

return(
<View style={{flex:1,backgroundColor:"#020617"}}>

{/* TOP NAVBAR */}
<View
style={{
flexDirection:"row",
backgroundColor:"#020617",
borderBottomWidth:1,
borderBottomColor:"#1e293b"
}}
>

<Tab id="convert" label="🌍 Convert" />
<Tab id="currency" label="💱 Currency" />
<Tab id="clocks" label="🕓 Clocks" />
<Tab id="more" label="⚙ More" />

</View>

{/* PAGES */}
{page==="convert" && <Convert/>}
{page==="currency" && <Currency/>}
{page==="clocks" && <Clocks/>}
{page==="more" && <More/>}

</View>
)
}
