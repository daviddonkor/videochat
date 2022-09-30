import * as constants from "./constants.js";
import * as elements from "./elements.js";

export const updatePersonalCode = (personalCode) => {
    const personalCodeDisplay= document.getElementById(
        "personal_code"
    );
    personalCodeDisplay.innerHTML=personalCode;
};

export const showIncomingCallDialog = (callType, acceptCallHandler, rejectCallHandler) => {
    const callTypeInfo = callType === constants.callType.CHAT_PERSONAL_CODE? "Chat" :"Video";
    const incomingCallDialog = elements.getIncomingCallDialog(
        callTypeInfo,
        acceptCallHandler,
        rejectCallHandler
        );

      //Removing all dialogs from hTML dialog element
    const dialogel=document.getElementById('dialog');
     dialogel.querySelectorAll("*").forEach((dialog)=>dialog.remove());
     dialogel.appendChild(incomingCallDialog);
}

export const showCallingDialog = (rejectCallHandler) => {
    const callingDialog = elements.getCallingDialog(rejectCallHandler);

    const dialogel=document.getElementById('dialog');
    dialogel.querySelectorAll("*").forEach((dialog)=>dialog.remove());
    dialogel.appendChild(callingDialog);
}

export const removeAllDialogs = () => {
    const dialog=document.getElementById("dialog");
    dialog.querySelectorAll("*").forEach((dialogel)=>dialogel.remove());
}

export const showInfoDialog = (preOfferAnswer) => {
    let infoDialog = null;
    console.log(preOfferAnswer);
    

    if (preOfferAnswer === constants.preOfferAnswer.CALL_REJECTED){
        infoDialog = elements.getInfoDialog(
            'Call Rejected',
            "Callee rejected the call"
        );
    }

    if (preOfferAnswer === constants.preOfferAnswer.CALLEE_NOT_FOUND){
        infoDialog = elements.getInfoDialog(
            'Callee not found',
            "Please check personal code"
        );
    }

    if (preOfferAnswer === constants.preOfferAnswer.CALL_UNAVAILABLE){
        infoDialog = elements.getInfoDialog(
            'Callee Busy',
            "Probably callee is busy. Please try again later"
        );
    }

    if(infoDialog){
        const dialog=document.getElementById('dialog');
        dialog.appendChild(infoDialog);

        //Remove the dialog after 4 seconds
        setTimeout(() =>{
            removeAllDialogs();
        },[5000]);
    }
}

export const showCallElements = (callType) => {
    if(callType===constants.callType.CHAT_PERSONAL_CODE){
        showChatCallElements();
    }

    if(callType===constants.callType.VIDEO_PERSONAL_CODE){
        showVideoCallElements();
    }
}

/// Show chat call elements when the callType is a personal CHAT
const showChatCallElements = () => {
    const finishConnectionChatButtonContainer = document.getElementById("finish_chat_button_container");
    showElement(finishConnectionChatButtonContainer);

    const newMessageInput =  document.getElementById('new_message_container');
    showElement(newMessageInput);

    disableDashboard();
}

const showVideoCallElements = () => {
    const callButtons = document.getElementById('call_button_container');
    showElement(callButtons);

    const remoteVideo = document.getElementById("remote_video");
    showElement(remoteVideo);
    disableDashboard();
}






// UI Helper functions for accepted calls

const enableDashboard = () => {
    const dashboardBlocker = document.getElementById('dashboard_blur');
    if(!dashboardBlocker.classList.contains("display_none")){
        dashboardBlocker.classList.add("display_none");
    }
};

const disableDashboard = () => {
    const dashboardBlocker = document.getElementById('dashboard_blur');
    if(dashboardBlocker.classList.contains("display_none")){
        dashboardBlocker.classList.remove("display_none");
    }
}

const hideElement = (element) => {

    if( !element.classList.contains("display_none")){
        element.classList.add("display_none");
    }
}

const showElement = (element) => {
    if( element.classList.contains("display_none")){
        element.classList.remove("display_none");
    }
}