var AnimationLayer = cc.Layer.extend({
    spriteSheet:null,
    sprite:null,
    space:null,
    body:null,
    shape:null,

    ctor:function (space) {
        cc.log("AnimationLayer.ctor ...")
        this._super();
        this.space = space;
        this.init();

        this._debugNode = new cc.PhysicsDebugNode(this.space);
        this._debugNode.setVisible(false);
        // Parallax ratio and offset
        this.addChild(this._debugNode, 10);
    },

    init:function () {
        cc.log("AnimationLayer.init ...")
        this._super();

        // create sprite sheet
        cc.spriteFrameCache.addSpriteFrames(res.fish_plist);
        this.spriteSheet = new cc.SpriteBatchNode(res.fish_png);
        this.addChild(this.spriteSheet);


        //1. create PhysicsSprite with a sprite frame name
        this.sprite = new cc.PhysicsSprite("#fish1.png");
        var contentSize = this.sprite.getContentSize();
        // 2. init the runner physic body
        this.body = new cp.Body(1, cp.momentForBox(1, contentSize.width, contentSize.height));
        //3. set the position of the runner
        this.body.p = cc.p(g_runnerStartX, g_groundHeight + contentSize.height / 2);
        //4. apply impulse to the body
        this.body.applyImpulse(cp.v(0, 500), cp.v(0, 0));//run speed
        //5. add the created body to space
        this.space.addBody(this.body);
        //6. create the shape for the body
        this.shape = new cp.BoxShape(this.body, contentSize.width - 14, contentSize.height);
        //7. add shape to space
        this.space.addShape(this.shape);
        //8. set body to the physic sprite
        this.sprite.setBody(this.body);

        this.spriteSheet.addChild(this.sprite);
    }
});