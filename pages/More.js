import React from "react";
import {
View,
Text,
TouchableOpacity,
Linking,
ScrollView
} from "react-native";

export default function More(){

const openGithub = ()=>{
Linking.openURL(
"https://github.com/goalandpriority-ui/timezone-ai/tree/main"
)
}

return(
<ScrollView
style={{
flex:1,
backgroundColor:"#020617"
}}
contentContainerStyle={{padding:20}}
>

<Text style={{
color:"#fff",
fontSize:26,
fontWeight:"bold",
marginBottom:15
}}>
⚙ More
</Text>

<View style={{
backgroundColor:"#0f172a",
padding:16,
borderRadius:12,
marginBottom:12
}}>

<Text style={{
color:"#22c55e",
fontSize:18,
marginBottom:8
}}>
Info
</Text>

<Text style={{color:"#fff",fontSize:16}}>
TimeZone AI
</Text>

<Text style={{color:"#94a3b8",marginTop:2}}>
Convert • Clocks • Meeting
</Text>

<Text style={{color:"#94a3b8",marginTop:10}}>
Supports:
</Text>

<Text style={{color:"#fff"}}>
200+ Countries
</Text>

<Text style={{color:"#fff"}}>
400+ Timezones
</Text>

<Text style={{color:"#fff"}}>
Offline support
</Text>

<Text style={{color:"#94a3b8",marginTop:10}}>
Version 1.0.0
</Text>

</View>

<View style={{
backgroundColor:"#0f172a",
padding:16,
borderRadius:12,
marginBottom:12
}}>
<Text style={{
color:"#22c55e",
fontSize:18,
marginBottom:6
}}>
Developer
</Text>

<Text style={{color:"#fff"}}>
Ajithkumar Eswaran
</Text>
</View>

<TouchableOpacity
onPress={openGithub}
style={{
backgroundColor:"#2563eb",
padding:14,
borderRadius:12
}}
>
<Text style={{
color:"#fff",
textAlign:"center",
fontWeight:"600"
}}>
Open GitHub Repository
</Text>
</TouchableOpacity>

</ScrollView>
)
}
