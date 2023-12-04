// Efectos de sonido

//Imágenes
var stepswitcher_prev=new Image(96,128);
stepswitcher_prev.src='./Img/Lockstep_Prev.png';
var stepswitcher_idle=new Image(96,128);
stepswitcher_idle.src='./Img/Lockstep_Idle.png';
var stepswitcher_beat=new Image(96,128);
stepswitcher_beat.src='./Img/Lockstep_Beat.png';
var stepswitcher_offbeat=new Image(96,128);
stepswitcher_offbeat.src='./Img/Lockstep_Offbeat.png';
var you_pointer=new Image(62,30);
you_pointer.src='./Img/you.png';

const thisCanvas=document.querySelector('#lienzo');
const btn=document.querySelector('#start');
const showScore=document.querySelector('#score');
const desc=document.querySelector('#desc');
const ctx=thisCanvas.getContext('2d');
const rightBeats=[
    1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23,25, 27, 29, 31,
    32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64,
    65, 67, 69, 71, 73, 75, 77, 79, 81, 83, 85, 87, 89, 91, 93, 95,
    96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120, 122, 124, 126, 128,
    129, 131, 133, 135, 137, 139, 141, 143,
    144, 146, 148, 150, 152, 154, 156, 158, 160,
    161, 163, 165, 167, 169, 171, 173, 175,
    176, 178, 180, 182, 184, 186, 188, 190, 192,
    193, 195, 197, 199,
    200, 202, 204, 206, 208,
    209, 211, 213, 215,
    216, 218, 220, 222, 224,
    225, 227, 229, 231,
    232, 234, 236, 238, 240, 242, 244, 246, 248,
    249, 251, 253, 255, 257, 259, 261, 263, 265, 267, 269, 271,
    272, 274, 276, 278, 280, 282, 284,
    285, 287, 289, 291, 293, 295, 297, 299, 301, 303,
    304, 306, 308, 310, 312, 314, 316,
    317, 319, 321, 323, 325, 327, 329, 331, 333, 335, 337, 339, 341, 343, 345, 347, 349, 351,
    352, 354, 356, 358, 360, 362, 364, 366, 368, 370, 372, 374, 376, 378, 380, 382, 384,
    385, 387, 389, 391, 393, 395, 397, 399, 401, 403, 405, 407, 409, 411, 413, 415
];

let isBeat=true;
let hasStarted=false;
let steps=1;
let score=0;
let hasScored=false;

const to_offbeat1_call=[
    1,25,27,29,
    65,89,91,93,
    129,137,139,141,
    161,169,171,173,
    193,195,197,
    209,211,213,
    225,227,229,
    249,265,267,269,
    285,297,299,301,
    317,345,347,349,385
];

const to_offbeat2_call=[
    31,95,143,175,199,215,231,271,303,351
];

const offbeat_switch_call=[
    32,96,144,176,200,216,232,272,304,352
];

const to_offbeat_bg=[
    25,27,29,31,32,
    89,91,93,95,96,
    137,139,141,143,144,
    169,171,173,175,176,
    193,195,197,199,200,
    209,211,213,215,216,
    225,227,229,231,232,
    265,267,269,271,272,
    297,299,301,303,304,
    345,347,349,351,352
];

const offbeat_call=[
    34,36,38,40,
    98,100,102,104,
    146,148,150,152,
    178,180,182,184,
    202,204,
    218,220,
    234,236,238,240,
    274,276,278,280,
    306,308,310,312,
    354,356,358,360
];

const to_beat1_call=[
    61,63,
    125,127,
    157,159,
    189,191,
    205,207,
    221,223,
    245,247,
    281,283,
    313,315,
    381,383
];

const to_beat2_call=[
    62,64,
    126,128,
    158,160,
    190,192,
    206,208,
    222,224,
    246,248,
    282,284,
    314,316,
    382,384
];

const to_beat_bg=[
    61,62,63,64,65,
    125,126,127,128,129,
    157,158,159,160,161,
    189,190,191,192,193,
    205,206,207,208,209,
    221,222,223,224,225,
    245,246,247,248,249,
    281,282,283,284,285,
    313,314,315,316,317,
    381,382,383,384,385
];

