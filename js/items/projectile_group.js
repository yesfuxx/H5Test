class Projectile_Group extends Phaser.Physics.Arcade.Group{

    constructor(world, scene, children){
        super(world, scene, children, {})
        this.scene = scene;
        //this.createMyGroup(scene, texture, bOrientationRight_Asset)


        this.row = 0;
        this.colomn = 0;
        this.group_Enemy;

        killAndHide(gameObject)
    }

    create(){
        
    }

    update(time, delta){

        this.getChildren().forEach(item => {
            //if(item.hp > 0)
                item.update(time, delta);
        })
    }

    myGetFirstDead(loc = {x: 0, y: 0}, texture_Key){
        if(this.myGetFirstDead(false, loc.x, loc.y)){

        }else{
            let child = new Porjectile(this.scene, texture_Key)
            this.add(child);
        }
    }
}