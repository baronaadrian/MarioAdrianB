// TODO
game.PlayerEntity = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, 'init', [x, y, {
                image: "mario",
                spritewidth: "128",
                spriteheight: "128",
                width: 128,
                height: 128,
                getShape: function() {
                    return (new me.Rect(0, 0, 26, 128)).toPolygon();
                }
            }]);

        this.renderable.addAnimation("idle", [3]);
        //createan animiation valled smallWalk using pictuures of the image defined above (mario)
        //sets the animation to run through pictuures 8-13
        //the last number says we switch between pictures every 80 milliseconds
        this.renderable.addAnimation("bigIdle", [19]);
        this.renderable.addAnimation("smallWalk", [8, 9, 10, 11, 12, 13], 80);
        this.renderable.addAnimation("bigWalk", [14, 15, 16, 17, 18, 19], 80);

        this.renderable.setCurrentAnimation("idle");
        
        this.big = false;
        //sets the speed we go on the x axis(first number) and y axis(second number)
        this.body.setVelocity(5, 20);
        
        //sets the camera(veiwpost) to follow  mario's position(pos) on both the x-axis and the y-axis 
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
    },
       update: function(delta) {
           //checks if the right key is pressed and if it is, executes the following statement
                   if (me.input.isKeyPressed("right")) {
           //sets thee position of mario on the x-axis by adding from the setVelocity times the timer.tick
           //me.timer.tick uses the time since last animation to make the distance traveled smooth
            this.body.vel.x += this.body.accel.x * me.timer.tick;
          //this.renderable.setCurrentAnimation("smallWalk");
        } 
                else if(me.input.isKeyPressed("left")) {
            this.body.vel.x -= this.body.accel.x * me.timer.tick;
        }else{
            this.body.vel.x = 0;
        }
                if (me.input.isKeyPressed("up")){ 
                  if(!this.body.jumping && !this.body.falling){
                  this.body.jumping = true;
                  this.body.vel.y -= this.body.accel.y * me.timer.tick;
                  }
               }
               
          this.body.update(delta);
            me.collision.check(this, true, this.collideHandler.bind(this), true);
       
        if(!this.big){
            if (this.body.vel.x !== 0){
                    if (!this.renderable.isCurrentAnimation("smallWalk")) {
                    this.renderable.setCurrentAnimation("smallWalk");
                    this.renderable.setAnimationFrame();
                    }
            }else{
                this.renderable.setCurrentAnimation("idle");
            }
        }else{
          if (this.body.vel.x !== 0){
                    if (!this.renderable.isCurrentAnimation("bigWalk")) {
                    this.renderable.setCurrentAnimation("bigWalk");
                    this.renderable.setAnimationFrame();
                    }
            }else{
                this.renderable.setCurrentAnimation("bigIdle");
            }  
        }
        
        
       this._super(me.Entity, "update", [delta]);
        return true;
       //return true; //makes the object solid
    },

    collideHandler: function(response){
        var ydif = this.pos.y - response.b.pos.y;
        console.log(ydif);
        
           if(response.b.type === 'badguy'){
         if(ydif <= -155){
              response.b.alive = false; 
      }else{
          me.state.change(me.state.MENU);
        }
       }else if(response.b.type === 'mushroom'){
           this.big = true;
            me.game.world.removeChild(response.b);
         }
       }
     });

game.LevelTrigger = me.Entity.extend({
    init:function(x, y, settings){ 
     this._super(me.Entity, 'init', [x, y, settings]); 
     //if something collides with this object then we will call the onCollision function and pass it
    //a hidden parameter of this object
     this.body.onCollision = this.onCollision.bind(this);
     this.level = settings.level;
     this.xSpawn = settings.xSpawn;
     this.ySpawn = settings.ySpawn;
    },
    
    onCollision: function(){
        //sets this object so that will collide only with objects of type no_object, which don't exist
        //so really,makes it so this object will not collide with anything anymore
      this.body.setCollisionMask(me.collision.types.NO_OBJECT); 
      me.levelDirector.loadLevel(this.level);
      me.state.current().resetPlayer(this.xSpawn, this.ySpawn);
    }
    
});

game.BadGuy = me.Entity.extend({
   init: function(x, y, settings){
      this._super(me.Entity, 'init', [x, y, {
                image: "slime",
                spritewidth: "60",
                spriteheight: "28",
                width: 60,
                height: 28,
                getShape: function() {
                    return (new me.Rect(0, 0, 60, 28)).toPolygon();
                }
            }]);   
        
        this.spritewidth = 60;
        var width = settings.width;
        x = this.pos.x;
        this.startX = x;
        this.endX = x + width - this.spritewidth;
        this.pos.x = x + width - this.spritewidth;
        this.update();
        
        this.alwaysUpdate = true;
        
        this.walkLeft = false;
        this.alive= true;
        this.type = "badguy";
        
        this.renderable.addAnimation("run", [0, 1, 2], 80);
        this.renderable.setCurrentAnimation("run");
       
       this.body.setVelocity(4, 6); 
      
   }, 
   
   update:function(delta){
   //DELTA says how long its been since the last update
    this.body.update(delta);
       me.collision.check(this, true, this.collideHandler.bind(this), true);
   
   if(this.alive){
       if(this.walkLeft && this.pos.x <= this.startX){
           this.walkLeft = false;
       }else if(!this.walkLeft && this.pos.x >= this.endX){
        this.walkLeft = true;   
       }
       this.flipX(!this.walkLeft);
       this.body.vel.x= (this .walkLeft) ? -this.body.accel.x * me.timer.tick : this.body.accel.x * me.timer.tick;
                                           //left side of colon makes it go left and right side of colon makes the BadGuy go right
     }else{
       me.game.world.removeChild(this);
     }
   
   
       this._super(me.Entity, "update", [delta]);
       return true;  
   },
    
    collideHandler: function(){
      return true;   
    }
    
 });

game.Mushroom = me.Entity.extend({
        init: function(x, y, settings){
            this._super(me.Entity, 'init', [x, y, {
                image: "mushroom",
                spritewidth: "64",
                spriteheight: "64",
                width: 64,
                height: 64,
                getShape: function() {
                    return (new me.Rect(0, 0, 64, 64)).toPolygon();
                }
            }]);
        
        me.collision.check(this);
        this.type = "mushroom";
        }
        
});