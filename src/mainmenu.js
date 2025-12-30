var MENU_SLICE_SIZE = 32;
var MENU_NUM_COLS = 14;
var MENU_NUM_ROWS = 20;

// maximum number of colours we can use
var MAX_COLORS = 15;

// define an object that we can use an enumeration for our colour types
var E_COLOR_TYPE = {
    E_COLOR_NONE:0,
    E_COLOR_ORANGE:1,
    E_COLOR_PURPLE:2,
    E_COLOR_GREEN:3,
    E_COLOR_BLUE:4,
    E_COLOR_GRAY:5,
    E_COLOR_MAGENTA:6,
    E_COLOR_OLIVE:7,
    E_COLOR_MAROON:8,
    E_COLOR_SADDLE_BROWN :9,
    E_COLOR_SLATE_GRAY:10,
    E_INDIGO:11,
    E_COLOR_MINT_GREEN:12,
    E_COLOR_CRIMSON:13,
    E_COLOR_CORN_FLOWER_BLUE:14,
    E_COLOR_GOLDEB_ROD:15,

};

var colors = [
    E_COLOR_TYPE.E_COLOR_ORANGE,
    E_COLOR_TYPE.E_COLOR_PURPLE,
    E_COLOR_TYPE.E_COLOR_GREEN,
    E_COLOR_TYPE.E_COLOR_BLUE,
    E_COLOR_TYPE.E_COLOR_GRAY,
    E_COLOR_TYPE.E_COLOR_MAGENTA,
    E_COLOR_TYPE.E_COLOR_OLIVE,
    E_COLOR_TYPE.E_COLOR_MAROON,
    E_COLOR_TYPE.E_COLOR_SADDLE_BROWN,
    E_COLOR_TYPE.E_COLOR_SLATE_GRAY,
    E_COLOR_TYPE.E_INDIGO,
    E_COLOR_TYPE.E_COLOR_MINT_GREEN,
    E_COLOR_TYPE.E_COLOR_CRIMSON,
    E_COLOR_TYPE.E_COLOR_CORN_FLOWER_BLUE,
    E_COLOR_TYPE.E_COLOR_GOLDEB_ROD
];

function getColor(colorData){
    switch(colorData){
        case E_COLOR_TYPE.E_COLOR_NONE:
            return cc.c3b(255, 255, 255);
            break;
        case E_COLOR_TYPE.E_COLOR_ORANGE:
            return cc.c4b(255, 160, 0);
            break;
        case E_COLOR_TYPE.E_COLOR_PURPLE:
            return cc.c3b(185, 19, 188);
            break;
        case E_COLOR_TYPE.E_COLOR_GREEN:
            return cc.c3b(0, 170, 0);
            break;
        case E_COLOR_TYPE.E_COLOR_BLUE:
            return cc.c3b(0, 114, 230);
            break;
        case E_COLOR_TYPE.E_COLOR_GRAY:
            return cc.c3b(150, 150, 150);
            break;
        case E_COLOR_TYPE.E_COLOR_MAGENTA:
            return cc.c3b(249,19,188);
            break;
        case E_COLOR_TYPE.E_COLOR_OLIVE:
            return cc.c3b(166,166,76);
            break;
        case E_COLOR_TYPE.E_COLOR_MAROON:
            return cc.c3b(183,111,111);
            break;
        case E_COLOR_TYPE.E_COLOR_SADDLE_BROWN:
            return cc.c3b(206,102,28);
            break;
        case E_COLOR_TYPE.E_COLOR_SLATE_GRAY:
            return cc.c3b(173,235,179);
            break;
        case E_COLOR_TYPE.E_INDIGO:
            return cc.c3b(165,127,192);
            break;
        case E_COLOR_TYPE.E_COLOR_MINT_GREEN:
            return cc.c3b(120,156,119);
            break;
        case E_COLOR_TYPE.E_COLOR_CRIMSON:
            return cc.c3b(220,20,60);
            break;
        case E_COLOR_TYPE.E_COLOR_CORN_FLOWER_BLUE:
            return cc.c3b(146,180,242);
            break;
        case E_COLOR_TYPE.E_COLOR_GOLDEB_ROD:
            return cc.c3b(225,183,76);
            break;
    }
}

