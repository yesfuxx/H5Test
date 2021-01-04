// class Brawler extends Pawn{
//     constructor(scene, x, y, texture){
//         super(scene, 0, 0, 'brawler');
//         //add to the scene        
//         scene.add.existing(this);        

//         //this.play('anim_beam');        
//     }

//     //方法都需手动调用
//     create(){
//         //console.log('beam create');           
//     }

//     update(){
//         //console.log('beam update')
//     }

//     /*单个移动*/
//     move(obj, target, velocity){
//         this.physics.moveToObject(obj, target, velocity);
//     }

//     /*得到距离*/
//     getDistance(obj1, obj2){
//         return Phaser.Math.Distance.Between(obj1.x, obj1.y, obj2.x, obj2.y);
//     }

//     /*从目标组发现一个最近目标*/
//     findNearest(obj, group){
//         let children = group.getChildren();
//         let distance = this.getDistance(obj, children[0]);
//         let targetIndex = 0;
//         for(let i = 1; i < group.getLength(); ++i){            
//             let temp = this.getDistance(obj, children[i]);
//             if(distance > temp){
//                 distance = temp;
//                 targetIndex = i;
//             }
//         }      
//         return group.getChildren()[targetIndex];
//     }

//     /**刷新攻击盒子检测*/
//     freshCheckBox_Attack(group){
//         group.getChildren().forEach(item => {

//             item.checkBox_Attack.x = item.x;
//             item.checkBox_Attack.y = item.y;
//             let x = item.checkBox_Attack.x - (item.checkBox_Attack.width / 2);
//             let y = item.checkBox_Attack.y - (item.checkBox_Attack.height / 2);            
            
//             let canAttack = false;

//             let within = this.physics.overlapRect(x, y, item.checkBox_Attack.width, item.checkBox_Attack.height);
//             within.forEach(function (body) {                 
//                 if(body.gameObject.groupTag != item.groupTag){
//                     canAttack = true;
//                     body.gameObject.setTint(0xff0000);                
//                 }                                    
//             });
//             if(canAttack){
//                 item.play('punch', true).on('animationcomplete', ()=>{
//                     canAttack = false;
//                 })
//             }  
//             console.log(canAttack)

//         });
//     }

// }