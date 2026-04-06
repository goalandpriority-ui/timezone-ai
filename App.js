import React, { useState } from "react";
import {
View,
Text,
TouchableOpacity
} from "react-native";

import Convert from "./pages/Convert";
import Clocks from "./pages/Clocks";
import More from "./pages/More";

export default function App(){

const [page,setPage]=useState("convert")

return(
<View style={{flex:1,backgroundColor:"#020617"}}>

{/* TOP NAVBAR */}
<View
style={{
flexDirection:"row",
borderBottomWidth:1,
borderBottomColor:"#1e293b",
backgroundColor:"#020617"
}}
>

<TouchableOpacity
onPress={()=>setPage("convert")}
style={{
flex:1,
padding:14
}}
>
<Text style={{
color: page==="convert" ? "#22c55e" : "#94a3b8",
textAlign:"center",
fontWeight:"600"
}}>
🌍 Convert
</Text>
</TouchableOpacity>

<TouchableOpacity
onPress={()=>setPage("clocks")}
style={{
flex:1,
padding:14
}}
>
<Text style={{
color: page==="clocks" ? "#22c55e" : "#94a3b8",
textAlign:"center",
fontWeight:"600"
}}>
🕓 Clocks
</Text>
</TouchableOpacity>

<TouchableOpacity
onPress={()=>setPage("more")}
style={{
flex:1,
padding:14
}}
>
<Text style={{
color: page==="more" ? "#22c55e" : "#94a3b8",
textAlign:"center",
fontWeight:"600"
}}>
⚙ More
</Text>
</TouchableOpacity>

</View>

{/* PAGES */}
{page==="convert" && <Convert/>}
{page==="clocks" && <Clocks/>}
{page==="more" && <More/>}

</View>
)
}
