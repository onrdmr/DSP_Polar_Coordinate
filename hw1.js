isSimulationStart = false

let c0 
let c1 
let c2 
let c3 
let c4;


let m_time = 0;
let wave = [];
let path = [];


let polarCoord = [];
let fo = 0.01

let slider;
let scaleFactor = 20
function setup() {
  createCanvas(900, 400);
  
  c0 = createInput()
  c1 = createInput()
  c2 = createInput()
  c3 = createInput()
  c4 = createInput()



  greeting = createElement('h2', 'temel frekansı giriniz?');
  greeting.position(0, 410);
  
  f0 = createInput()
  f0.position(0,460)
  button = createButton('Simüle Et');
  button.position(f0.x + f0.width, 460);
  button.mousePressed(drawSim);
  //slider = createSlider(1, 50, 5);
}

function drawGrid() {
  for (var x = 0; x < width; x += width / 20) {
		for (var y = 0; y < height; y += height / ((20/9)*4)) {
			stroke(120);
			strokeWeight(2);
			line(x, 0, x, height);
			line(0, y, width, y);
		}
	}
}

function drawSim()
{

  console.log(c0.value())
  console.log(c1.value())
  console.log(c2.value())
  console.log(c3.value())
  console.log(c4.value())
  
    polarCoord.unshift(math.complex(c0.value()))
    polarCoord.unshift(math.complex(c1.value()))
    polarCoord.unshift(math.complex(c2.value()))
    polarCoord.unshift(math.complex(c3.value()))
    polarCoord.unshift(math.complex(c4.value()))
    f0 = f0.value()
    isSimulationStart = true
}

function isThisWork(){
  translate(150, 200);

    let x = 0;
    let y = 0;
    for (let i = 1; i < polarCoord.length+1; i++) {
    let prevx = x;
    let prevy = y;
  
    let radius = sqrt(polarCoord[i-1].re * polarCoord[i-1].re + polarCoord[i-1].im * polarCoord[i-1].im)
    x += scaleFactor *radius * cos(i*2*PI*fo * m_time + atan(polarCoord[i-1].re/polarCoord[i-1].im));
    y += scaleFactor *radius * sin(i*2*PI*fo * m_time + atan(polarCoord[i-1].re/polarCoord[i-1].im));
  
    stroke(255, 100);
    noFill();
    ellipse(prevx, prevy, scaleFactor *radius *2);
  
    //fill(255);
    stroke(255);
    line(prevx, prevy, x, y);
    ellipse(x, y, 8);
    }
    wave.unshift(y);
    
    
    translate(200, 0);
    line(x - 200, y, 0, wave[0]);
    beginShape();
    noFill();
  
    console.log("deneme")
      
      for (let i = 0; i < wave.length; i++) {
          vertex(i, wave[i]);
      }
      endShape();
      
      m_time += 1;
      
      
      if (wave.length > 500) {
          wave.pop();
      }
}

function draw() {
  fill(0, 102, 153, 51);
  background(0);
  drawGrid()

  if ( isSimulationStart ) 
  {
    isThisWork()
  }
 
}
