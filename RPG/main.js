let mapArray, ctx, currentImgMainX, currentImgMainY;
let imgMountain, imgMain, imgEnemy;
let map = 1, n = 0

$(document).ready(function () {

    map1Array = [0,1,0,0,0,0,3,1,2];

    //0可走 1障礙 2終點 3敵人
    map2Array = [0, 1, 1, 0, 1, 3, 0, 0, 3,0,0,1,0,0,0,0,
                0, 3, 1, 0, 0, 0, 1, 1, 0,1,0,0,0,1,1,0,
                0, 1, 1, 0, 0, 0, 1, 1, 0,1,0,1,0,0,1,0,
                0, 1, 1, 0, 0, 0, 1, 1, 0,1,0,1,0,0,1,0,
                0, 0, 0, 0, 1, 0, 0, 1, 0,1,0,1,0,0,1,0,
                0, 0, 1, 0, 1, 0, 1, 1, 0,1,0,1,0,0,1,0,
                0, 0, 1, 0, 1, 0, 0, 1, 0,1,0,1,0,0,1,0,
                3, 0, 1, 0, 1, 0, 0, 0, 0,1,0,1,0,0,1,0,
                1, 0, 1, 0, 1, 0, 0, 1, 0,1,0,0,0,1,1,0,
                0, 0, 1, 0, 1, 0, 1, 1, 0,1,0,1,0,3,1,0,
                0, 1, 1, 0, 0, 0, 1, 1, 0,1,0,1,1,1,1,0,
                0, 1, 1, 0, 0, 0, 1, 1, 0,1,0,1,0,0,1,0,
                0, 1, 0, 0, 0, 0, 0, 1, 0,0,0,1,0,0,0,0,
                0, 0, 0, 0, 0, 0, 1, 1, 0,1,3,1,1,1,0,0,
                0, 1, 0, 0, 3, 0, 1, 1, 0,1,1,1,0,1,1,0,
                0, 1, 1, 0, 1, 0, 3, 0, 0,0,0,0,0,3,1,2];
                
    map1(map1Array,map2Array);

    $(document).keydown(function (event) {
        let targetImageinX, targetImageinY, targetBlock, cutImagePositionX;
        event.preventDefault();
    
        switch (event.originalEvent.code) {
            case "ArrowLeft":
                targetImageinX = currentImgMainX - 600/n;
                targetImageinY = currentImgMainY;
                cutImagePositionX = 175;
                break;
            case "ArrowRight":
                targetImageinX = currentImgMainX + 600/n;
                targetImageinY = currentImgMainY;
                cutImagePositionX = 540;
                break;
            case "ArrowUp":
                targetImageinX = currentImgMainX;
                targetImageinY = currentImgMainY - 600/n;
                cutImagePositionX = 355;
                break;
            case "ArrowDown":
                targetImageinX = currentImgMainX;
                targetImageinY = currentImgMainY + 600/n;
                cutImagePositionX = 0;
                break;
            default:
                return;
        }
    
        if (targetImageinX <= 600/n*(n-1) && targetImageinX >= 0 &&
            targetImageinY <= 600/n*(n-1) && targetImageinY >= 0)
            targetBlock = targetImageinX / (600/n) + targetImageinY / (600/n) * n;
        else
            targetBlock = -1;
    
        ctx.clearRect(currentImgMainX, currentImgMainY, 600/n, 600/n);
    
        if (targetBlock == -1 || mapArray[targetBlock] == 1 || mapArray[targetBlock] == 3);
        else {
            $("#talkbox").empty();
            currentImgMainX = targetImageinX;
            currentImgMainY = targetImageinY;
        }
    
        ctx.drawImage(imgMain, cutImagePositionX, 0, 80, 130, currentImgMainX, currentImgMainY, 600/n, 600/n);
    
        switch (mapArray[targetBlock]) {
            case undefined:
                $("#talkbox").text("邊界");
                break;
            case 1:
                $("#talkbox").text("有山");
                break;
            case 2:
                $("#talkbox").text("抵達終點");
                if(n == 3)
                {
                    ++map;
                    map1goal(map1Array,map2Array);
                }
                break;
            case 3:
                $("#talkbox").text("哈囉");
                break;
        }
        });
});

function map1goal(map1Array,map2Array)
{
    ctx.clearRect(0,0,600,600);
    $("#talkbox").empty();
    map1(map1Array,map2Array);
}

function map1(map1Array,map2Array)
{
    ctx = $("#myCanvas")[0].getContext("2d");
    
    imgMain = new Image();
    imgMain.src = "RPG/image/spriteSheet.png";
    currentImgMainX = 0;
    currentImgMainY = 0;

    if(map == 1)
    {
         n = 3;
         mapArray = map1Array;
    }
    else
    {
        n = 16;
        mapArray = map2Array;
    }

    imgMain.onload = function () {
        ctx.drawImage(imgMain, 0, 0, 80, 130, currentImgMainX, currentImgMainY, 600/n, 600/n);
    }

    imgMountain = new Image();
    imgMountain.src = "RPG/image/material.png";
    imgEnemy = new Image();
    imgEnemy.src = "RPG/image/Enemy.png";

    imgMountain.onload = function () {
        imgEnemy.onload = function () {
            for (let x in mapArray) {
                if (mapArray[x] == 1) {
                    ctx.drawImage(imgMountain, 32, 65, 32, 32, x % n * 600/n, Math.floor(x / n) * 600/n, 600/n, 600/n);
                }
                else if (mapArray[x] == 3) {
                    ctx.drawImage(imgEnemy, 7, 40, 104, 135, x % n * 600/n, Math.floor(x / n) * 600/n, 600/n, 600/n);
                }
            }
        }
    }
}