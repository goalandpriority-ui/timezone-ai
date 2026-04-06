import React from "react";
import { View } from "react-native";
import {
BannerAd,
BannerAdSize,
TestIds
} from "react-native-google-mobile-ads";

export default function BannerAdComponent(){

return(
<View
style={{
alignItems:"center",
marginTop:10,
marginBottom:10
}}
>

<BannerAd
unitId="ca-app-pub-1202355754527023/6264508717"
size={BannerAdSize.ADAPTIVE_BANNER}
requestOptions={{
requestNonPersonalizedAdsOnly: false,
}}
/>

</View>
)

}
