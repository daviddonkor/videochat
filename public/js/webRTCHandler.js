import * as wss from "./wss.js";
import * as constants from "./constants.js";
import * as ui from "./ui.js";

let connectedUserDetails;

export const sendPreOffer = (calleePersonalCode,callType) => {
    connectedUserDetails =
    {
        callType,
        calleePersonalCode,
    };

    if (callType === constants.callType.CHAT_PERSONAL_CODE || callType === constants.callType.VIDEO_PERSONAL_CODE)
    {
        const data = {
            callType,
            calleePersonalCode
        };
        ui.showCallingDialog(callingDialogRejectCallHandler);
         wss.sendPreOffer(data)
    }

   
}

//Handler for the PreOffer feedback from server
export const handlePreOffer = (data) => {
    // console.log("WebRTCHandler handler called for socket IO");
    // console.log(data);
    const {callType, callerSocketId } = data;
    console.log(callerSocketId);
    connectedUserDetails = {
        socketId: callerSocketId,
        callType,
    }
    if(
        callType === constants.callType.CHAT_PERSONAL_CODE || callType === constants.callType.VIDEO_PERSONAL_CODE
    ){
        ui.showIncomingCallDialog(callType,acceptCallHandler,rejectCallHandler);
    }
};

const acceptCallHandler = () => {
    console.log("Call Accepted");
    sendPreOfferAnswer(constants.preOfferAnswer.CALL_ACCEPTED);
}

const rejectCallHandler = () => {
    console.log("Call Accepted");
    sendPreOfferAnswer(constants.preOfferAnswer.CALL_REJECTED);
}

const callingDialogRejectCallHandler = ()=>{
    console.log("Rejecting the call");
}

const sendPreOfferAnswer =  (preOfferAnswer) => {
    const data = {
        callerSocketId: connectedUserDetails.socketId,
        preOfferAnswer
    }
    wss.sendPreOfferAnswer(data);
}