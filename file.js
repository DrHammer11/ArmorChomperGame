if (!(window.innerWidth/window.innerHeight === 1440/732)) {
    var wc = document.getElementById("EverythingFitter")
    if (window.innerWidth < 1440) {
        wc.style.width = window.innerWidth
        wc.style.height = (window.innerWidth/(1440/732)).toString()+"px"
    }
}
function loadData(datakey) {
    var dataArray;
    if (localStorage.getItem(datakey) === null) {
        dataArray = null;
    }
    else {
        dataArray = JSON.parse(localStorage.getItem(datakey));
    }
    return dataArray;
}
function UpdateData(newdata, datakey) {
    localStorage.setItem(datakey, JSON.stringify(newdata));
}
wc = document.getElementById("EverythingFitter");
HighScore = loadData("HighScore");
if (HighScore == null) {
    HighScore = "No wave yet";
}
bt = document.getElementById("BonusText")
bt.innerHTML = "Highest wave you've reached: "+HighScore;
wc.style.width = window.innerWidth.toString()+"px";
wc.style.height = (window.innerWidth/(1440/732)).toString()+"px";
function sound(source) {
    this.sound = document.createElement("audio");
    this.sound.src = source;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.muted = false;
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
    this.reset = function(){
        this.sound.currentTime = 0;
    }
    this.loop = function(){
        this.sound.setAttribute("loop", "loop");
    }
}
function MusicFade(soundA,soundB) {
    if (document.getElementById("LoadSettings") != null) {
        document.getElementById("LoadSettings").remove();
    }
    document.getElementById("SettingsButton").onclick = function() {
        return;
    }
    fadetime = 250; 
    fadeframes = 50;
    soundB.sound.volume = 0;
    soundA.sound.volume = currentVolume;
    countAmount = currentVolume/fadeframes; 
    soundB.play();
    function slowfade() {
        soundA.sound.volume = soundA.sound.volume - countAmount;
        soundB.sound.volume = soundB.sound.volume + countAmount;
        if (soundA.sound.volume.toFixed(2) == countAmount.toFixed(2) && soundB.sound.volume.toFixed(2) == (currentVolume-countAmount).toFixed(2)) {
            document.getElementById("SettingsButton").onclick = LoadSettings;
            clearInterval(fade);
            soundA.sound.volume = 0;
            soundB.sound.volume = currentVolume;
            soundA.stop();
        }
    }
    var fade = setInterval(slowfade, fadetime/fadeframes);
}
function StopAllSounds() {
    for (s in SoundArray) {
        SoundArray[s].stop();
        SoundArray[s].reset();
        SoundArray[s].sound.volume = currentVolume;
    }
}
loss = new sound("Loss.mp3"); 
win = new sound("Win.mp3");
Ultwin = new sound("BossWin.mp3");
LogoSound = new sound("EvilLaugh.mp3");
FightSound = new sound("FightSounds.mp3"); 
ZombieTurnTheme = new sound("ZombieTheme.mp3");
PlantTurnTheme = new sound("PlantTheme.mp3");
MenuTheme = new sound("MenuTheme.mp3");
AlmanacTheme = new sound("AlmanacTheme.mp3");
CriticalTheme = new sound("CriticalTheme.mp3");
PerkTheme = new sound("PerkTheme.mp3");
MenuTheme.loop();
PlantTurnTheme.loop();
ZombieTurnTheme.loop();
CriticalTheme.loop();
AlmanacTheme.loop();
PerkTheme.loop();
CriticalStage = false;
IsBossWave = false;
TheBossWave = "";
SettingData = loadData("SettingData");
if (SettingData == null) {
    SettingData = [1,(1500-150)/18.5]
}
currentVolume = SettingData[0];
turntime = (18.5*SettingData[1])+150;
SoundArray = [loss, win, Ultwin, LogoSound, FightSound, ZombieTurnTheme, PlantTurnTheme, MenuTheme, AlmanacTheme, PerkTheme];
//*le fix it 
News = "Yoooo new update?? Epic epic cool (you've probably already noticed some of the new features)<br><br>\
New features:<br>\
A perks system! Now after you beat a boss wave, you get to choose a perk to equip. This perk will change your primary, gain you a new ability, or grant a buff to increase your overall strength so that you can survive even longer.<br>\
Epic cool backgrounds and colours to stimulate your brain via visual input.<br>\
Added an almanac! Now you can view the descriptions and abilities of all the plants and zombies in the game that you have encountered.<br>\
Peashooter is now Rock Pea.<br>\
Status effect graphics (Gooped, Frozen, etc.) now look different.<br>\
Squash Zombie has now been deleted and replaced with a new Zombotany Zombie.<br>\
There is now a Yeti Imp in the Wave of Imps boss wave.<br>\
Other stuff I forgot probably.<br>\
<br>\
Bug fixes:<br>\
Fixed bug where zombies wouldn’t use their ranged attack if they were within range of their melee attack.<br>\
Fixed bug where you could give yourself infinite health.<br>\
<br>\
Balance changes:<br>\
All of your abilities now have a 100% chance to hit, zombies can still miss though.<br>\
Cone Crabs can now duplicate sooner.<br>\
Coneoisseur’s melee attack is now stronger.<br>";
function RemoveBlocker() {
    wc.removeChild(document.getElementById("MenuBlocker"))
    wc.removeChild(document.getElementById("MenuLoader"))
    MenuTheme.sound.volume = currentVolume;
    MenuTheme.play();
}
function LoadInstructions() { 
    wc = document.getElementById("EverythingFitter");
    MessageContainer = document.createElement("div");
    wc.appendChild(MessageContainer);
    MessageContainer.className = "HTP";
    MessageContainer.style.display = "block";
    MessageContainer.id = "LoadGame";
    Message = document.createElement("div");
    Message.className = "Message";
    Message.style.width = "40%";
    MessageContainer.appendChild(Message);
    MessageText = document.createElement("p");
    MessageText.className = "MessageText";
    MessageText.innerHTML = "I guess I have to update this again.."; /*do*/
    Message.appendChild(MessageText);
    CloseButton = document.createElement("span");
    CloseButton.className= "close";
    CloseButton.innerHTML = "&times;"
    CloseButton.onclick = function() {
        document.getElementById("LoadGame").remove();
    }
    Message.appendChild(CloseButton);
    TrollFace = document.createElement("img"); 
    TrollFace.src = "Instructions.PNG";
    TrollFace.style.width = "100%";
    Message.appendChild(TrollFace);
}
function LoadNew() {
    wc = document.getElementById("EverythingFitter");
    MessageContainer = document.createElement("div");
    wc.appendChild(MessageContainer);
    MessageContainer.className = "HTP";
    MessageContainer.style.display = "block";
    MessageContainer.id = "LoadGame";
    Message = document.createElement("div");
    Message.className = "Message";
    Message.style.width = "55%";
    MessageContainer.appendChild(Message);
    CloseButton = document.createElement("span");
    CloseButton.className= "close";
    CloseButton.innerHTML = "&times;"
    CloseButton.onclick = function() {
        document.getElementById("LoadGame").remove();
    }
    Message.appendChild(CloseButton);
    MessageHeader = document.createElement("p");
    MessageHeader.className = "MessageHeader";
    MessageHeader.innerHTML = "What's new in Version 1.9.0";
    Message.appendChild(MessageHeader);
    MessageText = document.createElement("p");
    MessageText.className = "MessageText";
    MessageText.innerHTML = News;
    Message.appendChild(MessageText);
}
function LoadAlmanac() {
    BackToMenu();
    OpenDesc(false);
    wc = document.getElementById("EverythingFitter");
    MessageContainer = document.createElement("div");
    wc.appendChild(MessageContainer);
    MessageContainer.className = "Almanac"; 
    MessageContainer.style.display = "block";
    MessageContainer.id = "LoadAlmanac";
    Message = document.createElement("div");
    Message.className = "AlmanacMessage";
    Message.style.width = "60%";
    MessageContainer.appendChild(Message);
    CloseButton = document.createElement("span");
    CloseButton.className= "close";
    CloseButton.innerHTML = "&times;";
    CloseButton.onclick = function() {
        document.getElementById("OpenDesc").remove(); 
        document.getElementById("LoadAlmanac").remove();
        StopAllSounds();
        MenuTheme.play();
    }
    Message.appendChild(CloseButton);
    MessageHeader = document.createElement("p");
    MessageHeader.className = "MessageHeader";
    MessageHeader.innerHTML = "Suburban Almanac";
    MessageHeader.style.left = "30%";
    Message.appendChild(MessageHeader);
    MessageText = document.createElement("p");
    MessageText.className = "MessageHeader";
    MessageText.innerHTML = "PLANTS<br><br><br><br><br><br>";
    Message.appendChild(MessageText);
    ColumnCount = 5;
    DownCounter = 1;
    for (p in plantArray) {
        if (p%ColumnCount == 0) {
            DownCounter += 1; 
        }
        MessageImage = document.createElement("img");
        MessageImage.className = "PlantAlmanac";
        MessageImage.src = "Lawn.PNG";
        MessageImage.id = plantArray[p].name;
        MessageImage.onclick = OpenDesc;
        MessageImage.style.top = (DownCounter*13).toString()+"%";
        MessageImage.style.left = ((p%ColumnCount*12)+2).toString()+"%";
        Message.appendChild(MessageImage);

        MessageImage = document.createElement("img");
        MessageImage.className = "PlantImgAlmanac";
        MessageImage.src = plantArray[p].aliveSprite;
        MessageImage.style.top = ((DownCounter*13)+9-(parseInt(plantArray[p].height)/3)).toString()+"%";
        MessageImage.style.left = ((p%ColumnCount*12)+4-(plantArray[p].wb-1)*4).toString()+"%";
        MessageImage.style.height = (parseInt(plantArray[p].height)/1.55).toString()+"%";
        Message.appendChild(MessageImage);

        MessageImage = document.createElement("img");
        MessageImage.className = "AlmanacFrame";
        MessageImage.src = "AlmanacFrame.PNG";
        MessageImage.style.top = ((DownCounter*13)-4.6).toString()+"%";
        MessageImage.style.left = ((p%ColumnCount*12)-0.2).toString()+"%";
        Message.appendChild(MessageImage)
    }
    DownCounter = 1.5;
    foundZombies = loadData("foundZombies");
    if (foundZombies == null) {
        foundZombies = []
        UpdateData(foundZombies,"foundZombies");
    }
    displayedZombies = [];
    for (z in unlockableZombies) {
        if (foundZombies.includes(unlockableZombies[z].name)) {
            displayedZombies.push(unlockableZombies[z]);
        }
    } 
    MessageText = document.createElement("p");
    MessageText.className = "MessageHeader";
    MessageText.innerHTML = "ZOMBIES (you've found "+displayedZombies.length+"/"+unlockableZombies.length+" zombies)";
    Message.appendChild(MessageText);
    for (z in unlockableZombies) {
        if (z%ColumnCount == 0) {
            DownCounter += 1;
        }
        MessageImage = document.createElement("img");
        MessageImage.className = "ZombAlmanac";
        MessageImage.src = "DarkLawn.PNG"; 
        if (displayedZombies.includes(unlockableZombies[z])) { 
            MessageImage.id = unlockableZombies[z].name;
        }
        else {
            MessageImage.id = "Mystery Zombie";
        }
        MessageImage.onclick = OpenDesc;
        MessageImage.style.top = (DownCounter*25).toString()+"%";
        MessageImage.style.left = ((z%ColumnCount*12)+2).toString()+"%";
        Message.appendChild(MessageImage)

        MessageImage = document.createElement("img");
        MessageImage.className = "ZombImgAlmanac";
        if (displayedZombies.includes(unlockableZombies[z])) {
            MessageImage.src = unlockableZombies[z].aliveSprite;
        }
        else {
            MessageImage.src = "MysteryZombie.PNG";
        }
        MessageImage.style.top = ((DownCounter*25)+9-(parseInt(unlockableZombies[z].height)/4.2)).toString()+"%";
        MessageImage.style.left = ((z%ColumnCount*12)+4-(unlockableZombies[z].wb-1)*4).toString()+"%";
        MessageImage.style.height = (parseInt(unlockableZombies[z].height)/1.75).toString()+"%";
        Message.appendChild(MessageImage);

        MessageImage = document.createElement("img");
        MessageImage.className = "AlmanacFrame";
        MessageImage.src = "AlmanacFrame.PNG"; 
        MessageImage.style.top = ((DownCounter*25)-4.6).toString()+"%";
        MessageImage.style.left = ((z%ColumnCount*12)-0.2).toString()+"%";
        Message.appendChild(MessageImage)
    }
    Message.style.minHeight = (240+DownCounter*170).toString()+"px"; 
    StopAllSounds();
    AlmanacTheme.reset();
    AlmanacTheme.play();
}
function OpenDesc(rp=true) {
    if (rp) {
        document.getElementById("OpenDesc").remove(); 
    }
    wc = document.getElementById("EverythingFitter");
    MessageContainer = document.createElement("div");
    wc.appendChild(MessageContainer);
    MessageContainer.className = "AlmanacDesc";
    MessageContainer.style.display = "block";
    MessageContainer.id = "OpenDesc";
    Message = document.createElement("div");
    Message.className = "AlmanacDescMessage";
    Message.style.width = "20%";
    Message.style.left = "80%";
    MessageContainer.appendChild(Message);
    if (rp) {
        ae = findEntry(event.target.id);
        MessageImage = document.createElement("img");
        MessageImage.src = ae.image; 
        MessageImage.style.height = "350px";
        MessageImage.style.class = "center";
        Message.appendChild(MessageImage)
        MessageText = document.createElement("p");
        MessageText.className = "MessageText";
        MessageText.innerHTML = ae.name;
        Message.appendChild(MessageText);
        MessageText = document.createElement("p");
        MessageText.className = "MessageText";
        MessageText.innerHTML = ae.desc;
        Message.appendChild(MessageText);
        MessageText = document.createElement("p");
        MessageText.className = "MessageText";
        MessageText.innerHTML = ae.stats;
        Message.appendChild(MessageText);
        MessageText = document.createElement("p");
        MessageText.className = "MessageText";
        MessageText.innerHTML = ae.flavour;
        Message.appendChild(MessageText);
    }
    else {
        MessageText = document.createElement("p");
        MessageText.className = "MessageText";
        MessageText.innerHTML = "Click a Plant or a Zombie to view it's almanac entry!";
        Message.appendChild(MessageText);
    }
}
function LoadSettings() {
    SettingData = loadData("SettingData");
    if (SettingData == null) {
        SettingData = [currentVolume,(turntime-150)/18.5]
    }
    wc = document.getElementById("EverythingFitter");
    MessageContainer = document.createElement("div");
    wc.appendChild(MessageContainer);
    MessageContainer.className = "HTP";
    MessageContainer.style.display = "block";
    MessageContainer.id = "LoadSettings";
    Message = document.createElement("div");
    Message.className = "Message";
    Message.style.width = "40%";
    MessageContainer.appendChild(Message);
    CloseButton = document.createElement("span");
    CloseButton.className= "close";
    CloseButton.innerHTML = "&times;"
    CloseButton.onclick = function() {
        document.getElementById("LoadSettings").remove(); 
        currentVolume = VolumeSlider.value/100;
        turntime = (18.5*TurnSlider.value)+150;
        UpdateData([currentVolume,(turntime-150)/18.5],"SettingData")
    }
    Message.appendChild(CloseButton);
    MessageText = document.createElement("p");
    MessageText.className = "MessageText";
    MessageText.innerHTML = "Music Volume<br>";
    Message.appendChild(MessageText);
    VolumeSlider = document.createElement("input"); 
    VolumeSlider.className = "slider";
    VolumeSlider.type = "range";
    VolumeSlider.value = SettingData[0]*100;
    Message.appendChild(VolumeSlider);
    VolumeSlider.oninput = function() {
        currentVolume = this.value/100;
        for (theme in SoundArray) {
            theme = SoundArray[theme];
            theme.sound.volume = currentVolume;
        }
    }
    MessageText = document.createElement("p");
    MessageText.className = "MessageText";
    MessageText.innerHTML = "<br>Zombie's Turn Time (Use this to make the game faster or slower)<br>";
    Message.appendChild(MessageText);
    TurnSlider = document.createElement("input");
    TurnSlider.className = "slider";
    TurnSlider.type = "range";
    TurnSlider.value = SettingData[1]; //150 turntime to 2000 turntime
    Message.appendChild(TurnSlider);
    TurnSlider.oninput = function() {
        turntime = (18.5*TurnSlider.value)+150;
    }
    BTM = document.createElement("button");
    BTM.className = "MessageButton";
    BTM.innerHTML = "Back to Menu";
    BTM.onclick = function() {
        currentVolume = VolumeSlider.value/100;
        turntime = (18.5*TurnSlider.value)+150;
        UpdateData([currentVolume,(turntime-150)/18.5],"SettingData")
        BackToMenu();
    }
    Message.appendChild(BTM);
}
function BackToMenu() {
    HighScore = loadData("HighScore");
    if (HighScore == null) {
        HighScore = "No wave yet";
    }
    StopAllSounds();
    MenuTheme.play();
    IsPlayerTurn = false;
    CanMove = false;
    CriticalStage = false;
    IsBossWave = false;
    TheBossWave = "";
    wc = document.getElementById("EverythingFitter");
    wc.innerHTML = '';
    MenuBackground = document.createElement("img"); 
    MenuBackground.src = "MenuBackground.PNG"
    MenuBackground.style.width = "100%";
    MenuBackground.style.zIndex = -5483;
    MenuBackground.style.position = "absolute";
    wc.appendChild(MenuBackground);
    vc = document.createElement("div");
    vc.id="VersionCount";
    vc.innerHTML="Beta Version 1.9.0";
    wc.appendChild(vc);
    tc = document.createElement("div");
    tc.id="TitleContainer";
    wc.appendChild(tc);
    t = document.createElement("header");
    t.id="title";
    t.innerHTML="ARMOR CHOMPER (AND CO)'S ZOMBIE ADVENTURE!";
    tc.appendChild(t);
    lc = document.createElement("p");
    lc.innerHTML="Highest wave you've reached: "+HighScore;
    lc.id="BonusText";
    wc.appendChild(lc);
    acl = document.createElement("img")
    acl.src = "PlantLeft.PNG"; 
    acl.id="PlantLeft"
    wc.appendChild(acl);
    acr = document.createElement("img")
    acr.src = "PlantRight.PNG";
    acr.id="PlantRight"
    wc.appendChild(acr);
    sb = document.createElement("button");
    sb.id="start-button";
    sb.innerHTML="Start New Game";
    sb.onclick=function() {ChoosePlant()};
    wc.appendChild(sb);
    lb = document.createElement("button");
    lb.id="load-button";
    lb.innerHTML="Load Game";
    lb.onclick=function() {LoadGame()};
    wc.appendChild(lb);
    htp = document.createElement("button");
    htp.id="how-to-play";
    htp.innerHTML="How to play";
    htp.onclick=function() {LoadInstructions()};
    wc.appendChild(htp);
    htp = document.createElement("button");
    htp.id="almanac-button";
    htp.innerHTML="Almanac";
    htp.onclick=function() {LoadAlmanac()};
    wc.appendChild(htp);
    ln = document.createElement("button");
    ln.id="load-new";
    ln.innerHTML="What's New";
    ln.onclick=function() {LoadNew()};
    wc.appendChild(ln);
    vs = document.createElement("button");
    vs.id="settings";
    vs.innerHTML="Settings";
    vs.onclick=function() {LoadSettings()};
    wc.appendChild(vs);
}
function ChoosePlant() {
    wc = document.getElementById("EverythingFitter");
    MessageContainer = document.createElement("div");
    wc.appendChild(MessageContainer);
    MessageContainer.className = "HTP";
    MessageContainer.style.display = "block";
    MessageContainer.id = "ChoosePlant";
    Message = document.createElement("div");
    Message.className = "Message";
    Message.style.width = "40%";
    MessageContainer.appendChild(Message);
    CloseButton = document.createElement("span");
    CloseButton.className= "close";
    CloseButton.innerHTML = "&times;"
    CloseButton.onclick = function() {
        document.getElementById("ChoosePlant").remove(); 
    }
    Message.appendChild(CloseButton);
    MessageText = document.createElement("p");
    MessageText.className = "MessageText";
    MessageText.innerHTML = "Choose your character for this game!";
    Message.appendChild(MessageText);
    for (plant in plantArray) {
        plant = plantArray[plant];
        MessageImage = document.createElement("img");
        MessageImage.id = plant.name;
        MessageImage.src = plant.aliveSprite;
        MessageImage.onclick = function(event) {
            for (p in plantArray) {
                if (event.target.id === plantArray[p].name) {
                    currentPlant = plantArray[p];
                    StartGame();
                }
            }
        }
        MessageImage.onmouseover = function(event) {
            for (p in plantArray) {
                if (event.target.id === plantArray[p].name) {
                    event.target.src = "Chosen"+plantArray[p].aliveSprite;
                }
            }
        }
        MessageImage.onmouseout = function(event) {
            for (p in plantArray) {
                if (event.target.id === plantArray[p].name) {
                    event.target.src = plantArray[p].aliveSprite;
                }
            }
        }
        Message.appendChild(MessageImage);
        MessageImage.style.width = "25%";
    }
}
function StartGame() { 
    for (theme in SoundArray) {
        theme = SoundArray[theme];
        theme.sound.volume = currentVolume;
    }
    MenuTheme.stop();
    wc = document.getElementById("EverythingFitter")
    wc.innerHTML = '';
    pl = document.createElement("img")
    pl.src = currentPlant.aliveSprite;
    pl.id="currentPlant";
    pl.className="Fighter";
    wc.appendChild(pl);
    turnc = document.createElement("header");
    turnc.id="TurnCounter";
    wc.appendChild(turnc);
    tc = document.createElement("div");
    tc.id="AttackContainer";
    wc.appendChild(tc);
    t = document.createElement("header");
    t.id="AttackLabel";
    t.innerHTML="Attacks:";
    tc.appendChild(t);
    ab = document.createElement("div");
    ab.id="AbilityButtons";
    wc.appendChild(ab);
    et = document.createElement("button");
    et.className="AbilityButton";
    et.id="EndTurn";
    et.innerHTML="End Turn";
    ab.appendChild(et);
    ha = document.createElement("div");
    ha.id="HealthArea";
    wc.appendChild(ha);
    hi = document.createElement("img");
    hi.src="HealthIcon1.PNG";
    hi.id="HealthIcon";
    ha.appendChild(hi);
    ham = document.createElement("p");
    ham.innerHTML=currentPlant.health.toString();
    ham.id="HealthAmount";
    ha.appendChild(ham);
    lc = document.createElement("p");
    lc.innerHTML="Wave 1";
    lc.id="LevelCount";
    wc.appendChild(lc);
    sb = document.createElement("button");
    sb.id="SettingsButton";
    sb.innerHTML="Settings";
    sb.onclick=function() {LoadSettings()};
    wc.appendChild(sb);
    ctc = document.createElement("div");
    ctc.id="ConsoleTextContainer";
    wc.appendChild(ctc);
    ctb = document.createElement("button");
    ctb.id="ConsoleTextButton";
    ctb.innerHTML="View Console History";
    ctb.onclick=function(){ViewConsoleHistory()};
    vp = document.createElement("button");
    vp.id="ViewPerks";
    vp.innerHTML="View Current Perks";
    vp.onclick=function(){ViewPerks()}; 
    wc.appendChild(vp);
    consolemessages = [];
    ConsoleHistory = [];
    cps = document.getElementById("currentPlant");
    wc.style.width = window.innerWidth.toString()+"px";
    wc.style.height = (window.innerWidth/(1440/732)).toString()+"px";
    turnbutton = document.getElementById("EndTurn");
    turncounter = document.getElementById("TurnCounter");
    abilitybuttons = document.getElementById("AbilityButtons");
    planthealth = document.getElementById("HealthAmount");
    for (a in currentPlant.attacks) {
        currentPlant.attacks[a].TimeUntilReady = 0;
        atak = currentPlant.attacks[a];
        attackbutton = document.createElement("button");
        attackbutton.className = "AbilityButton";
        attackbutton.innerHTML = atak.name;
        attackbutton.id = atak.name;
        abilitybuttons.appendChild(attackbutton);
        attackbutton.onclick = function(event) {
            for (a in currentPlant.attacks) {
                if (event.target.id == currentPlant.attacks[a].name) {
                    attack = currentPlant.attacks[a];
                }
            }
            currentProjectile = attack;
            CD = 0;
            CreateModal((attack.name+"Info"),attack.name,attack.desc,attack.displaySprite,[["Use",FireProjectile],["Rotate Attack",SwitchAD]]);
            for (is in phygriditems) {
                phygriditems[is].remove();
            }
            phygriditems = [];
            griditemarray = [];
            currentx = 0;
            currenty = 0;
            fighterPhysArray[fighterArray.indexOf(currentPlant)].style.transform = "scaleX(1)";
            for (i = 0; i < gridx*gridy; i++) {
                currentx += 1;
                ItemSprite = document.createElement("img");
                newgi = new griditem();
                newgi.codx = currentx;
                newgi.cody = currenty;
                newgi.sprite = "BlankTile.PNG"
                griditemarray.push(newgi);
                ItemSprite.src = "BlankTile.PNG";
                wc.appendChild(ItemSprite);
                ItemSprite.style.position = "absolute";
                ItemSprite.className = "gridTile";
                ItemSprite.onclick = tryToMove;
                ItemSprite.style.height = (8*gridsize).toString()+"%";
                ItemSprite.style.top = (gridsize*(12+(currenty)*8)).toString()+"%";
                ItemSprite.style.left = (window.innerWidth*((gridsize*currentx)+gridy/(gridsize*2)-currenty*gridsize*0.7)*(1/18)).toString()+"px"
                for (f in fighterArray) {
                    fighter = fighterArray[f];
                    if (currentx === fighter.coords[0] && currenty === fighter.coords[1] && fighter.plant) {
                        newgi.sprite = "GreenTile.PNG"
                        newgi.character = fighter;
                        ItemSprite.src = "GreenTile.PNG";
                    }
                    if (currentx === fighter.coords[0] && currenty === fighter.coords[1] && !(fighter.plant)) {
                        newgi.sprite = "PurpleTile.PNG"
                        newgi.character = fighter;
                        ItemSprite.src = "PurpleTile.PNG";
                    }
                }
                if((currentPlant.coords[0]+1 <= currentx && currentx <= currentPlant.coords[0]+attack.range) && currenty === currentPlant.coords[1]) {
                    if (newgi.sprite == "PurpleTile.PNG") {
                        newgi.sprite = "RedTile.PNG";
                        ItemSprite.src = "RedTile.PNG";
                    }
                    else {
                        newgi.sprite = "BlueTile.PNG";
                        ItemSprite.src = "BlueTile.PNG"; 
                    }
                }
                phygriditems.push(ItemSprite);
                if (currentx%gridx == 0) {
                    currenty += 1;
                    currentx = 0;
                }
            }
        }
    }
    turnbutton.onclick = function() {
        turncounter.innerHTML = "Zombie's Turn";
        abilitybuttons.style.display = "none";
        IsPlayerTurn = false;
        CanMove = false;
        if (!(CriticalStage) && !(IsBossWave)) {
            ZombieTurnTheme.sound.currentTime = PlantTurnTheme.sound.currentTime;
            MusicFade(PlantTurnTheme,ZombieTurnTheme);
        }
        CreateConsoleText(currentPlant.name+" has ended their turn.")
        ConsoleHistory.push("~ Zombie's Turn ~");
        for (attack in currentPlant.attacks) {
            attack = currentPlant.attacks[attack];
            if (attack.TimeUntilReady > 0) {
                attack.TimeUntilReady -= 1; 
            }
        }
        ZombieArray = SortZArray();
        ZombieTurn(0);
    }
    fighterPhysArray = [cps];
    tz = Browncoat;
    fighterArray = [currentPlant, tz];
    ZombieArray = [tz];
    tz.coords = [7,2];
    zhealtharray = [];
    zhealthbararray = [];
    currentPlant.coords = [2,2];
    difficultylevel = 1;
    StopTurn = false;
    planthealth.innerHTML = Object.assign(currentPlant.permhealth);
    currentPlant.health = Object.assign(currentPlant.permhealth);
    for (z in ZombieArray) {
        ZombieArray[z].health = 50;
        prevzposes.push(ZombieArray[z].coords);
        CanZAbility.push(true);
        var zombi = document.createElement("img");
        zombi.className = "Fighter";
        zombi.style.height = ZombieArray[z].height;
        zombi.src = ZombieArray[z].aliveSprite;
        wc.appendChild(zombi);
        fighterPhysArray.push(zombi);
        zombi.style.transform = "scaleX(1)";
        var zhealth = document.createElement("p")
        var zhealthbar = document.createElement("img")
        if (ZombieArray[z].underShield != "") {
            zhealthbar.src = "ArmorHeartIcon.PNG";
            zhealthbar.id = "Armor";
        }
        else {
            zhealthbar.src = "HeartIcon.PNG";
            zhealthbar.id = "Heart";
        }
        zhealthbar.style.position = "absolute";
        zhealthbar.style.width = "4%";
        zhealthbar.style.zIndex = 9001;
        wc.appendChild(zhealthbar);
        zhealth.style.position = "absolute";
        zhealth.style.fontFamily =  'Marker Felt';
        zhealth.style.fontSize = "1.7vw";
        zhealth.style.zIndex = 9002;
        wc.appendChild(zhealth)
        zhealtharray.push(zhealth);
        zhealthbararray.push(zhealthbar);
    }
    fighterPhysArray[fighterArray.indexOf(tz)].style.transform = "scaleX(1)";
    IsPlayerTurn = true;
    ConsoleHistory.push("~ Plant's Turn ~");
    CanMove = true; /*make modifyable amount of moves and abilities*/
    CanAbility = [true, true];
    ResetPerks();
    UpdateTurnCount();
    updatebackground();
    updategrid();
    PlantTurnTheme.play();
}
function randomint(start, end) {
    end = end + 0.5
    start = start - 0.5
    var randomnum = (Math.random() * end);
    while (randomnum < start) {
        var randomnum = (Math.random() * end);  
    }
    return Math.round(randomnum);
}
function CreateModal(modalID,modalheader,modaltext,modalimage,modalbuttons) { //first one is necessary, other 3 are optional to not have them use ""
        MessageContainer = document.createElement("div");
        wc.appendChild(MessageContainer);
        MessageContainer.className = "MessageContainer";
        MessageContainer.style.display = "block";
        MessageContainer.id = "atakmodal";
        Message = document.createElement("div");
        Message.className = "Message";
        Message.style.width = "30%";
        MessageContainer.appendChild(Message);
        SpecialButton = document.createElement("span");
        SpecialButton.className= "close";
        SpecialButton.innerHTML = "&times;"
        if (CanMove) {
            SpecialButton.onclick = function() {
                CanMove = true;
                updategrid();
                UpdateTurnCount();
                document.getElementById("atakmodal").remove();
            }
        }
        else {
            SpecialButton.onclick = function() {
                updategrid();
                document.getElementById("atakmodal").remove();
            }
        }
        CanMove = false;
        Message.appendChild(SpecialButton);
        MessageImage = document.createElement("img");
        MessageImage.src = modalimage;
        Message.appendChild(MessageImage);
        MessageImage.style.width = "25%";
        MessageImage.style.float = "right"; 
        MessageHeader = document.createElement("p");
        MessageHeader.className = "MessageHeader";
        MessageHeader.style.display = "inline";
        MessageHeader.innerHTML = modalheader;
        Message.appendChild(MessageHeader); 
        for (b in modalbuttons) {
            if (currentProjectile.TimeUntilReady > 0 && modalbuttons[b][0] == "Use") {
                MessageText = document.createElement("p");
                MessageText.className = "MessageText";
                MessageText.style.display = "block";
                if (currentProjectile.TimeUntilReady == currentProjectile.reloadTime+1) {
                    MessageText.innerHTML = "You've just used this ability.";
                }
                else {
                    MessageText.innerHTML = "This ability will be ready in "+currentProjectile.TimeUntilReady+" turn(s).";
                }
                Message.appendChild(MessageText);
            }
            else {
                MessageButton = document.createElement("button");
                MessageButton.innerHTML = modalbuttons[b][0];
                MessageButton.style.display = "block";
                MessageButton.className = "MessageButton";
                MessageButton.onclick = modalbuttons[b][1];
                Message.appendChild(MessageButton);
            }
        }
        MessageText = document.createElement("p");
        MessageText.className = "MessageText";
        MessageText.innerHTML = modaltext;
        Message.appendChild(MessageText);
}
function RemoveZombie(zombie) {
    wc.removeChild((fighterPhysArray[fighterArray.indexOf(zombie)]));
    fighterPhysArray.splice(fighterArray.indexOf(zombie), 1);
    fighterArray.splice(fighterArray.indexOf(zombie), 1);
    zhealtharray[ZombieArray.indexOf(zombie)].remove();
    zhealtharray.splice(ZombieArray.indexOf(zombie), 1);
    zhealthbararray[ZombieArray.indexOf(zombie)].remove();
    zhealthbararray.splice(ZombieArray.indexOf(zombie), 1);
    ZombieArray.splice(ZombieArray.indexOf(zombie), 1);
    if (zombie.underShield != "") {
        USZ = zombie.underShield;
        USZ.health = USZ.permhealth;
        CreateConsoleText(zombie.name+" has left behind "+USZ.name+".");
        USZ.coords = zombie.coords;
        ZombieArray.push(USZ);
        for (attack in USZ.attacks) {
            USZ.attacks[attack].TimeUntilReady = USZ.attacks[attack].STUP;
        }
        for (support in USZ.supports) {
            USZ.supports[support].TimeUntilReady = USZ.supports[support].STUP;
        }
        prevzposes.push(USZ.coords)
        CanZAbility.push(true);
        var zombi = document.createElement("img");
        zombi.className = "Fighter";
        zombi.style.height = USZ.height;
        zombi.src = USZ.aliveSprite;
        wc.appendChild(zombi);
        fighterPhysArray.push(zombi);
        zombi.style.transform = "scaleX(1)";
        var zhealth = document.createElement("p")
        var zhealthbar = document.createElement("img")
        if (USZ.underShield != "") {
            zhealthbar.src = "ArmorHeartIcon.PNG";
        }
        else {
            zhealthbar.src = "HeartIcon.PNG";
        }
        zhealthbar.style.position = "absolute";
        zhealthbar.style.width = "4%";
        zhealthbar.style.zIndex = 9001;
        wc.appendChild(zhealthbar);
        zhealth.style.position = "absolute";
        zhealth.style.fontFamily =  'Marker Felt';
        zhealth.style.fontSize = "1.7vw";
        zhealth.style.zIndex = 9002;
        wc.appendChild(zhealth)
        zhealtharray.push(zhealth);
        zhealthbararray.push(zhealthbar);
        fighterArray.push(USZ);
        CheckZindexes();
    }
    foundZombies = loadData("foundZombies");
    if (foundZombies == null) {
        foundZombies = []
        UpdateData(foundZombies,"foundZombies");
    }
    if (!(foundZombies.includes(zombie.name))) {
        foundZombies.push(zombie.name); 
        UpdateData(foundZombies,"foundZombies");
    }
}
function DoDamage(zombie, damageprojectile) {
    zombiedead = false;
    if (damageprojectile.name == Swallow.name) {
        if (zombie.canBeEaten) {
            CanAbility = [false,false];
            zombiedead = true;
            UpdateTurnCount();
            CreateConsoleText("Armor Chomper has ate "+zombie.name+".");
            currentPlant.chewing = true;
            currentPlant.chewingtime = zombie.chewingtime+1;
            fighterPhysArray[fighterArray.indexOf(currentPlant)].src = "chewy.gif";
            currentPlant.allergy = zombie.allergy;
            RemoveZombie(zombie);
            if (!(CheckForWin())) {
                CreateConsoleText("Armor Chomper will be chewing for "+(currentPlant.chewingtime-1)+" turn(s).");
            }
        }
        else {
            CreateConsoleText("Armor Chomper is unable to eat "+zombie.name+"s.");
            if (!CanAbility[0]) {
                CanAbility[0] = true;
            }
            else if (!CanAbility[1]) {
                CanAbility[1] = true;
            }
        }
    }
    else {
        CreateConsoleText(currentPlant.name+" has hit "+zombie.name+" for "+ Math.round(damageprojectile.damage*currentPlant.dmgmult)+" damage.",true);
        zombie.health -= Math.round(damageprojectile.damage*currentPlant.dmgmult);
        UpdatePassivePerks("everyattack",Math.round(damageprojectile.damage*currentPlant.dmgmult));
        if (zombie.health <= 0) {
            CreateConsoleText(currentPlant.name+" has vanquished "+zombie.name+".") 
            RemoveZombie(zombie);
            zombiedead = true;
            CheckForWin();
        }
        else if (Math.random()*100 < damageprojectile.effectChance) {
            ApplyEffects(currentPlant,zombie,damageprojectile,true);
        }
        if (damageprojectile.splashRadius != 0) {
            zombiecoords = [];
            for (z in ZombieArray) {
                zombiecoords.push(ZombieArray[z].coords);
            }
            for (x = -(damageprojectile.splashRadius-1)/2; x <= (damageprojectile.splashRadius-1)/2; x++) {
                for (y = -(damageprojectile.splashRadius-1)/2; y <= (damageprojectile.splashRadius-1)/2; y++) {
                    if (!(x == 0 && y == 0)) {
                        for (z in ZombieArray) {
                            if (ZombieArray[z].coords[0] == zombie.coords[0]+x && ZombieArray[z].coords[1] == zombie.coords[1]+y) {
                                CreateConsoleText(currentPlant.name+" has hit "+ZombieArray[z].name+" for "+Math.round(damageprojectile.splashDamage*currentPlant.dmgmult)+" splash damage.");
                                ZombieArray[z].health -= Math.round(damageprojectile.splashDamage*currentPlant.dmgmult);
                                UpdatePassivePerks("everyattack",Math.round(damageprojectile.splashDamage*currentPlant.dmgmult));
                                if (ZombieArray[z].health <= 0) {
                                    CreateConsoleText(currentPlant.name+" has vanquished "+ZombieArray[z].name+".")
                                    RemoveZombie(ZombieArray[z]);
                                    zombiedead = true;
                                    CheckForWin();
                                    break;
                                }
                                else if (Math.random()*100 < damageprojectile.effectChance) {
                                    ApplyEffects(currentPlant,ZombieArray[z],damageprojectile,false);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    if (zombiedead) {
        zombie = "";
    }
    return zombiedead;
}
function FireProjectile() { 
    willhit = false;
    for (g in griditemarray) {
        if (griditemarray[g].sprite == "RedTile.PNG") {
            willhit = true;
        }
    }
    if (!(CanAbility[0]) && !(CanAbility[1])) {
        CreateConsoleText("You cannot use any more abilities this turn.",false,false);
    }
    else if (currentProjectile.TimeUntilReady > 0) {
        if (currentProjectile.TimeUntilReady == currentProjectile.reloadTime+1) {
            CreateConsoleText("This ability will be ready in "+(parseInt(currentProjectile.TimeUntilReady)-1)+" turn(s).",false,false); 
        }
        else {
            CreateConsoleText("This ability will be ready in "+currentProjectile.TimeUntilReady+" turn(s).",false,false); 
        }
    }
    else if (!(willhit)) {
        CreateConsoleText(currentPlant.name+" did not use this ability, because there are no zombies in range.",false,false);
    }
    else {
        CreateConsoleText(currentPlant.name+" has used "+currentProjectile.name+".");
        currentProjectile.TimeUntilReady = currentProjectile.reloadTime+1; 
        currentProjectile.shotsLeft = currentProjectile.shots;
        missedshots = 0;
        for (shot = 0; shot < currentProjectile.shots; shot++) {
            if (Math.random()*100 > currentProjectile.accuracy) {
                missedshots += 1;
                currentProjectile.shotsLeft -= 1;
                if (currentProjectile.shots == 1) {
                    CreateConsoleText(currentPlant.name+" has missed.");
                }
            }
        }
        // if (currentProjectile.shots > 1) {
        //     CreateConsoleText(currentPlant.name+" has missed "+missedshots+" out of their "+currentProjectile.shots+" shots.");
        // }
        if (CanAbility[0]) {
            CanAbility[0] = false;
        }
        else if (CanAbility[1]) {
            CanAbility[1] = false;
        }
        g =0;
        redtiles = [];
        while (g <= griditemarray.length-1) {
            if (CD == 0 || CD == 1) {
                gi = griditemarray[g];
            }
            if (CD == 2 || CD == 3) {
                gi = griditemarray[griditemarray.length-1-g];
            }
            if (gi.sprite == "RedTile.PNG") {
                redtiles.push(gi);
            }
            g++
        }
        for (shot = 0; shot < (currentProjectile.shots-missedshots); shot++) {
            if (currentProjectile.shotsLeft == 0) {
                break;
            }
            currentProjectile.shotsLeft -= 1;
            if (currentProjectile.pierces) {
                for (rt in redtiles) {
                    DoDamage(redtiles[rt].character,currentProjectile)
                }
                updatecharactergrid();
            }
            else {
                US = redtiles[0].character.underShield;
                if (DoDamage(redtiles[0].character,currentProjectile)) { 
                    updatecharactergrid();
                    if (US == "") {
                        redtiles.shift();
                    }
                    if (redtiles.length == 0) {
                        break;
                    }
                }
            }
        }
        updategrid();
        UpdateTurnCount();
    }
    SpecialButton.click();     
}
function SaveGame() {
    //what to save: 
    //Armor chompers' ability cooldown times
    //Armor Chomper's coordinates
    //Armor chomper's health
    //whether chomper is frozen or not
    //whether chomper is chewing or not
    cooldowns = [];
    for (attack in currentPlant.attacks) {
        cooldowns.push(currentPlant.attacks[attack].TimeUntilReady);
    }
    UpdateData([cooldowns, currentPlant.coords, currentPlant.health, currentPlant.understatus, currentPlant.chewingtime, currentPlant, currentPlant.perks],"PlantData");

    //what zombies there are
    //coordinates of said zombies
    //health of zombies
    //zombie ability cooldown times
    //whethre zombies is goop
    UpdateData([ZombieArray, CanZAbility],"ZombieData");

    //what wave you're on
    //posititon in the music
    //crtiical theme or not
    //boss wave or not
    //console messages
    UpdateData([difficultylevel, PlantTurnTheme.sound.currentTime, CriticalStage, TheBossWave, ConsoleHistory],"MiscData");
}
function LoadGame() {
    PlantData = loadData("PlantData");
    ZombieData = loadData("ZombieData");
    MiscData = loadData("MiscData");
    if (PlantData === null) {
        wc = document.getElementById("EverythingFitter");
        MessageContainer = document.createElement("div");
        wc.appendChild(MessageContainer);
        MessageContainer.className = "HTP";
        MessageContainer.style.display = "block";
        MessageContainer.id = "NoGame";
        Message = document.createElement("div");
        Message.className = "Message";
        Message.style.width = "55%";
        MessageContainer.appendChild(Message);
        CloseButton = document.createElement("span");
        CloseButton.className= "close";
        CloseButton.innerHTML = "&times;"
        CloseButton.onclick = function() {
            document.getElementById("NoGame").remove();
        }
        Message.appendChild(CloseButton);
        MessageHeader = document.createElement("p");
        MessageHeader.className = "MessageHeader";
        MessageHeader.innerHTML = "Oh No!";
        Message.appendChild(MessageHeader);
        MessageText = document.createElement("p");
        MessageText.className = "MessageText";
        MessageText.innerHTML = "There is no game to load.";
        Message.appendChild(MessageText);
        return
    }
    currentPlant = PlantData[5];
    currentPlant.perks = PlantData[6];
    UpdatePassivePerks("onetime");
    StopAllSounds();
    wc = document.getElementById("EverythingFitter")
    wc.innerHTML = '';
    ac = document.createElement("img")
    pl = document.createElement("img")
    pl.src = currentPlant.aliveSprite;
    pl.id="currentPlant";
    pl.className="Fighter";
    wc.appendChild(pl);
    turnc = document.createElement("header");
    turnc.id="TurnCounter";
    wc.appendChild(turnc);
    tc = document.createElement("div");
    tc.id="AttackContainer";
    wc.appendChild(tc);
    t = document.createElement("header");
    t.id="AttackLabel";
    t.innerHTML="Attacks:";
    tc.appendChild(t);
    ab = document.createElement("div");
    ab.id="AbilityButtons";
    wc.appendChild(ab);
    et = document.createElement("button");
    et.className="AbilityButton";
    et.id="EndTurn";
    et.innerHTML="End Turn";
    ab.appendChild(et);
    ha = document.createElement("div");
    ha.id="HealthArea";
    wc.appendChild(ha);
    hi = document.createElement("img");
    hi.src="HealthIcon1.PNG";
    hi.id="HealthIcon";
    ha.appendChild(hi);
    ham = document.createElement("p");
    ham.innerHTML=currentPlant.health.toString();
    ham.id="HealthAmount";
    ha.appendChild(ham);
    lc = document.createElement("p");
    lc.innerHTML="Wave 1";
    lc.id="LevelCount";
    wc.appendChild(lc);
    sb = document.createElement("button");
    sb.id="SettingsButton";
    sb.innerHTML="Settings";
    sb.onclick=function() {LoadSettings()};
    wc.appendChild(sb);
    ctc = document.createElement("div");
    ctc.id="ConsoleTextContainer";
    wc.appendChild(ctc);
    ctb = document.createElement("button");
    ctb.id="ConsoleTextButton";
    ctb.innerHTML="View Console History";
    ctb.onclick=function(){ViewConsoleHistory()};
    wc.appendChild(ctb);
    vp = document.createElement("button");
    vp.id="ViewPerks";
    vp.innerHTML="View Current Perks";
    vp.onclick=function(){ViewPerks()}; 
    wc.appendChild(vp);
    cps = document.getElementById("currentPlant");
    wc.style.width = window.innerWidth.toString()+"px";
    wc.style.height = (window.innerWidth/(1440/732)).toString()+"px";
    turnbutton = document.getElementById("EndTurn");
    turncounter = document.getElementById("TurnCounter");
    abilitybuttons = document.getElementById("AbilityButtons");
    planthealth = document.getElementById("HealthAmount");
    if (MiscData[3] != "") {
        IsBossWave = true;
        TheBossWave = MiscData[3];
        BossTheme = new sound(TheBossWave.theme);
        SoundArray.push(BossTheme); 
        BossTheme.loop();
        BossTheme.reset();
        BossTheme.play();
    }
    else if (MiscData[2]) {
        CriticalStage = true;
        hi.src = "HealthIcon3.PNG";
        UpdatePassivePerks("criticalphase");
        SoundArray.push(CriticalTheme);
        CriticalTheme.reset();
        CriticalTheme.play();
    }
    else {
        PlantTurnTheme.play();
    }
    for (theme in SoundArray) {
        theme = SoundArray[theme];
        theme.sound.volume = currentVolume;
    }
    for (a in currentPlant.attacks) {
        atak = currentPlant.attacks[a];
        attackbutton = document.createElement("button");
        attackbutton.className = "AbilityButton";
        attackbutton.innerHTML = atak.name;
        attackbutton.id = atak.name;
        abilitybuttons.appendChild(attackbutton);
        attackbutton.onclick = function(event) {
            for (a in currentPlant.attacks) {
                if (event.target.id == currentPlant.attacks[a].name) {
                    attack = currentPlant.attacks[a];
                }
            }
            currentProjectile = attack;
            CD = 0;
            CreateModal((attack.name+"Info"),attack.name,attack.desc,attack.displaySprite,[["Use",FireProjectile],["Rotate Attack",SwitchAD]]);
            for (is in phygriditems) {
                phygriditems[is].remove();
            }
            phygriditems = [];
            griditemarray = [];
            currentx = 0;
            currenty = 0;
            fighterPhysArray[fighterArray.indexOf(currentPlant)].style.transform = "scaleX(1)";
            for (i = 0; i < gridx*gridy; i++) {
                currentx += 1;
                ItemSprite = document.createElement("img");
                newgi = new griditem();
                newgi.codx = currentx;
                newgi.cody = currenty;
                newgi.sprite = "BlankTile.PNG"
                griditemarray.push(newgi);
                ItemSprite.src = "BlankTile.PNG";
                wc.appendChild(ItemSprite);
                ItemSprite.style.position = "absolute";
                ItemSprite.className = "gridTile";
                ItemSprite.onclick = tryToMove;
                ItemSprite.style.height = (8*gridsize).toString()+"%";
                ItemSprite.style.top = (gridsize*(12+(currenty)*8)).toString()+"%";
                ItemSprite.style.left = (window.innerWidth*((gridsize*currentx)+gridy/(gridsize*2)-currenty*gridsize*0.7)*(1/18)).toString()+"px"
                for (f in fighterArray) {
                    fighter = fighterArray[f];
                    if (currentx === fighter.coords[0] && currenty === fighter.coords[1] && fighter.plant) {
                        newgi.sprite = "GreenTile.PNG"
                        newgi.character = fighter;
                        ItemSprite.src = "GreenTile.PNG";
                    }
                    if (currentx === fighter.coords[0] && currenty === fighter.coords[1] && !(fighter.plant)) {
                        newgi.sprite = "PurpleTile.PNG"
                        newgi.character = fighter;
                        ItemSprite.src = "PurpleTile.PNG";
                    }
                }
                if((currentPlant.coords[0]+1 <= currentx && currentx <= currentPlant.coords[0]+attack.range) && currenty === currentPlant.coords[1]) {
                    if (newgi.sprite == "PurpleTile.PNG") {
                        newgi.sprite = "RedTile.PNG";
                        ItemSprite.src = "RedTile.PNG";
                    }
                    else {
                        newgi.sprite = "BlueTile.PNG";
                        ItemSprite.src = "BlueTile.PNG";
                    }
                }
                phygriditems.push(ItemSprite);
                if (currentx%gridx == 0) {
                    currenty += 1;
                    currentx = 0;
                }
            }
        }
    }
    turnbutton.onclick = function() {
        turncounter.innerHTML = "Zombie's Turn";
        abilitybuttons.style.display = "none";
        IsPlayerTurn = false;
        CanMove = false;
        if (!(CriticalStage) && !(IsBossWave)) {
            ZombieTurnTheme.sound.currentTime = PlantTurnTheme.sound.currentTime; 
            MusicFade(PlantTurnTheme,ZombieTurnTheme);
        }
        CreateConsoleText(currentPlant.name+" has ended their turn.")
        ConsoleHistory.push("~ Zombie's Turn ~");
        for (attack in currentPlant.attacks) {
            attack = currentPlant.attacks[attack];
            if (attack.TimeUntilReady > 0) {
                attack.TimeUntilReady -= 1; 
            }
        }
        ZombieArray = SortZArray();
        ZombieTurn(0);
    }
    difficultylevel = MiscData[0];
    if (IsBossWave) {
        document.getElementById("LevelCount").innerHTML = "Wave "+difficultylevel+" (Boss Wave)";
    }
    else {
        document.getElementById("LevelCount").innerHTML = "Wave "+difficultylevel;
    }
    ZombieArray = ZombieData[0]; 
    currentPlant.coords = PlantData[1]; 
    prevzposes = [];
    zhealtharray = [];
    zhealthbararray = [];
    fighterPhysArray = [cps];
    ctc.innerHTML = "";
    ConsoleHistory = MiscData[4];
    planthealth.innerHTML = Object.assign(PlantData[2]);
    currentPlant.health = Object.assign(PlantData[2]);
    CanZAbility = ZombieData[1];
    for (z in ZombieArray) {
        prevzposes.push(ZombieArray[z].coords);
        ZombieArray[z].understatus = false;
        ZombieArray[z].stunned = false;
        var zombi = document.createElement("img");
        zombi.className = "Fighter";
        zombi.style.height = ZombieArray[z].height;
        zombi.src = ZombieArray[z].aliveSprite;
        if (ZombieArray[z].tickgiver != "") {
            if (ZombieArray[z].tickgiver.effectType == "fire") {
                zombi.style.filter = "opacity(0.5) drop-shadow(0 0 0 rgb(255,153,51)) drop-shadow(0 0 0 rgb(255,153,51)) drop-shadow(0 0 0 rgb(255,153,51)) saturate(225%)";
            } 
            else if (ZombieArray[z].tickgiver.effectType == "goop poison") {
                zombi.style.filter = "opacity(0.5) drop-shadow(0 0 0 rgb(238,130,238)) drop-shadow(0 0 0 rgb(238,130,238)) drop-shadow(0 0 0 rgb(238,130,238)) saturate(225%)";
            }
            else if (ZombieArray[z].tickgiver.effectType == "toxic") {
                zombi.style.filter = "opacity(0.5) drop-shadow(0 0 0 rgb(173,255,47)) drop-shadow(0 0 0 rgb(173,255,47)) drop-shadow(0 0 0 rgb(173,255,47)) saturate(225%)";
            }
            
        }
        wc.appendChild(zombi);
        fighterPhysArray.push(zombi);
        zombi.style.transform = "scaleX(1)";
        var zhealth = document.createElement("p")
        var zhealthbar = document.createElement("img")
        if (ZombieArray[z].underShield != "") {
            zhealthbar.src = "ArmorHeartIcon.PNG";
        }
        else {
            zhealthbar.src = "HeartIcon.PNG";
        }
        zhealthbar.style.position = "absolute";
        zhealthbar.style.width = "4%";
        zhealthbar.style.zIndex = 9001;
        wc.appendChild(zhealthbar);
        zhealth.style.position = "absolute";
        zhealth.style.fontFamily =  'Marker Felt';
        zhealth.style.fontSize = "1.7vw";
        zhealth.style.zIndex = 9002;
        wc.appendChild(zhealth)
        zhealtharray.push(zhealth);
        zhealthbararray.push(zhealthbar);
    }
    fighterArray = [currentPlant].concat(ZombieArray);
    for (attack in currentPlant.attacks) {
        currentPlant.attacks[attack].TimeUntilReady = PlantData[0][attack];
    }
    IsPlayerTurn = true; 
    CanMove = true;
    CanAbility = [true, true];
    currentPlant.chewingtime = PlantData[4];
    currentPlant.chewing = false;
    if (PlantData[4] != 0) {
        currentPlant.chewing = true;
        currentPlant.aliveSprite = "chewy.gif";
        fighterPhysArray[fighterArray.indexOf(currentPlant)].src = "chewy.gif";
        CanAbility = [false, false];
    }
    else {
        currentPlant.aliveSprite = currentPlant.name.replace(/\s/g, '')+".PNG";
        fighterPhysArray[fighterArray.indexOf(currentPlant)].src = currentPlant.name.replace(/\s/g, '')+".PNG";
    }
    prevppos = currentPlant.coords.slice(0);
    currentProjectile = "";
    consolemessages = [];
    abilitybuttons.style.display = "block";
    SaveGame();
    UpdateTurnCount();
    CheckZindexes();
    updatebackground();
    updategrid();
}
function ResetGame() {
    difficultylevel += 1;
    ConsoleHistory.push("~ Wave "+difficultylevel+" ~");
    if (loadData("HighScore") == null) {
        UpdateData("Wave "+difficultylevel.toString(),"HighScore");
    }
    if (loadData("HighScore").replace(/\D/g,'') < difficultylevel) {
        UpdateData("Wave "+difficultylevel.toString(),"HighScore");
    }
    if (difficultylevel%5 == 0) { 
        ConsoleHistory.push("~ Boss Wave ~");
        document.getElementById("LevelCount").innerHTML = "Wave "+difficultylevel+" (Boss Wave)";
        IsBossWave = true;
        ABW = [];
        for (bw in BossWaves) {
            if (BossWaves[bw].availablewaves.includes(difficultylevel)) {
                ABW.push(BossWaves[bw]);
            }
        }
        CBW = ABW[Math.floor(Math.random() * ABW.length)];
        TheBossWave = CBW;
        ZombieArray = CBW.zombies;
        availablecoords = CBW.availablecoords;
        if (CBW.randomizecoords) {
            ZTS = [];
            CPL = 0;
            while (CPL != difficultylevel) {
                NZ = clone(ZombieArray[Math.floor(Math.random() * ZombieArray.length)])
                if (!(NZ.powerLevel + CPL > difficultylevel)) {
                    coordchosen = availablecoords[Math.floor(Math.random() * availablecoords.length)];
                    NZ.coords = coordchosen;
                    availablecoords.splice(availablecoords.indexOf(coordchosen), 1);
                    ZTS.push(NZ);
                    CPL += NZ.powerLevel;
                }
            }
            ZombieArray = ZTS;
        }
        else {
            for (z in ZombieArray) {
                ZombieArray[z].coords = availablecoords[z];
            }
        }
    }
    else {
        ZTS = [];
        CPL = 0;
        ZombieArray = [Browncoat, Conehead, Imp, Buckethead, Yeti, GunZomb, FootballZomb, Screendoor, Newspaper, Disco]; 
        //ZombieArray = [GunZomb, Browncoat];
        availablecoords = [];
        for (x=4; x<10; x++) {
            for (y=0; y<5; y++) {
                availablecoords.push([x,y]);
            }
        }
        while (CPL != difficultylevel) {
            NZ = clone(ZombieArray[Math.floor(Math.random() * ZombieArray.length)])
            if (!(NZ.powerLevel + CPL > difficultylevel)) {
                coordchosen = availablecoords[Math.floor(Math.random() * availablecoords.length)];
                NZ.coords = coordchosen;
                availablecoords.splice(availablecoords.indexOf(coordchosen), 1);
                ZTS.push(NZ);
                CPL += NZ.powerLevel;
            }
        }
        ZombieArray = ZTS;
        PlantTurnTheme.reset();
        PlantTurnTheme.play();
        document.getElementById("LevelCount").innerHTML = "Wave "+difficultylevel;
    }
    currentPlant.coords = [2,2]; 
    prevzposes = [];
    zhealtharray = [];
    zhealthbararray = [];
    fighterPhysArray = [cps];
    ctc.innerHTML = "";
    planthealth.innerHTML = Object.assign(currentPlant.permhealth);
    currentPlant.health = Object.assign(currentPlant.permhealth);
    CanZAbility = [];
    for (z in ZombieArray) {
        for (attack in ZombieArray[z].attacks) {
            ZombieArray[z].attacks[attack].TimeUntilReady = ZombieArray[z].attacks[attack].STUP;
        }
        for (support in ZombieArray[z].supports) {
            ZombieArray[z].supports[support].TimeUntilReady = ZombieArray[z].supports[support].STUP;
        }
        ZombieArray[z].health = ZombieArray[z].permhealth;
        ZombieArray[z].tickgiver = "";
        ZombieArray[z].tickTimeLeft = 0;
        ZombieArray[z].stunned = false;
        prevzposes.push(ZombieArray[z].coords)
        CanZAbility.push(true);
        var zombi = document.createElement("img");
        zombi.className = "Fighter";
        zombi.style.height = ZombieArray[z].height;
        zombi.src = ZombieArray[z].aliveSprite;
        wc.appendChild(zombi);
        fighterPhysArray.push(zombi);
        zombi.style.transform = "scaleX(1)";
        var zhealth = document.createElement("p")
        var zhealthbar = document.createElement("img")
        if (ZombieArray[z].underShield != "") {
            zhealthbar.src = "ArmorHeartIcon.PNG";
        }
        else {
            zhealthbar.src = "HeartIcon.PNG";
        }
        zhealthbar.style.position = "absolute";
        zhealthbar.style.width = "4%";
        zhealthbar.style.zIndex = 9001;
        wc.appendChild(zhealthbar);
        zhealth.style.position = "absolute";
        zhealth.style.fontFamily =  'Marker Felt';
        zhealth.style.fontSize = "1.7vw";
        zhealth.style.zIndex = 9002;
        wc.appendChild(zhealth)
        zhealtharray.push(zhealth);
        zhealthbararray.push(zhealthbar);
    }
    fighterArray = [currentPlant].concat(ZombieArray);
    for (attack in currentPlant.attacks) {
        currentPlant.attacks[attack].TimeUntilReady = 0;
    }
    StopAllSounds();
    IsPlayerTurn = true;
    ConsoleHistory.push("~ Plant's Turn ~");
    CanMove = true;
    CanAbility = [true, true];
    currentPlant.chewing = false;
    currentPlant.chewingtime = 0;
    fighterPhysArray[fighterArray.indexOf(currentPlant)].style.transform = "scaleX(1)";
    currentPlant.aliveSprite = currentPlant.name.replace(/\s/g, '')+".PNG";
    fighterPhysArray[fighterArray.indexOf(currentPlant)].src = currentPlant.name.replace(/\s/g, '')+".PNG";
    prevppos = currentPlant.coords.slice(0);
    currentProjectile = "";
    consolemessages = [];
    abilitybuttons.style.display = "block";
    CriticalStage = false;
    UpdatePassivePerks("criticalphase");
    hi.src = "HealthIcon1.PNG";
    UpdateTurnCount();
    CheckZindexes();
    updatebackground();
    updategrid();
    SaveGame(); 
    wc.innerHTML = '';
    if (IsBossWave) {
        LogoSound.reset();
        LogoSound.play();
        Blocker = document.createElement("img"); 
        Blocker.src = "LogoBackground.gif"; 
        Blocker.style.width = "100%";
        Blocker.style.zIndex = 9999;
        Blocker.style.position = "absolute";
        wc.appendChild(Blocker);
        TrollFace = document.createElement("img"); 
        TrollFace.src = "GunZombies.gif";
        TrollFace.style.zIndex = 10000;
        TrollFace.style.width = "50%";
        TrollFace.style.left = "30%";
        TrollFace.style.position = "absolute"
        wc.appendChild(TrollFace);
        setTimeout(function() {
            TrollFaces = document.createElement("img"); 
            TrollFaces.src = "Sunglasses.gif";
            TrollFaces.style.width = "50%";
            TrollFaces.style.left = "30%";
            TrollFaces.style.zIndex = 10000;
            TrollFaces.style.position = "absolute"
            wc.appendChild(TrollFaces);
            setTimeout(function() {
                TrollFacess = document.createElement("img"); 
                TrollFacess.src = "GargFall.gif";
                TrollFacess.style.width = "50%";
                TrollFacess.style.left = "30%";
                TrollFacess.style.zIndex = 10000;
                TrollFacess.style.position = "absolute"
                wc.appendChild(TrollFacess);
                setTimeout(function() {
                    TrollFacesss = document.createElement("img"); 
                    TrollFacesss.src = "GargSunglasses.gif";
                    TrollFacesss.style.width = "50%";
                    TrollFacesss.style.left = "30%";
                    TrollFacesss.style.zIndex = 10000;
                    TrollFacesss.style.position = "absolute"
                    wc.appendChild(TrollFacesss);
                    setTimeout(function() {
                        FightSound.reset();
                        FightSound.play();
                        wc.removeChild(Blocker)
                        wc.removeChild(TrollFace)
                        wc.removeChild(TrollFaces)
                        wc.removeChild(TrollFacess)
                        wc.removeChild(TrollFacesss)
                        FB = document.createElement("img"); 
                        FB.src = "FightingBackground.PNG"; 
                        FB.style.width = "100%";
                        FB.style.zIndex = 9999;
                        FB.style.position = "absolute";
                        wc.appendChild(FB);
                        PI = document.createElement("img"); 
                        PI.src = currentPlant.iconSprite;
                        PI.style.width = "30%";
                        PI.style.zIndex = 10000;
                        PI.style.left = "-10%";
                        PI.style.position = "absolute";
                        wc.appendChild(PI);
                        PT = document.createElement("p");
                        PT.innerHTML = currentPlant.name;
                        PT.id = "PlantFightText";
                        wc.appendChild(PT);
                        ZI = document.createElement("img"); 
                        ZI.src = TheBossWave.image;
                        ZI.style.width = TheBossWave.imageWidth;
                        ZI.style.zIndex = 10000;
                        ZI.style.left = TheBossWave.imageLeft;
                        ZI.style.top = "40%";
                        ZI.style.position = "absolute";
                        wc.appendChild(ZI);
                        ZT = document.createElement("p");
                        ZT.innerHTML = TheBossWave.name;
                        ZT.id = "ZombieFightText"
                        wc.appendChild(ZT);
                        setTimeout(function() {
                            wc.removeChild(FB);
                            wc.removeChild(PI);
                            wc.removeChild(PT);
                            wc.removeChild(ZI);
                            wc.removeChild(ZT);
                            LoadGame();
                        }, 4000)
                    },2500)
                },500)
            },150)
        },200)
    }
    else if (difficultylevel%5 == 1) { 
        PerkTheme.play();
        ChooseAPerk();
    }
    else {
        LoadGame();
    }
}
function CheckForWin() {
    if (ZombieArray.length == 0) {
        abilitybuttons.style.display = "none";
        if (IsBossWave) {
            BossTheme.stop();
            Ultwin.reset();
            Ultwin.play();
        }
        else if (CriticalStage) {
            CriticalTheme.stop();
            win.reset();
            win.play();
        }
        else {
            PlantTurnTheme.stop();
            win.reset();
            win.play();
        }
        CriticalTheme.reset();
        ZombieTurnTheme.reset();
        PlantTurnTheme.reset();
        if (IsBossWave) {
        }
        IsPlayerTurn = false;
        CanMove = false;
        CriticalStage = false;
        IsBossWave = false;
        TheBossWave = "";
        currentPlant.chewing = false;
        CreateConsoleText(currentPlant.name+" has beat wave "+difficultylevel+"!")
        endtext = document.createElement("p");
        endtext.id = "EndText";
        endtext.innerHTML = "Wave Complete!";
        wc.appendChild(endtext);
        retrybutton = document.createElement("button");
        retrybutton.id = "RetryButton";
        retrybutton.innerHTML = "Next wave";
        retrybutton.onclick = function() {
            wc.removeChild(endtext);
            wc.removeChild(retrybutton);
            ResetGame();
        }
        wc.appendChild(retrybutton);
        return true;
    }
}
function CheckForLoss() { 
    if (currentPlant.health <= 0) {
        planthealth.innerHTML = 0;
        currentPlant.health = 0;
        wc.removeChild(fighterPhysArray[fighterArray.indexOf(currentPlant)]);
        abilitybuttons.style.display = "none";
        if (IsBossWave) {
            BossTheme.stop();
        }
        else if (CriticalStage) {
            CriticalTheme.stop();
        }
        else {
            ZombieTurnTheme.stop();
        }
        CriticalTheme.reset();
        ZombieTurnTheme.reset();
        PlantTurnTheme.reset();
        IsPlayerTurn = false;
        CanMove = false;
        CriticalStage = false;
        IsBossWave = false;
        TheBossWave = "";
        UpdateData(null, "PlantData");
        //UpdateData(null, "ZombieData");
        //UpdateData(null, "MiscData");
        currentPlant.aliveSprite = currentPlant.name.replace(/\s/g, '')+".PNG";
        fighterPhysArray[fighterArray.indexOf(currentPlant)].src = currentPlant.name.replace(/\s/g, '')+".PNG";
        CreateConsoleText(currentPlant.name+" has died on wave "+difficultylevel+".")
        if (loadData("HighScore") == null) {
            UpdateData("Wave "+difficultylevel.toString(),"HighScore");
        }
        if (loadData("HighScore").replace(/\D/g,'') < difficultylevel) {
            UpdateData("Wave "+difficultylevel.toString(),"HighScore");
        }
        endtext = document.createElement("p");
        endtext.id = "EndText";
        endtext.innerHTML = "You Lose";
        wc.appendChild(endtext);
        retrybutton = document.createElement("button");
        retrybutton.id = "RetryButton";
        retrybutton.innerHTML = "Back to Menu";
        retrybutton.onclick = function() {
            BackToMenu();
        }
        wc.appendChild(retrybutton);
        loss.reset();
        loss.play();
        return true;
    }
    else if (currentPlant.health <= currentPlant.permhealth/3 && !(CriticalStage) && !(IsBossWave)) { 
        CriticalStage = true; //*fix where plant dies instsantly from imp [owers?]
        UpdatePassivePerks("criticalphase");
        hi.src = "HealthIcon3.PNG";
        CriticalTheme.sound.currentTime = ZombieTurnTheme.sound.currentTime;
        MusicFade(ZombieTurnTheme, CriticalTheme);
        SoundArray.push(CriticalTheme);
    }
    return false;
}
function DeathByAllergy(allergen) {
    planthealth.innerHTML = 0;
    currentPlant.health = 0;
    wc.removeChild(fighterPhysArray[fighterArray.indexOf(currentPlant)]);
    abilitybuttons.style.display = "none";
    if (IsBossWave) {
        BossTheme.stop();
    }
    else if (CriticalStage) {
        CriticalTheme.stop();
    }
    else {
        ZombieTurnTheme.stop();
    }
    CriticalTheme.reset();
    ZombieTurnTheme.reset();
    PlantTurnTheme.reset();
    IsPlayerTurn = false;
    CanMove = false;
    CriticalStage = false;
    IsBossWave = false;
    TheBossWave = "";
    UpdateData(null, "PlantData");
    //UpdateData(null, "ZombieData");
    //UpdateData(null, "MiscData");
    currentPlant.aliveSprite = currentPlant.name.replace(/\s/g, '')+".PNG";
    fighterPhysArray[fighterArray.indexOf(currentPlant)].src = currentPlant.name.replace(/\s/g, '')+".PNG";
    CreateConsoleText(currentPlant.name+" has died on wave "+difficultylevel+" from a "+allergen+" allergy.")
    if (loadData("HighScore") == null) {
        UpdateData("Wave "+difficultylevel.toString(),"HighScore");
    }
    if (loadData("HighScore").replace(/\D/g,'') < difficultylevel) {
        UpdateData("Wave "+difficultylevel.toString(),"HighScore");
    }
    endtext = document.createElement("p");
    endtext.id = "EndText";
    endtext.innerHTML = "Don't Eat Nuts";
    wc.appendChild(endtext);
    retrybutton = document.createElement("button");
    retrybutton.id = "RetryButton";
    retrybutton.innerHTML = "Back to Menu";
    retrybutton.onclick = function() {
        BackToMenu();
    }
    wc.appendChild(retrybutton);
    loss.reset();
    loss.play();
}
function CreateConsoleText(text, conjoin=false, ATH=true) { 
    ctc = document.getElementById("ConsoleTextContainer");
    if (conjoin && (text.replace(/[0-9]/g, '') == consolemessages[consolemessages.length-1].innerHTML.replace(/[0-9]/g, ''))) {
        newnum = parseInt(text.replace(/\D/g,''))
        nindex = text.indexOf(newnum);
        edittext = text.replace(/[0-9]/g, '')
        edittext = edittext.slice(0, nindex)+(newnum+parseInt(consolemessages[consolemessages.length-1].innerHTML.replace(/\D/g,'')))+edittext.slice(nindex);
        consolemessages[consolemessages.length-1].innerHTML = edittext;
        ConsoleHistory[ConsoleHistory.length-1] = edittext;
        
    }
    else {
        if (consolemessages.length > 3) {
            ctc.removeChild(consolemessages[0]);
            consolemessages.shift();
        }
        Message = document.createElement("div");
        Message.className = "consoletext";
        Message.innerHTML = text;
        consolemessages.push(Message);
        if (ATH) {
            ConsoleHistory.push(text);
        }
        ctc.appendChild(Message);
    }
}
function ViewConsoleHistory() {
    wc = document.getElementById("EverythingFitter");
    MessageContainer = document.createElement("div");
    wc.appendChild(MessageContainer);
    MessageContainer.className = "HTP";
    MessageContainer.style.display = "block";
    MessageContainer.id = "ConsoleHistory";
    Message = document.createElement("div");
    Message.className = "Message";
    Message.style.width = "50%";
    MessageContainer.appendChild(Message);
    CloseButton = document.createElement("span");
    CloseButton.className= "close";
    CloseButton.innerHTML = "&times;"
    CloseButton.onclick = function() {
        document.getElementById("ConsoleHistory").remove();
    }
    Message.appendChild(CloseButton);
    MessageHeader = document.createElement("p");
    MessageHeader.className = "MessageHeader";
    MessageHeader.innerHTML = "History of the console for this game";
    MessageHeader.style.display = "block";
    Message.appendChild(MessageHeader);
    MessageButton = document.createElement("button");
    MessageButton.style.display = "block";
    MessageButton.innerHTML = "Jump to bottom";
    MessageButton.className = "MessageButton"; 
    MessageButton.onclick = function() {
        MessageContainer.scrollTop = MessageContainer.scrollHeight - MessageContainer.clientHeight;
    };
    Message.appendChild(MessageButton);
    for (message in ConsoleHistory) {
        if (ConsoleHistory[message][0] == '~') {
            MessageText = document.createElement("b");
        }
        else {
            MessageText = document.createElement("p");
        }
        MessageText.className = "MessageText";
        MessageText.innerHTML = ConsoleHistory[message];
        Message.appendChild(MessageText);
    }
    ScrollUp = document.createElement("button");
    ScrollUp.style.display = "block";
    ScrollUp.innerHTML = "Jump to top";
    ScrollUp.className = "MessageButton";
    ScrollUp.onclick = function() {
        MessageContainer.scrollTop = 0;
    };
    Message.appendChild(ScrollUp);
}
function ChooseAPerk(chosenPerks=[]) {
    wc = document.getElementById("EverythingFitter");
    MessageContainer = document.createElement("div");
    wc.appendChild(MessageContainer);
    MessageContainer.className = "ChoosePerk";
    MessageContainer.style.display = "block";
    MessageContainer.id = "ChoosePerk";
    Message = document.createElement("div");
    Message.className = "PerkMessage";
    Message.style.width = "100%";
    MessageContainer.appendChild(Message);
    MessageText = document.createElement("p");
    MessageText.className = "MessageHeader";
    MessageText.style.position = "relative";
    MessageText.style.left = "40%"
    MessageText.innerHTML = "CHOOSE A PERK!";
    Message.appendChild(MessageText); 
    choosablePerks = passivePerks.concat(characterPerks).concat(abilityPerks);
    offset = 0;
    willoffset = false;
    for (p=0; p<choosablePerks.length+offset; ) { 
        p = p-offset;
        perk = choosablePerks[p];
        if (currentPlant.passiveperks.includes(perk)) {
            index = choosablePerks.indexOf(perk);
            choosablePerks.splice(index, 1);
            willoffset = true;
        }
        if (characterPerks.includes(perk)) {
            if (perk.plantName != currentPlant.name || currentPlant.characterperk.name == perk.name) {
                index = choosablePerks.indexOf(perk);
                if (index > -1) {
                    choosablePerks.splice(index, 1);
                    willoffset = true;
                }
            }
        }
        if (abilityPerks.includes(perk)) {
            if (perk.plantName != currentPlant.name || currentPlant.abilityperk.name == perk.name) {
                index = choosablePerks.indexOf(perk);
                if (index > -1) {
                    choosablePerks.splice(index, 1);
                    willoffset = true;
                }
            }
        }
        p += 1+offset;
        if (willoffset) {
            willoffset = false;
            offset += 1;
        }
    }
    for (p=0; chosenPerks.length<3; p++) { 
        chosenPerk = choosablePerks[Math.floor(Math.random() * choosablePerks.length)];
        if (!(chosenPerks.includes(chosenPerk))) {
            chosenPerks.push(chosenPerk);
        }
    }
    for (p in chosenPerks) {
        perk = chosenPerks[p];
        MessageImage = document.createElement("img");
        MessageImage.style.position = "relative";
        MessageImage.id = perk.name;
        MessageImage.src = perk.sprite;
        MessageImage.onclick = function(event) {
            ResetPerks();
            for (p in chosenPerks) {
                if (event.target.id === chosenPerks[p].name) {
                    if (currentPlant.passiveperks.length == 3 && passivePerks.includes(chosenPerks[p])) { 
                        alert("you currently have the maximum number of passive perks equipped. Please upgrade a perk instead, or delete one of your existing passive perks.")
                    }
                    else if (characterPerks.includes(chosenPerks[p]) && currentPlant.characterperk != "") {
                        alert("you already have a character perk equipped. Please upgrade a perk instead, or delete your existing character perk.")
                    }
                    else if (abilityPerks.includes(chosenPerks[p]) && currentPlant.abilityperk != "") {
                        alert("you already have an ability perk equipped. Please upgrade a perk instead, or delete your existing ability perk.")
                    }
                    else {
                        if (passivePerks.includes(chosenPerks[p])) {
                            currentPlant.passiveperks.push(chosenPerks[p])
                            UpdatePassivePerks("onetime");
                        }
                        else if (characterPerks.includes(chosenPerks[p]) || abilityPerks.includes(chosenPerks[p])) {
                            ApplyCharOrAbilityPerk(chosenPerks[p])
                        }
                        document.getElementById("ChoosePerk").remove();
                        SaveGame();
                        LoadGame();
                    }
                }
            }
        }
        MessageImage.onmouseover = function(event) {
            event.target.style.filter = "brightness(1.35)";
        }
        MessageImage.onmouseout = function(event) {
            event.target.style.filter = "brightness(1)";
        }
        Message.appendChild(MessageImage);
        MessageImage.style.width = "15%";
        MessageImage.style.left = (20+p*5).toString()+"%"
        MessageText = document.createElement("p");
        MessageText.className = "MessageHeader";
        MessageText.innerHTML = perk.name;
        MessageText.style.position = "absolute";
        MessageText.style.color = "blue";
        MessageText.style.left = (24+p*20).toString()+"%"
        MessageText.style.top = "55%";
        Message.appendChild(MessageText);
        DescContainer = document.createElement("div");
        DescContainer.style.position = "absolute";
        DescContainer.style.left = (23+p*20).toString()+"%"
        DescContainer.style.top = "62%";
        DescContainer.style.width = "15%";
        Message.appendChild(DescContainer);
        MessageText = document.createElement("p");
        MessageText.className = "MessageText";
        MessageText.innerHTML = perk.desc;
        MessageText.style.color = "blue";
        DescContainer.appendChild(MessageText);
    }
    if (currentPlant.passiveperks.length > 0 || currentPlant.characterperk != "" || currentPlant.abilityperk != "" ) {
        UpgradePerk = document.createElement("button");
        UpgradePerk.style.display = "block";
        UpgradePerk.innerHTML = "Upgrade or delete an existing perk instead";
        UpgradePerk.className = "MessageButton";
        UpgradePerk.style.position = "absolute";
        UpgradePerk.style.left = "35%";
        UpgradePerk.style.top = "90%";
        UpgradePerk.onclick = function() {
            document.getElementById("ChoosePerk").remove();
            UpgradeAPerk(chosenPerks, 1);
        }
        Message.appendChild(UpgradePerk);
    }

}
function ViewPerk(perk, chosenPerks) { 
    wc = document.getElementById("EverythingFitter");
    MessageContainer = document.createElement("div");
    wc.appendChild(MessageContainer);
    MessageContainer.className = "HTP";
    MessageContainer.style.display = "block";
    MessageContainer.style.paddingTop = "0vw";
    MessageContainer.id = "ViewingPerk";
    Message = document.createElement("div");
    Message.className = "Message";
    Message.style.width = "40%";
    MessageContainer.appendChild(Message);
    CloseButton = document.createElement("span");
    CloseButton.className= "close";
    CloseButton.innerHTML = "&times;"
    CloseButton.onclick = function() {
        document.getElementById("ViewingPerk").remove(); 
    }
    Message.appendChild(CloseButton);
    MessageText = document.createElement("p");
    MessageText.className = "MessageHeader";
    if (perk.level < 3) {
        MessageText.innerHTML = "Do you want to upgrade this perk from Level "+perk.level+" to Level "+(perk.level+1)+" or do you want to delete this perk?<br>";
    }
    else {
        MessageText.innerHTML = "Do you want to delete this perk?"
    }
    Message.appendChild(MessageText);
    perkcontainer = document.createElement("div");
    Message.appendChild(perkcontainer);
    MessageImage = document.createElement("img");
    MessageImage.src = perk.sprite;
    perkcontainer.appendChild(MessageImage);
    MessageText = document.createElement("p");
    MessageText.className = "MessageHeader";
    MessageText.innerHTML = perk.name+" (Level "+perk.level+")";
    perkcontainer.appendChild(MessageText);
    if (perk.level == 1) {
        MessageText.style.color = "blue";
    }
    else if (perk.level == 2) {
        MessageText.style.color = "gold";
    }
    else if (perk.level == 3) {
        MessageText.style.color = "purple";
    }
    MessageText = document.createElement("p");
    MessageText.className = "MessageText";
    MessageText.innerHTML = perk.desc;
    perkcontainer.appendChild(MessageText);
    for (ls in perk.levelstats) {
        rlv = parseInt(ls)+1
        if (rlv == perk.level) {
            MessageText = document.createElement("b");
            if (rlv == 1) {
                MessageText.style.color = "blue";
            }
            else if (rlv == 2) {
                MessageText.style.color = "gold";
            }
            else if (rlv == 3) {
                MessageText.style.color = "purple";
            }
        }
        else {
            MessageText = document.createElement("p");
        }

        MessageText.className = "MessageText";
        MessageText.innerHTML = "Level "+(rlv)+"<br>"+perk.levelstats[ls];
        perkcontainer.appendChild(MessageText);
    }
    if (perk.level < 3) { 
        UpPerk = document.createElement("button");
        UpPerk.style.display = "block";
        UpPerk.innerHTML = "Upgrade perk";
        UpPerk.className = "MessageButton";
        UpPerk.onclick = function() {
            if (currentPlant.passiveperks.includes(perk)) {
                ResetPerks();
                perk.level += 1;
                UpdatePassivePerks("onetime");
            }
            else {
                perk.level += 1;
                ApplyCharOrAbilityPerk(perk);
            }
            document.getElementById("UpgradePerk").remove();
            document.getElementById("ViewingPerk").remove();
            SaveGame();
            LoadGame();
        }
        Message.appendChild(UpPerk);
    }
    DelPerk = document.createElement("button");
    DelPerk.style.display = "block";
    DelPerk.innerHTML = "Delete perk";
    DelPerk.className = "MessageButton";
    DelPerk.onclick = function() {
        if (currentPlant.passiveperks.includes(perk)) {
            ResetPerks();
            index = currentPlant.passiveperks.indexOf(perk);
            currentPlant.passiveperks.splice(index, 1);
            perk.level = 1;
            UpdatePassivePerks("onetime");
            SaveGame();
            document.getElementById("ViewingPerk").remove();
            document.getElementById("UpgradePerk").remove();
            UpgradeAPerk(chosenPerks);
        }
        else if (abilityPerks.includes(perk)) {
            currentPlant.abilityperk = "";
            perk.level = 1;
            SaveGame();
            currentPlant.attacks.pop();
            document.getElementById("ViewingPerk").remove();
            document.getElementById("UpgradePerk").remove();
            UpgradeAPerk(chosenPerks);
        }
        else {
            currentPlant.characterperk = "";
            perk.level = 1;
            SaveGame();
            for (p in currentPlant.primaries) {
                currentPlant.attacks[p] = currentPlant.primaries[p];
            }
            document.getElementById("ViewingPerk").remove();
            document.getElementById("UpgradePerk").remove();
            UpgradeAPerk(chosenPerks);
        }
    }
    Message.appendChild(DelPerk);
}
function UpgradeAPerk(chosenPerks, pc) {
    wc = document.getElementById("EverythingFitter");
    MessageContainer = document.createElement("div");
    wc.appendChild(MessageContainer);
    MessageContainer.className = "ChoosePerk";
    MessageContainer.style.display = "block";
    MessageContainer.id = "UpgradePerk";
    Message = document.createElement("div");
    Message.className = "PerkMessage";
    Message.style.width = "100%";
    MessageContainer.appendChild(Message);
    MessageText = document.createElement("p");
    MessageText.className = "MessageHeader";
    MessageText.style.position = "relative";
    MessageText.style.left = "37%"
    MessageText.innerHTML = "UPGRADE A PERK!";
    Message.appendChild(MessageText);
    if (pc == 1) {
        for (p in currentPlant.passiveperks) {
            perk = currentPlant.passiveperks[p];
            MessageImage = document.createElement("img");
            MessageImage.id = perk.name;
            MessageImage.src = perk.sprite;
            MessageImage.onclick = function(event) {
                for (p in currentPlant.passiveperks) {
                    if (event.target.id === currentPlant.passiveperks[p].name) {
                        ViewPerk(currentPlant.passiveperks[p], chosenPerks);
                    }
                }
            }
            MessageImage.onmouseover = function(event) {
                event.target.style.filter = "brightness(1.35)";
            }
            MessageImage.onmouseout = function(event) {
                event.target.style.filter = "brightness(1)";
            }
            MessageImage.style.position = "absolute";
            MessageImage.style.width = "15%";
            MessageImage.style.left = (20+p*20).toString()+"%"
            Message.appendChild(MessageImage);
            MessageText = document.createElement("p");
            MessageText.className = "MessageHeader";
            MessageText.innerHTML = perk.name+" (Level "+perk.level+")";
            MessageText.style.position = "absolute";
            MessageText.style.color = "blue";
            MessageText.style.left = (20+p*20).toString()+"%"
            MessageText.style.top = "55%";
            Message.appendChild(MessageText);
            DescContainer = document.createElement("div");
            DescContainer.style.position = "absolute";
            DescContainer.style.left = (22+p*20).toString()+"%"
            DescContainer.style.top = "62%";
            DescContainer.style.width = "15%";
            Message.appendChild(DescContainer);
            MessageText = document.createElement("p");
            MessageText.className = "MessageText";
            MessageText.innerHTML = perk.desc;
            MessageText.style.color = "blue";
            DescContainer.appendChild(MessageText);
        }
    }
    else if (pc == 2) {
        ptd = [currentPlant.characterperk,currentPlant.abilityperk];
        for (p in ptd) {
            perk = ptd[p];
            if (perk != "") {
                MessageImage = document.createElement("img");
                MessageImage.id = perk.name;
                MessageImage.src = perk.sprite;
                MessageImage.onclick = function() {
                    if (event.target.id === currentPlant.characterperk.name) {
                        ViewPerk(currentPlant.characterperk, chosenPerks);
                    }
                    else if (event.target.id === currentPlant.abilityperk.name) {
                        ViewPerk(currentPlant.abilityperk, chosenPerks);
                    }
                }
                MessageImage.onmouseover = function(event) {
                    event.target.style.filter = "brightness(1.35)";
                }
                MessageImage.onmouseout = function(event) {
                    event.target.style.filter = "brightness(1)";
                }
                MessageImage.style.position = "absolute";
                MessageImage.style.width = "15%";
                MessageImage.style.left = (20+p*20).toString()+"%"
                Message.appendChild(MessageImage);
                MessageText = document.createElement("p");
                MessageText.className = "MessageHeader";
                MessageText.innerHTML = perk.name+" (Level "+perk.level+")";
                MessageText.style.position = "absolute";
                MessageText.style.color = "blue";
                MessageText.style.left = (20+p*20).toString()+"%"
                MessageText.style.top = "55%";
                Message.appendChild(MessageText);
                DescContainer = document.createElement("div");
                DescContainer.style.position = "absolute";
                DescContainer.style.left = (22+p*20).toString()+"%"
                DescContainer.style.top = "62%";
                DescContainer.style.width = "15%";
                Message.appendChild(DescContainer);
                MessageText = document.createElement("p");
                MessageText.className = "MessageText";
                MessageText.innerHTML = perk.desc;
                MessageText.style.color = "blue";
                DescContainer.appendChild(MessageText);
            }
        }
    }
    ChoosePerk = document.createElement("button");
    ChoosePerk.style.display = "block";
    ChoosePerk.innerHTML = "choose a new perk instead";
    ChoosePerk.className = "MessageButton";
    ChoosePerk.style.position = "absolute";
    ChoosePerk.style.left = "35%";
    ChoosePerk.style.top = "90%";
    ChoosePerk.onclick = function() {
        document.getElementById("UpgradePerk").remove();
        ChooseAPerk(chosenPerks);
    }
    Message.appendChild(ChoosePerk);
    UpgradePerk = document.createElement("button");
    UpgradePerk.style.display = "block";
    if (pc == 1) {
        UpgradePerk.innerHTML = "view page 2 of your perks";
        UpgradePerk.onclick = function() {
            document.getElementById("UpgradePerk").remove();
            UpgradeAPerk(chosenPerks, 2);
        }
    }
    else if (pc == 2) {
        UpgradePerk.innerHTML = "view page 1 of your perks";
        UpgradePerk.onclick = function() {
            document.getElementById("UpgradePerk").remove();
            UpgradeAPerk(chosenPerks, 1);
        }
    }
    UpgradePerk.className = "MessageButton";
    UpgradePerk.style.position = "absolute";
    UpgradePerk.style.left = "57%";
    UpgradePerk.style.top = "90%";
    Message.appendChild(UpgradePerk);
}
function ViewPerks() { 
    wc = document.getElementById("EverythingFitter");
    MessageContainer = document.createElement("div");
    wc.appendChild(MessageContainer);
    MessageContainer.className = "HTP";
    MessageContainer.style.display = "block";
    MessageContainer.id = "ViewPerk";
    Message = document.createElement("div");
    Message.className = "Message";
    Message.style.width = "40%";
    MessageContainer.appendChild(Message);
    CloseButton = document.createElement("span");
    CloseButton.className= "close";
    CloseButton.innerHTML = "&times;"
    CloseButton.onclick = function() {
        document.getElementById("ViewPerk").remove(); 
    }
    Message.appendChild(CloseButton);
    MessageText = document.createElement("p");
    MessageText.className = "MessageHeader";
    MessageText.innerHTML = "These are all of your current perks.<br>";
    Message.appendChild(MessageText);
    ptd = [currentPlant.characterperk,currentPlant.abilityperk];
    for (p in ptd) {
        perk = ptd[p];
        if (perk != "") {
            perkcontainer = document.createElement("div");
            Message.appendChild(perkcontainer);
            MessageImage = document.createElement("img");
            MessageImage.src = perk.sprite;
            perkcontainer.appendChild(MessageImage);
            MessageText = document.createElement("p");
            MessageText.className = "MessageHeader";
            MessageText.innerHTML = perk.name+" (Level "+perk.level+")";
            perkcontainer.appendChild(MessageText);
            if (perk.level == 1) {
                MessageText.style.color = "blue";
            }
            else if (perk.level == 2) {
                MessageText.style.color = "gold";
            }
            else if (perk.level == 3) {
                MessageText.style.color = "purple";
            }
            MessageText = document.createElement("p");
            MessageText.className = "MessageText";
            MessageText.innerHTML = perk.desc;
            perkcontainer.appendChild(MessageText);
            for (ls in perk.levelstats) {
                rlv = parseInt(ls)+1
                if (rlv == perk.level) {
                    MessageText = document.createElement("b");
                    if (rlv == 1) {
                        MessageText.style.color = "blue";
                    }
                    else if (rlv == 2) {
                        MessageText.style.color = "gold";
                    }
                    else if (rlv == 3) {
                        MessageText.style.color = "purple";
                    }
                }
                else {
                    MessageText = document.createElement("p");
                }
    
                MessageText.className = "MessageText";
                MessageText.innerHTML = "Level "+(rlv)+"<br>"+perk.levelstats[ls];
                perkcontainer.appendChild(MessageText);
            }
            MessageText = document.createElement("p");
            MessageText.className = "MessageText";
            MessageText.innerHTML = "--------------------------------------";
            perkcontainer.appendChild(MessageText);
        }
    }
    for (cperk in currentPlant.passiveperks) { 
        cperk = currentPlant.passiveperks[cperk];
        perkcontainer = document.createElement("div");
        Message.appendChild(perkcontainer);
        MessageImage = document.createElement("img");
        MessageImage.src = cperk.sprite;
        perkcontainer.appendChild(MessageImage);
        MessageText = document.createElement("p");
        MessageText.className = "MessageHeader";
        MessageText.innerHTML = cperk.name+" (Level "+cperk.level+")";
        perkcontainer.appendChild(MessageText);
        if (cperk.level == 1) {
            MessageText.style.color = "blue";
        }
        else if (cperk.level == 2) {
            MessageText.style.color = "gold";
        }
        else if (cperk.level == 3) {
            MessageText.style.color = "purple";
        }
        MessageText = document.createElement("p");
        MessageText.className = "MessageText";
        MessageText.innerHTML = cperk.desc;
        perkcontainer.appendChild(MessageText);
        for (ls in cperk.levelstats) {
            rlv = parseInt(ls)+1
            if (rlv == cperk.level) {
                MessageText = document.createElement("b");
                if (rlv == 1) {
                    MessageText.style.color = "blue";
                }
                else if (rlv == 2) {
                    MessageText.style.color = "gold";
                }
                else if (rlv == 3) {
                    MessageText.style.color = "purple";
                }
            }
            else {
                MessageText = document.createElement("p");
            }

            MessageText.className = "MessageText";
            MessageText.innerHTML = "Level "+(rlv)+"<br>"+cperk.levelstats[ls];
            perkcontainer.appendChild(MessageText);
        }
        MessageText = document.createElement("p");
        MessageText.className = "MessageText";
        MessageText.innerHTML = "--------------------------------------";
        perkcontainer.appendChild(MessageText);
    }
    if (currentPlant.passiveperks.length == 0 && currentPlant.characterperk == "" && currentPlant.abilityperk == "") {
        MessageText = document.createElement("p");
        MessageText.className = "MessageText";
        MessageText.innerHTML = "You don't have any perks. When you get a perk, it will show here.";
        Message.appendChild(MessageText);
    }
}
function UpdateTurnCount() {
    if (IsPlayerTurn) {
        al = 0;
        ml = 0;
        if (CanAbility[0]) {
            al += 1;
        }
        if (CanAbility[1]) {
            al += 1;
        }
        if (CanMove) {
            ml = 1;
        }
        turncounter.innerHTML = currentPlant.name+"'s Turn: "+ml+" move left and "+al+" ability left";
    }
    else {
        turncounter.innerHTML = currentPlant.name+"'s Turn: 0 move left and 0 ability left";
    }
}
function UpdateTicks() { 
    offset = 0; 
    willoffset = false;
    for (z=0; z<ZombieArray.length+offset; ) { 
        z = z-offset;
        zombie = ZombieArray[z];
        if (zombie.tickgiver != "") {
            CreateConsoleText(zombie.name+" has taken "+zombie.tickgiver.effectDamage+" "+zombie.tickgiver.effectType+" damage.") 
            zombie.health -= Math.round(zombie.tickgiver.effectDamage*currentPlant.dmgmult);
            UpdatePassivePerks("everyattack",Math.round(zombie.tickgiver.effectDamage*currentPlant.dmgmult));
            if (zombie.health <= 0) {
                CreateConsoleText(currentPlant.name+" has vanquished "+zombie.name+".") 
                RemoveZombie(zombie); 
                zombiedead = true;
                CheckForWin();
                willoffset = true;
            }
            zombie.tickTimeLeft -= 1;
            if (zombie.tickTimeLeft <= 0 && zombie.health > 0) {
                fighterPhysArray[fighterArray.indexOf(zombie)].style.filter = "";
                zombie.tickgiver = "";
                zombie.dmgmult = 1;
            }
        }
        z += 1+offset;
        if (willoffset) {
            willoffset = false;
            offset += 1;
        }
    }
    updategrid();
}
function ApplyEffects(Fighter1,Fighter2,attack,direct=false) {
    let tt = "";
    let bonus = 0;
    if (direct && attack.effectDuration != attack.directEffectDuration) {
        bonus = 1;
    }
    if (attack.effectDuration == 1) {
        tt = "one turn";
    }
    if (attack.effectDuration+bonus == 2) {
        tt = "two turns";
    }
    if (attack.effectDuration+bonus == 3) {
        tt = "three turns";
    }
    if (attack.effectType == "frozen") {
        if (Fighter2.plant)  {
            if (Fighter2.effectCooldown <= 0) {
                CreateConsoleText(Fighter1.name+" has frozen "+Fighter2.name+" for one turn.");
                fighterPhysArray[fighterArray.indexOf(Fighter2)].style.filter = "opacity(0.5) drop-shadow(0 0 0 rgb(0, 204, 204)) drop-shadow(0 0 0 rgb(0, 204, 204)) drop-shadow(0 0 0 rgb(0, 204, 204)) saturate(225%)";
                Fighter2.stunned = true;
            }
        }
        else if (Fighter2.name != Yeti.name && Fighter2.name != YetiImp.name) {
            CreateConsoleText(Fighter1.name+" has frozen "+Fighter2.name+" for one turn.");
            fighterPhysArray[fighterArray.indexOf(Fighter2)].style.filter = "opacity(0.5) drop-shadow(0 0 0 rgb(0, 204, 204)) drop-shadow(0 0 0 rgb(0, 204, 204)) drop-shadow(0 0 0 rgb(0, 204, 204)) saturate(225%)";
            Fighter2.stunned = true;
        }
    }
    if (attack.effectType == "goop") {
        CreateConsoleText(Fighter1.name+" has gooped "+Fighter2.name+" for one turn.") 
        fighterPhysArray[fighterArray.indexOf(Fighter2)].style.filter = "opacity(0.5) drop-shadow(0 0 0 rgb(238,130,238)) drop-shadow(0 0 0 rgb(238,130,238)) drop-shadow(0 0 0 rgb(238,130,238)) saturate(225%)";
        Fighter2.stunned = true;
    }
    if (attack.effectType == "goop poison") {
        CreateConsoleText(Fighter1.name+" has gooped "+Fighter2.name+" for "+tt+".") 
        fighterPhysArray[fighterArray.indexOf(Fighter2)].style.filter = "opacity(0.5) drop-shadow(0 0 0 rgb(238,130,238)) drop-shadow(0 0 0 rgb(238,130,238)) drop-shadow(0 0 0 rgb(238,130,238)) saturate(225%)";
        Fighter2.stunned = true;
        Fighter2.tickgiver = attack;
    }
    if (attack.effectType == "fire") {
        CreateConsoleText(Fighter1.name+" has lit "+Fighter2.name+" on fire for "+tt+".") 
        fighterPhysArray[fighterArray.indexOf(Fighter2)].style.filter = "opacity(0.5) drop-shadow(0 0 0 rgb(255,153,51)) drop-shadow(0 0 0 rgb(255,153,51)) drop-shadow(0 0 0 rgb(255,153,51)) saturate(225%)";
        Fighter2.tickgiver = attack;
        Fighter2.tickTimeLeft = attack.effectDuration;
    }
    if (attack.effectType == "toxic") {
        CreateConsoleText(Fighter1.name+" has intoxicated "+Fighter2.name+" for "+tt+".") 
        fighterPhysArray[fighterArray.indexOf(Fighter2)].style.filter = "opacity(0.5) drop-shadow(0 0 0 rgb(173,255,47)) drop-shadow(0 0 0 rgb(173,255,47)) drop-shadow(0 0 0 rgb(173,255,47)) saturate(225%)";
        Fighter2.tickgiver = attack;
        Fighter2.tickTimeLeft = attack.effectDuration;
        Fighter2.dmgmult = attack.effectBonus;
        if (direct) {
            Fighter2.tickTimeLeft = attack.directEffectDuration;
        }
        else {
            Fighter2.tickTimeLeft = attack.effectDuration;
        }
    }
    if (attack.effectType == "electrocute") {
        CreateConsoleText(Fighter1.name+" has electrocuted "+Fighter2.name+" for one turn.") 
        fighterPhysArray[fighterArray.indexOf(Fighter2)].style.filter = "opacity(0.5) drop-shadow(0 0 0 rgb(0,0,0)) drop-shadow(0 0 0 rgb(0,0,0)) drop-shadow(0 0 0 rgb(0,0,0)) saturate(225%)";
        Fighter2.stunned = true;
    }
    Fighter2.understatus = true;
}
function findEntry(gname) {
    for (ae in AlmEntries) {
        if (AlmEntries[ae].name == gname) {
            return AlmEntries[ae];
        }
    }
}
function makeEntry(fighter,desc,flavour) {
    NE = new AlmEntry();
    NE.name = fighter.name;
    NE.image = fighter.aliveSprite;
    NE.desc = desc;
    if (fighter.underShield != "") {
        NE.stats = "Health: "+fighter.health+" ("+fighter.name.split(" ")[0]+") + "+fighter.underShield.health+" ("+fighter.underShield.name+")"+"<br>Abilities: "+fighter.attacks[0].name;
    }
    else {
        NE.stats = "Health: "+fighter.health+"<br>Abilities: "+fighter.attacks[0].name;
    }
    for (a in fighter.attacks) {
        if (a == 0) {
            continue;
        }
        NE.stats += ", "+fighter.attacks[a].name;
    }
    for (s in fighter.supports) {
        NE.stats += ", "+fighter.supports[s].name;
    }
    NE.flavour = flavour;
    AlmEntries.push(NE);
}
function ResetPerks() {
    currentPlant.effectCooldown = 0;
    Yeti.dmgmult = 1;
    YetiImp.dmgmult = 1;
    currentPlant.dmgmult = 1;
    for (attack in currentPlant.attacks) {
        attack = currentPlant.attacks[attack];
        if (attack.effectType == "frozen") {
            attack.effectChance -= ColdResist.values2[ColdResist.level-1];
            if (attack.effectChance <= 0) {
                attack.effectChance = 0;
                attack.effectType = "";
            }
        }
    }
    for (attack in attacksToFix) {
        attacksToFix[attack].accuracyoffset = 0;
    }
}
function UpdatePassivePerks(perkrate,value=false) {
    rv = null; 
    for (perk in currentPlant.passiveperks) {
        perk = currentPlant.passiveperks[perk];
        if (perk.updaterate == "everyturn" && perk.updaterate == perkrate) {
            if (perk.type == "heal" && currentPlant.permhealth-currentPlant.health != 0) {
                if (currentPlant.health+perk.values[perk.level-1] > currentPlant.permhealth) {
                    CreateConsoleText(currentPlant.name+" has healed for "+(currentPlant.permhealth-currentPlant.health)+" health.")
                    currentPlant.health = Object.assign(currentPlant.permhealth);
                    planthealth.innerHTML = Object.assign(currentPlant.health);
                }
                else {
                    CreateConsoleText(currentPlant.name+" has healed for "+perk.values[perk.level-1]+" health.")
                    currentPlant.health += perk.values[perk.level-1];
                    planthealth.innerHTML = Object.assign(currentPlant.health);
                }
                if (currentPlant.health > currentPlant.permhealth/3 && CriticalStage) {
                    CriticalStage = false;
                    hi.src = "HealthIcon1.PNG";
                    currentPlant.dmgmult = 1;
                    UpdatePassivePerks("criticalphase");
                    PlantTurnTheme.sound.currentTime = CriticalTheme.sound.currentTime;
                    MusicFade(CriticalTheme, PlantTurnTheme);
                }
            }
        }
        else if (perk.updaterate == "everyattack" && perk.updaterate == perkrate) {
            if (perk.type == "heal" && currentPlant.permhealth-currentPlant.health != 0) {
                hpgain = Math.round(value*currentPlant.dmgmult*perk.values[perk.level-1])
                if (currentPlant.health+hpgain > currentPlant.permhealth) {
                    CreateConsoleText(currentPlant.name+" has healed for "+(currentPlant.permhealth-currentPlant.health)+" health.")
                    currentPlant.health = Object.assign(currentPlant.permhealth);
                    planthealth.innerHTML = Object.assign(currentPlant.health);
                }
                else {
                    CreateConsoleText(currentPlant.name+" has healed for "+hpgain+" health.")
                    currentPlant.health += hpgain;
                    planthealth.innerHTML = Object.assign(currentPlant.health);
                }
                if (currentPlant.health > currentPlant.permhealth/3 && CriticalStage) {
                    CriticalStage = false;
                    hi.src = "HealthIcon1.PNG";
                    currentPlant.dmgmult = 1;
                    UpdatePassivePerks("criticalphase");
                    PlantTurnTheme.sound.currentTime = CriticalTheme.sound.currentTime;
                    MusicFade(CriticalTheme, PlantTurnTheme);
                }
            }
        }
        else if (perk.updaterate == "onetime" && perk.updaterate == perkrate) {
            if (perk.type == "iceimmunity") {
                currentPlant.effectCooldown = 99;
                Yeti.dmgmult = perk.values[perk.level-1];
                YetiImp.dmgmult = perk.values[perk.level-1]; 
                if (perk.used) {
                    continue;
                }
                if (perk.level == 3) {
                    perk.used = true;
                }
                for (attack in currentPlant.attacks) {
                    attack = currentPlant.attacks[attack];
                    if (attack.effectType == "frozen") {
                        attack.effectChance += perk.values2[perk.level-1];
                    }
                    else if (attack.effectType == "") {
                        attack.effectType = "frozen";
                        attack.effectChance = perk.values2[perk.level-1]/attack.shots;
                    }
                }
                SaveGame();
            }
        }
        else if (perk.updaterate == "enemyattack" && perk.updaterate == perkrate) {
            if (perk.type == "misschance" && value.accuracyoffset == 0) {
                if (CriticalStage) {
                    value.accuracyoffset -= perk.values2[perk.level-1];
                    attacksToFix.push(value);
                }
                value.accuracyoffset -= perk.values[perk.level-1];
                attacksToFix.push(value);
            }
        }
        else if (perk.updaterate == "everymove" && perk.updaterate == perkrate) {
            CreateConsoleText(currentPlant.name+" has bumped into "+value.name+" for "+Math.floor(perk.values[perk.level-1]*currentPlant.dmgmult)+" damage."); 
            value.health -= Math.floor(perk.values[perk.level-1]*currentPlant.dmgmult);
            UpdatePassivePerks("everyattack",Math.floor(perk.values[perk.level-1]*currentPlant.dmgmult));
            if (value.health <= 0) {
                CreateConsoleText(currentPlant.name+" has vanquished "+value.name+".") 
                if (value.underShield == "")
                    rv = "kill";
                else {
                    rv = "hit";
                }
                RemoveZombie(value);
                CheckForWin();
            }
            else {
                rv = "hit";
            }
        }
        else if (perkrate == "everymove" && rv == null) {
            rv = "miss";
        }
        else if (perkrate == "criticalphase" && perk.updaterate == "criticalphase") {
            if (perk.type == "damagemult") { 
                if (!(CriticalStage)) {
                    currentPlant.dmgmult = 1; 
                }
                else {
                    currentPlant.dmgmult = perk.values[perk.level-1];
                }
            }
        }
    }
    if (rv != null) {
        return rv
    }
    else {
        return "miss";
    }
}
class PassivePerk {
    constructor() {
        this.name = ""; //fucked 
        this.desc = ""; //up  
        this.level = 1; //in
        this.levelstats = []; //the
        this.values = [0,0,0]; //crib
        this.values2 = [0,0,0]; //sipping
        this.updaterate = ""; //Dr.
        this.type = ""; //Perky
        this.used = false; //yo
        this.sprite = ""; //Dr. Perky > Sprite
    }
}
passivePerks = [];
attacksToFix = [];
SelfHeal = new PassivePerk();
SelfHeal.name = "Happy Heart";
SelfHeal.desc = "Regain a small amount of health at the start of your turn.";
SelfHeal.levelstats = ["Health Gained: 10","Health Gained: 20","Health Gained: 35"]
SelfHeal.values = [10,20,35];
SelfHeal.updaterate = "everyturn";
SelfHeal.type = "heal";
SelfHeal.sprite = "SelfHeal.PNG"
passivePerks.push(SelfHeal);
SuckHeal = new PassivePerk();
SuckHeal.name = "HP Drain";
SuckHeal.desc = "Convert a fraction of the damage you deal into health.";
SuckHeal.levelstats = ["DtH Conversion: 10%","DtH Conversion: 17%","DtH Conversion: 25%"]
SuckHeal.values = [0.1,0.17,0.25];
SuckHeal.updaterate = "everyattack";
SuckHeal.type = "heal";
SuckHeal.sprite = "SuckHeal.PNG"
passivePerks.push(SuckHeal);
ColdResist = new PassivePerk();
ColdResist.name = "Ice Guard";
ColdResist.desc = "Grants immunity to being frozen.";
ColdResist.levelstats = ["Immunity to being frozen.","Ice and Cold based attacks do no damage.","All attacks that don't currently apply an effect have an added 25% chance to freeze zombies."]
ColdResist.values = [1,0,0];
ColdResist.values2 = [0,0,25];
ColdResist.updaterate = "onetime";
ColdResist.type = "iceimmunity";
ColdResist.sprite = "IceGuard.PNG"
passivePerks.push(ColdResist);
LessAccuracy = new PassivePerk();
LessAccuracy.name = "Pretty Lucky";
LessAccuracy.desc = "Enemies will miss their attacks more often.";
LessAccuracy.levelstats = ["Chance to miss: +7%","Chance to miss: +14%","Chance to miss: +21%"]
LessAccuracy.values = [7,14,21];
LessAccuracy.updaterate = "enemyattack";
LessAccuracy.type = "misschance";
LessAccuracy.sprite = "PrettyLucky.PNG"
passivePerks.push(LessAccuracy);
BumpAttack = new PassivePerk();
BumpAttack.name = "Bump Attack";
BumpAttack.desc = "Deal damage to enemies by trying to move onto their tile. (This will consume a movement turn)";
BumpAttack.levelstats = ["Damage: 25","Damage: 35","Damage: 50"]
BumpAttack.values = [25,35,50];
BumpAttack.updaterate = "everymove";
BumpAttack.type = "damage";
BumpAttack.sprite = "BumpAttack.PNG"
passivePerks.push(BumpAttack);
MegaRush = new PassivePerk();
MegaRush.name = "Mega Rush";
MegaRush.desc = "When in danger, your attack power rises significantly.";
MegaRush.levelstats = ["x2 multiplier","x2.5 multiplier","x3 multiplier"]
MegaRush.values = [2,2.5,3];
MegaRush.updaterate = "criticalphase";
MegaRush.type = "damagemult";
MegaRush.sprite = "MegaRush.PNG"
passivePerks.push(MegaRush);
LastStand = new PassivePerk();
LastStand.name = "Last Stand";
LastStand.desc = "When in danger, Enemies are much more likely to miss their attacks.";
LastStand.levelstats = ["Chance to miss: +20%","Chance to miss: +25%","Chance to miss: +33%"]
LastStand.values2 = [20,25,33];
LastStand.updaterate = "enemyattack";
LastStand.type = "misschance";
LastStand.sprite = "LastStand.PNG"
passivePerks.push(LastStand); 
class AlmEntry {
    constructor() {
        this.name =  "";
        this.desc = "";
        this.image = "";
        this.stats = "";
        this.flavour = ""; //mmm spicy
    }
}
class griditem {
    constructor() {
        this.codx = 0; //x pos in terms of the grid
        this.cody = 0;//y pos in terms of the grid
        this.sprite = "";
        this.character = ""; //the character on the grid spot
    }
}
class AttackType {
    constructor() {
        this.damage = 0;
        this.selfDamage = 0;
        this.splashDamage = 0;
        this.name = "";
        this.desc = ""; //only for chomper's abilities
        this.range = 0; //how many squares it travels
        this.splashRadius = 0; //the radius of the splash damage
        this.shots = 1; //how many times the attack triggers
        this.shotsLeft = 1;
        this.accuracy = 101; //percentage
        this.accuracyoffset = 0;
        this.pierces = false;
        this.reloadTime = -1; //how many turns it takes until it's ready again
        this.TimeUntilReady = 0;
        this.STUP = 0;
        this.effectChance = 0; //percent chance to stun
        this.effectType = "";
        this.effectDamage = 0; //only applue to dmg tick
        this.effectDuration = 0; //ditto (clay)
        this.directEffectDuration = 0; //phryjming is col
        this.effectBonus = 0; //bonus stuff.. during effect is goin on
        this.displaySprite = ""; //sprite displaying ability
    }
}
class SupportType {
    constructor() {
        this.type = "";
        this.name = "";
        this.zombie = ""; //the zombie to summon
        this.coords = []; //the coordinates of the zombies in comparision to the base zombie
        this.reloadTime = -1; //how many turns it takes until it's ready again
        this.TimeUntilReady = 0;
    }
}
class Fighter {
    constructor() {
        this.name = "";
        this.plant = false; //determine if it's a plant or zombie, boolean because idk :/
        this.health = 0;
        this.permhealth = 0;
        this.height = 0; //how tall it is
        this.wb = 1; //for setting zombies right idk this program is horribly designed
        this.chewing = false; //onlu applies to ac
        this.canBeEaten = true;
        this.allergy = false;
        this.chewingtime = 1;
        this.underShield = "";
        this.powerLevel = 0; //To compare strengths between fighters
        this.movement = 1; //how many squares it can move
        this.understatus = false; //if the fighter is under a status or not
        this.effectCooldown = 0;
        this.stunned = false; //Im stuff
        this.tickgiver = ""; //how many variables are there jeez
        this.tickTimeLeft = 0;
        this.coords = []; //x and y positions on the grid
        this.attacks = []; //what attacks this character has
        this.supports = [];
        this.dmgmult = 1; //damage multiplieer
        this.passiveperks = [];
        this.characterperk = "";
        this.abilityperk = "";
        this.movesLeft = 0;
        this.aliveSprite = ""; //hmm why is this specified to be alive? unless..
        this.iconSprite = "";

    }
}
AlmEntries = [];
function clone(obj) {
    return Object.create(
      Object.getPrototypeOf(obj), 
      Object.getOwnPropertyDescriptors(obj) 
    );
}
fighterArray = [];
BossWaves = [];
//chopper
Goop = new AttackType();
Goop.name = "Goop";
Goop.desc = "Spit your slobber at a zombie to cover them in sticky goop that stops them from moving or attacking. <br>Dmg: 25 ∫ Splash Dmg: 15 ∫ Splash Radius: 3 by 3 ∫ Range: 4 spaces ∫ Cooldown: 2 turns ∫ Stuns for 1 turn";
Goop.damage = 25;
Goop.range = 4;
Goop.reloadTime = 2;
Goop.effectChance = 101;
Goop.effectType = "goop";
Goop.splashDamage = 15;
Goop.splashRadius = 3;
Goop.displaySprite = "GoopIcon.PNG";
Chomp = new AttackType();
Chomp.name = "Chomp";
Chomp.desc = "Bite a zombie with your sharp metal teeth. <br>Dmg: 75 ∫ Range: Melee (1 space) ∫ No cooldown";
Chomp.damage = 75;
Chomp.range = 1;
Chomp.displaySprite = "ChompIcon.PNG";
Seed = new AttackType();
Seed.name = "Seed Spit";
Seed.desc = "Armor Chomper chews up some seeds and spits them out at the zombies. <br>Dmg: 25 per seed ∫ fires 3 seeds ∫ Range: 6 spaces ∫ Cooldown: 2 turns";
Seed.damage = 25;
Seed.range = 6;
Seed.reloadTime = 2;
Seed.shots = 3;
Seed.displaySprite = "SeedSpitIcon.PNG";
Swallow = new AttackType();
Swallow.name = "Swallow";
Swallow.desc = "Open up your mouth and eat the zombie in front of you. <br>Dmg: Infinite ∫ Range: Melee (1 space) ∫ Cooldown: 1 turn ∫ Armor Chomper cannot attack for 1 turn";
Swallow.range = 1;
Swallow.reloadTime = 1;
Swallow.displaySprite = "SwallowIcon.PNG";
AC = new Fighter();
AC.plant = true;
AC.name = "Armor Chomper";
AC.health = 225;
AC.permhealth = 225;
AC.powerLevel = 9001;
AC.height = "30%";
AC.chewingtime = 0;
AC.attacks.push(Chomp,Swallow,Goop,Seed); 
AC.primaries = [Chomp,Swallow];
AC.aliveSprite = "ArmorChomper.PNG";
AC.iconSprite = "PlantLeft.PNG";
//peashitter
Pea = new AttackType();
Pea.name = "Rock Shot"; 
Pea.desc = "Rock Pea shoots a large rock that bonks on a zombie. <br>Dmg: 50 ∫ Range: 4 spaces ∫ No cooldown";
Pea.damage = 50;
Pea.range = 4;
Pea.displaySprite = "PeaIcon.PNG";
Gatling = new AttackType();
Gatling.name = "Pea Gatling";
Gatling.desc = "Rock Pea puts on his gatling helmet and fires a bunch of small peas at the zombies. <br>Dmg: 10 per pea ∫ Fires 10 peas ∫ Range: 7 spaces ∫ Cooldown: 2 turns";
Gatling.damage = 10;
Gatling.range = 7;
Gatling.shots = 10;
Gatling.reloadTime = 2;
Gatling.displaySprite = "GatlingIcon.PNG";
Bean = new AttackType();
Bean.name = "Bean Bomb";
Bean.desc = "Rock Pea tosses out an explosive bean that is sure to reduce the zombies to ash. <br>Dmg: 150 ∫ Splash Dmg: 75 ∫ Splash Dmg radius: 3 by 3 ∫ Range: Melee (2 spaces) ∫ Cooldown: 3 turns";
Bean.damage = 150;
Bean.splashDamage = 75;
Bean.splashRadius = 3;
Bean.range = 2;
Bean.reloadTime = 3;
Bean.displaySprite = "BeanIcon.PNG";
Peashoot = new Fighter();
Peashoot.plant = true;
Peashoot.name = "Rock Pea";
Peashoot.health = 150;
Peashoot.permhealth = 150;
Peashoot.powerLevel = 9001;
Peashoot.height = "26%";
Peashoot.chewingtime = 0;
Peashoot.attacks.push(Pea,Gatling,Bean); 
Peashoot.primaries = [Pea];
Peashoot.aliveSprite = "RockPea.PNG";
Peashoot.iconSprite = "PlantRight.PNG";
//cocktus
Shatter = new AttackType();
Shatter.name = "Shatter Shot"; 
Shatter.desc = "Rock Pea shoots a large rock that bonks on a zombie. <br>Dmg: 50 ∫ Range: 4 spaces ∫ No cooldown";
Shatter.damage = 40;
Shatter.splashDamage = 10;
Shatter.splashRadius = 3;
Shatter.range = 6;
Shatter.displaySprite = "ShatterIcon.PNG";
// Primary: Shatter Shot - Fire a Jade thorn at a Zombie that explodes into fragments when it hits. (Range: 6 Tiles, 3x3 splash) (Damage: 40 Direct, 10 Splash)

// Ability 1: Enhanced Precision - Your primary attack will do double the damage next time you use it. (Cooldown: 3 turns) (Charges do not stack)
// Ability 2: Corn Strike - Click anywhere on the board to activate a Corn Strike there. (3x3 Splash, 100 Damage Direct, 50 Splash) (Cooldown: 3 Turns)
JadeCac = new Fighter();
JadeCac.plant = true;
JadeCac.name = "Jade Cactus";
JadeCac.health = 150;
JadeCac.permhealth = 150;
JadeCac.powerLevel = 9001;
JadeCac.height = "28%";
JadeCac.chewingtime = 0;
JadeCac.attacks.push(Shatter); 
JadeCac.primaries = [Shatter];
JadeCac.aliveSprite = "JadeCactus.PNG";
JadeCac.iconSprite = "JadeRight.PNG";
currentPlant = AC;
plantArray = [AC,Peashoot,JadeCac];
class CharOrAbilityPerk {
    constructor() {
        this.name = "";  
        this.desc = "Uh Oh. The description didn't load! This is not supposed to happen.";  
        this.newdescs = [];
        this.level = 1; 
        this.levelstats = []; 
        this.values = [0,0,0]; 
        this.values2 = [0,0,0]; 
        this.values3 = [0,0,0];
        this.newabilities = []; 
        this.sprite = ""; 
        this.plantName = "";
        this.removeprimary = true;
    }
}
abilityPerks = [];
characterPerks = [];
DarkBean = new AttackType();
DarkBean.name = "Dark Bean Bomb"; 
DarkBean.damage = 75;
DarkBean.range = 2;
DarkBean.splashDamage = 25;
DarkBean.splashRadius = 3;
DarkBean.reloadTime = 2;
DarkBean.displaySprite = "DarkBeanIcon.PNG";
DarkBeanPerk = new CharOrAbilityPerk();
DarkBeanPerk.name = "Dark Bean Bomb";
DarkBeanPerk.desc = "(Only usable by Rock Pea) Gain a new ability, Dark Bean Bomb. Dark Bean Bomb is a less powerful, but more easily spammed version of Bean Bomb. (Does not replace reg Bean Bomb)";
DarkBeanPerk.newdescs = [["Rock Pea tosses out a smaller, purple bean that does less damage. <br>Dmg: 75 ∫ Splash Dmg: 25 ∫ Splash Radius: 3 by 3 ∫ Range: 2 spaces ∫ Cooldown: 2 turns",
"Rock Pea tosses out a smaller, purple bean that does less damage. <br>Dmg: 75 ∫ Splash Dmg: 25 ∫ Splash Radius: 3 by 3 ∫ Range: 4 spaces ∫ Cooldown: 2 turns",
"Rock Pea tosses out a smaller, purple bean that does less damage. <br>Dmg: 75 ∫ Splash Dmg: 50 ∫ Splash Radius: 3 by 3 ∫ Range: 4 spaces ∫ Cooldown: 2 turns"]];
DarkBeanPerk.levelstats = ["(Range: 2 Tiles, 3x3 radius) (75 Damage Direct, 25 Splash) (Cooldown: 2 turns)","Range extended to 4 tiles","Splash damage increased to 50"];
DarkBeanPerk.values = [2,4,4];
DarkBeanPerk.values2 = [25,25,50];
DarkBeanPerk.newabilities = [DarkBean];
DarkBeanPerk.sprite = "DarkBeanPerk.PNG";
DarkBeanPerk.plantName = "Rock Pea";
DarkBeanPerk.removeprimary = false;
abilityPerks.push(DarkBeanPerk); 
GrodyGoop = new AttackType();
GrodyGoop.name = "Grody Goop"; 
GrodyGoop.damage = 30;
GrodyGoop.range = 4;
GrodyGoop.splashDamage = 30;
GrodyGoop.splashRadius = 3;
GrodyGoop.effectChance = 101;
GrodyGoop.effectType = "toxic";
GrodyGoop.effectDamage = 10;
GrodyGoop.effectDuration = 2;
GrodyGoop.directEffectDuration = 2;
GrodyGoop.effectBonus = 1;
GrodyGoop.reloadTime = 3;
GrodyGoop.displaySprite = "GrodyGoopIcon.PNG";
GrodyGoopPerk = new CharOrAbilityPerk();
GrodyGoopPerk.name = "Grody Goop";
GrodyGoopPerk.desc = "(Only usable by Armor Chomper) Gain a new ability, Grody Goop. Grody Goop intoxicates groups of zombies, dealing toxic damage over time. (Does not replace reg Goop)";
GrodyGoopPerk.newdescs = [["Armor Chomper gags up a toxic spit and launches it towards the Zombie horde. <br>Dmg: 30 ∫ Splash Dmg: 30 ∫ Splash Radius: 3 by 3 ∫ Toxic Dmg: 10 ∫ Toxic Duration: 2 turns ∫ Range: 4 spaces ∫ Cooldown: 3 turns",
"Armor Chomper gags up a toxic spit and launches it towards the Zombie horde. <br>Dmg: 30 ∫ Splash Dmg: 30 ∫ Splash Radius: 3 by 3 ∫ Toxic Dmg: 10 ∫ Toxic Duration (Direct hit): 3 turns ∫ Toxic Duration (Splash): 2 turns ∫ Range: 4 spaces ∫ Cooldown: 3 turns",
"Armor Chomper gags up a toxic spit and launches it towards the Zombie horde. <br>Dmg: 30 ∫ Splash Dmg: 30 ∫ Splash Radius: 3 by 3 ∫ Toxic Dmg: 10 ∫ Dmg reduction from being intoxicated: 50% ∫ Toxic Duration (Direct hit): 3 turns ∫ Toxic Duration (Splash): 2 turns ∫ Range: 4 spaces ∫ Cooldown: 3 turns"]];
GrodyGoopPerk.levelstats = ["(Range: 4 Tiles, 3x3 radius) (Intoxicates Zombies, dealing DoT) (Direct and Splash Damage: 30, Tick Damage: 10) (Toxic Tick duration: 2 turns) (Cooldown: 3 turns)","Direct hit with Grody Goop intoxicates a Zombie for 3 turns.","Zombies intoxicated do 50% less damage."];
GrodyGoopPerk.values = [2,3,3];
GrodyGoopPerk.values2 = [1,1,0.5];
GrodyGoopPerk.newabilities = [GrodyGoop];
GrodyGoopPerk.sprite = "GrodyGoopPerk.PNG";
GrodyGoopPerk.plantName = "Armor Chomper";
GrodyGoopPerk.removeprimary = false;
abilityPerks.push(GrodyGoopPerk); 
FireShot = new AttackType();
FireShot.name = "Scorch Shot"; 
FireShot.damage = 50;
FireShot.range = 4;
FireShot.splashDamage = 10;
FireShot.effectChance = 33;
FireShot.effectType = "fire";
FireShot.effectDamage = 20;
FireShot.effectDuration = 2;
FireShot.directEffectDuration = 2;
FireShot.displaySprite = "FirePeaIcon.PNG";
FirePea = new CharOrAbilityPerk();
FirePea.name = "Scorch Shot";
FirePea.desc = "(Only usable by Rock Pea) Switches your current primary to Scorch Shot. Scorch Shot has a chance to light Zombies on fire, dealing damage to Zombies at the start of their turns.";
FirePea.newdescs = [["Rock Pea fires a molten hot rock at zombies, which can cause zombies to catch on fire. <br>Dmg: 50 ∫ Fire Dmg: 20 ∫ Burn Duration: 2 turns ∫ Burn Chance: 33% ∫ Range: 4 spaces ∫ No cooldown",
"Rock Pea fires a molten hot rock at zombies, which can cause zombies to catch on fire. <br>Dmg: 50 ∫ Fire Dmg: 20 ∫ Burn Duration: 2 turns ∫ Burn Chance: 66% ∫ Range: 4 spaces ∫ No cooldown",
"Rock Pea fires a molten hot rock at zombies, which can cause zombies to catch on fire. <br>Dmg: 50 ∫ Splash Dmg: 10 ∫ Splash Radius: 3 by 3 ∫ Fire Dmg: 20 ∫ Burn Duration: 2 turns ∫ Burn Chance: 66% ∫ Range: 4 spaces ∫ No cooldown"]];
FirePea.levelstats = ["(Range: 4 tiles) (Direct Damage: 50, Fire Damage: 20) (Burn duration: 2 turns) (Burn Chance: 33%)","Burn Chance increased to 66%","Gain a 3x3 Splash radius, dealing 10 damage with splash. Splashed zombies can be ignited."];
FirePea.values = [33,66,66];
FirePea.values2 = [0,0,3];
FirePea.newabilities = [FireShot];
FirePea.sprite = "FirePeaPerk.PNG";
FirePea.plantName = "Rock Pea";
characterPerks.push(FirePea); 
SludShot = new AttackType();
SludShot.name = "Sludgy Shot"; 
SludShot.damage = 50;
SludShot.range = 4;
SludShot.effectChance = 25;
SludShot.effectType = "goop poison";
SludShot.effectDamage = 25;
SludShot.effectDuration = 1;
SludShot.directEffectDuration = 1;
SludShot.displaySprite = "SludgePeaIcon.PNG";
SludgePea = new CharOrAbilityPerk();
SludgePea.name = "Sludgy Shot";
SludgePea.desc = "(Only usable by Rock Pea) Switches your current primary to Sludgy Shot. Sludgy Shot has a chance to \"Poison Goop\" Zombies, stunning them for 1 turn, and dealing damage to affected Zombies at the start of their turns.";
SludgePea.newdescs = [["Rock Pea fires a goopy rock that has a chance to goop and poison zombies. <br>Dmg: 50 ∫ Poison Goop Dmg: 25 ∫ Poison & Stun Duration: 1 turn ∫ Goop Chance: 25% ∫ Range: 4 spaces ∫ No cooldown",
"Rock Pea fires a goopy rock that has a chance to goop and poison zombies. <br>Dmg: 50 ∫ Poison Goop Dmg: 25 ∫ Poison & Stun Duration: 1 turn ∫ Goop Chance: 50% ∫ Range: 4 spaces ∫ No cooldown",
"Rock Pea fires a goopy rock that has a chance to goop and poison zombies. <br>Dmg: 50 ∫ Poison Goop Dmg: 25 ∫ Poison & Stun Duration: 2 turns ∫ Goop Chance: 50% ∫ Range: 4 spaces ∫ No cooldown"]];
SludgePea.levelstats = ["(Range: 4 tiles) (Damage: 50, DoT: 25) (Goop Chance: 25%) (DoT Duration: 1 turn)","Increase Goop chance to 50%","Increase DoT Duration and Stun Duration to 2 turns."];
SludgePea.values = [25,50,50];
SludgePea.values2 = [1,1,2];
SludgePea.newabilities = [SludShot];
SludgePea.sprite = "SludgePeaPerk.PNG";
SludgePea.plantName = "Rock Pea";
characterPerks.push(SludgePea); 
BerryShot = new AttackType();
BerryShot.name = "Berry Shot"; 
BerryShot.damage = 50;
BerryShot.range = 4;
BerryShot.splashDamage = 15;
BerryShot.splashRadius = 3;
BerryShot.displaySprite = "BerryPeaIcon.PNG";
BerryPea = new CharOrAbilityPerk();
BerryPea.name = "Berry Shot";
BerryPea.desc = "(Only usable by Rock Pea) Switches your current primary to Berry Shot. Berry Shot deals splash damage to nearby Zombies.";
BerryPea.newdescs = [["Rock Pea fires a bundle of berries that splash out onto zombies. <br>Dmg: 50 ∫ Splash Dmg: 15 ∫ Splash Radius: 3 by 3 ∫ Range: 4 spaces ∫ No cooldown",
"Rock Pea fires a bundle of berries that splash out onto zombies. <br>Dmg: 50 ∫ Splash Dmg: 25 ∫ Splash Radius: 3 by 3 ∫ Range: 4 spaces ∫ No cooldown",
"Rock Pea fires a bundle of berries that splash out onto zombies. <br>Dmg: 50 ∫ Splash Dmg: 25 ∫ Splash Radius: 5 by 5 ∫ Range: 4 spaces ∫ No cooldown"]];
BerryPea.levelstats = ["(Range: 4 tiles, 3x3 radius) (Direct Damage: 50, Splash: 15)","Splash increased to 25 damage","Splash radius increased to 5x5"];
BerryPea.values = [15,25,25];
BerryPea.values2 = [3,3,5];
BerryPea.newabilities = [BerryShot];
BerryPea.sprite = "BerryPeaPerk.PNG";
BerryPea.plantName = "Rock Pea";
characterPerks.push(BerryPea); 
SparkSpray = new AttackType();
SparkSpray.name = "Spark Spray"; 
SparkSpray.damage = 75;
SparkSpray.range = 2;
SparkSpray.splashDamage = 15;
SparkSpray.splashRadius = 3;
SparkSpray.effectChance = 0;
SparkSpray.effectType = "electrocute";
SparkSpray.effectDuration = 1;
SparkSpray.directEffectDuration = 1;
SparkSpray.displaySprite = "PowerChomperIcon.PNG";
PowerChomp = new CharOrAbilityPerk();
PowerChomp.name = "Spark Spray";
PowerChomp.desc = "(Only usable by Armor Chomper) Switches your current primary to Spark Spray. Spark Spray has a longer range, and will hit zombies near the first one it hits.";
PowerChomp.newdescs = [["Armor Chomper sprays electric sparks at zombies, which arc off onto nearby zombies. <br>Dmg: 75 ∫ Arc Dmg: 15 ∫ Arc Radius: 3 by 3 ∫ Range: 2 spaces ∫ No cooldown",
"Armor Chomper sprays electric sparks at zombies, which arc off onto nearby zombies. <br>Dmg: 75 ∫ Arc Dmg: 15 ∫ Arc Radius: 3 by 3 ∫ Electrocution chance: 10% ∫ Range: 2 spaces ∫ No cooldown",
"Armor Chomper sprays electric sparks at zombies, which arc off onto nearby zombies. <br>Dmg: 75 ∫ Arc Dmg: 25 ∫ Arc Radius: 5 by 5 ∫ Electrocution chance: 10% ∫ Range: 2 spaces ∫ No cooldown"]];
PowerChomp.levelstats = ["(Spray Range: 2 tiles, 3x3 radius) (Spray Direct Damage: 75, Splash: 15)","Gain a 10% chance to \"electrocute\" zombies, stunning them for one turn when dealing damage with Spark Spray.","Splash radius increased to 5x5, Arc damage increased to 25"];
PowerChomp.values = [0,11,11];
PowerChomp.values2 = [3,3,5];
PowerChomp.values3 = [15,15,25];
PowerChomp.newabilities = [SparkSpray,Swallow];
PowerChomp.sprite = "PowerChomperPerk.PNG";
PowerChomp.plantName = "Armor Chomper";
characterPerks.push(PowerChomp); 
ArcBelch = new AttackType();
ArcBelch.name = "Arctic Belch"; 
ArcBelch.damage = 75;
ArcBelch.range = 4;
ArcBelch.splashDamage = 5;
ArcBelch.effectChance = 25;
ArcBelch.effectType = "frozen";
ArcBelch.displaySprite = "YetiChomperIcon.PNG";
YetiChomp = new CharOrAbilityPerk();
YetiChomp.name = "Arctic Belch";
YetiChomp.desc = "(Only usable by Armor Chomper) Switches your current primary to Arctic Belch. Arctic Belch has a longer range, and can freeze Zombies.";
YetiChomp.newdescs = [["Armor Chomper hacks up a frozen rock from his winter vacation, which can freeze zombies. <br>Dmg: 75 ∫ Freeze chance: 25% ∫ Range: 4 spaces ∫ No cooldown",
"Armor Chomper hacks up a frozen rock from his winter vacation, which can freeze zombies. <br>Dmg: 75 ∫ Freeze chance: 25% ∫ Range: 6 spaces ∫ No cooldown",
"Armor Chomper hacks up a frozen rock from his winter vacation, which can freeze zombies. <br>Dmg: 75 ∫ Splash Dmg: 5 ∫ Splash Radius: 3 by 3 ∫ Freeze chance: 50% ∫ Range: 6 spaces ∫ No cooldown"]];
YetiChomp.levelstats = ["(Belch Range: 4 tiles) (Damage: 75) (Freeze Chance: 25%)","Range increased to 6 tiles","Arctic Belch gains 3x3 splash, hitting for 5 damage and can freeze. Freeze Chance buffed to 50%"];
YetiChomp.values = [4,6,6];
YetiChomp.values2 = [0,0,3];
YetiChomp.values3 = [25,25,50];
YetiChomp.newabilities = [ArcBelch,Swallow];
YetiChomp.sprite = "YetiChomperPerk.PNG";
YetiChomp.plantName = "Armor Chomper";
characterPerks.push(YetiChomp);
FireBelch = new AttackType();
FireBelch.name = "Flame Belch"; 
FireBelch.damage = 75;
FireBelch.range = 2;
FireBelch.effectChance = 33;
FireBelch.effectType = "fire";
FireBelch.effectDamage = 15;
FireBelch.effectDuration = 2;
FireBelch.directEffectDuration = 2;
FireBelch.displaySprite = "FireChomperIcon.PNG";
FireChomp = new CharOrAbilityPerk();
FireChomp.name = "Flame Belch";
FireChomp.desc = "(Only usable by Armor Chomper) Switches your current primary to Flame Belch. Flame Belch has extra range, and has a chance to light Zombies on fire, dealing damage to them at the start of their turns.";
FireChomp.newdescs = [["Armor Chomper sprays fire out of his mouth, melting the zombies while not melting his stainless steel suit. <br>Dmg: 75 ∫ Fire Dmg: 20 ∫ Burn Duration: 2 turns ∫ Burn Chance: 33% ∫ Range: 2 spaces ∫ No cooldown",
"Armor Chomper sprays fire out of his mouth, melting the zombies while not melting his stainless steel suit. <br>Dmg: 75 ∫ Fire Dmg: 20 ∫ Burn Duration: 2 turns ∫ Burn Chance: 33% ∫ Pierces through Zombies ∫ Range: 2 spaces ∫ No cooldown",
"Armor Chomper sprays fire out of his mouth, melting the zombies while not melting his stainless steel suit. <br>Dmg: 75 ∫ Fire Dmg: 20 ∫ Burn Duration: 2 turns ∫ Burn Chance: 75% ∫ Pierces through Zombies ∫ Range: 2 spaces ∫ No cooldown"]];
FireChomp.levelstats = ["(Belch Range: 2 tiles) (Belch damage: 75, Burn damage: 15) (Burn Duration: 2 turns) (Burn Chance: 33%)","Belch now pierces, hitting all zombies in range.","Burn Chance increased to 75%"];
FireChomp.values = [false,true,true]; 
FireChomp.values2 = [33,33,75];
FireChomp.newabilities = [FireBelch,Swallow];
FireChomp.sprite = "FireChomperPerk.PNG";
FireChomp.plantName = "Armor Chomper";
characterPerks.push(FireChomp); 
function ApplyCharOrAbilityPerk(cp) { //haha funni child secks
    if (cp.name == "Scorch Shot" || cp.name == "Spark Spray") {
        cp.newabilities[0].effectChance = cp.values[cp.level-1];
        cp.newabilities[0].splashRadius = cp.values2[cp.level-1];
    }
    if (cp.name == "Spark Spray") {
        cp.newabilities[0].splashDamage = cp.values3[cp.level-1];
    }
    if (cp.name == "Arctic Belch") {
        cp.newabilities[0].range = cp.values[cp.level-1];
        cp.newabilities[0].splashRadius = cp.values2[cp.level-1];
        cp.newabilities[0].effectChance = cp.values3[cp.level-1];
    }
    if (cp.name == "Flame Belch") {
        cp.newabilities[0].pierces = cp.values[cp.level-1];
        cp.newabilities[0].effectChance = cp.values2[cp.level-1];
    }
    if (cp.name == "Sludgy Shot") {
        cp.newabilities[0].effectChance = cp.values[cp.level-1];
        cp.newabilities[0].effectDuration = cp.values2[cp.level-1];
        cp.newabilities[0].directEffectDuration = cp.values2[cp.level-1];
    }
    if (cp.name == "Berry Shot") {
        cp.newabilities[0].splashDamage = cp.values[cp.level-1];
        cp.newabilities[0].splashRadius = cp.values2[cp.level-1];
    }
    if (cp.name == "Dark Bean Bomb") {
        cp.newabilities[0].range = cp.values[cp.level-1];
        cp.newabilities[0].splashDamage = cp.values2[cp.level-1];
    }
    if (cp.name == "Grody Goop") {
        cp.newabilities[0].directEffectDuration = cp.values[cp.level-1];
        cp.newabilities[0].effectBonus = cp.values2[cp.level-1]; 
    }
    if (cp.removeprimary) {
        for (p in currentPlant.primaries) {
            currentPlant.attacks[p] = cp.newabilities[p];
        }
        for (ab in cp.newabilities) {
            if (ab < cp.newdescs.length) {
                currentPlant.attacks[ab].desc = cp.newdescs[ab][cp.level-1];
            }
        }
        currentPlant.characterperk = cp;
    }
    else {
        if (cp.level != 1) {
            currentPlant.attacks.pop();
        }
        currentPlant.attacks.push(cp.newabilities[0]);
        currentPlant.attacks[currentPlant.attacks.length-1].desc = cp.newdescs[0][cp.level-1];
        currentPlant.abilityperk = cp;
    }
}
//ApplyCharOrAbilityPerk(FireChomp);
//zombie attacks 
Bite = new AttackType();
Bite.name = "Bite";
Bite.damage = 25;
Bite.range = 1;
AnkBite = new AttackType();
AnkBite.name = "Ankle Bite";
AnkBite.damage = 20;
AnkBite.range = 1;
Rock = new AttackType();
Rock.name = "Rock";
Rock.damage = 10;
Rock.range = 3;
Rock.accuracy = 75;
Rock.reloadTime = 1;
Gun = new AttackType();
Gun.name = "Bullet Fire";
Gun.damage = 20;
Gun.range = 5;
Gun.shots = 2;
Gun.accuracy = 60;
Gun.reloadTime = 1;
Fists = new AttackType();
Fists.name = "Fist Fight";
Fists.damage = 35;
Fists.range = 1;
Snowball = new AttackType();
Snowball.name = "Snowball";
Snowball.damage = 10;
Snowball.range = 4;
Snowball.effectChance = 20;
Snowball.effectType = "frozen";
Snowball.accuracy = 90;
FrostTouch = new AttackType();
FrostTouch.name = "Frosty Touch";
FrostTouch.damage = 20;
FrostTouch.range = 1;
FrostTouch.effectChance = 101;
FrostTouch.effectType = "frozen";
FrostTouch.reloadTime = 2;
PoleSmash = new AttackType();
PoleSmash.name = "Pole Smash";
PoleSmash.damage = 75;
PoleSmash.range = 2;
PoleSmash.reloadTime = 1;
ImpThrow = new AttackType();
ImpThrow.name = "Exploding Imp Toss";
ImpThrow.damage = 35;
ImpThrow.range = 6;
ImpThrow.reloadTime = 2;
ImpThrow.accuracy = 85;
Football = new AttackType();
Football.name = "Football Fling";
Football.damage = 25;
Football.range = 5;
Football.reloadTime = 1;
Football.accuracy = 85;
Door = new AttackType();
Door.name = "Screen Door Smack";
Door.damage = 30;
Door.range = 1;
Door.reloadTime = 1;
Paper = new AttackType();
Paper.name = "Paper Ball";
Paper.damage = 5;
Paper.accuracy = 95;
Paper.range = 4;
RageBite = new AttackType();
RageBite.name = "Angry Bite"
RageBite.damage = 50;
RageBite.range = 1;
//zombies 
Browncoat = new Fighter();
Browncoat.name = "Browncoat Zombie";
Browncoat.health = 50;
Browncoat.permhealth = 50;
Browncoat.powerLevel = 1;
Browncoat.coords = [7,2];
Browncoat.height = "25%";
Browncoat.attacks.push(Bite, Rock);
Browncoat.aliveSprite = "RegZomb.PNG";
Conehead = new Fighter();
Conehead.name = "Conehead Zombie";
Conehead.health = 125;
Conehead.permhealth = 125;
Conehead.height = "30%";
Conehead.powerLevel = 2;
Conehead.attacks.push(Bite, clone(Rock));
Conehead.aliveSprite = "Conehead.PNG";
Buckethead = new Fighter();
Buckethead.name = "Buckethead Zombie";
Buckethead.health = 175;
Buckethead.permhealth = 175;
Buckethead.height = "28%";
Buckethead.powerLevel = 3;
Buckethead.attacks.push(Bite, clone(Rock));
Buckethead.aliveSprite = "Buckethead.PNG";
Yeti = new Fighter();
Yeti.name = "Yeti Zombie";
Yeti.health = 150;
Yeti.permhealth = 150;
Yeti.height = "32%";
Yeti.powerLevel = 5;
//Yeti.chewingtime = 2;
Yeti.attacks.push(FrostTouch,Snowball);
Yeti.aliveSprite = "YetiZombie.PNG";
GunZomb = new Fighter();
GunZomb.name = "Gangsta Zombie";
GunZomb.health = 100;
GunZomb.permhealth = 100;
GunZomb.height = "28%";
GunZomb.powerLevel = 4;
GunZomb.wb = 1.4;
GunZomb.attacks.push(Fists,Gun);
GunZomb.aliveSprite = "GunZombie.PNG";
Imp = new Fighter();
Imp.name = "Imp";
Imp.health = 25;
Imp.permhealth = 25;
Imp.powerLevel = 0.5;
Imp.movement = 2;
Imp.height = "15%";
Imp.attacks.push(AnkBite)
Imp.aliveSprite = "Imp.PNG";
Phone = new SupportType();
Phone.type = "summon";
Phone.name = "Phone Friends";
Phone.zombie = [Browncoat];
Phone.coords = [[0,-1],[0,1]];
Phone.reloadTime = 3;
Gargantuar = new Fighter();
Gargantuar.name = "Gargantuar";
Gargantuar.health = 400;
Gargantuar.permhealth = 400;
Gargantuar.powerLevel = 10;
Gargantuar.height = "40%";
Gargantuar.wb = 1.6;
Gargantuar.canBeEaten = false;
Gargantuar.supports.push(Phone);
Gargantuar.attacks.push(PoleSmash,ImpThrow);
Gargantuar.aliveSprite = "Gargantuar.PNG";
FootballZomb = new Fighter();
FootballZomb.name = "Football Zombie";
FootballZomb.health = 200;
FootballZomb.permhealth = 200;
FootballZomb.powerLevel = 6;
FootballZomb.height = "28%";
FootballZomb.movement = 2;
//FootballZomb.chewingtime = 2;
FootballZomb.attacks.push(Bite,Football);
FootballZomb.aliveSprite = "FootballZomb.PNG";
FootballZomb.wb = 1.2;
Screendoor = new Fighter(); 
Screendoor.name = "Screendoor Zombie";
Screendoor.health = 100;
Screendoor.permhealth = 100;
Screendoor.powerLevel = 3;
Screendoor.height = "27%";
Screendoor.underShield = clone(Browncoat);
Screendoor.attacks.push(Door,clone(Rock));
Screendoor.aliveSprite = "Screendoor.PNG";
MadNews = new Fighter();
MadNews.name = "Enraged Newspaper Zombie";
MadNews.health = 125;
MadNews.permhealth = 125;
MadNews.powerLevel = 4;
MadNews.wb = 1.2;
MadNews.height = "28%";
MadNews.movement = 2;
MadNews.attacks.push(RageBite);
MadNews.aliveSprite = "NewspaperMad.PNG";
Newspaper = new Fighter();
Newspaper.name = "Newspaper Zombie";
Newspaper.health = 50;
Newspaper.permhealth = 50;
Newspaper.powerLevel = 4;
Newspaper.wb = 1.2;
Newspaper.height = "27%";
Newspaper.underShield = clone(MadNews);
Newspaper.attacks.push(Bite,Paper);
Newspaper.aliveSprite = "Newspaper.PNG";
Backup = new Fighter();
Backup.name = "Backup Dancer";
Backup.health = 50;
Backup.permhealth = 50;
Backup.powerLevel = 1;
Backup.movement = 1.5;
Backup.height = "25%";
Backup.attacks.push(Bite);
Backup.aliveSprite = "BackupDancer.PNG";
Dancers = new SupportType();
Dancers.type = "summon";
Dancers.name = "Summon Backup";
Dancers.zombie = [Backup]
Dancers.coords = [[-1,0],[1,0],[0,-1],[0,1]];
Dancers.reloadTime = 2;
Dancers.STUP = 2;
Disco = new Fighter();
Disco.name = "Disco Zombie";
Disco.health = 150;
Disco.permhealth = 150;
Disco.movement = 0.5;
Disco.powerLevel = 7;
Disco.height = "28%";
Disco.attacks.push(Bite);
Disco.supports.push(Dancers);
Disco.aliveSprite = "DiscoZombie.PNG";
griditemarray = [];
phygriditems = [];
ZombieArray = [];
//Boss waves
GrowZombie = new SupportType();
GrowZombie.type = "summon";
GrowZombie.name = "Raise Zombie";
GrowZombie.zombie = [Browncoat,Imp]
GrowZombie.coords = [[-1,0]];
GrowZombie.reloadTime = 2;
CreateImps = new SupportType();
CreateImps.type = "summon";
CreateImps.name = "Impish Necromancy";
CreateImps.zombie = [Imp]
CreateImps.coords = [[-1,1],[-1,-1]];
CreateImps.reloadTime = 3;
GigaPhone = new SupportType();
GigaPhone.type = "summon";
GigaPhone.name = "Phone Gangsta Friends";
GigaPhone.zombie = [GunZomb];
GigaPhone.coords = [[-1,0]];
GigaPhone.reloadTime = 4;
GigaPhone.STUP = 2;
Mitosis = new SupportType();
Mitosis.type = "summon";
Mitosis.name = "Mitosis";
Mitosis.coords = [[0,1]];
Mitosis.reloadTime = 3;
Mitosis.STUP = 2;
Mitosis.zombie = ["Parent"];
Mitosis2 = new SupportType();
Mitosis2.type = "summon";
Mitosis2.name = "Mitosis";
Mitosis2.coords = [[0,-1]];
Mitosis2.reloadTime = 3;
Mitosis2.STUP = 2;
Mitosis2.zombie = ["Parent"];
Mitosis3 = new SupportType();
Mitosis3.type = "summon";
Mitosis3.name = "Mitosis";
Mitosis3.coords = [[1,0]];
Mitosis3.reloadTime = 3;
Mitosis3.STUP = 2;
Mitosis3.zombie = ["Parent"];
Mitosis4 = new SupportType();
Mitosis4.type = "summon";
Mitosis4.name = "Mitosis";
Mitosis4.coords = [[-1,0]];
Mitosis4.reloadTime = 3;
Mitosis4.STUP = 2;
Mitosis4.zombie = ["Parent"];
SnowExplode = new AttackType();
SnowExplode.name = "Snotsicles";
SnowExplode.damage = 25;
SnowExplode.range = 1;
SnowExplode.effectChance = 101;
SnowExplode.effectType = "frozen";
SnowExplode.reloadTime = 2;
ImpWand = new AttackType();
ImpWand.name = "Impish Powers";
ImpWand.damage = 35;
ImpWand.range = 2;
ImpWand.reloadTime = 2;
Lightning = new AttackType();
Lightning.name = "Pole Lightning";
Lightning.damage = 45;
Lightning.range = 5;
Lightning.reloadTime = 1;
NastyPea = new AttackType();
NastyPea.name = "Nasty Pea";
NastyPea.damage = 10;
NastyPea.range = 10;
NastyPea.accuracy = 85;
NastyChomp = new AttackType();
NastyChomp.name = "Nasty Chomp";
NastyChomp.damage = 50;
NastyChomp.range = 1;
NastyChomp.reloadTime = 1;
NastyGatling = new AttackType();
NastyGatling.name = "Nasty Gatling";
NastyGatling.damage = 10;
NastyGatling.shots = 4;
NastyGatling.range = 10;
NastyGatling.accuracy = 95;
NastyGatling.reloadTime = 1;
Fashion = new AttackType();
Fashion.name = "Mock";
Fashion.damage = 5;
Fashion.shots = 8;
Fashion.accuracy = 45;
Fashion.range = 1;
Fashion.reloadTime = 1;
Fashion.STUP = 1;
ConeGun = new AttackType();
ConeGun.name = "Cone Appétit";
ConeGun.damage = 20;
ConeGun.range = 4;
ConeGun.accuracy = 95;
ConeGun.reloadTime = 1;
ConeGun.STUP = 1;
YetiImp = new Fighter();
YetiImp.name = "Yeti Imp";
YetiImp.health = 25;
YetiImp.permhealth = 25;
YetiImp.movement = 2;
YetiImp.powerLevel = 1.5;
YetiImp.height = "15%";
YetiImp.attacks.push(SnowExplode);
YetiImp.aliveSprite = "YetiImp.PNG";
ImpKing = new Fighter();
ImpKing.name = "Imp King";
ImpKing.health = 125;
ImpKing.permhealth = 125;
ImpKing.movement = 1.75;
ImpKing.powerLevel = 5.5;
ImpKing.height = "22%";
ImpKing.supports.push(CreateImps);
ImpKing.attacks.push(ImpWand);
ImpKing.aliveSprite = "ImpKing.PNG";
Gravestone = new Fighter();
Gravestone.name = "Gravestone";
Gravestone.health = 75;
Gravestone.permhealth = 75;
Gravestone.movement = 0;
Gravestone.canBeEaten = false;
Gravestone.powerLevel = 3;
Gravestone.height = "20%";
Gravestone.supports.push(GrowZombie);
Gravestone.aliveSprite = "Gravestone.PNG";
GigaGarg = new Fighter();
GigaGarg.name = "Giga Gargantuar";
GigaGarg.health = 500;
GigaGarg.permhealth = 500;
GigaGarg.movement = 1.25;
GigaGarg.powerLevel = 20;
GigaGarg.canBeEaten = false;
GigaGarg.wb = 1.6;
GigaGarg.height = "43%";
GigaGarg.supports.push(GigaPhone);
GigaGarg.attacks.push(clone(PoleSmash),Lightning);
GigaGarg.aliveSprite = "GigaGarg.PNG";
Zompea = new Fighter();
Zompea.name = "Zombotany Peashooter";
Zompea.health = 50;
Zompea.permhealth = 50;
Zompea.powerLevel = 1;
Zompea.wb = 1.2;
Zompea.height = "24%";
Zompea.attacks.push(Bite,NastyPea);
Zompea.aliveSprite = "Zompea.PNG";
Zomgatling = new Fighter();
Zomgatling.name = "Zombotany Pea Gatling";
Zomgatling.health = 75;
Zomgatling.permhealth = 75;
Zomgatling.powerLevel = 4;
Zomgatling.wb = 1.2;
Zomgatling.height = "26%";
Zomgatling.attacks.push(NastyGatling,Bite);
Zomgatling.aliveSprite = "Zomgatling.PNG";
Zomnut = new Fighter();
Zomnut.name = "Zombotany Wallnut";
Zomnut.health = 150;
Zomnut.permhealth = 150;
Zomnut.allergy = "nut";
Zomnut.powerLevel = 2;
Zomnut.height = "28%";
Zomnut.attacks.push(Bite);
Zomnut.aliveSprite = "Zomnut.PNG";
Zomchomp = new Fighter();
Zomchomp.name = "Zombotany Chomper"; 
Zomchomp.health = 50;
Zomchomp.permhealth = 50;
Zomchomp.powerLevel = 3;
Zomchomp.movement = 1.34;
Zomchomp.height = "27%";
Zomchomp.attacks.push(NastyChomp);
Zomchomp.aliveSprite = "Zomchomp.PNG";
ConeCrab = new Fighter();
ConeCrab.name = "Cone Crab";
ConeCrab.health = 10;
ConeCrab.permhealth = 10;
ConeCrab.powerLevel = 1;
ConeCrab.wb = 0.1;
ConeCrab.movement = 2.5;
ConeCrab.height = "8%";
ConeCrab.attacks.push(AnkBite);
ConeCrab.supports.push(Mitosis,Mitosis2,Mitosis3,Mitosis4);
ConeCrab.aliveSprite = "ConeCrab.PNG";  
Coneoisseur = new Fighter();
Coneoisseur.name = "Coneoisseur";
Coneoisseur.health = 50;
Coneoisseur.permhealth = 50;
Coneoisseur.powerLevel = 4;
Coneoisseur.height = "35%";
Coneoisseur.wb = 0.8;
Coneoisseur.attacks.push(Fashion,ConeGun);
Coneoisseur.aliveSprite = "Coneoisseur.PNG"; 
Coneoisseur5 = clone(Coneoisseur);
Coneoisseur5.underShield = "";
Coneoisseur5.aliveSprite = "Coneoisseur5.PNG";
Coneoisseur4 = clone(Coneoisseur);
Coneoisseur4.underShield = clone(Coneoisseur5);
Coneoisseur4.aliveSprite = "Coneoisseur4.PNG";
Coneoisseur3 = clone(Coneoisseur);
Coneoisseur3.underShield = clone(Coneoisseur4);
Coneoisseur3.aliveSprite = "Coneoisseur3.PNG";
Coneoisseur2 = clone(Coneoisseur);
Coneoisseur2.underShield = clone(Coneoisseur3);
Coneoisseur2.aliveSprite = "Coneoisseur2.PNG";
Coneoisseur.underShield = clone(Coneoisseur2);
class BossWave {
    constructor() {
        this.name = ""; //name of boss wave
        this.zombies = []; //zombies in boss wave
        this.image = ""; //image for
        this.imageWidth = 0; //Dr Image, at   
        this.imageLeft = 0; //1337 Imago St
        this.availablewaves = []; //what waves the boss wave can appear on
        this.availablecoords = []; //what coordinates the zombies can spawn on
        this.randomizecoords = false; //if the zombies spawn on a random of the given coordinates or if they are always in one spot
        this.theme = ""; //theme to play during the boss wave
        this.background = []; //secret cone stuff
    }
} //3 waves on turn 5, 4 waves on turn 10, 4 waves on turn 15, 3 waves on turn 20, 3 waves on turn 25, 4 waves on turn 30 //*make it higher waves go!
AllImps = new BossWave();
AllImps.name = "Wave of Imps";
AllImps.zombies = [Imp, ImpKing, clone(Imp), YetiImp, clone(Imp), clone(ImpKing), clone(Imp)]; 
AllImps.image = "ImpGang.PNG";   
AllImps.imageWidth = "25%";
AllImps.imageLeft = "80%";
AllImps.availablewaves = [5,10,15,20,25,30];
for (x=4; x<10; x++) {
    for (y=0; y<5; y++) {
        AllImps.availablecoords.push([x,y]);
    }
}
AllImps.randomizecoords = true;
AllImps.theme = "ImpTheme.mp3"; 
AllImps.background = ["CastleTile.PNG","CastleBackground.PNG"];
BossWaves.push(AllImps);
Garg = new BossWave();
Garg.name = "Gaggling Gargantuars";
Garg.zombies = [Gargantuar];
Garg.image = "GargBoss.PNG";
Garg.imageWidth = "35%";
Garg.imageLeft = "65%"; 
Garg.availablewaves = [10,30];
Garg.availablecoords = [[5,2],[6,2],[7,2],[8,2]];
Garg.randomizecoords = true;
Garg.theme = "GargTheme.mp3"; 
Garg.background = ["ArenaTile.PNG","ArenaBackground.PNG"];
BossWaves.push(Garg);
Gargs = new BossWave();
Gargs.name = "One Big Bad Zombie";
Gargs.zombies = [GigaGarg];
Gargs.image = "GigaGargBoss.PNG"; 
Gargs.imageWidth = "40%";
Gargs.imageLeft = "60%";
Gargs.availablewaves = [20];
Gargs.availablecoords = [[5,2],[6,2],[7,2],[8,2]];
Gargs.randomizecoords = true;
Gargs.theme = "GigaGargTheme.mp3"; 
Gargs.background = ["ArenaTile.PNG","ArenaBackground.PNG"];
BossWaves.push(Gargs);
Graves = new BossWave();
Graves.name = "Grave Danger";
Graves.zombies = [clone(Gravestone),clone(Gravestone),clone(Gravestone),clone(Gravestone),clone(Gravestone)];
Graves.image = "Graves.PNG"; 
Graves.imageWidth = "30%";
Graves.imageLeft = "70%";
Graves.availablewaves = [15];
Graves.availablecoords = [[9,0],[9,1],[9,2],[9,3],[9,4]];
Graves.randomizecoords = false;
Graves.theme = "GraveTheme.mp3"; 
Graves.background = ["GraveTile.PNG","GraveBackground.PNG"];
BossWaves.push(Graves);
Zombotany = new BossWave();
Zombotany.name = "Zombotany!";
Zombotany.zombies = [Zompea,Zomnut,clone(Zompea)];
Zombotany.image = "Zombotany.PNG";
Zombotany.imageWidth = "40%";
Zombotany.imageLeft = "60%";
Zombotany.availablewaves = [5,10,15];
Zombotany.randomizecoords = true;
for (x=5; x<10; x++) {
    for (y=0; y<5; y++) {
        Zombotany.availablecoords.push([x,y]);
    }
}
Zombotany.theme = "ZombotanyTheme.mp3";
Zombotany.background = ["MutantTile.PNG","RegBackground.PNG"];
BossWaves.push(Zombotany);
Zombotany2 = new BossWave();
Zombotany2.name = "Zombotany!";
Zombotany2.zombies = [Zomgatling,Zompea,Zomnut,Zomchomp,clone(Zompea)];
Zombotany2.image = "Zombotany.PNG";
Zombotany2.imageWidth = "40%";
Zombotany2.imageLeft = "60%";
Zombotany2.availablewaves = [15,20,25,30,35];
Zombotany2.randomizecoords = true;
for (x=5; x<10; x++) {
    for (y=0; y<5; y++) {
        Zombotany2.availablecoords.push([x,y]);
    }
}
Zombotany2.theme = "ZombotanyTheme.mp3";
Zombotany2.background = ["MutantTile.PNG","RegBackground.PNG"];
BossWaves.push(Zombotany2);
ConeZone = new BossWave();
ConeZone.name = "The Cone Zone";
ConeZone.zombies = [ConeCrab,Conehead,clone(ConeCrab),clone(ConeCrab),clone(Conehead),Coneoisseur];
ConeZone.image = "ConeZone.PNG";
ConeZone.imageWidth = "35%";
ConeZone.imageLeft = "65%";
ConeZone.availablewaves = [5,10,15,25,30,35];
ConeZone.randomizecoords = true;
for (x=4; x<10; x++) {
    for (y=0; y<5; y++) {
        ConeZone.availablecoords.push([x,y]);
    }
}
ConeZone.theme = "ConeZoneTheme.mp3";
ConeZone.background = ["ConeTile.PNG","ConeBackground.PNG"];
BossWaves.push(ConeZone); 
makeEntry(Peashoot,"Rock Pea is a versatile character, capable of dealing with zombies at close range and long range. He doesn't have nearly as much health as his buddy Armor Chomper though.","Rock Pea can't shake the feeling that in a past life, he was someone else. Someone... different, yet very similar. Their last name was Fern. Rock Pea shudders at these thoughts, before blasting an imp into pieces.") 
makeEntry(AC,"Armor Chomper is the main character of this game, and he's great at brawling with zombies and soaking up hits. He can goop up the zombies so they can't do anything, and then eat them as a snack.","Chompers all around the world are known for their immense hunger in Zombie flesh (and feet), but Armor Chomper holds a dark secret. He's not like other Chompers. He likes Cheese Balls. He buys them in the extra large containers and spends his free time licking the inside of them clean of any cheese dust. Can you really blame him?")
makeEntry(Browncoat,"The simplest of Zombies, Browncoat Zombie shuffles towards the player and bites them.","Browncoat is the most expendable unit in the Zombie army, and he knows it. He's darn proud of it too. He knows there's strength in numbers, and since he can count to 6, he has to also be the strongest unit.") 
makeEntry(Conehead,"Conehead Zombie is very similar to Browncoat Zombie, except he has a cone that gives him more health.","You wouldn't know it just by looking at it, but he made that cone by himself. He stole a garden hose for the rubber, and got the orange paint by mixing red and yellow. It's a shame they're also made en masse in Z-Tech factories, where he is a worker, and used the exact process just described. At least he feels special.") 
makeEntry(Buckethead,"Buckethead Zombie is evolutionarily the next step up from Conehead Zombie, having even more health.","Buckethead has quite a large following on social media, and recently hosted a QnA with fans of his. The most popular question seemed to be \"What\'s the red stuff on the Bucket? Blood or Paint?\", to which he responded \"Grrbrrblarblrg. Grahrahrablr.\" I don\'t speak Zombie, so I can\'t tell you what he really said.") 
makeEntry(Imp,"Imps are small but swarmy. They'll chase after you in packs and eat you from the ankles up.","When he's not battling plants, he plays the stunt double for a child actor in the upcoming \"Little Johnny hits the Big Time\" movie. When he isn't chasing the staff screeching \"Brainz! BRAINZ! Eeeyahahaha!\" he's getting a time-out from the nice director lady. When he isn't in a time-out, he's stirring up trouble trying to talk to her again, how sweet!") 
makeEntry(Screendoor,"Screendoor Zombie's screendoor covers his entire body, which means you have to destroy the screendoor before you can get to the creamy Zombie inside.","Screendoor Zombie won the door in an Old-timey auction. Local Not-a-Doctor Dr Vanderspeigle almost took it for an arm and a leg, but Screendoor Zombie surprised the crowd by leaping from his chair and gnawing on Vanderspeigle's actual arm and leg. Everyone left terrified, and Screendoor Zombie won by forfeit.") 
makeEntry(Newspaper,"Newspaper Zombie loves his morning news very much, so try not to destroy his newspaper if you're not prepared to handle his rage.","Newspaper Zombie can't decide which part of the Newspaper he likes more: The Sudoku Puzzle, or the front page headline \"ZOMBIE INVASION: EVERY MAN FOR HIMSELF\" which he reads as \"Good job Newspaper Zombie, you are doing a good job.\"") 
makeEntry(GunZomb,"Gangsta Zombie has figured out that shooting plants is much more effective than eating them, so watch out for his ranged attack.","Like most real-life gangsters, Gangsta Zombie got into the business after seeing The Godfather. His favorite scene was when they all gathered around the table and started speaking in a language he doesn't understand. By sheer chance, he can also speak in a language he doesn't understand. This similarity alone made Gangsta Zombie convinced that he was fated to be a gangster, and embraced it.") 
makeEntry(Yeti,"Yeti Zombie hails from the Frozen North, so you can be sure his attacks can freeze you.","Being one of the most well known Zombie Cryptids is definitely a huge plus for Yeti Zombie. He gets a real kick out of seeing his name on T-Shirts, Shirts, Shorts, T-Shorts, and appropriately: Snow-globes. He just wishes that his other Cryptid friends were as popular, mainly his good buddy Mothman Zombie.") 
makeEntry(FootballZomb,"Football Zombie is healther, faster, and stronger than most other Zombies so watch out when you see him.","Football Zombie loves what he does, and what he does is terrifying plants as he approaches them. He's been on the job for a while, so he knows what he's doing. The secret? It's a combination of moving quick, hitting hard, and sponging attacks. He hasn't changed that strategy at all in nearly 10 years. He also responds to \"All-Star\".") 
makeEntry(Disco,"Disco Zombie gets very anxious when he's dancing alone, so you can guarantee he'll summon his Backup Dancer friends.","Disco Zombie would like to assure his fans that the Zombie Fish in his shoes are 100% natural. Disco Zombie would also like to assure his fans that the Fish are just play-things, and he isn't trapping poor Zombie Fish in there for brainless entertainment. He has quite the split fandom, and it's hard keeping up.") 
makeEntry(Backup,"Backup Dancers don't believe in getting over your fears by facing them, so they'll always be dancing along with Disco Zombie.","As a huge fan of Disco, Backup Dancer says that to say \"Disco is dead\" would be incredibly inaccurate. If it's so dead, then why does it appear so often in modern media? If it was dead, people would stop talking about it and referencing it all the time, and guess what? That doesn't happen. Checkmate.") 
makeEntry(Gargantuar,"Gargantuar strikes fear, as well as poles, into plant's hearts. His large amounts of health and damage can make him a tough Zombie to beat.","Why does Gargantuar carry a telephone pole? It's simple: He's waiting for a call. One day someone will pick up the other end and will say \"Hello? Is this Gargantuar Zombie? I'm such a huge fan!\" That day will be the best day of Gargantuar's unlife.") 
makeEntry(YetiImp,"Yeti Imp is a nasty little creature that freezes you upon contact, so you better get rid of him before he gets too close.","Much of the Yeti Imp community is divided on the current state of Yeti Imp's being. Some say he's a robot, others say he's just an Imp in a costume. Yeti Imp knows the answer since it's hardwired in his Z-Tech brand AI programming, but he's not supposed to say a word.") 
makeEntry(ImpKing,"As the king of Imps, he has many tricks up his sleeve such as summoning more Imps or firing magical bolts.","Make fun of his height all you want, he won't care. His subjects respect him for what he does and how he rules, and that's all the validation he needs. Mindless put-downs from outsiders like you or me don't even scratch him. He's essentially perfect: There's nothing that he falls short of. Eh? Ehh? C'mon, it was kinda clever.") 
makeEntry(Zompea,"Much like a Peashooter to a Zombie, Zombotany Peashooter fires peas at you.","Zombotany Peashooter is tired of getting asked the same unfunny \"question\" of \"Are you a Plant or a Zombie?\" The answer is incredibly obvious. He fights Plants alongside the Zombie Horde, so he should be a Zombie. Makes sense right? Not to some. It really stresses him out. He uses that frustration to fuel his strength in attacking plants, so I guess it all works out.") 
makeEntry(Zomnut,"Zombotany Wallnut has a Wallnut for a head, which gives him added health. How does it feel being in the Zombie's shoes now, plants?","Browncoat Zombies hate having to sit there and eat through Wallnuts, so one day a Browncoat Zombie decided to try to eat a Wallnut from the inside out. He made a hole in the Wallnut and then stuck his whole head in. Soon after, he realised his head wouldn't come back out. His Browncoat friends tried to help him, but the Wallnut was stuck on for good. Luckily, Browncoat Zombie was able to blend in with the other Zombotany Zombies so I guess everything worked out.") 
makeEntry(Zomgatling,"This Zombie is even more dangerous than Gangsta Zombie when it comes to ranged attacks, so make sure he goes down quick.","Zombotany Pea Gatling looks at all other Zombies with disappointment. While they're only able to toss a singular rock, he can fire four peas at once. He knows they can be just as good with projectiles as he can, but they don't bother. It's really disheartening, but he keeps at it. He keeps training them. He. Never. Gives. Up.") 
makeEntry(Zomchomp,"Zombotany Chomper behaves just like a Chomper, mindlessly charging into battle with the intent to bite your head off.","Zombotany Chomper is quite the celebrity in the Zombotany world. His influence is so powerful, he managed to convince all Zombotany Squashes to ditch the war entirely! That's pretty strong, and he can hold up pretty well in a fight too!") 
makeEntry(GigaGarg,"Giga Gargantuar is the strongest zombie you'll fight. He has many gangsta friends, as well as an electrically charged pole that he found in a lake.","The \"Giga\" in Giga Gargantuar's name is short for \"Gigantic\", which doesn't make sense, since he is no bigger than a regular Gargantuar. Perhaps it refers to his strength rather than his physical size? He ponders this question often. It makes his head hurt. A lot.") 
MZ = new AlmEntry();
MZ.name = "Mystery Zombie";
MZ.image = "MysteryZombie.PNG";
MZ.desc = "You have not discovered this zombie yet. When you vanquish this zombie, they will be added to your almanac.";
AlmEntries.push(MZ);
NE = new AlmEntry();
NE.name = "Cone Crab";
NE.image = "ConeCrab.PNG";
NE.desc = "Cone Crabs are nasty little things that have the ability to clone themselves. Zombologists aren't even sure if Cone Crabs are real Zombies.";
NE.stats = "Health: 10<br>Abilities: Ankle Bite, Mitosis";
NE.flavour = "Cone Crabs aren't actually crabs, or insects, or arachnids, or even an animal. They're actually giant single celled organisms that come from an uncharted region in time and space known as The Cone Zone. The Cone Zone is known for it's impossibly large amount of cones, it's cone-like creatures, and a sport they invented that has to do with - you guessed it - cones.";
AlmEntries.push(NE);
NE = new AlmEntry();
NE.name = "Coneoisseur";
NE.image = "Coneoisseur.PNG";
NE.desc = "Coneoisseur loves cones, so he always wears a giant stack of cones on his head. You have to take down his big cone tower if you want to vanquish him.";
NE.stats = "Health: 50 per cone<br>Abilities: Mock, Cone Appétit";
NE.flavour = "While most other zombies are stupid and clueless, the Coneoisseur is brilliant. He has a degree in Kónosology (the study of cones), and has memorized the formula for a cone's volume by heart (1/3rd height times pi radius squared). He's eager to share his fascination for cones with the world, but the world often responds with \"Eeek! A Zombie! Run!\"";
AlmEntries.push(NE);
unlockableZombies = [Browncoat, Conehead, Buckethead, Imp, Screendoor, Newspaper,GunZomb,  Yeti, FootballZomb, Disco, Backup, YetiImp, ImpKing, Zompea, Zomnut, Zomgatling, Zomchomp, ConeCrab, Coneoisseur, Gargantuar, GigaGarg] 

gridx = 9
gridy = 5
gridsize = 1.45
currentx = 0
currenty = 0
prevzposes = [];
difficultylevel = 1; 
wc = document.getElementById("EverythingFitter");
zhealtharray = [];
zhealthbararray = [];
CanZAbility = [];
StopTurn = false;
prevppos = currentPlant.coords.slice(0);
currentProjectile = "";
CD = 0;
consolemessages = [];
ConsoleHistory = [];
function updatebackground() {
    wc = document.getElementById("EverythingFitter");
    currentx = 0
    currenty = 0
    for (i = 0; i < gridx*gridy; i++) {
        currentx += 1;
        if (TheBossWave.background != [] && IsBossWave) {
            BossSprite = document.createElement("img"); 
            BossSprite.src = TheBossWave.background[0];
            BossSprite.style.position = "absolute";
            BossSprite.style.height = (9.5*gridsize).toString()+"%";
            BossSprite.style.top = (gridsize*(12+(currenty)*8)).toString()+"%";
            BossSprite.style.left = (window.innerWidth*((gridsize*currentx)+gridy/(gridsize*2)-currenty*gridsize*0.7)*(1/18)).toString()+"px"
            wc.appendChild(BossSprite);
            if (currentx == 1 && currenty == 0) {
                BossBackground = document.createElement("img"); 
                BossBackground.src = TheBossWave.background[1];
                BossBackground.style.width = "100%";
                BossBackground.style.zIndex = -5483;
                BossBackground.style.position = "absolute";
                wc.appendChild(BossBackground);
            }
        }
        else {
            TileSprite = document.createElement("img"); 
            TileSprite.src = "TileSprite.PNG";
            TileSprite.style.position = "absolute";
            TileSprite.style.height = (9.5*gridsize).toString()+"%";
            TileSprite.style.top = (gridsize*(12+(currenty)*8)).toString()+"%";
            TileSprite.style.left = (window.innerWidth*((gridsize*currentx)+gridy/(gridsize*2)-currenty*gridsize*0.7)*(1/18)).toString()+"px"
            wc.appendChild(TileSprite);
            if (currentx == 1 && currenty == 0) {
                RegBackground = document.createElement("img"); 
                RegBackground.src = "RegBackground.PNG";
                RegBackground.style.width = "100%";
                RegBackground.style.zIndex = -5483;
                RegBackground.style.position = "absolute";
                wc.appendChild(RegBackground);
            }
        }
        if (currentx%gridx == 0) {
            currenty += 1;
            currentx = 0;
        }
    }
}
function updategrid() { 
    for (is in phygriditems) {
        phygriditems[is].remove();
    }
    phygriditems = [];
    griditemarray = [];
    currentx = 0
    currenty = 0
    for (i = 0; i < gridx*gridy; i++) {
        currentx += 1;
        ItemSprite = document.createElement("img");
        newgi = new griditem();
        newgi.codx = currentx;
        newgi.cody = currenty;
        newgi.sprite = "BlankTile.PNG"
        newgi.character = "";
        griditemarray.push(newgi);
        ItemSprite.src = "BlankTile.PNG";
        wc.appendChild(ItemSprite);
        ItemSprite.className = "gridTile";
        ItemSprite.onclick = tryToMove;
        ItemSprite.style.height = (8*gridsize).toString()+"%";
        ItemSprite.style.top = (gridsize*(12+(currenty)*8)).toString()+"%";
        ItemSprite.style.left = (window.innerWidth*((gridsize*currentx)+gridy/(gridsize*2)-currenty*gridsize*0.7)*(1/18)).toString()+"px"
        for (f in fighterArray) {
            fighter = fighterArray[f];
            if (currentx === fighter.coords[0] && currenty === fighter.coords[1] && fighter.plant) {
                newgi.sprite = "GreenTile.PNG"
                newgi.character = fighter;
                fighterPhysArray[f].style.height = currentPlant.height;
                fighterPhysArray[f].style.top = (parseInt(ItemSprite.style.top)-0.088*fighterPhysArray[f].height).toString()+"%";
                fighterPhysArray[f].style.left = (parseInt(ItemSprite.style.left)+0.4*fighterPhysArray[f].width).toString()+"px";
                ItemSprite.src = "GreenTile.PNG";
            }
            else if (currentx === fighter.coords[0] && currenty === fighter.coords[1] && !(fighter.plant)) {
                newgi.sprite = "PurpleTile.PNG"
                newgi.character = fighter;
                fighterPhysArray[f].style.top = (((30-parseInt(fighter.height))/10)+parseInt(ItemSprite.style.top)-0.088*fighterPhysArray[f].height).toString()+"%";             
                fighterPhysArray[f].style.left = ((3*(30-(fighter.wb*parseInt(fighter.height))))+parseInt(ItemSprite.style.left)).toString()+"px";
                zhealtharray[f-1].style.top = parseInt(ItemSprite.style.top).toString()+"%";
                zhealtharray[f-1].style.left = (parseInt(ItemSprite.style.left)+51.942).toString()+"px";
                zhealtharray[f-1].innerHTML = fighter.health;
                zhealthbararray[f-1].style.top = parseInt(ItemSprite.style.top).toString()+"%";
                zhealthbararray[f-1].style.left = (parseInt(ItemSprite.style.left)+39.35).toString()+"px";
                zhealthbararray[f-1].src = "HeartIcon.PNG";
                if (fighter.underShield != "") {
                    zhealthbararray[f-1].src = "ArmorHeartIcon.PNG";
                }
                ItemSprite.src = "PurpleTile.PNG";
            }
        }
        phygriditems.push(ItemSprite);
        if (currentx%gridx == 0) {
            currenty += 1;
            currentx = 0;
        }
    }
}
function updatecharactergrid() { 
    currentx = 0
    currenty = 0
    for (i in griditemarray) {
        currentx += 1;
        griditemarray[i].character = "";
        for (f in fighterArray) {
            fighter = fighterArray[f];
            if (currentx === fighter.coords[0] && currenty === fighter.coords[1]) {
                griditemarray[i].character = fighter;
            }
        }
        if (currentx%gridx == 0) {
            currenty += 1;
            currentx = 0;
        }
    }
}
function CheckIfCollision(p,zombi) {
    for (z in ZombieArray) {
        if ((ZombieArray[z].coords[0] == currentPlant.coords[0]) && (ZombieArray[z].coords[1] == currentPlant.coords[1])) {
            if (p == "plant") {
                CanMove = false;
                rv = UpdatePassivePerks("everymove",ZombieArray[z])
                if (rv == "miss") { 
                    CreateConsoleText("You cannot move on top of a zombie.",false,false)
                    CanMove = true;
                    currentPlant.coords = prevppos.slice(0); 
                }
                else if (rv == "hit") {
                    currentPlant.coords = prevppos.slice(0);
                }
                else if (rv == "kill") {
                    UpdateTurnCount();
                    updategrid();
                    return false;
                }
                UpdateTurnCount();
                updategrid();
                return true;
            }
            else {
                ZombieArray[z].coords = prevzposes[z].slice(0);
                updategrid();
                return true;
            }
        }
        if (p == "Zombie") {
            for (zom in ZombieArray) {
                if (zom == z) {
                    continue;
                }
                if (ZombieArray[z].coords[0] == ZombieArray[zom].coords[0] && ZombieArray[z].coords[1] == ZombieArray[zom].coords[1]) {
                    zombi.coords = prevzposes[ZombieArray.indexOf(zombi)].slice(0);
                    updategrid();
                    return true;
                }
            }
        }
    }
    return false;
}
function SwitchAD() {
    for (is in phygriditems) {
        phygriditems[is].remove();
    }
    if (CD < 3) {
        CD += 1;
    }
    else {
        CD = 0;
        fighterPhysArray[fighterArray.indexOf(currentPlant)].style.transform = "scaleX(1)";
    }
    if (CD == 1) {
        fighterPhysArray[fighterArray.indexOf(currentPlant)].style.transform = "scaleX(-1)";
    }
    else if (CD == 3) {
        fighterPhysArray[fighterArray.indexOf(currentPlant)].style.transform = "scaleX(1)";
    }
    phygriditems = [];
    griditemarray = [];
    currentx = 0
    currenty = 0
    for (i = 0; i < gridx*gridy; i++) {
        currentx += 1;
        ItemSprite = document.createElement("img");
        newgi = new griditem();
        newgi.codx = currentx;
        newgi.cody = currenty;
        newgi.sprite = "BlankTile.PNG"
        griditemarray.push(newgi);
        ItemSprite.src = "BlankTile.PNG";
        wc.appendChild(ItemSprite);
        ItemSprite.style.position = "absolute";
        ItemSprite.className = "gridTile";
        ItemSprite.onclick = tryToMove;
        ItemSprite.style.height = (8*gridsize).toString()+"%";
        ItemSprite.style.top = (gridsize*(12+(currenty)*8)).toString()+"%";
        ItemSprite.style.left = (window.innerWidth*((gridsize*currentx)+gridy/(gridsize*2)-currenty*gridsize*0.7)*(1/18)).toString()+"px"
        for (f in fighterArray) {
            fighter = fighterArray[f];
            if (currentx === fighter.coords[0] && currenty === fighter.coords[1] && fighter.plant) {
                newgi.sprite = "GreenTile.PNG"
                newgi.character = fighter;
                ItemSprite.src = "GreenTile.PNG";
            }
            if (currentx === fighter.coords[0] && currenty === fighter.coords[1] && !(fighter.plant)) {
                newgi.sprite = "PurpleTile.PNG"
                newgi.character = fighter;
                ItemSprite.src = "PurpleTile.PNG";
            }
        }
        if (CD == 0) {
            if((currentPlant.coords[0]+1 <= currentx && currentx <= currentPlant.coords[0]+attack.range) && currenty === currentPlant.coords[1]) {
                if (newgi.sprite == "PurpleTile.PNG") {
                    newgi.sprite = "RedTile.PNG";
                    ItemSprite.src = "RedTile.PNG";
                }
                else {
                    newgi.sprite = "BlueTile.PNG";
                    ItemSprite.src = "BlueTile.PNG";
                }
            }
        }
        else if (CD == 1) {
            if((currentPlant.coords[1]+1 <= currenty && currenty <= currentPlant.coords[1]+attack.range) && currentx === currentPlant.coords[0]) {
                if (newgi.sprite == "PurpleTile.PNG") {
                    newgi.sprite = "RedTile.PNG";
                    ItemSprite.src = "RedTile.PNG";
                }
                else {
                    newgi.sprite = "BlueTile.PNG";
                    ItemSprite.src = "BlueTile.PNG";
                }
            }
        }
        else if (CD == 2) {
            if((currentPlant.coords[0]-1 >= currentx && currentx >= currentPlant.coords[0]-attack.range) && currenty === currentPlant.coords[1]) {
                if (newgi.sprite == "PurpleTile.PNG") {
                    newgi.sprite = "RedTile.PNG";
                    ItemSprite.src = "RedTile.PNG";
                }
                else {
                    newgi.sprite = "BlueTile.PNG";
                    ItemSprite.src = "BlueTile.PNG";
                }
            }
        }
        else if (CD == 3) {
            if((currentPlant.coords[1]-1 >= currenty && currenty >= currentPlant.coords[1]-attack.range) && currentx === currentPlant.coords[0]) {
                if (newgi.sprite == "PurpleTile.PNG") {
                    newgi.sprite = "RedTile.PNG";
                    ItemSprite.src = "RedTile.PNG";
                }
                else {
                    newgi.sprite = "BlueTile.PNG";
                    ItemSprite.src = "BlueTile.PNG";
                }
            }
        }
        phygriditems.push(ItemSprite);
        if (currentx%gridx == 0) {
            currenty += 1;
            currentx = 0;
        }
    }
}
function CheckAttack(zombie, attack) {
    if (!(CanZAbility[ZombieArray.indexOf(zombie)])) {
        return;
    }
    currentay = 0;
    currentax = 0;
    for (ia = 0; ia < gridx*gridy; ia++) {
        currentax += 1;
        hitarea = false;
        if ((zombie.coords[0]-1 >= currentax && currentax >= zombie.coords[0]-attack.range) && currentay === zombie.coords[1]) {
            hitarea = true;
        }
        else if ((zombie.coords[0]+1 <= currentax && currentax <= zombie.coords[0]+attack.range) && currentay === zombie.coords[1]) {
            hitarea = true;
        }
        else if ((zombie.coords[1]+1 <= currentay && currentay <= zombie.coords[1]+attack.range) && currentax === zombie.coords[0]) {
            hitarea = true;
        }
        else if ((zombie.coords[1]-1 >= currentay && currentay >= zombie.coords[1]-attack.range) && currentax === zombie.coords[0]) {
            hitarea = true;
        }
        if (hitarea) {
            if (griditemarray[ia].sprite == "GreenTile.PNG" && attack.TimeUntilReady <= 0) {
                return true;
            }
        }
        if (currentax%gridx == 0) {
            currentay += 1;
            currentax = 0;
        }
    }
    return false;
}
function TestSupport(zombie,support) {
    if (!(CanZAbility[ZombieArray.indexOf(zombie)])) {
        return;
    }
    if (support.TimeUntilReady > 0) { 
        return;
    }
    willhit = false;
    summoncount = 0;
    if (support.type == "summon") {
        updatecharactergrid();
        for (g in griditemarray) {
            for (s in support.coords) {
                if (griditemarray[g].codx == zombie.coords[0]+support.coords[s][0] && griditemarray[g].cody == zombie.coords[1]+support.coords[s][1] && griditemarray[g].character == "") {
                    willhit = true;
                    summoncount += 1;
                    if (support.zombie[0] == "Parent") {
                        NZ = clone(zombie);
                    }
                    else {
                        NZ = clone(support.zombie[Math.floor(Math.random() * support.zombie.length)]);
                    }
                    NZ.health = NZ.permhealth;
                    NZ.coords = [zombie.coords[0]+support.coords[s][0],zombie.coords[1]+support.coords[s][1]];
                    ZombieArray.push(NZ);
                    for (a in NZ.attacks) {
                        NZ.attacks[a].TimeUntilReady = NZ.attacks[a].STUP+1;
                    }
                    for (sup in NZ.supports) {
                        NZ.supports[sup].TimeUntilReady = NZ.supports[sup].STUP+1;
                    }
                    prevzposes.push(NZ.coords)
                    CanZAbility.push(true);
                    var zombi = document.createElement("img");
                    zombi.className = "Fighter";
                    zombi.style.height = NZ.height;
                    zombi.src = NZ.aliveSprite;
                    wc.appendChild(zombi);
                    fighterPhysArray.push(zombi);
                    zombi.style.transform = "scaleX(1)";
                    var zhealth = document.createElement("p")
                    var zhealthbar = document.createElement("img")
                    if (NZ.underShield != "") {
                        zhealthbar.src = "ArmorHeartIcon.PNG";
                    }
                    else {
                        zhealthbar.src = "HeartIcon.PNG";
                    }
                    zhealthbar.style.position = "absolute";
                    zhealthbar.style.width = "4%";
                    zhealthbar.style.zIndex = 9001;
                    wc.appendChild(zhealthbar);
                    zhealth.style.position = "absolute";
                    zhealth.style.fontFamily =  'Marker Felt';
                    zhealth.style.fontSize = "1.7vw";
                    zhealth.style.zIndex = 9002;
                    wc.appendChild(zhealth)
                    zhealtharray.push(zhealth);
                    zhealthbararray.push(zhealthbar);
                    fighterArray.push(NZ);
                    griditemarray[g].character = NZ;
                    CheckZindexes();
                }
            }
        }
    }
    if (willhit) {
        CreateConsoleText(zombie.name+" has used "+support.name+".")
        support.TimeUntilReady = support.reloadTime+1;
        CanZAbility[ZombieArray.indexOf(zombie)] = false;
        updategrid();
    }
    if (summoncount > 0) {
        if (summoncount > 1) {
            CreateConsoleText(zombie.name+" has summoned "+summoncount+" "+NZ.name+"s.")
        }
        else {
            CreateConsoleText(zombie.name+" has summoned "+summoncount+" "+NZ.name+".")
        }
    }
}
function TestAttack(zombie, attack) {
    if (!(CanZAbility[ZombieArray.indexOf(zombie)])) {
        return;
    }
    willhit = false;
    hitarea = false;
    currentay = 0;
    currentax = 0;
    missedshots = 0;
    TZD = -1;
    ZD = -1;
    for (ia = 0; ia < gridx*gridy; ia++) {
        currentax += 1;
        hitarea = false;
        if ((zombie.coords[0]-1 >= currentax && currentax >= zombie.coords[0]-attack.range) && currentay === zombie.coords[1]) {
            TZD = 0;
            hitarea = true;
        }
        else if ((zombie.coords[0]+1 <= currentax && currentax <= zombie.coords[0]+attack.range) && currentay === zombie.coords[1]) {
            TZD = 1;
            hitarea = true;
        }
        else if ((zombie.coords[1]+1 <= currentay && currentay <= zombie.coords[1]+attack.range) && currentax === zombie.coords[0]) {
            TZD = 2;
            hitarea = true;
        }
        else if ((zombie.coords[1]-1 >= currentay && currentay >= zombie.coords[1]-attack.range) && currentax === zombie.coords[0]) {
            TZD = 3;
            hitarea = true;
        }
        if (hitarea) {
            if (griditemarray[ia].sprite == "GreenTile.PNG" && attack.TimeUntilReady == 0) {
                ZD = TZD;
                if (ZD == 0 || ZD == 2) {
                    if (fighterPhysArray[fighterArray.indexOf(zombie)].style.transform == "scaleX(-1)") {
                        fighterPhysArray[fighterArray.indexOf(zombie)].style.transform = "scaleX(1)";
                        zombie.wb += 0.5;
                    }
                }
                else if (ZD == 1 || ZD == 3) {
                    if (fighterPhysArray[fighterArray.indexOf(zombie)].style.transform == "scaleX(1)") {
                        fighterPhysArray[fighterArray.indexOf(zombie)].style.transform = "scaleX(-1)";
                        zombie.wb -= 0.5;
                    }
                }
                willhit = true;
                griditemarray[ia].sprite = "RedTile.PNG";
                phygriditems[ia].src = "RedTile.PNG";
                CreateConsoleText(zombie.name+" has used "+attack.name+".")
                UpdatePassivePerks("enemyattack",false,attack);
                for (shot = 0; shot < attack.shots; shot++) {
                    if (Math.random()*100 > (attack.accuracy+attack.accuracyoffset)) {
                        missedshots += 1;
                        if (attack.shots == 1) {
                            CreateConsoleText(zombie.name+" has missed.");
                        }
                    }
                }
                if (attack.shots > 1) {
                    CreateConsoleText(zombie.name+" has missed "+missedshots+" out of their "+attack.shots+" shots.");
                }
                if (missedshots != attack.shots) {
                    currentPlant.health = currentPlant.health - Math.round(attack.damage*(attack.shots-missedshots)*zombie.dmgmult)
                    planthealth.innerHTML = currentPlant.health;
                    CreateConsoleText(zombie.name+" has hit "+currentPlant.name+" for "+(Math.round(attack.damage*(attack.shots-missedshots)*zombie.dmgmult)).toString()+" damage.",true);
                    if (!(CheckForLoss())) {
                        if (Math.random()*100 < attack.effectChance) { 
                            ApplyEffects(zombie,currentPlant,attack)
                        }
                    }
                    else {
                        CriticalTheme.stop();
                        StopTurn = true;
                    }
                }
                attack.TimeUntilReady = attack.reloadTime+1;
                CanZAbility[ZombieArray.indexOf(zombie)] = false;

            }
            else {
                griditemarray[ia].sprite = "BlueTile.PNG";
                phygriditems[ia].src = "BlueTile.PNG";
            }
        }
        if (currentax%gridx == 0) {
            currentay += 1;
            currentax = 0;
        }
    }
    if (!(willhit)) {
        updategrid();
    }
    currentay = 0;
    currentax = 0;
    for (i = 0; i < gridx*gridy; i++) {
        currentax += 1;
        if ((zombie.coords[0]-1 >= currentax && currentax >= zombie.coords[0]-attack.range) && currentay === zombie.coords[1] && ZD != 0) {
            if (griditemarray[i].character == "") {
                griditemarray[i].sprite = "BlankTile.PNG";
                phygriditems[i].src = "BlankTile.PNG";
            }
            else if (griditemarray[i].character != currentPlant) {
                griditemarray[i].sprite = "PurpleTile.PNG";
                phygriditems[i].src = "PurpleTile.PNG";
            }
            else {
                griditemarray[i].sprite = "GreenTile.PNG";
                phygriditems[i].src = "GreenTile.PNG";
            }
        }
        if ((zombie.coords[0]+1 <= currentax && currentax <= zombie.coords[0]+attack.range) && currentay === zombie.coords[1] && ZD != 1) {
            if (griditemarray[i].character == "") {
                griditemarray[i].sprite = "BlankTile.PNG";
                phygriditems[i].src = "BlankTile.PNG";
            }
            else if (griditemarray[i].character != currentPlant) {
                griditemarray[i].sprite = "PurpleTile.PNG";
                phygriditems[i].src = "PurpleTile.PNG";
            }
            else {
                griditemarray[i].sprite = "GreenTile.PNG";
                phygriditems[i].src = "GreenTile.PNG";
            }
        }
        if ((zombie.coords[1]+1 <= currentay && currentay <= zombie.coords[1]+attack.range) && currentax === zombie.coords[0] && ZD != 2) {
            if (griditemarray[i].character == "") {
                griditemarray[i].sprite = "BlankTile.PNG";
                phygriditems[i].src = "BlankTile.PNG";
            }
            else if (griditemarray[i].character != currentPlant) {
                griditemarray[i].sprite = "PurpleTile.PNG";
                phygriditems[i].src = "PurpleTile.PNG";
            }
            else {
                griditemarray[i].sprite = "GreenTile.PNG";
                phygriditems[i].src = "GreenTile.PNG";
            }
        }
        if ((zombie.coords[1]-1 >= currentay && currentay >= zombie.coords[1]-attack.range) && currentax === zombie.coords[0] && ZD != 3) {
            if (griditemarray[i].character == "") {
                griditemarray[i].sprite = "BlankTile.PNG";
                phygriditems[i].src = "BlankTile.PNG";
            }
            else if (griditemarray[i].character != currentPlant) {
                griditemarray[i].sprite = "PurpleTile.PNG";
                phygriditems[i].src = "PurpleTile.PNG";
            }
            else {
                griditemarray[i].sprite = "GreenTile.PNG";
                phygriditems[i].src = "GreenTile.PNG";
            }
        }
        if (currentax%gridx == 0) {
            currentay += 1;
            currentax = 0;
        }
    }
    return willhit;
}
function CheckZindexes() {
    fc = [];
    zindex = 666;
    tempvar = 0;
    issorted = false;
    for (f in fighterArray) {
        fighter = fighterArray[f];
        fc.push(fighter);
    }
    while (issorted == false) {
        issorted = true;
        for (c in fc) {
            if (!(c >= fc.length-1)) {
                if (fc[c].coords[1] > fc[(parseInt(c)+1)].coords[1]) {
                    tempvar = fc[c];
                    fc[c] = fc[(parseInt(c)+1)];
                    fc[(parseInt(c)+1)] = tempvar;
                    issorted = false;
                }
            }
        }
    }
    for (yc in fc) { 
      fyc = fc[yc];
      fighterPhysArray[fighterArray.indexOf(fyc)].style.zIndex = (parseInt(zindex) + parseInt(yc));
    }
}
function NextToPlant(zombie) {
    testMoves = [[-1,0],[1,0],[0,1],[0,-1]];
    for (move in testMoves) {
        if (zombie.coords[0]+testMoves[move][0] == currentPlant.coords[0] && zombie.coords[1]+testMoves[move][1] == currentPlant.coords[1]) {
            return true
        }
    }
    return false
}
function CalculateMoves(zombie) { 
    TestMoves = [[-1,0],[1,0],[0,1],[0,-1]];
    //If zombie can already hit chomper, do normal move
    //If zombie can move and then hit chomper, do that move
    //if zombie cannot hit chomper from any move, do normal move
    MA = false;
    MAM = [0,0];
    AA = false;
    SM = true;
    for (a in zombie.attacks) {
        if (CheckAttack(zombie,zombie.attacks[a])) {
            AA = true;
            if (NextToPlant(zombie)) {
                SM = false;
            }
            break;
        }
    }
    for (a in zombie.attacks) {
        for (m in TestMoves) {
            invalidmove = false;
            move = TestMoves[m];
            zombie.coords[0] += move[0];
            zombie.coords[1] += move[1];
            for (zom in ZombieArray) {
                for (z in ZombieArray) {
                    if (zom == z) {
                        continue;
                    }
                    if (ZombieArray[z].coords[0] == ZombieArray[zom].coords[0] && ZombieArray[z].coords[1] == ZombieArray[zom].coords[1]) {
                        invalidmove = true;
                    }
                }
            }
            if (invalidmove) {
                zombie.coords[0] -= move[0];
                zombie.coords[1] -= move[1];
                continue;
            }
            if (CheckAttack(zombie,zombie.attacks[a])) {
                MA = true;
                MAM = move;
                zombie.coords[0] -= move[0];
                zombie.coords[1] -= move[1];
                break;
            }
            zombie.coords[0] -= move[0];
            zombie.coords[1] -= move[1];
        }
        if (MA) {
            break;
        }
    }
    if (SM && (AA ||(!AA && !MA))) {
        if (zombie.coords[1] != currentPlant.coords[1]) {
            if (Math.abs(currentPlant.coords[1]-zombie.coords[1]) > 1) {
                if (!(MoveZombie(zombie,[0, RoundToOne(currentPlant.coords[1]-zombie.coords[1])]))) {
                    if (zombie.coords[0] > currentPlant.coords[0]) {
                        MoveZombie(zombie, [-1,0])
                    }
                    else if (zombie.coords[0] < currentPlant.coords[0]) {
                        MoveZombie(zombie, [1,0]) 
                    }
                } 
            }
            else {
                if (zombie.coords[0] > currentPlant.coords[0]) {
                    if (!(MoveZombie(zombie, [-1,0]))) {
                        MoveZombie(zombie,[0, RoundToOne(currentPlant.coords[1]-zombie.coords[1])])
                    }
                }
                else if (zombie.coords[0] < currentPlant.coords[0]) {
                    if (!(MoveZombie(zombie, [1,0]))) {
                        MoveZombie(zombie,[0, RoundToOne(currentPlant.coords[1]-zombie.coords[1])])
                    }
                }
                else {
                    if (!(MoveZombie(zombie,[0, RoundToOne(currentPlant.coords[1]-zombie.coords[1])]))) {
                        if (Math.random() > 0.5) { 
                            MoveZombie(zombie,[-1, 0])
                        }
                        else {
                            MoveZombie(zombie,[1, 0])
                        }
                    }
                }
            }
        }
        else {
            if (zombie.coords[0] > currentPlant.coords[0]) { 
                if (!(MoveZombie(zombie, [-1,0]))) { 
                    if (Math.random() > 0.5) { 
                        MoveZombie(zombie,[0, -1])
                    }
                    else {
                        MoveZombie(zombie,[0, 1])
                    }
                }
            }
            else {
                if (!(MoveZombie(zombie, [1,0]))) {
                    if (Math.random() > 0.5) { 
                        MoveZombie(zombie,[0, -1])
                    }
                    else {
                        MoveZombie(zombie,[0, 1])
                    }
                }
            }
        }
    }
    else if (MA && SM) {
        MoveZombie(zombie, MAM);
    }
    CheckZindexes();
}
function MoveZombie(zombie, direction) {
    if (zombie.movesLeft >= 1) {
        zombie.movesLeft -= 1;
        prevzposes[ZombieArray.indexOf(zombie)] = zombie.coords.slice(0);
        zombie.coords[0] += direction[0];
        zombie.coords[1] += direction[1];
        // if (currentPlant.coords[0] > 1) {
        // if (currentPlant.coords[1] > 0) {
        // if (currentPlant.coords[0] < gridx) {
        // if (currentPlant.coords[1] < gridy-1
        if (zombie.coords[0] <= 0 || zombie.coords[0] > gridx || zombie.coords[1] < 0 || zombie.coords[1] >= gridy) {
            zombie.coords[0] = prevzposes[ZombieArray.indexOf(zombie)][0]; 
            zombie.coords[1] = prevzposes[ZombieArray.indexOf(zombie)][1];
            zombie.movesLeft += 1;
            updategrid();
            return false;
        }
        if (CheckIfCollision("Zombie",zombie)) {
            zombie.movesLeft += 1;
            updategrid();
            return false;
        }
        if (direction[1] > 0) {
            CreateConsoleText(zombie.name+" has moved 1 unit(s) down.",true)
        }
        else if (direction[1] < 0) {
            CreateConsoleText(zombie.name+" has moved 1 unit(s) up.",true)
        }
        if (direction[0] > 0) {
            CreateConsoleText(zombie.name+" has moved 1 unit(s) right.",true)
        }
        else if (direction[0] < 0) {
            CreateConsoleText(zombie.name+" has moved 1 unit(s) left.",true)
        }
        if (zombie.movesLeft >= 1) {
            CalculateMoves(zombie);
        }
        updategrid();
        return true;
    }
}
function RoundToOne(num) {
    if (num > 0) {
        return 1;
    }
    else {
        return -1;
    }
}
function PlantTurn() {
    setTimeout(function() { 
        UpdateTicks();
        UpdatePassivePerks("everyturn");
        IsPlayerTurn = true;
        ConsoleHistory.push("~ Plant's Turn ~");
        CanMove = true;
        CanAbility = [true, true];
        abilitybuttons.style.display = "block";
        UpdateTurnCount();
        SaveGame();
    }, 500)
}
function ZombieTurn(z) {
    zombie = ZombieArray[z];
    CanZAbility[z] = true;
    updategrid();
    setTimeout(function()  {
        CreateConsoleText(zombie.name+" is thinking..");
        if (zombie.understatus) {
            setTimeout(function() {
                if (zombie.stunned) {
                    CreateConsoleText(zombie.name+" did not do anything as they are stunned.")
                    if (zombie.tickTimeLeft <= 1) {
                        zombie.stunned = false;
                        zombie.understatus = false;
                    }
                    if (zombie.tickTimeLeft == 0) {
                        fighterPhysArray[fighterArray.indexOf(zombie)].style.filter = "";
                    }
                    for (a in zombie.attacks) {
                        if (zombie.attacks[a].TimeUntilReady > 0) {
                            zombie.attacks[a].TimeUntilReady -= 1;
                        }
                    }
                    for (s in zombie.supports) {
                        if (zombie.supports[s].TimeUntilReady > 0) {
                            zombie.supports[s].TimeUntilReady -= 1;
                        }
                    }
                    setTimeout(function() {
                        CreateConsoleText(zombie.name+" has ended their turn.")
                        if (z == ZombieArray.length-1) {
                            if (currentPlant.understatus) {
                                setTimeout(function() {
                                    if (currentPlant.stunned) {
                                        CreateConsoleText(currentPlant.name+" did not do anything as they are stunned.")
                                        currentPlant.stunned = false;
                                        for (attack in currentPlant.attacks) {
                                            attack = currentPlant.attacks[attack];
                                            if (attack.TimeUntilReady > 0) {
                                                attack.TimeUntilReady -= 1;
                                            }
                                        }
                                        currentPlant.understatus = false;
                                        UpdateTicks();
                                        UpdatePassivePerks("everyturn");
                                        ZombieTurn(0);
                                        if (currentPlant.chewing) {
                                            currentPlant.aliveSprite = "chewy.gif";
                                            fighterPhysArray[fighterArray.indexOf(currentPlant)].src = "chewy.gif";   
                                        }
                                        fighterPhysArray[fighterArray.indexOf(currentPlant)].style.filter = "";
                                    }
                                }, 1500);
                            }
                            if (currentPlant.chewing && !(currentPlant.stunned)) {
                                setTimeout(function() {
                                    currentPlant.chewingtime -= 1;
                                    if (currentPlant.chewingtime == 0) {
                                        currentPlant.chewing = false;
                                        if (currentPlant.allergy == false) {
                                        currentPlant.aliveSprite = "ArmorChomper.PNG";
                                        fighterPhysArray[fighterArray.indexOf(currentPlant)].src = "ArmorChomper.PNG";
                                        CreateConsoleText("Armor Chomper has finished chewing.");
                                        if (!(CriticalStage) && !(IsBossWave)) {
                                            PlantTurnTheme.sound.currentTime = ZombieTurnTheme.sound.currentTime;
                                            MusicFade(ZombieTurnTheme,PlantTurnTheme);
                                        }
                                        PlantTurn();
                                        currentPlant.aliveSprite = "ArmorChomper.PNG";
                                        fighterPhysArray[fighterArray.indexOf(currentPlant)].src = "ArmorChomper.PNG";
                                        }
                                        else {
                                            DeathByAllergy(currentPlant.allergy);
                                        }
                                    }
                                    else {
                                        if (!(CriticalStage) && !(IsBossWave)) {
                                            PlantTurnTheme.sound.currentTime = ZombieTurnTheme.sound.currentTime;
                                            MusicFade(ZombieTurnTheme,PlantTurnTheme);
                                        }
                                        setTimeout(function() {
                                            UpdateTicks();
                                            UpdatePassivePerks("everyturn");
                                            IsPlayerTurn = true;
                                            ConsoleHistory.push("~ Plant's Turn ~");
                                            CanMove = true;
                                            abilitybuttons.style.display = "block";
                                            UpdateTurnCount();
                                            SaveGame();
                                        }, 500)
                                        CreateConsoleText("Armor Chomper cannot attack as they are chewing.");
                                    }
                                }, turntime);
                            }
                            else if (!(currentPlant.stunned)) {
                                if (!(CriticalStage) && !(IsBossWave)) {
                                    PlantTurnTheme.sound.currentTime = ZombieTurnTheme.sound.currentTime;
                                    MusicFade(ZombieTurnTheme,PlantTurnTheme);
                                }
                                PlantTurn();
                            }
                            updategrid();
                        }
                        else {
                            ZombieTurn(z+1);
                        }
                    }, turntime);
                }
            }, turntime);
        }
        if (!(zombie.stunned)) {
            if (zombie.movesLeft < 1) {
                zombie.movesLeft += zombie.movement;
            }
            else {
                zombie.movesLeft = zombie.movement;
            }
            setTimeout(function() {
                for (a in zombie.attacks) {
                    if (zombie.attacks[a].TimeUntilReady > 0) {
                        zombie.attacks[a].TimeUntilReady -= 1;
                    }
                }
                for (s in zombie.supports) {
                    if (zombie.supports[s].TimeUntilReady > 0) {
                        zombie.supports[s].TimeUntilReady -= 1;
                    }
                }
                CalculateMoves(zombie);
                setTimeout(function() {
                    for (s in zombie.supports) {
                        TestSupport(zombie,zombie.supports[s]); 
                    }
                    for (a in zombie.attacks) {
                        TestAttack(zombie,zombie.attacks[a]); 
                        if (StopTurn) {
                            break;
                        }
                    }
                }, turntime);
                setTimeout(function() {
                    if (!(StopTurn)) {
                        setTimeout(function() {
                            CreateConsoleText(zombie.name+" has ended their turn.")
                            if (z == ZombieArray.length-1) {
                                if (currentPlant.understatus) {
                                    setTimeout(function() {
                                        if (currentPlant.stunned) {
                                            CreateConsoleText(currentPlant.name+" did not do anything as they are stunned.")
                                            currentPlant.stunned = false;
                                            for (attack in currentPlant.attacks) {
                                                attack = currentPlant.attacks[attack];
                                                if (attack.TimeUntilReady > 0) {
                                                    attack.TimeUntilReady -= 1;
                                                }
                                            }
                                            currentPlant.understatus = false;
                                            UpdateTicks();
                                            UpdatePassivePerks("everyturn");
                                            ZombieTurn(0);
                                            if (currentPlant.chewing) {
                                                currentPlant.aliveSprite = "chewy.gif";
                                                fighterPhysArray[fighterArray.indexOf(currentPlant)].src = "chewy.gif";   
                                            }
                                            fighterPhysArray[fighterArray.indexOf(currentPlant)].style.filter = "";
                                        }
                                    }, 1500);
                                }
                                if (currentPlant.chewing && !(currentPlant.stunned)) {
                                    setTimeout(function() {
                                        currentPlant.chewingtime -= 1;
                                        if (currentPlant.chewingtime == 0) {
                                            currentPlant.chewing = false;
                                            if (currentPlant.allergy == false) {
                                            currentPlant.aliveSprite = "ArmorChomper.PNG";
                                            fighterPhysArray[fighterArray.indexOf(currentPlant)].src = "ArmorChomper.PNG";
                                            CreateConsoleText("Armor Chomper has finished chewing.");
                                            if (!(CriticalStage) && !(IsBossWave)) {
                                                PlantTurnTheme.sound.currentTime = ZombieTurnTheme.sound.currentTime;
                                                MusicFade(ZombieTurnTheme,PlantTurnTheme);
                                            }
                                            PlantTurn();
                                            currentPlant.aliveSprite = "ArmorChomper.PNG";
                                            fighterPhysArray[fighterArray.indexOf(currentPlant)].src = "ArmorChomper.PNG";
                                            }
                                            else {
                                                DeathByAllergy(currentPlant.allergy);
                                            }
                                        }
                                        else {
                                            if (!(CriticalStage) && !(IsBossWave)) {
                                                PlantTurnTheme.sound.currentTime = ZombieTurnTheme.sound.currentTime;
                                                MusicFade(ZombieTurnTheme,PlantTurnTheme);
                                            }
                                            setTimeout(function() {
                                                UpdateTicks();
                                                UpdatePassivePerks("everyturn");
                                                IsPlayerTurn = true;
                                                ConsoleHistory.push("~ Plant's Turn ~");
                                                CanMove = true;
                                                abilitybuttons.style.display = "block";
                                                UpdateTurnCount();
                                                SaveGame();
                                            }, 500)
                                            CreateConsoleText("Armor Chomper cannot attack as they are chewing.");
                                        }
                                    }, turntime);
                                }
                                else if (!(currentPlant.stunned)) {
                                    if (!(CriticalStage) && !(IsBossWave)) {
                                        PlantTurnTheme.sound.currentTime = ZombieTurnTheme.sound.currentTime;
                                        MusicFade(ZombieTurnTheme,PlantTurnTheme);
                                    }
                                    PlantTurn();
                                }
                                updategrid();
                            }
                            else {
                                ZombieTurn(z+1);
                            }
                        }, turntime);
                    }
                }, turntime);
            }, turntime);
        }
    }, turntime);
}
function SortZArray() {
    sa = [];
    tempvar = 0;
    issorted = false;
    for (z in ZombieArray) {
        zombie = ZombieArray[z];
        sa.push(zombie);
    }
    while (issorted == false) {
        issorted = true;
        for (z in sa) {
            if (!(z >= sa.length-1)) {
                if (sa[z].coords[0] > sa[(parseInt(z)+1)].coords[0]) {
                    tempvar = sa[z];
                    sa[z] = sa[(parseInt(z)+1)];
                    sa[(parseInt(z)+1)] = tempvar;
                    issorted = false;
                }
            }
        }
    }
    return sa;
}

function tryToMove() {
    if (CanMove && IsPlayerTurn) {
        prevppos = currentPlant.coords.slice(0);
        newspot = [griditemarray[phygriditems.indexOf(event.target)].codx,griditemarray[phygriditems.indexOf(event.target)].cody];
        gs = false;
        testMoves = [[-1,0],[1,0],[0,1],[0,-1]];
        for (move in testMoves) {
            if (currentPlant.coords[0]+testMoves[move][0] == newspot[0] && currentPlant.coords[1]+testMoves[move][1] == newspot[1]) {
                gs = true;
            }
        }
        if (!(gs)) {
            CreateConsoleText("You cannot move there.",false,false);
            return;
        }
        currentPlant.coords[0] = newspot[0];
        currentPlant.coords[1] = newspot[1];
        CanMove = false;
        if (CheckIfCollision("plant","")) {
            return;
        }
        currentPlant.coords = prevppos.slice(0);
        if (newspot[0] == currentPlant.coords[0]) {
            if (newspot[1]-1 == currentPlant.coords[1]) {
                CreateConsoleText(currentPlant.name+" has moved 1 unit down.");
                gs = true;
            }
            if (newspot[1]+1 == currentPlant.coords[1]) {
                CreateConsoleText(currentPlant.name+" has moved 1 unit up.");
                gs = true;
            }
        }
        else if (newspot[1] == currentPlant.coords[1]) {
            if (newspot[0]-1 == currentPlant.coords[0]) {
                CreateConsoleText(currentPlant.name+" has moved 1 unit to the right.");
                gs = true;
            }
            if (newspot[0]+1 == currentPlant.coords[0]) {
                CreateConsoleText(currentPlant.name+" has moved 1 unit to the left.");
                gs = true;
            }
        }
        if (!(gs)) {
            CreateConsoleText("You cannot move there.",false,false);
            CanMove = true;
        }
        else {
            currentPlant.coords[0] = newspot[0];
            currentPlant.coords[1] = newspot[1];
            updategrid();
            UpdateTurnCount();
            CheckZindexes();
        }
    }
}

document.addEventListener('keydown', function(event) {
    if (CanMove && IsPlayerTurn) {
        prevppos = currentPlant.coords.slice(0);
        if(event.keyCode == 37) {
            if (currentPlant.coords[0] > 1) {
                currentPlant.coords[0] = currentPlant.coords[0]-1;
                if (CheckIfCollision("plant","")) {
                    return;
                }
                CreateConsoleText(currentPlant.name+" has moved 1 unit to the left.");
            }
            else {
                CreateConsoleText("You cannot go outside of the grid.",false,false);
                return;
            }        
        }
        else if(event.keyCode == 38) {
            if (currentPlant.coords[1] > 0) {
                currentPlant.coords[1] = currentPlant.coords[1]-1;
                if (CheckIfCollision("plant","")) {
                    return;
                }
                CreateConsoleText(currentPlant.name+" has moved 1 unit up.");
            }
            else {
                CreateConsoleText("You cannot go outside of the grid.",false,false);
                return;
            } 
        }
        else if(event.keyCode == 39) {
            if (currentPlant.coords[0] < gridx) {
                currentPlant.coords[0] = currentPlant.coords[0]+1;
                if (CheckIfCollision("plant","")) {
                    return;
                }
                CreateConsoleText(currentPlant.name+" has moved 1 unit to the right.");
            }
            else {
                CreateConsoleText("You cannot go outside of the grid.",false,false);
                return;
            } 
        }
        else if(event.keyCode == 40) {
            if (currentPlant.coords[1] < gridy-1) {
                currentPlant.coords[1] = currentPlant.coords[1]+1;
                if (CheckIfCollision("plant","")) {
                    return;
                }
                CreateConsoleText(currentPlant.name+" has moved 1 unit down.");
            }
            else {
                CreateConsoleText("You cannot go outside of the grid.",false,false);
                return;
            } 
        }
        if (event.keyCode == 37 || event.keyCode == 38 || event.keyCode == 39 || event.keyCode == 40) {
            CanMove = false;
            UpdateTurnCount();
            CheckZindexes();
            updategrid();
        }
    }
});
