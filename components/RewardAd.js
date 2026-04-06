import {
RewardedAd,
AdEventType,
RewardedAdEventType,
TestIds
} from "react-native-google-mobile-ads";

const adUnitId = __DEV__
? TestIds.REWARDED
: "ca-app-pub-1202355754527023/XXXXXXXXXX";

const rewarded = RewardedAd.createForAdRequest(adUnitId);

export const showRewardAd = (onEarn)=>{

rewarded.load()

rewarded.addAdEventListener(
RewardedAdEventType.EARNED_REWARD,
()=>{
onEarn && onEarn()
}
)

rewarded.addAdEventListener(
AdEventType.LOADED,
()=>{
rewarded.show()
})

}