var MainMenu = cc.Layer.extend({
    screenSize:null,
    init:function () {
        this._super();
        // preload audio
        cc.AudioEngine.getInstance().preloadEffect(s_Swipe_m4a);
        cc.AudioEngine.getInstance().preloadEffect(s_Chop_m4a);
        cc.AudioEngine.getInstance().preloadEffect(s_Drop_m4a);
        cc.AudioEngine.getInstance().preloadEffect(s_Select_m4a);
        cc.AudioEngine.getInstance().preloadEffect(s_Beep_m4a);
        cc.AudioEngine.getInstance().preloadEffect(s_Start_m4a);
        cc.AudioEngine.getInstance().preloadEffect(s_Win_m4a);

        this.screenSize = cc.Director.getInstance().getWinSize();

        // create a coloured layer as background
        var background = cc.LayerColor.create(cc.c4b(25, 0, 51, 255), this.screenSize.width, this.screenSize.height);
        this.addChild(background);

        // create a label to display the name of the game
        var titleLabel = cc.LabelTTF.create("Wood", "Shantell Sans", 52);
        titleLabel.setColor(getColor(E_COLOR_TYPE.E_COLOR_ORANGE));
        titleLabel.setPosition(cc.p(this.screenSize.width * 0.5-92, this.screenSize.height * 0.8));
        this.addChild(titleLabel,1);
        titleLabel = cc.LabelTTF.create("Cutters", "Shantell Sans", 52);
        titleLabel.setColor(getColor(E_COLOR_TYPE.E_COLOR_NONE));
        titleLabel.setPosition(cc.p(this.screenSize.width * 0.5+70, this.screenSize.height * 0.8));
        this.addChild(titleLabel,1);

        // create a play button to move to the game world
        var nonPreemptiveButton = cc.MenuItemSprite.create(cc.Sprite.create(s_Nonpreemtive));
        nonPreemptiveButton.setCallback(this.onNonPreemptivePlayClicked, this);
        nonPreemptiveButton.setPosition(cc.p(this.screenSize.width * 0.3, this.screenSize.height * 0.2));

        var preemptiveButton = cc.MenuItemSprite.create(cc.Sprite.create(s_Preemtive));
        preemptiveButton.setCallback(this.onPreemptivePlayClicked, this);
        preemptiveButton.setPosition(cc.p(this.screenSize.width * 0.7, this.screenSize.height * 0.2));

        // create a menu that will contain the button above
        var menu = cc.Menu.create(nonPreemptiveButton,preemptiveButton);
        menu.setPosition(0,0);
        this.addChild(menu, 1);

        this.doAnimation();
        this.schedule(this.doAnimation, 2);

        return true;
    },
    doAnimation:function(){
        var numSlices = Math.round(Math.random() * 30);
        for(var i = 0; i < numSlices; ++i)
        {
            var slice = cc.Sprite.create(s_Menu_Wood);
            slice.setColor(getColor(1 + Math.floor(Math.random() * MAX_COLORS)));
            slice.setPosition(this.getRandomPositionForSlice());
            slice.setScale(0);
            this.addChild(slice);

            var waitBefore = cc.DelayTime.create(Math.random() * 5);
            var scaleUp = cc.EaseBackOut.create(cc.ScaleTo.create(0.125, 1));
            var waitAfter = cc.DelayTime.create(Math.random() * 5);
            var scaleDown = cc.EaseBackIn.create(cc.ScaleTo.create(0.125, 0));
            var removeSelf = cc.RemoveSelf.create(true);
            slice.runAction(cc.Sequence.create(waitBefore, scaleUp, waitAfter, scaleDown, removeSelf));
        }
    },

    getRandomPositionForSlice:function() {
        return cc.p( Math.floor(1 + Math.random() * MENU_NUM_COLS) * MENU_SLICE_SIZE, Math.floor(1 + Math.random() * (MENU_NUM_ROWS+5)) * MENU_SLICE_SIZE );
    },

    onNonPreemptivePlayClicked:function(){
        // ask the director to change the running scene
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5, new NonPreemptiveGameWorldScene()));
        cc.AudioEngine.getInstance().playEffect(s_Select_m4a);
    },

    onPreemptivePlayClicked:function(){
        // ask the director to change the running scene
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.5, new PreemptiveGameWorldScene()));
        cc.AudioEngine.getInstance().playEffect(s_Select_m4a);
    }
});

var MainMenuScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MainMenu();
        layer.init();
        this.addChild(layer);
    }
});
