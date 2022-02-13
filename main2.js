var img = "";
var status="";
var objects=[];
var objectDetector="";

function setup() {
    canvas = createCanvas(600, 430)
    canvas.center();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innerHTML = "Status=>> Object Is Detecting";
}

function modelLoaded(){
    
    console.log("Cocossd Model Is Loaded");
    status = true;

    objectDetector.detect(img, gotResult);
}


function preload() {
    img = loadImage("car.jpg");
}

function draw() {
    image(img, 0, 0, 640, 420);

    if (status != "") {
        for (i = 0; i < objects.length; i++) {
            document.getElementById('status').innerHTML = "Status=>> Object Detected";
            percentage = Math.floor(objects[i].confidence * 100) + "%";

            fill(51, 6, 2);
            textSize(17);
            text(objects[i].label + percentage, objects[i].x, objects[i].y);

            noFill();
            stroke(255, 1, 1);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}



function b1(){
    window.location="index.html";
}

function gotResult(error,results){
    
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        objects = results;
    }
}