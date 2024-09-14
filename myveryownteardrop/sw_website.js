self.addEventListener("install", (e) => {
    console.log("[INSTALLED SERVICE WORKER]");
});
let version = '1.1';
const cacheName = 'Teardrop' + version;
let update = false;
caches.keys().then((keys)=>{
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        if (key != cacheName) {
            update = true;
            //console.log('UPDATE DETECTED');
            caches.delete(key);
        };
    };
});
caches.keys().then((keys)=>{
    //console.log(keys);
});
let path = "/demo/play/";
let websitePath = "/demo/";
const appShellFiles = [
    websitePath+"index.html",
    websitePath+"bfdi_mobile.css",
    websitePath+"bfdi.css",
    websitePath+"manifest.json",

    websitePath+"idle/index.html",
    
    path+"index.html",
    path+"manifest.json",
    path+"bfdi.js",
    path+"ease.js",
    path+"pixi.js",
    path+"pizzicato.js",
    path+"text.js",

    websitePath+"images/blur.png",
    websitePath+"images/Buttons0001.png",
    websitePath+"images/Buttons0002.png",
    websitePath+"images/fullscreen.png",
    websitePath+"images/Grass.png",
    websitePath+"images/Logo.png",
    websitePath+"images/play.png",
    websitePath+"images/RepeatingUI0005.png",
    websitePath+"images/runGame.png",
];
function loadSpriteSheet(pathName, name, flashPath) {
    //console.log('./Sprites/' + pathName + '.json')
    appShellFiles.push(path+'Sprites/' + pathName + '.json')
    appShellFiles.push(path+'Sprites/' + pathName + '.png')
};
console.warn = function(){};
let itemsNeeded = 0;
function loadGroupSpriteSheet(pathNames, names, flashPath) { // only used for backgrounds for now..
    let order = {};
    for (let i = 0; i < pathNames.length; i++) {
        order[i] = [];
        itemsNeeded++;
        //console.log('./Sprites/' + pathNames[i] + '.json')
        appShellFiles.push(path+'Sprites/' + pathNames[i] + '.json')
    };
};
function loadImageSequence(pathName, count, flashPath) { // only used for backgrounds for now..
    let order = {};
    for (let i = 0; i < count; i++) {
        order[i] = 0;
        itemsNeeded++;
        let count2 = (i + 10001).toString().slice(1);
        if (count == 1) count2 = '';
        //console.log('./Sprites/' + pathNames[i] + '.json')
        appShellFiles.push(path+'Sprites/' + pathName + count2 + '.png')
    };
};
function loadFont(pathName) {
    appShellFiles.push(path+'Fonts/' + pathName + '.fnt')
    appShellFiles.push(path+'Fonts/' + pathName + '.png')
};
//let intromation = 
function loadAnimation(pathName, animationName) {
    appShellFiles.push(path+'Animations/' + pathName + '.json')
};
function loadAudio(pathName, audioName) {
    //return;
    //itemsNeeded++;
    
    appShellFiles.push(path+'Audio/' + pathName + '.mp3')
    //audio[audioName].play = function(){};
    //audio[audioName].sourceNode = {};
    /*PIXI.Assets.load('./Audio/' + pathName + '.mp3').then((e) => {
        //console.log(e)
        audio[audioName] = e;
        loader("AUDIO", pathName);
    })*/
};
function loadLevel(pathName, event) {
    //itemsNeeded++;
    appShellFiles.push(path+'Levels/' + pathName + '.json')
};
let qualityPath = "";
loadFont("MenuShag");
loadFont("arial");
loadFont("ShagBlueNumber");
loadFont("ShagBlack");
loadFont("IndieFlower");
loadAnimation("Teardrop", "Teardrop");
loadAnimation('bfb', 'bfb');
loadAnimation("TeardropTired", "TeardropTired");
loadAnimation("tearDropWatch", "tearDropWatch");
loadAnimation("tearDropLevelUp", "tearDropLevelUp");
loadAnimation("faceMinigame", "faceMinigame");
loadAnimation("tearDropTennis", "tearDropTennis");

