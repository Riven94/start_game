// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        //����������������ǵ�Ԥ����Դ
        starPrefab:{
            default: null,
            type: cc.Prefab
        },

        //���ǲ�������ʧʱ��������Χ
        maxStarDuration : 0,
        minStarDuration: 0,

        //����ڵ㣬����ȷ���������ɵĸ߶�
        ground:{
            default : null,
            type: cc.Node
        },

        //Player�ڵ㣬���ڻ�ȡ���ǵ����ĸ߶ȣ��Ϳ��������ж�����
        player:{
            default: null,
            type: cc.Node
        },

        //score label������
        scoreDisplay:{
            default: null,
            type: cc.Label
        },

        // �÷���Ч��Դ
        scoreAudio: {
            default: null,
            type: cc.AudioClip
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        //��ȡ��ƽ��y������
        this.groundY = this.ground.y + this.ground.height/2;
        //����һ���µ�����
        this.spawnNewStar();

        //��ʼ����ʱ��
        this.timer = 0;
        this.starDuration = 0;
        //����һ��������
        this.spawnNewStar();

        //��ʼ���Ʒ�
        this.score = 0;
    },

    spawnNewStar: function(){
        //ʹ�ø�����ģ���ڳ�������һ���µĽڵ�
        var newStar = cc.instantiate(this.starPrefab);
        //�������Ľڵ���ӵ�Canvas�ڵ�����
        this.node.addChild(newStar);
        //Ϊ��������һ�����λ��
        newStar.setPosition(this.getNewStarPosition());

        //�����ǽű�����ϱ���game���������
        newStar.getComponent('Star').game = this;

        // ���ü�ʱ����������ʧʱ�䷶Χ���ȡһ��ֵ
        this.starDuration = this.minStarDuration + Math.random() * (this.maxStarDuration - this.minStarDuration);
        this.timer = 0;
    },

    getNewStarPosition: function(){
        var randX = 0;
        //���ݵ�ƽ��λ�ú�������Ծ�߶ȣ�����õ�һ�����ǵ�y����
        var randY = this.groundY + Math.random() * this.player.getComponent('Player').jumpHeight + 50;
        //������Ļ�������õ�һ������x����
        var maxX = this.node.width/2;
        randX = (Math.random() - 0.5) * 2 * maxX;
        //������������
        return cc.v2(randX,randY);
    },



    start () {

    },

    update: function (dt) {
        //ÿ֡���¼�ʱ���������޶Ȼ�û�������µ���������Ϸʧ��    
        if(this.timer > this.starDuration){
            this.gameOver();
            return ;
         }

         this.timer += dt;
    },

    gameOver: function(){
        //ֹͣPlayer�ڵ����Ծ����
        this.player.stopAllActions();

        //���¼��س���game
        cc.director.loadScene('game');
    },

    gainScore: function(){
        this.score += 1;
        //��������
        this.scoreDisplay.string = 'Score:' + this.score;

        // ���ŵ÷���Ч
        cc.audioEngine.playEffect(this.scoreAudio, false);
    }
});
