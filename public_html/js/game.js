
/* Game namespace */
var game = {
    // an object where to store game information
    data: {
        // score
        score: 0
    },
    
    // Run on page load.
    "onload": function() {
        // Initialize the video.
        if (!me.video.init("screen", me.video.CANVAS, 1060, 600, true, 1.0)) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        
        }

        // add "#debug" to the URL to enable the debug Panel
        if (document.location.hash === "#debug") {
            window.onReady(function() {
                me.plugin.register.defer(this, debugPanel, "debug");
           
            });
        }

        // Initialize the audio.
        me.audio.init("mp3,ogg");

        // Set a callback to run when loading is complete.
        me.loader.onload = this.loaded.bind(this);

        // Load the resources.
        me.loader.preload(game.resources);

        // Initialize melonJS and display a loading screen.
        me.state.change(me.state.LOADING);
    },
    
    // Run on game resources loaded.
    "loaded": function() {
        me.pool.register("mario", game.PlayerEntity, true);
        //this will be able to let put my mario into the game
        me.pool.register("BadGuy", game.BadGuy);
        //this will be able to let put my BadGuy into the game
        me.pool.register("mushroom", game.Mushroom);
        //this will be able to let put my mushroom into the game       
        me.pool.register("levelTrigger", game.LevelTrigger);
        //this will be able to let mario go through the door
        me.state.set(me.state.MENU, new game.TitleScreen());
        me.state.set(me.state.PLAY, new game.PlayScreen());
        //this will start up my start screen and my play screen

        // Start the game.
        me.state.change(me.state.MENU);
    }
};
