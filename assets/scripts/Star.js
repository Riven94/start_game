// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        pickRadius: 0,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    getPlayerDistance: function(){
        //根据Player节点位置判断距离
        var playerPos = this.game.player.getPosition();
        //根据两点位置计算距离
        var dist = this.node.position.sub(playerPos).mag();
        return dist;
    },

    onPicked: function(){
        //当星星被收集时，调用Game脚本接口，生成一个新的星星
        this.game.spawnNewStar();
        //调用Game脚本的得分方法
        this.game.gainScore();
        //销毁当前星星
        this.node.destroy();
    },

    start () {

    },

    update: function() {
        //每帧判断星星和主角之间的距离是否小于收集距离
        if(this.getPlayerDistance() < this.pickRadius){
            //调用收集行为
            this.onPicked();
            return ;
        }
        
        // 根据 Game 脚本中的计时器更新星星的透明度
        var opacityRatio = 1 - this.game.timer/this.game.starDuration;
        var minOpacity = 50;
        this.node.opacity = minOpacity + Math.floor(opacityRatio * (255 - minOpacity));
    },
});
