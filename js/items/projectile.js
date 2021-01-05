class Porjectile extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, texture){

        super(scene, 0, 0, texture);
     
        scene.add.existing(this);        

        scene.physics.world.enableBody(this);

        this.playAnim_Default();


    }

    moveTo(){
        this.scene.moveTo()
    }

    playAnim_Default(){

        this.play('projectile', true);

    }

    create(){
        
    }

    update(){

        // if(this.y < 0){
        //     //this.destroy();
        //    this.setActive(false).setVisible(false);
        // }
    }

    setProperties(x, y){
        this.body.velocity.x = 0;
        this.body.velocity.y = -250;
        
        this.setActive(true);
        this.setVisible(true);
        this.setPosition(x, y);
    }
}