function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  my_model=ml5.imageClassifier('MobileNet',modelLoaded)
}

function modelLoaded(){
  console.log("Your model has loaded")
}

function draw(){
  image (video,0,0,300,300)
 my_model.classify(video,gotResult) 
}

previousresult=""

function gotResult(error,result){
if(error){
  console.log(error)
}
else{
  if((result[0].confidence>0.5) && (previousresult != result[0].label)){
    console.log(result)
    previousresult=result[0].label
  document.getElementById("obn").innerHTML=result[0].label
  document.getElementById("oba").innerHTML=result[0].confidence.toFixed(2)

  api=window.speechSynthesis
  sd="object detected is "+result[0].label
  sp=new SpeechSynthesisUtterance(sd)
  api.speak(sp)
  }
}
}