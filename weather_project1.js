var w; 
var rainAnimX = 40;
var rainAnimY = 50;
var generalText;
var particleSize = "large";
var particleType = "rain";
var position;
var sampleAngle;
var indexList = [0.5,0.9,-0.6,0.4,-0.3,0.1,0.3,-0.4,0.5,-0.3,1,1.1,-0.1,-0.8,-1.1,-1.3,0.2,1.3,0.1,0.8,-0.2,-1.3,0.3]
var cloudPlus = 0;

function preload(){
  boldDosis = loadFont('fonts/Dosis/Dosis-Light.ttf')
}

function setup() {
  createCanvas(375, 667);
  largeRainSystem = new ParticleSystem(createVector(170, -15),"large","rain");
  mediumRainSystem = new ParticleSystem(createVector(170, -20),"normal","rain");
  smallRainSystem = new ParticleSystem(createVector(170, -20),"light","rain");
  drizzleSystem = new ParticleSystem(createVector(170, -20),"drizzle","rain");
  
  smallSnowSystem = new ParticleSystem(createVector(170, -15),"small","snow");
  mediumSnowSystem = new ParticleSystem(createVector(170, -15),"medium","snow");
  largeSnowSystem = new ParticleSystem(createVector(170, -15),"large","snow");

  cloudSystem = new ParticleSystem(createVector(170, -15),"whatever","cloud");
  fogSystem = new ParticleSystem(createVector(170, -15),"whatever","fog");
  sleetSystem = new ParticleSystem(createVector(170, -15),"whatever","sleet");
  windSystem = new ParticleSystem(createVector(170, -15),"whatever","wind");
   partCloudSystem = new ParticleSystem(createVector(170, -15),"whatever","part-cloud");

sampleAngle = 0;


   am12 = color(3,4,104);
  am1 = color(6,37,91);
  am2 = color(0, 3, 80);
  am3 = color(4,27,68);
  am4 = color(40,69,119);
  am5 = color(59,108,186);
  am6 = color(87,153,214);
  am7 = color(151,237,234);
  am8 = color(173,247,220);
  am9 = color(183,255,209);
  am10 = color(200,252,189);
  am11 = color(233,255,193);
  pm12 = color(249,252,169);
  pm1 = color(249,216,107);
  pm2 = color(255,218,73);
  pm3 = color(255,187,30);
  pm4 = color(244,137,22);
  pm5 = color(237,83,0);
  pm6 = color(112,176,229);
  pm7 = color(26,107,158);
  pm8 = color(12,52,155);
  pm9 = color(1,48,168);
  pm10 = color(11,13,127);
  pm11 = color(7,9,119);
  time_colors = new Array (am12,am1,am2,am3,am4,am5,am6,am7,am8,am9,am10,am11,pm12,pm1,pm2,pm3,pm4,pm5,pm6,pm7,pm8,pm9,pm10,pm11,am12);

  cHot = color(244,167,66)
  cCold = color(92,66,244)

  //w = requestWeather('data/mit-tuesday.json');
   //w = requestWeather('data/mit-wednesday.json');
  // w = requestWeather('data/cambridge.json');
  //w = requestWeather('data/indianapolis.json');

  // w = requestWeather('data/alcatraz.json');
   w = requestWeather(42.3596764, -71.0958358, 'f2acc903fad025353fe0ae201600cab7');

}


function draw() {
  sampleAngle ++;
  background(0); 
  fill('white');
  noStroke();
  textFont(boldDosis,30);
  textAlign(CENTER);
  angleMode(DEGREES);
  bottomGradient(time_colors[hour()])

noStroke();

  if (w.ready) {
    drawWeather();

  } else {
    drawLabel("Loading...");
  }
}


function drawLabel(what) {
  text(what, width/2, height - 36);
}


function drawWeather() {
  var icon = w.getIcon();
  var temp = w.getTemperature();
  var precip = w.getPrecipIntensity();
  var wind = w.getWindSpeed();
console.log(icon,temp,precip,wind)
  windAccel = floor(wind/20)/100;
if (icon == "snow"){
  generalText = "SNOW";
  if (precip < 0.01){
    smallSnowSystem.addParticle();
    smallSnowSystem.run();
  } else if (precip >= 0.01 && precip < 0.1){
    mediumSnowSystem.addParticle();
    mediumSnowSystem.run();
  } else if (precip >= 0.1){
    largeSnowSystem.addParticle();
    largeSnowSystem.run();
  }
} else if (icon == "rain"){
    generalText = "RAIN";
  if (precip < 0.01){
    drizzleSystem.addParticle();
    drizzleSystem.run();
  } else if (precip >= 0.01 && precip < 0.1){
    smallRainSystem.addParticle();
    smallRainSystem.run();
  } else if (precip >= 0.1 && precip < 0.3){
    mediumRainSystem.addParticle();
    mediumRainSystem.run();
  } else if (precip >= 0.3){
    largeRainSystem.addParticle();
    largeRainSystem.run();
  }
} else if (icon == "cloudy"){
  generalText = "CLOUD";
    cloudSystem.addParticle();
    cloudSystem.run();
} else if (icon == "fog"){
generalText = "FOG";
    fogSystem.addParticle();
    fogSystem.run();
} else if (icon == "sleet"){
  generalText = "ICE";
    sleetSystem.addParticle();
    sleetSystem.run();

} else if (icon == "wind"){
  generalText = "WIND";
  windSystem.addParticle();
  windSystem.run();

} else if (icon == "clear-night"){
generalText = "MOONLIGHT"
  for (var i=0;i<9;i++){
    x = 170+10*i + 50*sin(sampleAngle/8)*indexList[i]
    y = i*60 + 50
    text(generalText.charAt(i),x,y);
  }
}else if (icon == "clear-day"){
generalText = "SUN SUN SUN SUN SUN"
  for (var j=0;j<7;j++){
    rotate(j*18);
  for (var i=0;i<generalText.length;i++){
    x = 100 + 30*i
    y = 10*sin(sampleAngle)*indexList[i]
    text(generalText.charAt(i),x,y); 
  }
  rotate(-j*18);
}
}else if(icon == "partly-cloudy-day"){
 generalText = "SUN SUN SUN"
  for (var j=0;j<7;j++){
    rotate(j*18);
  for (var i=0;i<generalText.length;i++){
    x = 100 + 30*i
    y = 10*sin(sampleAngle)*indexList[i]
    text(generalText.charAt(i),x,y); 
  }
  rotate(-j*18); 
}
    generalText = "CLOUD";
    cloudPlus = 275;
    partCloudSystem.addParticle();
    partCloudSystem.run();
} else if(icon == "partly-cloudy-night"){
generalText = "MOONLIGHT"
  for (var i=0;i<9;i++){
    x = 170+10*i + 50*sin(sampleAngle/8)*indexList[i]
    y = i*60 + 100
    text(generalText.charAt(i),x,y);
  }
    generalText = "CLOUD";
    cloudPlus = -130;
    partCloudSystem.addParticle();
    partCloudSystem.run();
};






  generalText = "WIND";



  textSize(36);
  text(formatDegrees(w.getTemperature()), 330, 640);
  

 









}

