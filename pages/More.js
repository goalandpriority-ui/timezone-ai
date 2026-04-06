import React from "react";
import {
View,
Text,
TouchableOpacity,
Linking,
ScrollView
} from "react-native";

import BannerAd from "../components/BannerAd";

export default function More({dark,setDark}){

const openGithub = ()=>{
Linking.openURL(
"https://github.com/goalandpriority-ui/timezone-ai/tree/main"
)
}

return(
<ScrollView
style={{
flex:1,
backgroundColor: dark ? "#020617" : "#f8fafc"
}}
contentContainerStyle={{padding:20}}
>

<Text style={{
color: dark ? "#fff" : "#000",
fontSize:28,
fontWeight:"700",
marginBottom:16
}}>
More
</Text>

<View style={{
backgroundColor:"#0f172a",
padding:18,
borderRadius:16,
marginBottom:14
}}>

<Text style={{color:"#94a3b8",marginBottom:8}}>
Info
</Text>

<Text style={{
color:"#fff",
fontSize:18,
fontWeight:"600"
}}>
TimeZone AI
</Text>

<Text style={{
color:"#94a3b8",
marginTop:4
}}>
Convert • Date • Meetings • Currency
</Text>

<View style={{marginTop:14}}>

<Text style={{color:"#94a3b8"}}>
Supports
</Text>

<Text style={{color:"#fff",marginTop:4}}>
200+ Countries
</Text>

<Text style={{color:"#fff"}}>
400+ Timezones
</Text>

<Text style={{color:"#fff"}}>
Offline support
</Text>

</View>

<Text style={{
color:"#94a3b8",
marginTop:14
}}>
Version 1.0.0
</Text>

</View>

<View style={{
backgroundColor:"#0f172a",
padding:18,
borderRadius:16,
marginBottom:14
}}>

<Text style={{
color:"#94a3b8",
marginBottom:6
}}>
Developer
</Text>

<Text style={{
color:"#fff",
fontSize:16,
fontWeight:"600"
}}>
Ajithkumar Eswaran
</Text>

</View>

<TouchableOpacity
onPress={()=>setDark(!dark)}
style={{
backgroundColor:"#0f172a",
padding:16,
borderRadius:16,
marginBottom:14
}}
>
<Text style={{
color:"#22c55e",
textAlign:"center",
fontWeight:"600",
fontSize:16
}}>
🌙 Toggle Theme
</Text>
</TouchableOpacity>

<TouchableOpacity
onPress={openGithub}
style={{
backgroundColor:"#0f172a",
padding:16,
borderRadius:16,
marginBottom:20
}}
>
<Text style={{
color:"#22c55e",
textAlign:"center",
fontWeight:"600",
fontSize:16
}}>
Open GitHub Repository
</Text>
</TouchableOpacity>

{/* BANNER AD */}
<BannerAd/>

</ScrollView>
)
}
