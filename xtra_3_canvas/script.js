class GameObject
{
  constructor (context, x, y, vx, vy) {
    this.context = context
    this.x = x
    this.y = y
    this.vx = vx
    this.vy = vy
    this.isColliding = false
  }
}

const g = 9.81

class Ball extends GameObject 
{
  constructor (context, x, y, vx, vy, radius) {
    super (context, x, y, vx, vy)
    this.radius = radius
    this.mass = radius
  }

  draw() {
    this.context.fillStyle = this.isColliding ? '#0099b0' : '#ff8080'
    // this.context.fillStyle = this.isColliding ? 'purple' : 'teal'

    this.context.beginPath()
    this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
    this.context.fill()
    // this.context.fillRect(this.x, this.y, this.width, this.height)
  }

  update(sp) {
    this.vy += g * sp

    this.x += this.vx * sp
    this.y += this.vy * sp
  }
}

let canvas
let context
let oldTimeStamp = 0
let gameObjects
let secondsPassed = 0

window.onload = init

function init() {
  canvas = document.getElementById("canvas")
  context = canvas.getContext('2d')
  gameObjects = [
    new Ball(context, 250, 50, 0, 50, 21),
    new Ball(context, 250, 300, 0, -50, 10),
    new Ball(context, 150, 0, 50, 50, 25),
    new Ball(context, 250, 150, 50, 50, 30),
    new Ball(context, 350, 75, -50, 50, 13),
    new Ball(context, 300, 300, 50, -50, 13)
  ]

  window.requestAnimationFrame(gameLoop)
}

function gameLoop(timeStamp) {
  
  secondsPassed = (timeStamp - oldTimeStamp) / 1000;
  oldTimeStamp = timeStamp;

  for (let i = 0; i < gameObjects.length; i++) {
    gameObjects[i].update(secondsPassed);
  }

  detectCollisions()
  detectEdgeCollisions()
  context.clearRect(0, 0, canvas.width, canvas.height)
  

  for (let i = 0; i < gameObjects.length; i++) {
    gameObjects[i].draw();
  }

  window.requestAnimationFrame(gameLoop);
}

function detectCollisions() {
  let obj1
  let obj2

  for (let i = 0; i < gameObjects.length; i++) {
    gameObjects[i].isColliding = false
  }

  for (let i = 0; i < gameObjects.length; i++) {
    obj1 = gameObjects[i]
    for (let j = i + 1; j < gameObjects.length; j++) {
      obj2 = gameObjects[j]
      if (circleIntersect(obj1.x, obj1.y, obj1.radius, obj2.x, obj2.y, obj2.radius)) {
        obj1.isColliding = true
        obj2.isColliding = true
        let vCollision = {x: obj2.x - obj1.x, y: obj2.y - obj1.y}
        let distance = Math.sqrt((obj2.x-obj1.x)*(obj2.x-obj1.x) + (obj2.y-obj1.y)*(obj2.y-obj1.y))
        let vCollisionNorm = {x: vCollision.x / distance, y: vCollision.y / distance}
        let vRelativeVelocity = {x: obj1.vx - obj2.vx, y: obj1.vy - obj2.vy}
        let speed = vRelativeVelocity.x * vCollisionNorm.x + vRelativeVelocity.y * vCollisionNorm.y
        if (speed < 0){
          break
        }
        obj1.vx -= (speed * vCollisionNorm.x)
        obj1.vy -= (speed * vCollisionNorm.y)
        obj2.vx += (speed * vCollisionNorm.x)
        obj2.vy += (speed * vCollisionNorm.y)
        let impulse = 2 * speed / (obj1.mass + obj2.mass)
        obj1.vx -= (impulse * obj2.mass * vCollisionNorm.x)
        obj1.vy -= (impulse * obj2.mass * vCollisionNorm.y)
        obj2.vx += (impulse * obj1.mass * vCollisionNorm.x)
        obj2.vy += (impulse * obj1.mass * vCollisionNorm.y)
      }
    }
  }
}

function circleIntersect(x1, y1, r1, x2, y2, r2) {
  let squareDistance = (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2)
  return squareDistance <= ((r1 + r2) * (r1 + r2))
}

function detectEdgeCollisions() {
  const restitution = 0.50
  let obj
  for (let i = 0; i < gameObjects.length; i++) {
    obj = gameObjects[i]
    if (obj.x < obj.radius) {
      obj.vx = Math.abs(obj.vx) * restitution;
      obj.x = obj.radius;
    } else if (obj.x > canvas.width - obj.radius) {
      obj.vx = -Math.abs(obj.vx) * restitution;
      obj.x = canvas.width - obj.radius;
    }
    if (obj.y < obj.radius) {
      obj.vy = Math.abs(obj.vy) * restitution;
      obj.y = obj.radius;
    } else if (obj.y > canvas.height - obj.radius) {
      obj.vy = -Math.abs(obj.vy) * restitution;
      obj.y = canvas.height - obj.radius;
    }
  }
}