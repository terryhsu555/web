/*
window.onload=function(){
    document.write("Hello Js");
}*/

let data = new Array();

let abc = 1;

$(document).ready(function(){

    selcet();

    $("#add").click(function(){
        for(let i in data)
            if(data[i] == $("#abc").val())
            {
                window.alert("已經選項裡了");
                abc = 0;
            }
        if(abc)
            data.push($("#abc").val());

       selcet();
       abc = 1;
    });
    $("#delete").click(function(){
        for(let i in data)
            if(data[i] == $("#slect").val())
                data.splice(i);

         selcet();
    });
    $("#deleteAll").click(function(){
        data.length = 0;
        $("#slect").empty();
    });

    $("#random").click(function(){
        draw();
    });
});

function selcet()
{
    $("#slect").empty();

    for(let i in data)
        $("#slect").append(new Option(data[i]),data[i],false);
}

function done(a)
{
    for(let i = 0;i < a.length;++i)
        if(!a[i])
            return false;
    return true;
}

function draw()
{
    $("#result").empty();
    let databool = new Array();
    let num = 1;
    for(let i = 0;i < data.length;++i)
        databool[i] = false;

    while(!done(databool))
    {
        let randomnum = Math.floor(Math.random()*data.length);

        if(!databool[randomnum])
        {
            $("#result").append("<p>"+ num + ". " + data[randomnum] + "</p>");
            databool[randomnum] = true;
            num++;
        }
    }
}