var system;




// Particle System code
var Particle = function(position,particleSize, particleType) {
   if(particleType == "rain"){
     this.position = position.copy();
     if(particleSize == "drizzle"){
        this.acceleration = createVector(windAccel, random(0,0.01));
       this.velocity = createVector(random(-1, 1), 0);
   }
   else if(particleSize == "light"){
     this.acceleration = createVector(windAccel, 0.01);
       this.velocity = createVector(random(-1,1), -3);
   }
   else if(particleSize == "normal"){
     this.acceleration = createVector(windAccel, 0.03);
       this.velocity = createVector(random(-1,1), -3);
   }
   else{
     this.acceleration = createVector(windAccel, 0.05);
       this.velocity = createVector(random(-1,1), -3);
   }
   }
   else if (particleType == "snow"){
   this.position = position.copy();
   if (particleSize == "large"){
    this.acceleration = createVector(windAccel, 0.015);
     this.velocity = createVector(random(-1, 1), random(-1,0));
   }
   else if (particleSize == "medium"){
    this.acceleration = createVector(windAccel, 0.005);
     this.velocity = createVector(random(-1, 1), random(-3,0));
   }
   else{
     this.acceleration = createVector(windAccel, 0.003);
    this.velocity = createVector(random(-1, 1), random(-5,0));
   }
   } 
   else if (particleType == "cloud"){
    this.position = createVector(random(50,325),random(100,300)+cloudPlus);
    this.acceleration = createVector(random(-0.002,0.002)+windAccel,random(-0.001,0.001))
    this.velocity = createVector(random(-0.1, 01), random(-0.1,0.1));
   }   else if (particleType == "fog"){
    this.position = createVector(random(50,325),random(75,650));
    this.acceleration = createVector(random(-0.002,0.002)+windAccel,random(-0.001,0.001))
    this.velocity = createVector(random(-0.1, 01), random(-0.1,0.1));
} else if (particleType == "sleet"){
      this.position = createVector(random(-100,400),-20)
    this.acceleration = createVector(0,0.25)
    this.velocity = createVector(0.1,1);
} else if (particleType == "wind"){
  this.position = createVector(-20,random(100,500));
  this.acceleration = createVector(windAccel,random(-0.01,0.01))
    this.velocity = createVector(3+windAccel*10,random(-0.01,0.01));
    this.ptype = particleType;
}  else if (particleType == "part-cloud"){
    this.position = createVector(random(50,350),random(200,300)+cloudPlus);
    this.acceleration = createVector(random(-0.002,0.002)+windAccel,random(-0.001,0.001))
    this.velocity = createVector(random(-0.1, 01), random(-0.1,0.1));
   } 








  this.lifespan = 500;
  
  var i = random(0,generalText.length);
  this.character = generalText.charAt(i);
};

Particle.prototype.run = function() {
  this.update();
  this.display();
};

Particle.prototype.update = function(){
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 0.5;

};

Particle.prototype.display = function() {
  noStroke();


  text(this.character,this.position.x, this.position.y);
};

Particle.prototype.isDead = function(){
  if (this.lifespan < 0) {
    return true;
  } else {
    return false;
  }
};

var ParticleSystem = function(position, particleSize, particleType) {
  this.origin = position;
  this.particles = [];
  this.ptype = particleType;
  this.psize = particleSize;
};

ParticleSystem.prototype.addParticle = function() {
  if (this.ptype == "part-cloud"){
    if (sampleAngle%3 ==0){
      this.particles.push(new Particle(createVector(random(-100,350),-20),this.psize,this.ptype));
    }
  }else{

  this.particles.push(new Particle(createVector(random(-100,350),-20),this.psize,this.ptype));
}
};

ParticleSystem.prototype.run = function() {
  for (var i = this.particles.length-1; i >= 0; i--) {
    var p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
};
//End Particle System


function bottomGradient(c1){
  for (i=0;i<150;i++){
    strokeWeight(i*i/15000);
    stroke(c1);
    line(0,567+i,width,567+i);
    line 
  }
}