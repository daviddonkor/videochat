let state = {
    socketId: null,
    localStream: null,
    remoteStream: null,
    screenSharingStream: null,
    allowConnectionsFromStrangers: false,
    screenSharingActive: false,
    callState:false,

}

export const setSocketId = socketId => {
    state = {
        ...state,
        socketId,
    }
    console.log(state);
}

export const setLocalStream = stream => {
    state = {
        ...state,
        localStream: stream,
    }
}

export const setAllowConnectionsFromStrangers = allowconnection =>
{
    state = {
        ...state,
        allowConnectionsFromStrangers: allowconnection,
    }
}

export const setScreenSharingActive = screenSharingActive => {
    state = {
         ...state,
         screenSharingActive,
    }
}

export const setRemoteStream = remoteStream => {
    state = {
        ...state,
        remoteStream,
    }
}

export const setScreenSharingStream = screenSharingStream => {
    state = {
        ...state,
        screenSharingStream,
    }
}

export const setCallState = callState => {
    state  = {
        ...state,
        callState,
    }
}

export const getState = ()=>{
    return state;
}