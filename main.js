var SpeechRecognition = window.webkitSpeechRecognition;

var recognition = new SpeechRecognition();

function start(){
    document.getElementById("text_box").innerHTML = "";
    recognition.start();
}

recognition.onresult = function(event){
    console.log(event);
    content = event.results[0][0].transcript;
    console.log(content);
    document.getElementById("text_box").innerHTML = content;
    if (content == "take my selfie"){
        console.log("take my selfie");
        speak();
    }
}

function speak(){
    var synth = window.speechSynthesis;
    var speak_data = "taking your selfie in 5 seconds";
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
    Webcam.attach(camera);
   setTimeout(function(){
       take_snapshot();
       save(); 
   }, 5000);

}

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id = 'my_selfie' src = '" +data_uri+ "'>";
    });
}

Webcam.set({
    width : 360,
    height: 240,
    image_format: 'png',
    png_quality: 90
});
camera = document.getElementById("camera");

function save(){
    link = document.getElementById("link");
    image_url = document.getElementById("my_selfie").src;
    link.href = image_url;
    link.click();
}