class Pawn extends Phaser.Physics.Arcade.Sprite{
    /**
     * 
     * @param {*} scene 
     * @param {*} x 
     * @param {*} y 
     * @param {*} texture 图片的key
     * @param {*} frame 哪一帧
     * @param {*} bOrientationRight_Asset 精灵集默认朝向，右为true
     * @param {*} orientation_Start 
     */
    constructor(scene, x, y, texture, frame, bOrientationRight_Asset = true, orientation_Start = 'right'){
        super(scene, x, y, texture, frame);             

        //属性设置
        /** 精灵图集*/      
        
        this.moving = false;

        
        this.hp = 100;
        this.dead = false;

        //#region   //———————————————————攻击————————————————————//
        /**攻击 */
        this.attack = false;
        /**攻击力 */
        this.attackDamage = 50;
        /**攻击间隔 */
        this.attackInterval = 500;//1秒
        /**能否攻击 */
        this.canAttack = false;
        /**上次攻击后，到现在的时间 */
        this.attackTime_LastPassed = 0;
        //#endregion    //———————————————————攻击————————————————————//

        /**阵营 */
        this.groupTag = 'A';

        //开启物理
        scene.physics.world.enable(this);
        //添加自身到场景
        scene.add.existing(this);   

        /**朝向 left right up down*/
        this.orientation = 'right';        
        this.bOrientationRight_Asset = bOrientationRight_Asset;
        this.setFlipX(this.bOrientationRight_Asset);
        this.setOrientation_Start(orientation_Start);


        //event , fn , The context to invoke the listener with.
        scene.events.once('death2Do_Once', this.death2Do, this);
        // this.events.on('dododo', this.handler, this);
        // handler (){
        //     this.add.image(400, 300, 'ok');
        // }
        // this.events.emit('dododo');
    }
    death2Do(){
        this.playAnim_die();
        //延时事件
        // timedEvent = this.scene.time.delayedCall(3000, this.onEvent, [], this);
    }

    onEvent (){
        this.setActive(false);
        this.setVisible(false);
    }

    //———————————————————动画————————————————————//
    playAnim_Default(){//默认动画
        this.play({key : 'idle', frameRate: Phaser.Math.Between(6, 12)}, true);
    }
    playAnim_Move(){//移动动画
        this.play('walk', true);
    }
    playAnim_Attack(){//攻击动画
        this.play({key:'punch', frameRate: Phaser.Math.Between(6, 12)  }, true).on('animationcomplete', ()=>{
            this.attackTime_LastPassed = 0;
            this.attack = false;
        }, this);
    }
    playAnim_die(){//死亡动画
        this.play('die', true);
        
    }


    //性能原因，需手动调用
    create(){
        //console.log('pawn create');   
        // this.addCheckBox_Attack();
    }
    update(time,delta){      
        // this.refreshBody();
        // console.log(this.hp)

        if(this.hp <= 0){
            this.dead = true;
            this.scene.events.emit('death2Do_Once');
        }
        else{
            //———————————————————攻击间隔检测————————————————————//
            if(this.canAttack){
                this.attackTime_LastPassed += delta;
                if(this.attackTime_LastPassed > this.attackInterval){
                    this.attack = true;
                    this.playAnim_Attack();
                }
            }         
            //———————————————————————————————————————————————————//
        }
        
    }


    /**
     * 初始朝向
     * @param {*} orientation_Start 
     */
    setOrientation_Start(orientation_Start = 'right'){
        this.orientation = orientation_Start;
        switch (orientation_Start) {
            case 'right':
                this.setFlipX(!this.bOrientationRight_Asset)
                break;
            case 'left':
                this.setFlipX(this.bOrientationRight_Asset)
                break;
        }
    }

    /**
     * 移动
     * @param {*} locX 
     * @param {*} locY 
     * @param {*} time 
     * @param {*} randomDelayTime  默认为0，整齐移动
     */
    moveTo(locX, locY, time, randomDelayTime = 0){//ES6 可以使用默认参数值
        //设置朝向
        if(locX > this.x){
            this.orientation = 'right';
            this.setFlipX(!this.bOrientationRight_Asset);

        }else if(locX < this.x){
            this.orientation = 'left';
            this.setFlipX(this.bOrientationRight_Asset);    
        }

        //tween 移动
        var tween = this.scene.tweens.add({
            targets: this,
            x: locX,
            y: locY,
            ease: 'Power0',
            duration: time,
            yoyo: false,
            repeat: 0,
            delay: Math.random() * randomDelayTime,
            //onStart: this.onStartMoveHandler
            onStart: function (tween, targets){
                targets[0].playAnim_Move();
                targets[0].moving = true;
               
            },
            onComplete: function (tween, targets) {    
                targets[0].playAnim_Default();
                targets[0].moving = false;
                targets[0].canAttack = true;
            },
            // onYoyo: function () { console.log('onYoyo'); console.log(arguments); },
            // onRepeat: function () { console.log('onRepeat'); console.log(arguments); },
        }, this);

    }

