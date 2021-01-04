// window.onload=function(){
    
// }


// var config = {
//     width:800,
//     height:600,
//     backgroundColor:0x000000,
//     scene:[Boot, Start, Game],
//     pixelArt:true,
//     physics:{
//         default:'arcade',
//         arcade:{
//             debug:true,
//             debugShowVelocity: false
//         }
//     }
// }
var config = {
    type: Phaser.AUTO,
    backgroundColor: '#0x000000',
    scale: {
        parent: 'phaser-example',
        mode: Phaser.Scale.FIT,
        //autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600
    },
    scene:[Boot, Start, Game],
    pixelArt:true,
    physics:{
        default:'arcade',
        arcade:{
            gravity: { y: 0 },
            debug:true,
            debugShowVelocity: false
        }
    }
};
var timedEvent;
var game = new Phaser.Game(config);