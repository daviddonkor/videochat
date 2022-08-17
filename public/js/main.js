
import * as store  from "./store.js";
import * as wss from "./wss.js"
import * as webRTCHandler from "./webRTCHandler.js";
import * as constants from "./constants.js";
import * as elements from "./elements.js";

//Initialization of SocketIo Connection
const socket=io("/");
wss.registerSocketEvents(socket);


//Register event listner for personal code button
const  personalCodeCopyButton = document.getElementById("personal_code_copy_button");
personalCodeCopyButton.addEventListener("click", () => {
    const pesronalCode = store.getState().socketId;
    navigator.clipboard && navigator.clipboard.writeText(pesronalCode);
})
 

//Register event listeners for conenction buttons

const personalCodeChatButton = document.getElementById('personalCodeChatButton');
const personalCodeVideoButton = document.getElementById('personalCodeVideoButton');

personalCodeChatButton.addEventListener("click" , () => {
   
    const calleePersonalCode = document.getElementById("callee_personal_code").value;
    webRTCHandler.sendPreOffer(calleePersonalCode,constants.callType.CHAT_PERSONAL_CODE);

});


personalCodeVideoButton.addEventListener("click" , () => {

    const calleePersonalCode = document.getElementById("callee_personal_code").value;
    webRTCHandler.sendPreOffer(calleePersonalCode,constants.callType.VIDEO_PERSONAL_CODE);
});

elements.getIncomingCallDialog("VIDEO",
()=>{},
()=>{}
);