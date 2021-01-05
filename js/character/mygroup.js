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
     * @param {*} loc 生成位置{x: 0, y: 0},左上角第一个
     * @param {*} row 行
     * @param {*} colomn 列
     * @param {*} interval_Row 行间隔，默认为精灵宽度
     * @param {*} interval_Column 列间隔，默认为精灵高度
     */
    formation_Rect(loc = {x: 0, y: 0}, row = 3, colomn = 3, interval_Row = this.getChildren()[0].displayWidth, interval_Column = this.getChildren()[0].displayHeight){
        this.row = row;
        this.colomn = colomn;
        Phaser.Actions.GridAlign(this.getChildren(), { 
            width: row, 
            height: colomn, 
            cellWidth: interval_Row,
            cellHeight: interval_Column, 
            x: loc.x, 
            y: loc.y,
            position: Phaser.Display.Align.BOTTOM_CENTER
        });
        //#region 
        // let children = this.getChildren();
        // let child;
        // for(let r = 0; r < row; ++r){
        //     for(let c = 0; c < colomn; ++c){
        //         child = children[r * colomn + c];
        //         child.setPosition(loc.x + (row - r) * interval_Row, loc.y + c * interval_Column);
        //         child.row = (row - r);
        //         child.colomn = c;
        //     }
        // }
        //#endregion
    }

    /**
     * 三角阵型
     * @param {*} loc_Top 生成位置-尖端顶点
     * @param {*} row_addNum 每行增加量
     * @param {*} row 行数
     * @param {*} interval_Row 行间隔
     * @param {*} interval_Column 行内间隔
     */
    formation_Tri(loc_Top = {x: 0, y: 0}, row_addNum = 1, row = 3, interval_Row = 50, interval_Column = 50){

        let children = this.getChildren();
        let index = 1; 
        let nums;
        let locY_First;

        children[0].setPosition(loc_Top.x, loc_Top.y);

        for(let r = 1; r < row; ++r){

            nums = r * row_addNum + 1;
            locY_First = 0;

            //先确定每行最左侧位置
            if(nums % 2 == 0){
                locY_First = (nums/2) * interval_Column;
            }else{
                locY_First = (nums/2 + 0.5) * interval_Column;
            }

            for(let j = 0; j <  nums; ++j){

                if(children[index]){//有效

                    //**********设置行号
                    children[index].row = r;

                    if(nums % 2 == 0){//该行为双数时
                        if(j < nums /2){//左边的
                             children[index].setPosition(loc_Top.x + r * interval_Row, loc_Top.y + locY_First - interval_Column * (j + 0.5));    
                        }else{//右边的
                            children[index].setPosition(loc_Top.x + r * interval_Row, loc_Top.y + locY_First - interval_Column * ( j + 0.5));       
                        } 
                    }
                    else{//该行为单数时
                        children[index].setPosition(loc_Top.x + r * interval_Row, loc_Top.y + locY_First - interval_Column * (j + 1));    
                    }    
                }   
                ++index;
            }              
                
        }
    }


    /**
     * 移动
     * @param {*} moveTime 移动时间
     * @param {*} x_add x位置增量
     * @param {*} y_add y位置增量
     * @param {*} interval_Row 行间隔变化值
     * @param {*} interval_Column 列间隔变化值
     */
    move_Rect(moveTime = 2000, loc_Add = {x: 100, y: 0}, interval_Row = 0, interval_Column = 0){        
        let i = 0;
        let tempX = 0;
        let tempY = 0;
        this.getChildren().forEach(item => {           
            tempX = i % this.row;
            tempY = parseInt(i / this.row);                  
            item.moveTo({x: item.x + loc_Add.x + tempX * interval_Row , y: item.y + loc_Add.y + tempY * interval_Column}, moveTime);      
            ++i;
        });
        //#region 
        // let children = this.getChildren();
        // let child;
        // this.colomn
        // let tempY;
        // if(this.colomn % 2 == 0){
        //     tempY = children[this.colomn/2].y + children[(this.colomn / 2) + 1].y;
        // }else{
        //     console.log(parseInt(this.colomn/2))
        //     tempY = children[parseInt(this.colomn/2)].y;
        // }
        
        // for(let i = 0; i < children.length; ++i){

        //     child = children[i];

        //     if(child.y > tempY ){

        //         child.moveTo({x: child.x + loc_Add.x + interval_Row * child.row, y: child.y + loc_Add.y + interval_Column}, moveTime);  

        //     }else if(child.y < tempY ){

        //         child.moveTo({x: child.x + loc_Add.x + interval_Row * child.row, y: child.y + loc_Add.y - interval_Column}, moveTime);   

        //     }else if(child.y == tempY){

        //         child.moveTo({x: child.x + loc_Add.x + interval_Row * child.row, y: child.y + loc_Add.y}, moveTime);      
        //     }
        // }
        //#endregion
    }
    move_Tri(moveTime = 2000, loc_Add = {x: 0, y: 0}, interval_Row = 0, interval_Column = 0){        

        let children = this.getChildren();

        children[0].moveTo({x: children[0].x + loc_Add.x, y: children[0].y + loc_Add.y}, moveTime);      
        let child;

        for(let i = 1; i < children.length; ++i){

            child = children[i];

            if(child.y > children[0].y ){

                child.moveTo({x: child.x + loc_Add.x + interval_Row * child.row, y: child.y + loc_Add.y + interval_Column}, moveTime);  

            }else if(child.y < children[0].y ){

                child.moveTo({x: child.x + loc_Add.x + interval_Row * child.row, y: child.y + loc_Add.y - interval_Column}, moveTime);   

            }else if(child.y == children[0].y){

                child.moveTo({x: child.x + loc_Add.x + interval_Row * child.row, y: child.y + loc_Add.y}, moveTime);      
            }
        }
    }

    allAttack(delayTime = 200, times = 1 ){

        this.scene.time.addEvent({ delay: Phaser.Math.Between(delayTime * 0.8, delayTime * 1.2), callback: ()=>{
            this.getChildren().forEach(item => {       
                item.playAnim_Attack();                    
            }); 
        }, callbackScope: this, repeat: times - 1 });
    }
    

    allDead(times = this.getLength(), delayTime = 300){

        this.scene.time.addEvent({ delay: Phaser.Math.Between(delayTime * 0.8, delayTime * 1.2), callback: ()=>{

            let index = Phaser.Math.Between(0, this.getLength() - 1)
            let child = this.getChildren()[index];
            child.hp = -100;       
    
            //等待一小会，使hp设置成功后，进行移除
            this.scene.time.addEvent({ delay: 50, callback: ()=>{ 
                this.remove(child);
            }, callbackScope: this }, this);

        }, callbackScope: this, repeat: times - 1 });

    }
}