loadAnimation("GTTTATINT", "GTTTATINT");

loadAnimation("Box", "Box");
loadAnimation("SkewMatrix", "SkewMatrix");
/*loadAnimation("ShrubIntro", "ShrubIntro");
loadAnimation("Characters/Leafy", "Leafy");
loadAnimation("Characters/Coiny", "Coiny");
loadAnimation("Characters/Pin", "Pin");
loadAnimation("Characters/Spongy", "Spongy");
loadAnimation("Characters/Rocky", "Rocky");
loadAnimation("Characters/Ice Cube", "Ice Cube");*/
loadSpriteSheet("GameThumbnails", "GameThumbnails", "Sprites/GameThumbnails");
loadSpriteSheet("tennisBall", "tennisBall", "Sprites/tennisBall");
loadSpriteSheet("BGLayer", "BGLayer", "BGLayer");
//loadSpriteSheet("Rooms", "Rooms", "Sprites/Rooms");
//loadSpriteSheet("2Rooms", "2Rooms", "Sprites/Rooms");
loadImageSequence("Rooms/Rooms", 19, "Sprites/Rooms");
loadImageSequence("Logo", 1, "Logo");
loadSpriteSheet("Food", "Food", "Sprites/Food");
loadSpriteSheet("Empty", "Empty", "Sprites/Empty");
loadAudio("wave", "wave");
loadAudio("yeah", "yeah");
loadAudio("15countdown", "countdown");
loadAudio("faceMatchScores", "faceMatchScores");
loadAudio("brittlerille", "brittlerille");
loadAudio("Pamgaea", "Pamgaea");
loadAudio("LevelUp", "levelup");
loadAudio("Achievement", "achievement");
loadAudio("switchoff", "switchoff");
loadAudio("switchon", "switchon");
loadAudio("purchase", "purchase");
loadAudio("fail", "fail");
loadAudio("coinlarge", "coinlarge");
loadAudio("coinmedium", "coinmedium");
loadAudio("coinsmall", "coinsmall");
loadAudio("Radio Martini", "radiomartini");
loadAudio("Shiny Tech", "shinytech");
loadAudio("consume", "consume");
loadAudio("slap1", "slap1");
loadAudio("slap2", "slap2");
loadAudio("slap3", "slap3");
loadAudio("slap4", "slap4");
loadAudio("collect", "collect");
//loadSpriteSheet("Bodies", "Bodies", "Sprites/Bodies");
// load oldies (these are 2010 bfdi assets, not 2008);
loadSpriteSheet("Oldies/Bodies/1", "Bodies", "oldiesCostume/Bodies");
loadSpriteSheet("Oldies/Mouths", "Mouth", "oldiesCostume/Mouth");
loadSpriteSheet("Oldies/Limbs", "Limbs", "oldiesCostume/Limbs");
loadSpriteSheet("Oldies/Eyes", "Eyes", "oldiesCostume/Eyes");

