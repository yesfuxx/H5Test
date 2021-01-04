var man;
var velocity;
var graphics;
var rect;
var checkRect;



class Start extends Phaser.Scene{
    constructor(){
        super('start');

        this.containerLeft;
        this.containerRight;
        this.velocity;
        
        
    }        
    
    create(){
        console.log("start!");
       
        //'_Base' 显示全部
        this.add.image(0, 0, 'brawler', '__BASE').setOrigin(0, 0);
        man = this.physics.add.sprite(200, 500, 'brawler')//.setScale(2);
        var man2 = this.physics.add.sprite(400, 500, 'brawler')//.setScale(2);
        man.play('idle');

        //container 使用了位置不对 。。。。。。。。。。。。
        // this.containerLeft = this.add.container(200, 100);
        // this.containerRight = this.add.container(600, 100);
        var locA =this.add.sprite(600, 100, 'a')
        var locB =this.add.sprite(200, 100, 'b')
    
        //左边
        this.group_Left = this.setGroup('A', 'brawler', 7, 1, 3, 3, 40, 40, 200, 100).scaleXY(1);
        //左边进行左右翻转        
        this.group_Left.getChildren().forEach(item =>{// group_Left.children.iterate();
            item.setFlipX(true);
            item.groupTag = 'A';
            item.dead = false;
            /**0,1,2,3 - 左右上下 */
            item.faceTo = 1;                        
            // item.checkBox_Attack = new Phaser.Geom.Rectangle(item.x - 25, item.y, item.displayWidth + 50, item.displayHeight).setStrokeStyle(2, 0xffff00);
            item.checkBox_Attack = this.add.rectangle(item.x, item.y, item.displayWidth, item.displayHeight).setStrokeStyle(2, 0xffff00);
        });       
        this.anims.staggerPlay('idle', this.group_Left.getChildren(), 60);

        //右边
        this.group_Right = this.setGroup('B','brawler', 7, 9, 3, 3, 40, 40, 600, 100).scaleXY(1);        
        this.group_Right.getChildren().forEach(item =>{
            item.setTint(0x80fff0);  
            item.groupTag = 'B';
            item.dead = false;     
            /* 0,1,2,3 - 左右上下 */
            item.faceTo = 0;    
            item.checkBox_Attack = this.add.rectangle(item.x, item.y, item.displayWidth, item.displayHeight).setStrokeStyle(2, 0xffff00);
        });
        this.anims.staggerPlay('idle', this.group_Right.getChildren(), 60);

        


        //移动测试        
        //this.moveGroup(group_Right, locB, 20);

        //碰撞
        this.physics.add.overlap(this.group_Left, this.group_Right, (m, g)=>{
            // console.log('gggggggggg');
            m.body.stop();
            g.body.stop();
        });
        //this.physics.add.collider(this.group_Left, this.group_Right);
        //this.physics.add.collider(man, man2);

        // this.physics.moveToObject(man, man2);

        let temp = this.findNearest(this.group_Left.getChildren()[0], this.group_Right);       
        this.move(this.group_Left.getChildren()[0], temp);        

        graphics = this.add.graphics({ fillStyle: { color: 0xaa0000} });

        rect = new Phaser.Geom.Rectangle(200, 0, 100, 150);
       

        //checkRect = new Phaser.Geom.Rectangle(this.group_Left.getChildren()[0].x, this.group_Left.getChildren()[0].y, this.group_Left.getChildren()[0].displayWidth, this.group_Left.getChildren()[0].displayHeight);
        

        // this.group_Left.getChildren()[0]
        // this.input.on('pointermove', function (pointer) {

        //     Phaser.Geom.Rectangle.CenterOn(checkRect, pointer.x, pointer.y);

        // });
             

    }  

    // platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    // movingPlatform.setImmovable(true);
    // movingPlatform.body.allowGravity = false;
    // movingPlatform.setVelocityX(50);
    // player.setBounce(0.2);
    // player.setCollideWorldBounds(true);
    //sprite.body.stop();
    /////////////////////////////////////!!!!!!! js特性    this.crash1  this.crash2  this.crash3
    //this['crash' + enemy.index].play();

    /**更新 */
    update(){
       // console.log(this.group_Left.getChildren()[0].body.velocity);
        // console.log(this.group_Left.getChildren()[0].body.velocity);
        //一起移动
        //if(this.tt == true)
            //Phaser.Actions.IncX(this.group_Left.getChildren(), 100);            
            

    
        graphics.clear();

        graphics.fillRectShape(rect);
        

        

        this.animPlay_move(this.group_Left);

        this.freshCheckBox_Attack(this.group_Left);

    }

    /**移动动画 */
    animPlay_move(group){
        let animName;
        group.getChildren().forEach(item => {
            animName = item.anims.getName();
            
            if(item.body.velocity.x != 0 || item.body.velocity.y != 0){               
                item.play('walk', true);//play(key [, ignoreIfPlaying])                
            }else{
                if(animName !== 'punch')
                    item.play('idle', true);
            }
        });
    }


    /**刷新攻击盒子检测*/
    freshCheckBox_Attack(group){
        group.getChildren().forEach(item => {

            item.checkBox_Attack.x = item.x;
            item.checkBox_Attack.y = item.y;
            let x = item.checkBox_Attack.x - (item.checkBox_Attack.width / 2);
            let y = item.checkBox_Attack.y - (item.checkBox_Attack.height / 2);            
            
            let canAttack = false;

            let within = this.physics.overlapRect(x, y, item.checkBox_Attack.width, item.checkBox_Attack.height);
            within.forEach(function (body) {                 
                if(body.gameObject.groupTag != item.groupTag){
                    canAttack = true;
                    body.gameObject.setTint(0xff0000);                
                }                                    
            });
            if(canAttack){
                item.play('punch', true).on('animationcomplete', ()=>{
                    canAttack = false;
                })
            }  
            console.log(canAttack)

        });
    }

    /*移动组*/
    moveGroup(group, target, velocity){
        group.getChildren().forEach(item=>{
            this.physics.moveToObject(item, target, velocity);
        });
    }

    /*单个移动*/
    move(obj, target, velocity){
        this.physics.moveToObject(obj, target, velocity);
    }
    /*得到距离*/
    getDistance(obj1, obj2){
        return Phaser.Math.Distance.Between(obj1.x, obj1.y, obj2.x, obj2.y);
    }
    /*从目标组发现一个最近目标*/
    findNearest(obj, group){
        let children = group.getChildren();
        let distance = this.getDistance(obj, children[0]);
        let targetIndex = 0;
        for(let i = 1; i < group.getLength(); ++i){            
            let temp = this.getDistance(obj, children[i]);
            if(distance > temp){
                distance = temp;
                targetIndex = i;
            }
        }      
        return group.getChildren()[targetIndex];
    }






    setGroup( tag, spriteKey, frameArr, frame_Num, w_Num, h_Num, w_Cell, h_Cell, locX, locY){
        console.log("ok")      
        const group = this.physics.add.group({
            key: spriteKey,
            frame: frameArr,
            frameQuantity: frame_Num
        });        
        Phaser.Actions.GridAlign(group.getChildren(), { 
            width: w_Num, 
            height: h_Num, 
            cellWidth: w_Cell,
            cellHeight: h_Cell, 
            x: locX, 
            y: locY 
        });
        let i = 0;
        group.getChildren().forEach(item => {
            item.tag = tag + i + '';
            item.attack = false;
            item.hp = 100;
            
        })
        return group;        
    }

    myFunc(projectile, enemy){
        console.log()        
    }

}