class Beam extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y){
        super(scene, 0, 0, 'beam');
        //add to the scene        
        scene.add.existing(this);        

        //this.play('anim_beam');        
    }

    //方法都需手动调用
    create(){
        //console.log('beam create');           
    }

    update(){
        //console.log('beam update')
    }

}