class Boot extends Phaser.Scene{
    constructor(){
        super('boot');
        //super({key:"bootGame"});  
    }

    preload(){
        // this.load.image('background', './assets/imgs/background.png');
        // this.load.spritesheet('ship', 'assets/spritesheets/ship.png', {frameWidth: 16, frameHeight: 16});       
        // this.load.bitmapFont('pixelFont', 'assets/font/font.png', 'assets/font/font.xml');
        // this.load.audio('audio_beam', ['assets/sounds/beam.ogg', 'assets/sounds/beam.mp3']);
 
        //this.load.spritesheet('brawler', 'assets/imgs/brawler48x48.png', { frameWidth: 48, frameHeight: 48 });


        this.load.atlas('brawler', 'assets/spritesheets/brawler.png', 'assets/spritesheets/brawler.json');

        this.load.spritesheet('projectile', 'assets/spritesheets/beam.png', {frameWidth:16,frameHeight:16});
    }

    create(){

        //#region 

        // Animation set
        // this.anims.create({
        //     key: 'walk',
        //     // frames: this.anims.generateFrameNumbers('brawler', { frames: [ 0, 1, 2, 3 ] }),
        //     // frames: this.anims.generateFrameNames('knight', { prefix: 'idle/frame', start: 0, end: 5, zeroPad: 4 }),
        //     frames: this.anims.generateFrameNames('brawler', { prefix: 'walk'}),
        //     frameRate: 8,
        //     repeat: -1
        // });

        //suffix: '.png'  是否有后缀  zeroPad-自动填充 0000 0001 之类
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNames('brawler', { prefix: 'walk/', start: 0, end: 3, zeroPad: 4}),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'idle',            
            frames: this.anims.generateFrameNames('brawler', { prefix: 'idle/', start: 0, end: 3, zeroPad: 4}),
            frameRate: 8,
            repeat: -1
        });        
        this.anims.create({
            key: 'kick',
            frames: this.anims.generateFrameNames('brawler', { prefix: 'kick/', start: 0, end: 4, zeroPad: 4}),
            frameRate: 8,
            repeat: -1,
            repeatDelay: 2000
        });
        this.anims.create({
            key: 'punch',            
            frames: this.anims.generateFrameNames('brawler', { prefix: 'punch/', start: 0, end: 5, zeroPad: 4}),
            frameRate: 8,
            // Math.random() * 3000
            // Phaser.Math.Between(0, 800)            
            //repeat: -1,
            // repeatDelay: 2000
        });
        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNames('brawler', { prefix: 'jump/', start: 0, end: 3, zeroPad: 4}),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'jumpkick',
            frames: this.anims.generateFrameNames('brawler', { prefix: 'jumpkick/', start: 0, end: 7, zeroPad: 4}),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'win',
            frames: this.anims.generateFrameNames('brawler', { prefix: 'win/', start: 0, end: 1, zeroPad: 4}),
            frameRate: 8,
            repeat: -1,
            repeatDelay: 2000
        });
        this.anims.create({
            key: 'die',
            frames: this.anims.generateFrameNames('brawler', { prefix: 'die/', start: 0, end: 2, zeroPad: 4}),
            frameRate: 8,
        });

       //#endregion

       //projecile
        this.anims.create({
            key:'projectile',
            frames:this.anims.generateFrameNumbers('beam'),
            frameRate:20,
            repeat:-1
        });


        //this.scene.start('start');
        this.scene.start('game');

    }
}