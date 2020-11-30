//implementatsioon näite põhjal käsitsi, ilma ühtegi library kasutamata
//viide: https://youtu.be/dkLpo4shS6c

let galleryImages = document.querySelectorAll(".gallery-img");                                      //kogume kõik pildid kokku kasutades nende gallery-img klassi
let getLatestOpenedImg;                                                                             //hakkab hoiustama viimast avatud pilti
let windowWidth = window.innerWidth;                                                                //brauseri aknasuurus

if(galleryImages){                                                                                  
    galleryImages.forEach(function(image, index) {                                                  //tekitame galerii funktsionaalsuse igale galerii pildile
        image.onclick = function(){
            let getElementCss = window.getComputedStyle(image);                                     //pildi stiil css failis
            let getFullImgUrl = getElementCss.getPropertyValue("background-image");                 //thumbnaili url
            let getImgUrlPos = getFullImgUrl.split("/images/galerii/small/");                       
            let setNewImgUrl = getImgUrlPos[1].replace('")', '');                                   //tekstitöötlus nime välja võtmiseks

            getLatestOpenedImg = index + 1;                                                         //index algab nullist, pildid algavad 1-st
            
            let container = document.body;                                                          
            let newImgWindow = document.createElement("div");
            container.appendChild(newImgWindow);                                                    //konteiner ja omaduste lisamine pildi div elemendile
            newImgWindow.setAttribute("class", "img-window");
            newImgWindow.setAttribute("onclick", "closeImg()");

            let newImg = document.createElement("img");
            newImgWindow.appendChild(newImg);
            newImg.setAttribute("src", "images/galerii/" + setNewImgUrl);                           //pildi lisamine konteinerisse ja sellele omaduste lisamine
            newImg.setAttribute("id", "current-img");

            newImg.onload = function(){
                let imgWidth = this.width;                                                          
                let calcImgToEdge =((windowWidth - imgWidth) / 2) - 80;



                let newNextBtn = document.createElement("a");
                let btnNextText = document.createTextNode("Edasi");
                newNextBtn.appendChild(btnNextText);
                container.appendChild(newNextBtn);                                                     //galerii edasi nupp
                newNextBtn.setAttribute("class", "img-btn-next");
                newNextBtn.setAttribute("onclick", "changeImg(1)");
                newNextBtn.style.cssText = "right: "+ calcImgToEdge +"px;";    
                
                let newPrevBtn = document.createElement("a");
                let btnPrevText = document.createTextNode("Tagasi");
                newPrevBtn.appendChild(btnPrevText);
                container.appendChild(newPrevBtn);                                                     //galerii tagasi nupp 
                newPrevBtn.setAttribute("class", "img-btn-prev");
                newPrevBtn.setAttribute("onclick", "changeImg(0)");
                newPrevBtn.style.cssText = "left: "+ calcImgToEdge +"px;";   
            }

            

            
        }
    });
}

function closeImg(){
    document.querySelector(".img-window").remove();
    document.querySelector(".img-btn-next").remove();                                                   //pildi sulgemine
    document.querySelector(".img-btn-prev").remove();
}

function changeImg(changeDir){                                                                          //pildi vahetamine
    document.querySelector("#current-img").remove();                                                    //vana pilt eemaldatakse

    let getImgWindow = document.querySelector(".img-window");
    let newImg = document.createElement("img");                                                         //tekitame uue pildi jaoks koha kus teda hoida
    getImgWindow.appendChild(newImg);

    let calcNewImg;
    if(changeDir === 1){
        calcNewImg = getLatestOpenedImg + 1;
        if(calcNewImg > galleryImages.length){                                                           //changedir=1 edasi ja changedir=0 tagasi, vastav loogika et midagi katki ei läheks
            calcNewImg = 1;
        }
    }
    else if(changeDir === 0){
        calcNewImg = getLatestOpenedImg - 1;
        if(calcNewImg < 1){
            calcNewImg = galleryImages.length;
        }
    }

    newImg.setAttribute("src", "./images/galerii/kook" +calcNewImg +".jpg");                              //vastavalt edasi või tagasi käsule liigume ühe väärtuse võrra piltide kaustas kasutades meie pildi nimetusskeemi
    newImg.setAttribute("id", "current-img");                                                             //seame pildile hetkel kuvatava pildi omaduse

    getLatestOpenedImg = calcNewImg;                                                                      //seame viimase avatud pildi võrdseks meie uue pildiga

    newImg.onload = function() {
        let imgWidth = this.width;
        let calcImgToEdge =((windowWidth - imgWidth) / 2) - 80;

        let nextBtn = document.querySelector(".img-btn-next");
        nextBtn.style.cssText = "right: " + calcImgToEdge + "px;";                                         //paigutame nupud pildi äärtesse vastavalt pildi laiusele

        let prevBtn = document.querySelector(".img-btn-prev");
        prevBtn.style.cssText = "left: " + calcImgToEdge + "px;";
    }
}