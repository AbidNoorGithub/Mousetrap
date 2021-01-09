var player, playerImage

var score, highscore, attackSpeed, attackInterval, distance, size, LeRi, RiLe

var buttonEasy, buttonNormal, buttonDifficult, buttonExtreme, EasyImg, NormalImg, DifficultImg, ExtremeImg, quit, quitButton, title, titleImg

//obstacles
var HB, VB, HBrickImage, VBrickImage, pew
var virus, virusLeft, virusRight, roar, virusAlive, virusDeathCry



function preload(){
  //player
  playerImage = loadImage("Player Items/Player.png")

  titleImg = loadImage("Player items/title.png")

  //obstacles
  HBrickImage = loadImage("Obstacles/horizontal-brick.jpeg")
  VBrickImage  = loadImage("Obstacles/vertical-brick.jpeg")

  virusLeft  = loadImage("Obstacles/enemy1-left.png")
  virusRight = loadImage("Obstacles/enemy1-right.png")

  //sounds
  roar = loadSound("Obstacles/virus-charge.mp3")

  pew = loadSound("Obstacles/Brick-shoot.mp3")

  virusDeathCry = loadSound("Obstacles/VirusDeathCry.mp3")

  //buttons
  EasyImg = loadImage("Buttons/EasyMode.jpeg")
  NormalImg = loadImage("Buttons/NormalMode.jpeg")
  DifficultImg = loadImage("Buttons/DifficultMode.jpeg")
  ExtremeImg = loadImage("Buttons/ExtremeMode.jpeg")

  quit = loadImage("Buttons/quit.png")
}

function setup(){
  createCanvas(displayWidth, displayHeight)
  //setup
  attackSpeed = 24
  attackInterval = 24
  score = 0
  highscore = 0
  distance = 420
  size = 0.5
  LeRi = false
  RiLe = true

  //other
  gs = 1
  virusAlive = true
  //1 = start, 2 = playing

  //player
  player = createSprite(200,200)
  player.addImage(playerImage)
  player.scale = 0.007

  //start
  buttonNormal = createSprite(displayWidth/2 - 90, displayHeight/2 + 75)
  buttonNormal.addImage(NormalImg)
  buttonNormal.scale = 0.5
  buttonNormal.depth = player.depth
  player.depth = player.depth + 1
  
  buttonEasy = createSprite(displayWidth/2 - 270, displayHeight/2 + 75)
  buttonEasy.addImage(EasyImg)
  buttonEasy.scale = 0.5
  buttonEasy.depth = player.depth
  player.depth = player.depth + 1

  buttonDifficult = createSprite(displayWidth/2 + 90, displayHeight/2 + 75)
  buttonDifficult.addImage(DifficultImg)
  buttonDifficult.scale = 0.5
  buttonDifficult.depth = player.depth
  player.depth = player.depth + 1

  buttonExtreme = createSprite(displayWidth/2 + 270, displayHeight/2 + 75)
  buttonExtreme.addImage(ExtremeImg)
  buttonExtreme.scale = 0.5
  buttonExtreme.depth = player.depth
  player.depth = player.depth + 1

  title = createSprite(displayWidth/2, displayHeight/2 - 250)

  //obstacles
//bricks
  HB = createSprite(10000,100000)
  HB.addImage(HBrickImage)
  HB.velocityY = attackSpeed

  VB = createSprite(1000000,10000)
  VB.addImage(VBrickImage)
  VB.velocityX = attackSpeed

//virus
  virus = createSprite(1200, 999999)
  virus.addImage(virusLeft)
  virus.scale = 0.45

}


