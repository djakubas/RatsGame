document.addEventListener("DOMContentLoaded", function() {
    var victoryContainer = document.querySelector('.victory-container');
    victoryContainer.style.display = 'none';
  });


function ClickImg(element){

    let source = element.src.split("/") 
    if (source[source.length-1] == "cover.jpg"){

    //Scenario: second image clicked
    if (sessionStorage.getItem("FirstPicture")){
        console.log("second")
        ChangeImg(element.id,sessionStorage.getItem(element.id))
        DeactiveImgClick(element)  
        const FirstElement = document.getElementById(sessionStorage.getItem("FirstPicture"))
        
        //check if the same
        
        if (element.src == FirstElement.src){
            //add some animation    
            AddPairsCount()
            sessionStorage.removeItem("FirstPicture")
        }
        else{
            

            DeactivateAllClick()

            sleep(300).then(() => { 
            element.className = "pictureshake"
            FirstElement.className = "pictureshake"
            })

            sleep(1000).then(() => { 
            
            element.className = ""
            FirstElement.className = ""

            ChangeImg(element.id,"cover.jpg")
            ChangeImg(FirstElement.id,"cover.jpg")
            sessionStorage.removeItem("FirstPicture")
            ActivateAllClick()
        })
        }
    
        AddScore()
        if (CheckVictory()){

            var finalscore = document.getElementById("finalscore")
            finalscore.innerText = "Twój wynik: "+sessionStorage.getItem("Score")
            var victoryContainer = document.querySelector('.victory-container');
            victoryContainer.style.display = 'block';

        }
        
    }
    //scenario: first image clicked
    
    else{
        console.log("first")
        ChangeImg(element.id,sessionStorage.getItem(element.id))
        DeactiveImgClick(element)  
        sessionStorage.setItem("FirstPicture",element.id)
        

    }

}}

function ChangeImg(id,img){
    const element = document.getElementById(id)
    element.src = img 
}

function StartClick(){
    sessionStorage.clear()
    sessionStorage.setItem("Score","0")
    sessionStorage.setItem("pairscount",0)

    StartButton = document.getElementById("StartButton")
    StartButton.remove()
    const arrPosition = GenerateArrayMemory()
    console.log(arrPosition)

    arrImages = [0,0,1,1,2,2,3,3,4,4]
    var PictureContainer = document.getElementById("picture-container") 


    for (let i = 0 ; i < arrPosition.length ; i++){
        
        let element = document.createElement("div")
        element.className = "picture"

        let elementImg = document.createElement("img")
        elementImg.id = "rat" + i
        elementImg.src = arrImages[arrPosition[i]]+".jpg"
        sessionStorage.setItem(elementImg.id,elementImg.src)
        ActiveImgClick(elementImg)
        element.appendChild(elementImg)
        PictureContainer.appendChild(element)
        
    }

    sleep(1500).then(() => { 
        var children = PictureContainer.children
        for (var i = 0; i < children.length; i++) {
            var elementDiv = children[i]
            var elementImg = elementDiv.firstChild
            elementImg.src = "cover.jpg"
            
        }
    });
}

function ActiveImgClick(element){
    element.onclick = function(){ClickImg(this)}
}
function DeactiveImgClick(element){
    element.onclick = ""
}
function ActivateAllClick(){
    var PictureContainer = document.getElementById("picture-container")
    var children = PictureContainer.children
    for (var i = 0; i < children.length; i++) {
        var elementDiv = children[i]
        var elementImg = elementDiv.firstChild
        //elementImg.src = arrImages[arrPosition[i]]+".jpg"
        elementImg.onclick = function(){ClickImg(this)}
    }
}

function DeactivateAllClick(){
    var PictureContainer = document.getElementById("picture-container")
    var children = PictureContainer.children
    for (var i = 0; i < children.length; i++) {
        var elementDiv = children[i]
        var elementImg = elementDiv.firstChild
        //elementImg.src = arrImages[arrPosition[i]]+".jpg"
        elementImg.onclick = ""
    }
}


function GenerateArrayMemory(){

    var arr = []
    var i = 0
    while (arr.length < 10){
        
        var number = Math.floor(Math.random() * 10)
        if (arr.includes(number)){
        }
        else{
            arr[i] = number
            i = i + 1
    }
    
    }
    return arr
}

function AddScore(){

    var score = parseInt(sessionStorage.getItem("Score"))
    score = score + 1
    sessionStorage.removeItem("Score")
    sessionStorage.setItem("Score",score)
    var element = document.getElementById("scorecount")
    element.innerText = "Twoj wynik: "+ score

}

function AddPairsCount(){

    var score = parseInt(sessionStorage.getItem("pairscount"))
    score = score + 1
    sessionStorage.removeItem("pairscount")
    sessionStorage.setItem("pairscount",score)
    var element = document.getElementById("pairscount")
    element.innerText = "Znalezione pary: "+score+"/5"

}

function CheckVictory(){
    
    var PictureContainer = document.getElementById("picture-container")
    var children = PictureContainer.children
    for (var i = 0; i < children.length; i++) {
        var elementDiv = children[i]
        var elementImg = elementDiv.firstChild
        let source = elementImg.src.split("/") 
        if (source[source.length-1] == "cover.jpg") {
            return false
        }
    }
    return true

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  