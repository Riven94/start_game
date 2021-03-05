// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // ������Ծ�߶�
        jumpHeight : 0,
        // ������Ծ����ʱ��
        jumpDuration : 0,
        // ����ƶ��ٶ�
        maxMovespeed : 0,
        // ���ٶ�
        accel : 0,
        //��Ծ��Դ��Ч
        jumpAudio:{
            default:null,
            type: cc.AudioClip
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function() {
        //��ʼ����Ծ����
        var jumpAction = this.runJumpAction();
        cc.tween(this.node).then(jumpAction).start();
    
        //���ٶȷ��򿪹�
        this.accLeft = false;
        this.accRighe = false;
        //���ǵ�ǰˮƽ������ٶ�
        this.xSpeed = 0;

        //��ʼ�������������
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        },

    onDestroy(){
        //ȡ�������������
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        },
    
    runJumpAction(){
        //��Ծ����
        var jumpUp = cc.tween().by(this.jumpDuration, {y : this.jumpHeight}, {easing: 'sineOut'});
        //����
        var jumpDown = cc.tween().by(this.jumpDuration, {y: -this.jumpHeight}, {easing:'sineIn'});

        //����һ����������jumpUp��jumpDown��˳��ִ�ж���
        var tween = cc.tween()
                //��jumpUp,jumpDownִ�ж���
                .sequence(jumpUp, jumpDown)
                //���һ���ص���������ǰ��Ķ���������ʱ�������Ƕ����playJumpSound����
                .call(this.playJumpSound,this);
        //�����ظ�
        return cc.tween().repeatForever(tween);
    },

    playJumpSound: function(){
        //�����������沥������
        cc.audioEngine.playEffect(this.jumpAudio,false);
    },

    onKeyDown(event){
        // set a flag when key pressed
        switch(event.keyCode){
            case cc.macro.KEY.a:
                this.accLeft = true;
                break;
            case cc.macro.KEY.d:
                this.accRight = true;
                break;
        }
    },

    onKeyUp(event){
        // unset a flag when key released
        switch(event.keyCode){
            case cc.macro.KEY.a:
                this.accLeft = false;
                break;
            case cc.macro.KEY.d:
                this.accRight = false;
                break;
        }
    },

    start () {

    },

    update: function (dt) {
        // ���ݵ�ǰ���ٶȷ���ÿ֡�����ٶ�
        if (this.accLeft) {
            this.xSpeed -= this.accel * dt;
        }
        else if (this.accRight) {
            this.xSpeed += this.accel * dt;
        }

        // �������ǵ��ٶȲ��ܳ������ֵ
        if (Math.abs(this.xSpeed) > this.maxMoveSpeed) {
            // if speed reach limit, use max speed with current direction
            this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
        }

        // ���ݵ�ǰ�ٶȸ������ǵ�λ��
        this.node.x += this.xSpeed * dt;
    },
});
