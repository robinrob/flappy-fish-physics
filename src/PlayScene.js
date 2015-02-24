var PlayScene = cc.Scene.extend({
    space:null,
    shapesToRemove :[],


    // init space of chipmunk
    initPhysics:function() {
        cc.log("PlayScene.initPhysics ...")
        //1. new space object
        this.space = new cp.Space();
        //2. setup the  Gravity
        this.space.gravity = cp.v(0, -350);

        // 3. set up Walls
        var wallBottom = new cp.SegmentShape(this.space.staticBody,
            cp.v(0, g_groundHeight),// start point
            cp.v(4294967295, g_groundHeight),// MAX INT:4294967295
            0);// thickness of wall
        this.space.addStaticShape(wallBottom);
    },

    onEnter:function () {
        cc.log("PlayScene.onEnter ...")
        this._super();
        this.shapesToRemove = [];
        this.initPhysics();
        this.gameLayer = new cc.Layer();

        //add Background layer and Animation layer to gameLayer
        this.gameLayer.addChild(new AnimationLayer(this.space), 0, TagOfLayer.Animation);
        this.addChild(this.gameLayer);

        this.scheduleUpdate();
    },

    update:function (dt) {
        cc.log("PlayScene.update ...")
        // chipmunk step
        this.space.step(dt);
    }
});