    /**得到距离*/
    getDistance(obj1, obj2){
        return Phaser.Math.Distance.Between(obj1.x, obj1.y, obj2.x, obj2.y);
    }






//#region temp
//     addCheckBox_Attack(){
//         this.checkBox_Attack = this.scene.add.rectangle(
//             this.x + this.offset_Loc.x, 
//             this.y + this.offset_Loc.y, 
//             this.displayWidth/2 + this.offset_Size.x, 
//             this.displayHeight + this.offset_Size.y
//         ).setStrokeStyle(1, 0x00ffff);
//     }

//     /**刷新攻击盒子检测*/
//     freshCheckBox_Attack(){

//         //检测盒子移动_辅助查看
//         switch (this.orientation) {
//             case 'right':
//                 this.checkBox_Attack.x = this.x + this.offset_Loc.x + this.displayWidth/2;
//                 this.checkBox_Attack.y = this.y;
//                 break;
//             case 'left':
//                 this.checkBox_Attack.x = this.x - this.offset_Loc.x - this.displayWidth/2;
//                 this.checkBox_Attack.y = this.y;
//                 break
//         }

//         //将检测盒子的大小及位置传递给overlapRect
//         //overlapRect原点位置在左上角，需减去一半
//         let x = this.checkBox_Attack.x - (this.checkBox_Attack.displayWidth / 2);
//         let y = this.checkBox_Attack.y - (this.checkBox_Attack.displayHeight / 2);               
//         let within = this.scene.physics.overlapRect(
//             x, 
//             y, 
//             this.checkBox_Attack.displayWidth, 
//             this.checkBox_Attack.displayHeight
//         );
//         /**敌人在攻击范围内？ */
//         let enemyInRange = false;
//         within.forEach(body => {        
//             if(body.gameObject.groupTag != this.groupTag){
//                 enemyInRange = true;
//                 body.gameObject.setTint(0xff0000);       
//                 this.hp -= this.attackDamage;
//             }                                    
//         });
        
// // this.add.sprite(x, y).play({ key: 'run', frameRate: 24 ,delay: 0});
//         if(this.canAttack && enemyInRange){
//             this.play('punch', true).on('animationcomplete', ()=>{
//                 this.canAttack = false;
//                 this.attackTime_LastPassed = 0;
//                 enemyInRange = false;
//             })
//         }  
//     }

    // /**从目标组发现一个最近目标*/
    // findNearest(group){
    //     const children = group.getChildren();
    //     let distance = this.getDistance(this, children[0]);
    //     let distance_temp;s
    //     let targetIndex = 0;
    //     for(let i = 1; i < group.getLength(); ++i){            
    //         distance_temp = this.getDistance(this, children[i]);
    //         if(distance > distance_temp){
    //             distance = distance_temp;
    //             targetIndex = i;
    //         }
    //     }      
    //     return group.getChildren()[targetIndex];
    // }

    // /**刷新攻击盒子检测*/
    // freshCheckBox_Attack(group){
    //     group.getChildren().forEach(item => {

    //         item.checkBox_Attack.x = item.x;
    //         item.checkBox_Attack.y = item.y;
    //         let x = item.checkBox_Attack.x - (item.checkBox_Attack.width / 2);
    //         let y = item.checkBox_Attack.y - (item.checkBox_Attack.height / 2);            
            
    //         let canAttack = false;

    //         let within = this.scene.physics.overlapRect(x, y, item.checkBox_Attack.width, item.checkBox_Attack.height);
    //         within.forEach(function (body) {                 
    //             if(body.gameObject.groupTag != item.groupTag){
    //                 canAttack = true;
    //                 body.gameObject.setTint(0xff0000);                
    //             }                                    
    //         });
    //         if(canAttack){
    //             item.play('punch', true).on('animationcomplete', ()=>{
    //                 canAttack = false;
    //             })
    //         }  
    //     });
    // }
    //#endregion 
}
