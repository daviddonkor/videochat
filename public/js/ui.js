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