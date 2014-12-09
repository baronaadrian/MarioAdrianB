game.resources = [

        /* Graphics. 
         * @example
         * {name: "example", type:"image", src: "data/img/example.png"},
         */
        {name: "background-tiles", type: "image", src: "data/img/background-tiles.png"},
        //this will let me addd background on tiles
        {name: "meta-tiles", type: "image", src: "data/img/meta-tiles.png"},
        //this will stop mario from falling off of the map
        {name: "mario", type:"image", src: "data/img/player1.png"},
        //this will put my mario into the game
        {name: "title-screen", type:"image", src: "data/img/title-screen.png"},
        //this will be in the beginning of my game
        {name: "slime", type:"image", src: "data/img/slime-spritesheet.png"},
        //this will spawn in my bad guy which will be my slime
        {name: "mushroom", type:"image", src: "data/img/mushroom.png"},
        //this will spawn in my mushroom so that i can get big
               
        /* Atlases 
         * @example
         * {name: "example_tps", type: "tps", src: "data/img/example_tps.json"},
         */

                /* Maps. 
                 * @example
                 * {name: "example01", type: "tmx", src: "data/map/example01.tmx"},
                 * {name: "example01", type: "tmx", src: "data/map/example01.json"},
                 */
        {name: "level01", type: "tmx", src: "data/map/level01.tmx"},
        //this is my first map
        {name: "level02", type: "tmx", src: "data/map/level02.tmx"},
        //this is my second map

        /* Background music. 
         * @example
         * {name: "example_bgm", type: "audio", src: "data/bgm/"},
         */

        /* Sound effects. 
         * @example
         * {name: "example_sfx", type: "audio", src: "data/sfx/"}
         */
        ];
