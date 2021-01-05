class Game extends Phaser.Scene{
    constructor(){
        super('game');
    }        

    create(){

        //this.graph = this.add.graphics({ fillStyle: { color: 0xaa0000} });
        //this.rect = new Phaser.Geom.Rectangle(200, 0, 100, 150);

        // this.testPawn = new Pawn(this, 300, 200, 'brawler', 10,  false, 'right').setScale(1);
        // this.testPawn.orientation = 'right';
        // this.testPawn2 = new Pawn(this, 500, 200, 'brawler', 'idle/0000', false, 'right');
        // this.testPawn2.scaleX = -1;
        // this.testPawn3 = new Pawn(this, 100, 200, 'brawler', false, 'right').setScale(1);

        //this.testPawn3 = new Pawn(this, 200, 335, 'brawler', false, 0).setScale(2);
        //this.testPawn4 = new Pawn(this, 200, 460, 'brawler', false, 0).setScale(2);
        // this.add.sprite( 100, 200, 'brawler').setScale(1); 

        // this.testPawn2.moveToObject(this.testPawn, 50);
        // this.testPawn.moveToObject(this.testPawn2, 50);
        // this.testPawn.moveTo(300, 500, 5000);
        
        this.group1 = new MyGroup(this.physics.world, this, []);
        this.group1.createChildren_ByNums(12, 'brawler', 'idle/0000' ,false, 'right');
        this.group1.formation_Rect({x: 100, y: 100}, 4, 3, 40, 30);
        this.group1.move_Rect(2000, {x: 205, y: 0}, -10, 0);

        this.group2 = new MyGroup(this.physics.world, this, []);
        this.group2.createChildren_ByNums(12, 'brawler', 'idle/0000' ,false, 'left');
        this.group2.formation_Rect({x: 650, y: 100}, 4, 3, 40, 30);
        this.group2.move_Rect(2000, {x: -205, y: 0}, -20, 0);

        this.group1.group_Enemy = this.group2;
        this.group2.group_Enemy = this.group1;

        // this.group2.anim_Play('die');
        // this.group2.move_Rect(2000, 200, 100, 30, 20);

        this.time.addEvent({ delay: 3000, callback: ()=>{
            this.group1.allDead(7);
        }, callbackScope: this });
        this.time.addEvent({ delay: 3000, callback: ()=>{
            this.group2.allDead();
        }, callbackScope: this });

        this.time.addEvent({ delay: 2500, callback: ()=>{
            this.group1.allAttack(800, 5);
        }, callbackScope: this });      
        this.time.addEvent({ delay: 2500, callback: ()=>{
            this.group2.allAttack(800, 3);
        }, callbackScope: this });  


        this.group3 = new MyGroup(this.physics.world, this, []);
        this.group3.createChildren_ByNums(12, 'brawler', 'idle/0000' ,false, 'right');
        this.group3.formation_Tri({x: 400, y: 450}, 1, 4, 50 ,50)
        // this.group3.move_Tri(2000, {x: -200, y: 0}, -20, 0);

        this.group4 = new MyGroup(this.physics.world, this, []);
        this.group4.createChildren_ByNums(12, 'brawler', 'idle/0000' ,false, 'right');
        this.group4.formation_Rect({x: 250, y: 250}, 4, 3, 40, 40);
        // this.group4.move_Rect(2000, {x: 250, y: 0}, 10, 20);


    }

    update(time, delta){

        // this.graph.clear();
        // this.graph.fillRectShape(this.rect);


        // Phaser.Actions.IncX(this.testGroup.getChildren(), 0.5, 0,2); 

        // this.testPawn.update(time, delta);
        // this.testPawn2.update(time, delta);

        this.group1.update(time, delta);
        this.group2.update(time, delta);
        this.group3.update(time, delta);
        this.group4.update(time, delta);


    }

}