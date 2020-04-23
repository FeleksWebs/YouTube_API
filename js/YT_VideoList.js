
var AllVideoArr =[]

/* 
BE CAREFUL WHEN DELETING A div LATER,
*/

function ArrChanges(VidTitle){
        var ArrNR = AllVideoArr.length-1

        //Main
        var Main = document.createElement("Main")
        Main.setAttribute("id","VidResult"+AllVideoArr.length)
        Main.setAttribute("class","resultVid")

        //Control Div
        var ControlDiv = document.createElement("Main")
        ControlDiv.setAttribute("id","VidCtrl_"+AllVideoArr.length)
        ControlDiv.setAttribute("class","VidCtrl")

        //iframe
        var ifrm = document.createElement("iframe");
        ifrm.setAttribute("id", "VidID_"+AllVideoArr.length)
        ifrm.setAttribute("class","VideIframe")
        ifrm.setAttribute("src",AllVideoArr[ArrNR].Src);
        //title
        var VidTxt = document.createElement("h4")
        VidTxt.innerHTML = VidTitle



        // 3 Control Buttons
        var playBtn = document.createElement("button")
        playBtn.setAttribute("id","playBtn_"+AllVideoArr.length)
        playBtn.setAttribute("onclick","YTcontrol(this.id)")
        playBtn.setAttribute("class","PlayBtn")
        playBtn.innerHTML="Play"

        var pauseBtn = document.createElement("button")
        pauseBtn.setAttribute("id","pauseBtn_"+AllVideoArr.length)
        pauseBtn.setAttribute("onclick","YTcontrol(this.id)")
        pauseBtn.setAttribute("class","PauseBtn")
        pauseBtn.innerHTML="Pause"

        var stopBtn = document.createElement("button")
        stopBtn.setAttribute("id","stopBtn_"+AllVideoArr.length)
        stopBtn.setAttribute("onclick","YTcontrol(this.id)")
        stopBtn.setAttribute("class","StopBtn")
        stopBtn.innerHTML="Stop"

        var RemoveBtn = document.createElement("button")
        RemoveBtn.setAttribute("onclick","removeVid(this.id)")
        RemoveBtn.setAttribute("id","removeBtn_"+AllVideoArr.length)
        RemoveBtn.setAttribute("class","RemoveBtn")
        RemoveBtn.innerHTML="X"

        //append child
        ControlDiv.appendChild(playBtn)
        ControlDiv.appendChild(pauseBtn)
        ControlDiv.appendChild(stopBtn)
        ControlDiv.appendChild(RemoveBtn)
        Main.appendChild(ifrm)
        Main.appendChild(VidTxt)
        Main.appendChild(ControlDiv)
        document.getElementById("YT_Playlist").appendChild(Main)

        console.log(AllVideoArr)
}

//Adding videos to arr
function PushToArr(VideoTitle,VideoSRC){
    AllVideoArr[AllVideoArr.length] = {"Title":VideoTitle,"Src":VideoSRC}
    //Remove videos from list
    var clearDiv = document.getElementById("results")
    clearDiv.querySelectorAll('*').forEach(n=>n.remove())

    ArrChanges(VideoTitle)
}


// Play/Pause/Stop Controls
const YTcontrol = (Btn)=>{
    var BtnName = Btn.split("_")[0]
    var BtnNum = Btn.split("_")[1]
    console.log(Btn.split("_")[1])
    //issue starts her+
    
    
    if(BtnName == "playBtn"){
        $('#VidID_'+BtnNum)[0].contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
    }else if(BtnName == "pauseBtn"){
        $('#VidID_'+BtnNum)[0].contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
    }else{
        $('#VidID_'+BtnNum)[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
    }
    
}


const removeVid = (element)=>{
    // put video to "STOP" when deleting
    var BtnName = element.split("_")[1]
    //console.log("VidResult_"+BtnName)
    document.getElementById("VidResult"+BtnName).remove();
    console.log(element)  
    //clear object arr form these
    
}