function draw(){
  background("white")

  //kill detection
  killDetection()

  //player
  player.x = mouseX 
  player.y = mouseY 

  //start
  if (gs === 1){
    Start()
  }

  //if statement for gamestate 222222222222222222222222222222222222
  if (gs === 2){
  
    //spawns in bricks
    brick()

    //virus
    Virus()
    virus.visible = true

    //kill detection
    killDetection()

    //score
    fill("black")
    textSize(20)
    textFont("Baskerville Bold")
    text("Your score is: " + score, 50, 50)
    if (score > highscore) {
      highscore = score;
    }
    text("Your highscore is: " + highscore, 50, 70)

    //gone button
    buttonEasy.visible = false
    buttonNormal.visible = false
    buttonDifficult.visible = false
    buttonExtreme.visible = false
    title.visible = false

    //quit
    //Quit()

  }

  drawSprites()
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function brick(){

  if (World.frameCount % attackInterval === 0) {

    BrickChoice = Math.floor(Math.random() * 3); 

    BrickAngle = Math.floor(Math.random() * 2); 

    if(BrickChoice === 1){

      if (BrickAngle === 1){
        //top to down
        HB = createSprite(player.x,player.y - distance)
        HB.addImage(HBrickImage)
        HB.velocityY = attackSpeed
        pew.play()
        HB.lifetime = 600
        HB.scale = size
        score += 100
        //console.log("H brick fired " + BrickChoice)
      } else {
        //down to top
        HB = createSprite(player.x,player.y + distance)
        HB.addImage(HBrickImage)
        HB.velocityY = attackSpeed * -1
        pew.play()
        HB.lifetime = 600
        HB.scale = size
        score += 100
        //console.log("H brick fired " + BrickChoice)
      }
    } else {
      if (BrickAngle === 1){
        //left to right
        VB = createSprite(player.x - distance,player.y)
        VB.addImage(VBrickImage)
        VB.velocityX = attackSpeed
        pew.play()
        VB.lifetime = 600
        VB.scale = size
        score += 100
        //console.log("V brick fired " + BrickChoice)
      } else {
        //right to left
        VB = createSprite(player.x + distance,player.y)
        VB.addImage(VBrickImage)
        VB.velocityX = attackSpeed * -1
        pew.play()
        VB.lifetime = 600
        VB.scale = size
        score += 100
        //console.log("V brick fired " + BrickChoice)        
      }

    }
  }
}

function killDetection(){
  if (player.isTouching(HB)){
  score = 0
  gs = 1
}
  if (player.isTouching(VB)){
    gs = 1  
  score = 0
  }
}



function Virus(){
  if (virusAlive === true){
    virus.visible = true

  //right to left
  console.log(virus.x)
  if (World.frameCount % 90 === 0 && World.frameCount > 1){
    if (RiLe === true && virus.x > 1199){
      virus.velocityX = -45
      roar.play()
    } 
  }
//stop it
  if (virus.x < 201 && RiLe === true){
    virus.velocityX = 0
    virus.addImage(virusRight)
    LeRi = true
    RiLe = false   
  }


    //left ro right
    if (World.frameCount % 90 === 0 && World.frameCount > 1){
      if (LeRi === true){
        virus.velocityX = 45 
        roar.play()
      } 
    }
    //stop it
    if (virus.x > 1199 && LeRi === true){
      virus.velocityX = 0
      virus.addImage(virusLeft)
      LeRi = false
      RiLe = true  
    }  

    if (virus.velocityX === 0 && World.frameCount % 2 === 0){
      virus.y = player.y + 2
    } else if (virus.velocityX === 0 && World.frameCount % 2 !== 0) {
      virus.y = player.y - 2
    }

    if(virus.isTouching(player)){
      score = 0
      gs = 1
    }
    
  }

    //kill virus 
    if (score % 2000 === 0 && score > 090909090909){
      virusAlive = false
      virusDeathCry.play()
    }

    //float
    if (virusAlive === false){
      virus.y -= 50
    }

}

function Start(){

  //easy
  if (mousePressedOver(buttonEasy)){
    attackSpeed = 18
    attackInterval = 36
    score = 0
    highscore = 0
    distance = 420
    size = 0.5
    gs = 2
  }

  //normal
  if (mousePressedOver(buttonNormal)){
    attackSpeed = 18
    attackInterval = 24
    score = 0
    highscore = 0
    distance = 420
    size = 0.5
    gs = 2
  }

  //hard
  if (mousePressedOver(buttonDifficult)){
    attackSpeed = 18
    attackInterval = 18
    score = 0
    highscore = 0
    distance = 420
    size = 0.5
    gs = 2
  }

  //extreme
  if (mousePressedOver(buttonExtreme)){
    attackSpeed = 18
    attackInterval = 12
    score = 0
    highscore = 0
    distance = 420
    size = 0.6
    gs = 2
  }

  virus.visible = false
  
  HB.visible = false
  VB.visible = false

  //score
  fill("black")
  textSize(20)
  //stroke()
  textFont("Baskerville Bold")
  text("Highscore: " + highscore, displayWidth / 2 - 60, displayHeight / 2 - 10)

  //title
  title.scale = 1
  title.addImage(titleImg)
  title.depth = player.depth
  player.depth = player.depth + 1

  //visibilities
  buttonEasy.visible = true
  buttonNormal.visible = true
  buttonDifficult.visible = true
  buttonExtreme.visible = true
  title.visible = true
}

function Quit(){
  quitButton = createSprite(1360,50)
  quitButton.addImage(quit)
  console.log("ejoirfn3uo")
  quitButton.visible = true

  if (mousePressedOver(quitButton)){
    gs = 2
  }
}