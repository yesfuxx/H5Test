class MyGroup extends Phaser.Physics.Arcade.Group{

    constructor(world, scene, children){
        super(world, scene, children, {})
        this.scene = scene;
        //this.createMyGroup(scene, texture, bOrientationRight_Asset)


        this.row = 0;
        this.colomn = 0;
        this.group_Enemy;
    }

    create(){
        
    }

    update(time, delta){

        this.getChildren().forEach(item => {
            //if(item.hp > 0)
                item.update(time, delta);
        })
    }

    /**
     * 创建Children，通过个数
     * @param {*} Num 个数
     * @param {*} textureKey 图片的key
     * @param {*} frame 哪一帧
     * @param {*} bOrientationRight_Asset 精灵集默认朝向，右为true
     * @param {*} orientation_Start 初始朝向
     */
    createChildren_ByNums(Num, textureKey, frame, bOrientationRight_Asset = true, orientation_Start = 'right')
    {
        for(let i = 0; i < Num; ++i){
            let pawn = new Pawn(this.scene, 0, 0, textureKey, frame, bOrientationRight_Asset, orientation_Start);
            this.add(pawn);
            pawn.playAnim_Default();
        }
    }
    /**
     * 如通过tilemap对象层进行创建
     * const map = this.make.tilemap({ key: "map" });
     * this.enemies = map.createFromObjects("objectLayer_enemies", "enemy", {});//从对象层创建(通过Tiled软件导出地图数据)
     * @param {*} Num
     * @param {*} texture 
     * @param {*} bOrientationRight_Asset 
     */
    createChildren_BySpritArray(spriteArray, textureKey, frame, bOrientationRight_Asset = true)
    {
        spriteArray.forEach(sprite => {
            const pawn = new Pawn(this.scene, sprite.x, sprite.y, texture, frame, bOrientationRight_Asset);
            this.add(pawn);
            pawn.playAnim_Default();
            sprite.destroy();
        });
    }


    /**
     * 方阵
     * @param {*} locX 生成位置X,左上角第一个
     * @param {*} locY 生成位置Y,左上角第一个
     * @param {*} row 行
     * @param {*} colomn 列
     * @param {*} cell_Row 行间隔，默认为精灵宽度
     * @param {*} cell_Colomn 列间隔，默认为精灵高度
     */
    gridAlign(locX, locY, row = 3, colomn = 3, cell_Row = this.getChildren()[0].displayWidth, cell_Colomn = this.getChildren()[0].displayHeight){
        this.row = row;
        this.colomn = colomn;
        Phaser.Actions.GridAlign(this.getChildren(), { 
            width: row, 
            height: colomn, 
            cellWidth: cell_Row,
            cellHeight: cell_Colomn, 
            x: locX, 
            y: locY,
            position: Phaser.Display.Align.BOTTOM_CENTER
        });
    }


    /**
     * 移动
     * @param {*} moveTime 移动时间
     * @param {*} x_add x位置增量
     * @param {*} y_add y位置增量
     * @param {*} interval_Row 行间隔变化值
     * @param {*} interval_Column 列间隔变化值
     */
    move_ByColomn(moveTime = 2000, x_add = 100, y_add = 0, interval_Row = 0, interval_Column = 0){        
        let i = 0;
        let tempX = 0;
        let tempY = 0;
        this.getChildren().forEach(item => {           
            tempX = i % this.row;
            tempY = parseInt(i / this.row);                  
            item.moveTo(item.x + x_add + tempX * interval_Row , item.y + y_add + tempY * interval_Column, moveTime);      
            ++i;
        });
    }

    anim_Play(animType, tag = true){
        switch (animType) {
            case 'default':
            case 'idle':
                this.getChildren().forEach(item => {           
                    item.playAnim_Default();                    
                });       
                break;
            case 'walk':
                this.getChildren().forEach(item => {           
                    item.playAnim_Move();                    
                });       
                break;
            case 'attack':
                this.getChildren().forEach(item => {         
                    item.canAttack = tag;
                    // item.playAnim_Attack();                    
                });       
                break;
            // case 'die':
            //     console.log('kkkkkkkkk'+ this.getLength())
 
            //     for(let i = 0; i < this.getLength(); ++i)   {
            //         this.getChildren()[i].death2Do();
            //     }
            //     break;
            default:
                this.getChildren().forEach(item => {           
                    item.playAnim_Default();                    
                });       
                break;
        }

    }

    // allAttack()
    

    allDead(delayTime = 200){
        this.scene.time.addEvent({ delay: delayTime, callback: ()=>{

            let index = Phaser.Math.Between(0, this.getLength() - 1)
            console.log(index) 
            let child = this.getChildren()[index];
            child.hp = -100;       
    
            //等待一小会，使hp设置成功后，进行移除
            this.scene.time.addEvent({ delay: 50, callback: ()=>{ 
                this.remove(child);
            }, callbackScope: this }, this);

        }, callbackScope: this, repeat: this.getLength() - 1 });

        this.scene.time.addEvent({ delay: delayTime * this.getLength(), callback: ()=>{
            this.group_Enemy.anim_Play('attack', false);
            // this.group_Enemy.anim_Play('idle');
        }, callbackScope: this});

        
    }

}
