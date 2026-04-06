import React, { useEffect } from "react";
import {
InterstitialAd,
AdEventType,
TestIds
} from "react-native-google-mobile-ads";

const adUnitId = __DEV__
? TestIds.INTERSTITIAL
: "ca-app-pub-1202355754527023/XXXXXXXXXX";

const interstitial = InterstitialAd.createForAdRequest(adUnitId);

export default function showInterstitial(){

interstitial.load()

interstitial.addAdEventListener(
AdEventType.LOADED,
()=>{
interstitial.show()
})

}
