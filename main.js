Webcam.set({
    width:350,
    height:300,
    imageFormat:"png",
    png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach('#camera');

function takeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML="<img id='snapshot' src="+data_uri+">"
    });
}
console.log("ml5 version",ml5.version);

//enter link to model here//
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/U5NzDCY-6/model.json', modelLoaded);

function modelLoaded(){
    console.log("model Loaded!");
}

function check(){
    img=document.getElementById("snapshot");
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
if(error){
    console.error(error);
}
else{
    console.log(results);
    document.getElementById("result_object_name").innerHTML=results[0].label;
    object_name=document.getElementById("result_object_name").innerHTML=results[0].label;
    document.getElementById("result_object_accuracy").innerHTML=results[0].confidence.toFixed();
    speak();
}
}

function speak(){
    synth=window.speechSynthesis;
    var utterThis=new SpeechSynthesisUtterance(object_name);
    synth.speak(utterThis);
}