loadSpriteSheet(qualityPath + "Bodies/1", "Bodies", "Sprites/Bodies");
loadSpriteSheet("Bodies/BodiesCostume1", "BodiesCostume1", "Sprites/BodiesCostume1");
loadSpriteSheet("Bodies/BodiesCostume1Tennis", "BodiesCostume1Tennis", "Sprites/BodiesCostume1Tennis");
loadSpriteSheet("Bodies/BodiesCostume2", "BodiesCostume2", "Sprites/BodiesCostume2");
loadSpriteSheet("Bodies/BodiesCostume4", "BodiesCostume4", "Sprites/BodiesCostume4");
loadSpriteSheet("Bodies/BodiesCostume5", "BodiesCostume5", "Sprites/BodiesCostume5");
loadSpriteSheet("Bodies/BodiesCostume6", "BodiesCostume6", "Sprites/BodiesCostume6");
loadSpriteSheet("Bodies/BodiesCostume7", "BodiesCostume7", "Sprites/BodiesCostume7");
loadSpriteSheet("Bodies/BodiesCostume9", "BodiesCostume9", "Sprites/BodiesCostume9");
loadSpriteSheet("MouthsCostume10", "MouthsCostume10", "Sprites/MouthsCostume10");
loadSpriteSheet("Bodies/BodiesCostume10", "BodiesCostume10", "Sprites/BodiesCostume10");
loadSpriteSheet("Bodies/BodiesCostume11", "BodiesCostume11", "Sprites/BodiesCostume11");
loadSpriteSheet("Bodies/BodiesCostume12", "BodiesCostume12", "Sprites/BodiesCostume12");
loadSpriteSheet("Bodies/BodiesCostume13", "BodiesCostume13", "Sprites/BodiesCostume13");
loadSpriteSheet("Bodies/BodiesCostume14", "BodiesCostume14", "Sprites/BodiesCostume14");
loadSpriteSheet("Bodies/BodiesCostume8steven", "BodiesCostume8steven", "Sprites/BodiesCostume8steven");
loadSpriteSheet(qualityPath + "Mouths", "Mouth", "Sprites/Mouth");
//loadSpriteSheet("BG_toobigbasic", "BG_toobigbasic", "_bg_stuff/BG_toobigbasic");
loadSpriteSheet(qualityPath + "Limbs", "Limbs", "Sprites/Limbs");
loadSpriteSheet("LimbsCostume1", "LimbsCostume1", "Sprites/LimbsCostume1");
//loadSpriteSheet("contestantIcons", "contestantIcons", "contestantIcons");
loadSpriteSheet(qualityPath + "Eyes", "Eyes", "Sprites/Eyes");
loadSpriteSheet("CakeSlicePlane", "CakeSlicePlane", "Sprites/CakeSlicePlane");
loadSpriteSheet("Clouds", "Clouds", "Sprites/Clouds");
loadSpriteSheet("Poses", "Poses", "Sprites/Poses");
//loadSpriteSheet("Flame", "FireyFlame", "FireyFlame");
loadSpriteSheet("Blur", "Blur", "Sprites/Blur");
loadSpriteSheet("Box", "Box", "Sprites/Box");
loadSpriteSheet("GameUI", "GameUI", "Sprites/GameUI");
//loadSpriteSheet("shp", "shp", "shp");
//loadSpriteSheet("UI", "UI", "UI");
//loadSpriteSheet("Background", "Background", "Background");
loadSpriteSheet("Placeholders", "Placeholders", "Sprites/Placeholders");
//loadSpriteSheet("Grass", "Grass", "Backgrounds/Grass");
loadSpriteSheet("Starfield", "Starfield", "Backgrounds/Starfield");
//loadSpriteSheet("Objects", "Objects", "Sprites/Objects");
loadSpriteSheet("RepeatingUI", "RepeatingUI", "Sprites/RepeatingUI");
loadSpriteSheet("inputNineSlice", "inputNineSlice", "inputNineSlice");

//console.log(appShellFiles)
self.addEventListener("install", (e) => {
    e.waitUntil(
        (async () => {
            const cache = await caches.open(cacheName);
            console.log("[SERVICE WORKER]: Installing myTeardrop");
            await cache.addAll(appShellFiles);
        })(),
    );
});
self.addEventListener("fetch", (e) => {
    e.respondWith(
        (async ()=>{
            const r = await caches.match(e.request);
            //console.log(`[SERVICE WORKER]: Fetching resource ` + e.request.url);
            if (r) {
                return r;
            };
            const response = await fetch(e.request);
            const cache = await caches.open(cacheName);
            //console.log(`[SERVICE WORKER] Caching new resource: ` + e.request.url);
            cache.put(e.request, response.clone());
            return response;
        })(),
    );
});
/*self.addEventListener("activate", (e) => {
    e.waitUntil(
        caches.keys().then((keyList)=>{
            console.log(keyList);
            return Promise.all(
                keyList.map((key)=>{
                    if (key === cacheName) {
                        return;
                    }
                    return caches.delete(key);
                })
            )
        })
    )
});*/