async function start(){
    thisCanvas.style.backgroundColor='#f84898';
    showScore.innerHTML='Puntuación: '+score+'/'+rightBeats.length;
    desc.innerHTML='';
    ctx.drawImage(stepswitcher_prev,144,224);
    ctx.drawImage(stepswitcher_prev,48,224);
    ctx.drawImage(stepswitcher_prev,240,224);
    ctx.drawImage(you_pointer,162,193);
    setTimeout(function(){
        hasStarted=true;
        let isBright=true;
        ctx.clearRect(62,30,162,193);
        ctx.drawImage(stepswitcher_idle,144,224);
        setInterval(function(){
            isBeat=!isBeat;
            steps++;
            if(to_offbeat1_call.includes(steps)) new Audio('./Lockstep/SFX_TO_OFFBEAT_1.wav').play();
            if(to_offbeat2_call.includes(steps)) new Audio('./Lockstep/SFX_TO_OFFBEAT_2.wav').play();
            if(offbeat_switch_call.includes(steps)) new Audio('./Lockstep/SFX_TO_OFFBEAT_3.wav').play();
            if(offbeat_call.includes(steps)) new Audio('./Lockstep/SFX_OFFBEAT_VOICE.wav').play();
            if(to_beat1_call.includes(steps)) new Audio('./Lockstep/SFX_TO_BEAT_1.wav').play();
            if(to_beat2_call.includes(steps)) new Audio('./Lockstep/SFX_TO_BEAT_2.wav').play();
            hasScored=false;
            
            // Cambio de color de fondo
            if(to_offbeat_bg.includes(steps)){
                if(isBright){
                    thisCanvas.style.backgroundColor='#D55093';
                    isBright=false;
                } else {
                    thisCanvas.style.backgroundColor='#E858A0';
                    isBright=true;
                }
            };

            if(to_beat_bg.includes(steps)){
                if(isBright){
                    thisCanvas.style.backgroundColor='#D55093';
                    isBright=false;
                } else {
                    thisCanvas.style.backgroundColor='#E858A0';
                    isBright=true;
                }
            };

            // Otros personajes
            if(isBeat&&rightBeats.includes(steps)){
                ctx.clearRect(48,224,96,128);
                ctx.clearRect(240,224,96,128);
                ctx.drawImage(stepswitcher_beat,48,224);
                ctx.drawImage(stepswitcher_beat,240,224);
            }
            else if(!isBeat&&rightBeats.includes(steps)){
                ctx.clearRect(48,224,96,128);
                ctx.clearRect(240,224,96,128);
                ctx.drawImage(stepswitcher_offbeat,48,224);
                ctx.drawImage(stepswitcher_offbeat,240,224);
            }
            else{
                ctx.clearRect(48,224,96,128);
                ctx.clearRect(240,224,96,128);
                ctx.drawImage(stepswitcher_idle,48,224);
                ctx.drawImage(stepswitcher_idle,240,224);
            }
        },187);

        document.querySelector('body')
        .addEventListener('keydown',function(e){
            console.log(e.key);
            if(e.key===' '&&hasStarted){
                if(isBeat){
                    if(rightBeats.includes(steps)&&!hasScored||steps>416){
                        new Audio('./Lockstep/SFX_BEAT.wav').play();
                    }
                    else new Audio('./Lockstep/SFX_MISTAKE.wav').play();
                    ctx.clearRect(144,224,96,128);
                    ctx.drawImage(stepswitcher_beat,144,224);
                    setTimeout(function(){
                        ctx.clearRect(144,224,96,128);
                        ctx.drawImage(stepswitcher_idle,144,224);
                    },187); 
                }
                else{
                    if(rightBeats.includes(steps)&&!hasScored||steps>416){
                        new Audio('./Lockstep/SFX_OFFBEAT.mp3').play();
                    }
                    else new Audio('./Lockstep/SFX_MISTAKE.wav').play();
                    ctx.clearRect(144,224,96,128);
                    ctx.drawImage(stepswitcher_offbeat,144,224);
                    setTimeout(function(){
                        ctx.clearRect(144,224,96,128);
                        ctx.drawImage(stepswitcher_idle,144,224);
                    },187);
                }
            }
            if(rightBeats.includes(steps) && !hasScored){
                score++;
                hasScored=true;
                showScore.innerHTML='Puntuación: '+score+'/'+rightBeats.length;
            }
        });
    },6235);
}

document.querySelector('#start')
.addEventListener('click',function(){
    btn.disabled=true;
    new Audio('./Lockstep/BGM.mp3').play();
    start();
})