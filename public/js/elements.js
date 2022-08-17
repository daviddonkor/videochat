
export const getIncomingCallDialog = (
    callTypeInfo,
    acceptCallHandler,
    rejectCallHandler
    ) =>
{
    console.log("getting incoming call dialog");

    const dialog  = document.createElement('div');
    dialog.classList.add("dialog_wrapper");

    const dialogContent = document.createElement("div");
    dialogContent.classList.add("dialog_content");
    dialog.appendChild(dialogContent);

    const title = document.createElement("p");
    title.classList.add("dialog_title");
    title.innerHTML = `Incoming ${callTypeInfo} Call`;

    const imageContainer = document.createElement("div");
    imageContainer.classList.add("dialog_image_container");
    const image = document.createElement("img");
    image.src = "./img/dialogAvatar.png";
    imageContainer.appendChild(image);

    //Button Container
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("dialog_button_container");

    //Accept Call Button
    const acceptButton = document.createElement("button");
    acceptButton.classList.add("dialog_accept_button");
    acceptButton.classList.add("btn");
    acceptButton.classList.add("btn-primary");
    const acceptCallImage =document.createElement("img");
    const acceptCallImagePath="./img/acceptCall.png";
    acceptCallImage.src=acceptCallImagePath;
    acceptButton.append(acceptCallImage);
    acceptButton.appendChild(acceptCallImage);
    
    //Reject Call Button

    const rejectButton = document.createElement("button");
    rejectButton.classList.add("dialog_reject_button");
    rejectButton.classList.add("btn");
    rejectButton.classList.add("btn-danger");
    const rejectCallImage = document.createElement("img");
    const rejectCallImagePath = "./img/rejectCall.png";
    rejectCallImage.src = rejectCallImagePath;
    rejectButton.append(rejectCallImage);
    rejectButton.appendChild(rejectCallImage);



    buttonContainer.appendChild(acceptButton);
    buttonContainer.appendChild(rejectButton);
    dialogContent.appendChild(title);
    dialogContent.appendChild(imageContainer);
    dialogContent.appendChild(buttonContainer);

    // const dialogel=document.getElementById('dialog');
    // dialogel.append(dialog);

   return dialog; 


}