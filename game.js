// ============================================================
//  DUNGEON TYPER — Core Game Loop and Canvas Renderer
// ============================================================

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

// Game States
const STATE_CUTSCENE = "cutscene";
const STATE_PLAY = "play";
const STATE_LEVEL_CLEAR = "level_clear";
const STATE_GAME_OVER = "game_over";
const STATE_VICTORY = "victory";
const STATE_PAUSED = "paused";

// Word Banks
const TIER_1 = ["bat", "cat", "dog", "run", "hit", "dig", "pit", "mud", "fog", "web", "cry", "hop", "leg", "arm", "eye", "lip", "box", "jar", "cup", "map", "sun", "sky", "fly", "old", "new", "big", "hot", "cold", "dark", "rock", "bone", "cave", "mist", "dust", "fire", "ash", "trap", "fall", "sink", "drop", "spin", "glow", "rush", "push", "jump", "step", "trip", "slip"];
const TIER_2 = ["stone", "curse", "haunt", "creep", "gloom", "sword", "shield", "arrow", "torch", "magic", "spell", "ghost", "skull", "crawl", "sneak", "lurk", "trail", "brave", "stab", "slash", "flame", "smoke", "crypt", "vault", "chain", "blood", "grave", "shriek", "creak", "groan", "stomp", "beast", "feral", "toxic", "decay", "chill", "dread", "storm", "blaze", "crash", "swipe", "dodge", "block", "punch", "kick", "throw", "shoot", "aiming"];
const TIER_3 = ["dungeon", "monster", "warrior", "sorcery", "phantom", "crawler", "ancient", "cursed", "escaped", "caverns", "shadows", "tremble", "shatter", "crumble", "descend", "creaking", "whispers", "darkness", "glowing", "devourer", "skeletal", "haunting", "menacing", "ferocious", "petrified", "lurking", "slithers", "thrashing", "ambushed", "stumbled", "terrified", "stumbling", "collapse", "eruption", "enchanted", "shattered", "screaming", "invaders", "captured"];
const TIER_4 = ["nightmare", "obliterate", "devastated", "terrifying", "imprisoned", "monstrous", "catastrophe", "bewitching", "eliminated", "unleashing", "demoralised", "annihilated", "overpowered", "destructive", "ferociously", "treacherous", "entangled", "smoldering", "vanquished", "suffocating", "petrifying", "mercilessly", "hallucinate", "tormented", "combatant", "retaliate", "viciously", "excruciating", "disoriented", "relentless", "thunderous", "conquering", "threatening", "demolished"];
const TIER_5 = ["catastrophically", "annihilating", "exterminating", "obliteration", "manifestation", "indestructible", "supernatural", "incapacitated", "disorientated", "manipulating", "intimidation", "overwhelming", "transmutation", "disintegrated", "impenetrable", "claustrophobic", "hallucinations", "catastrophised", "uncontrollable", "exasperating", "extraordinary", "pandemonium", "consequences", "confrontation", "labyrinthine", "subterranean", "necromancer", "reincarnation", "imprisonment", "disembodied", "transcendent", "unfathomable", "unprecedented", "incomprehensible", "insurmountable", "tempestuous"];

const LEVEL_TIERS = {
    1: TIER_1,
    2: TIER_2,
    3: TIER_3,
    4: TIER_4,
    5: TIER_5
};

const MONSTER_NAMES = [
    "Slime Sprout", "Skeleton Sentry", "Crypt Ghoul", "Vampire Bat", "The Ancient Overlord"
];

// Story Panels for Cutscene
const STORY_PANELS = [
    {
        title: "FIELD VISIT",
        lines: [
            "It was a bright morning.",
            "Mr. Rahman's class arrived at",
            "the famous Crystal Cave site",
            "for their annual field visit.",
            "",
            "Everyone was excited..."
        ],
        crop: [0.0, 0.0, 0.33, 1.0],
        overlay: "rgba(0, 40, 80, 0.35)"
    },
    {
        title: "CURIOSITY",
        lines: [
            "One student — Arjun — wandered",
            "away from the group.",
            "",
            "A strange glowing light",
            "deep inside the cave",
            "caught his eye...",
        ],
        crop: [0.33, 0.0, 0.66, 1.0],
        overlay: "rgba(30, 0, 60, 0.4)"
    },
    {
        title: "THE FALL",
        lines: [
            "The ground suddenly crumbled!",
            "",
            "Arjun screamed as he tumbled",
            "down... deeper... and deeper...",
            "",
            "His backpack flew into the air...",
        ],
        crop: [0.66, 0.0, 1.0, 1.0],
        overlay: "rgba(80, 0, 0, 0.45)"
    },
    {
        title: "THE DUNGEON",
        lines: [
            "He landed hard on cold stone.",
            "",
            "The darkness was absolute.",
            "Strange growls echoed around him.",
            "",
            '"What... what is this place?"',
        ],
        crop: null, // Use dungeon bg
        overlay: "rgba(0, 0, 0, 0.82)"
    },
    {
        title: "MONSTERS EMERGE",
        lines: [
            "Red eyes appeared in the dark.",
            "Then more. And more.",
            "",
            "Arjun grabbed his torch.",
            "",
            '"I have to fight through this.',
            ' I WILL find a way out!"',
        ],
        crop: null, // Use dungeon bg
        overlay: "rgba(70, 0, 0, 0.72)"
    }
];

// Projectile FX colors based on level
const SPELL_COLORS = [
    "#ff4500", // L1: Fire (orange-red)
    "#32cd32", // L2: Acid (lime green)
    "#00ffff", // L3: Frost (cyan)
    "#ffd700", // L4: Lightning (gold)
    "#ba55d3", // L5: Shadow (purple)
    "#ffffff", // L6: Light (white)
    "#ff1493", // L7: Plasma (pink)
    "#ff8c00", // L8: Meteor (dark orange)
    "#1e90ff", // L9: Void (royal blue)
    "#ff00ff"  // L10: Cosmic (magenta)
];

// Load Images
function loadImage(src) {
    const img = new Image();
    img.src = src;
    return img;
}

const assets = {
    hero: loadImage("assets/sprites/hero.png"),
    dungeon_bg: loadImage("assets/dungeon_bg.png"),
    cutscene: loadImage("assets/cutscene.jpg"),
    monster_0: loadImage("assets/sprites/monster_0.png"),
    monster_1: loadImage("assets/sprites/monster_1.png"),
    monster_2: loadImage("assets/sprites/monster_2.png"),
    monster_3: loadImage("assets/sprites/monster_3.png"),
    monster_4: loadImage("assets/sprites/monster_4.png")
};

// Game state variables
let gameState = STATE_CUTSCENE;
let cutsceneIndex = 0;
let cutsceneCharIndex = 0;
let cutsceneTextTimer = 0;
let cutsceneLinesRevealed = [];
let cutsceneTextDone = false;

let gameLevel = 1;
window.gameLevel = 1; // set global for audio access
let score = 0;

// Player attributes
let player = {
    level: 1,
    hp: 100,
    maxHp: 100,
    atk: 10,
    def: 5,
    xp: 0,
    maxXp: 100,
    x: 160,
    y: 360,
    w: 100,
    h: 120,
    shake: 0,
    flash: 0,
    damageTexts: [],
    items: {
        freeze: 1,
        fireball: 1,
        shield: 1
    }
};

let freezeTimer = 0; // Freeze countdown in frames
let shieldActive = false; // Is active protective shield on Arjun?
let levelClearRewardMsg = "";

// Monster attributes
let activeMonster = {
    name: "",
    hp: 5,
    maxHp: 5,
    sprite: null,
    x: 680,
    y: 360,
    w: 120,
    h: 140,
    shake: 0,
    flash: 0,
    damageTexts: []
};

// Typing game state variables
let wordQueue = []; // All words to fall in current monster round (exactly 10)
let spawnedWordCount = 0; // count of words spawned
let activeWords = []; // words currently falling
let targetWord = null; // currently focused word
let wordSpawnTimer = 0;
let wordGems = []; // array of 10 items: "pending", "correct", "missed"
let correctCount = 0; // how many correct (needs 5 to win)
let failedCount = 0; // how many missed (6 means fail)

// Visual effects
let particles = [];
let projectiles = [];
let screenShake = 0;
let flashOverlay = 0;
let flashOverlayColor = "white";

// Key listeners
let pressedKeys = {};
let prePauseState = null;

function togglePause() {
    if (gameState === STATE_PLAY) {
        prePauseState = STATE_PLAY;
        gameState = STATE_PAUSED;
        sounds.stopMusic();
    } else if (gameState === STATE_PAUSED) {
        gameState = prePauseState || STATE_PLAY;
        sounds.startMusic();
    }
}

// Active Items Functions
function useFreezeScroll() {
    if (player.items.freeze > 0 && freezeTimer === 0) {
        player.items.freeze--;
        freezeTimer = 300; // 5 seconds @ 60 FPS
        sounds.freeze();
        
        // Spawn blue magic particle effects around the hero and screen
        for (let i = 0; i < 25; i++) {
            particles.push({
                x: Math.random() * WIDTH,
                y: Math.random() * HEIGHT,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                color: "#00ffff",
                alpha: 1,
                decay: 0.02 + Math.random() * 0.02,
                size: 3 + Math.random() * 4
            });
        }
    }
}

function useFireballScroll() {
    if (player.items.fireball > 0 && activeWords.length > 0) {
        player.items.fireball--;
        sounds.fireball();

        // Find the lowest active word on screen (word with largest y)
        let target = activeWords[0];
        let targetIdx = 0;
        for (let i = 1; i < activeWords.length; i++) {
            if (activeWords[i].y > target.y) {
                target = activeWords[i];
                targetIdx = i;
            }
        }

        // If target was targetWord, unlock focus
        if (target === targetWord) {
            targetWord = null;
        }

        // Spawn a large fireball projectile shooting from the player to the word
        projectiles.push({
            x: player.x + 50,
            y: player.y + 60,
            targetX: target.x + 50,
            targetY: target.y + 10,
            speed: 14,
            color: "#ff4500", // Orange-red fireball
            word: target.text,
            isFireball: true
        });

        // Delete the word from active list immediately
        activeWords.splice(targetIdx, 1);
        
        // Update gems tracker
        let gemIdx = spawnedWordCount - activeWords.length - 1;
        if (gemIdx >= 0 && gemIdx < 10) {
            wordGems[gemIdx] = "correct";
        }
        correctCount++;
        score += 100;
        
        // Deal 1 damage to monster
        activeMonster.hp--;
        activeMonster.shake = 10;
        activeMonster.flash = 5;
        
        if (activeMonster.hp <= 0) {
            triggerMonsterDefeat();
        }
    }
}

function useShieldPotion() {
    if (player.items.shield > 0 && !shieldActive) {
        player.items.shield--;
        shieldActive = true;
        sounds.shield();
        
        // Spawn shield-wrap particles
        for (let i = 0; i < 15; i++) {
            particles.push({
                x: player.x + 50 + (Math.random() - 0.5) * 30,
                y: player.y + 60 + (Math.random() - 0.5) * 30,
                vx: (Math.random() - 0.5) * 3,
                vy: (Math.random() - 0.5) * 3,
                color: "#33ccff",
                alpha: 1,
                decay: 0.03 + Math.random() * 0.03,
                size: 2 + Math.random() * 4
            });
        }
    }
}

// Visual Equipment Upgrades Drawing
function drawHelmet(ctx, cx, cy, w, h) {
    ctx.save();
    // Iron Helmet base dome
    ctx.fillStyle = "#7a7a85";
    ctx.fillRect(cx + 38, cy + 5, 24, 22);

    // Visor dark slit
    ctx.fillStyle = "#1c1c1e";
    ctx.fillRect(cx + 38, cy + 16, 24, 4);

    // Silver metallic highlights
    ctx.fillStyle = "#d1d1d6";
    ctx.fillRect(cx + 42, cy + 7, 12, 2);
    ctx.fillRect(cx + 38, cy + 9, 4, 6);

    // Red Plume
    ctx.fillStyle = "#ff3344";
    // Plume stem
    ctx.fillRect(cx + 48, cy - 5, 6, 10);
    // Plume feather flowing backward
    ctx.fillRect(cx + 38, cy - 3, 10, 5);
    ctx.restore();
}

function drawMagicShield(ctx, cx, cy, w, h) {
    ctx.save();
    // Golden border trim (outer heater-shield shape)
    ctx.fillStyle = "#ffd700";
    ctx.beginPath();
    ctx.moveTo(cx + 10, cy + 42);
    ctx.lineTo(cx + 36, cy + 42);
    ctx.lineTo(cx + 36, cy + 62);
    ctx.lineTo(cx + 23, cy + 76);
    ctx.lineTo(cx + 10, cy + 62);
    ctx.closePath();
    ctx.fill();

    // Sapphire blue body
    ctx.fillStyle = "#0055ff";
    ctx.beginPath();
    ctx.moveTo(cx + 13, cy + 45);
    ctx.lineTo(cx + 33, cy + 45);
    ctx.lineTo(cx + 33, cy + 60);
    ctx.lineTo(cx + 23, cy + 71);
    ctx.lineTo(cx + 13, cy + 60);
    ctx.closePath();
    ctx.fill();

    // Glowing white star/cross emblem in center
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(cx + 21, cy + 50, 4, 10);
    ctx.fillRect(cx + 18, cy + 53, 10, 4);
    ctx.restore();
}

function drawLegendarySword(ctx, cx, cy, w, h) {
    ctx.save();
    // Position sword in Arjun's left hand (replaces torch position)
    ctx.translate(cx + 80, cy + 38);
    ctx.rotate(Math.PI / 4); // rotate 45 degrees up-right

    // Gold crossguard
    ctx.fillStyle = "#ffd700";
    ctx.fillRect(-8, -2, 16, 4);

    // Gold pommel
    ctx.fillRect(-2, 4, 4, 4);
    // Handle grip
    ctx.fillStyle = "#5c4033";
    ctx.fillRect(-1.5, 0, 3, 5);

    // Steel Blade
    ctx.fillStyle = "#e5e5ea";
    ctx.strokeStyle = "#00e5ff"; // Magic cyan glow!
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.rect(-3, -38, 6, 36);
    ctx.fill();
    ctx.stroke();

    // Blade tip
    ctx.beginPath();
    ctx.moveTo(-3, -38);
    ctx.lineTo(0, -44);
    ctx.lineTo(3, -38);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.restore();

    // Spawn tiny flaming sword trail particles
    if (Math.random() < 0.25) {
        let swordX = cx + 80 + Math.random() * 20;
        let swordY = cy + 38 - Math.random() * 25;
        particles.push({
            x: swordX,
            y: swordY,
            vx: (Math.random() - 0.3) * 1.5,
            vy: -Math.random() * 1.5,
            color: ["#ff4500", "#ffaa00", "#ff3300"][Math.floor(Math.random() * 3)],
            alpha: 0.9,
            decay: 0.04 + Math.random() * 0.03,
            size: 2 + Math.random() * 2
        });
    }
}

// Register keyboard capture
window.addEventListener("keydown", (e) => {
    pressedKeys[e.key] = true;
    
    // Ignore function keys / shortcuts
    if (e.ctrlKey || e.altKey || e.metaKey) return;

    if (gameState === STATE_CUTSCENE) {
        if (e.key === " " || e.key === "Enter") {
            sounds.init();
            sounds.click();
            if (!cutsceneTextDone) {
                // skip typewriter
                skipTypewriter();
            } else {
                // next panel
                nextCutscenePanel();
            }
        }
        e.preventDefault();
        return;
    }

    if (gameState === STATE_PLAY) {
        // Toggle pause on Escape
        if (e.key === "Escape") {
            sounds.click();
            togglePause();
            e.preventDefault();
            return;
        }

        // Start background music loop on first type interaction if not running
        if (sounds.ctx && sounds.ctx.state === "suspended") {
            sounds.ctx.resume();
        }
        sounds.startMusic();

        // Handle Active Items: keys '1', '2', '3'
        if (e.key === "1") {
            useFreezeScroll();
            e.preventDefault();
            return;
        }
        if (e.key === "2") {
            useFireballScroll();
            e.preventDefault();
            return;
        }
        if (e.key === "3") {
            useShieldPotion();
            e.preventDefault();
            return;
        }

        // Handle letter keypresses for typing
        const char = e.key;
        if (char.length === 1 && /[a-zA-Z]/.test(char)) {
            handleTyping(char.toLowerCase());
        }
        e.preventDefault();
        return;
    }

    if (gameState === STATE_PAUSED) {
        // Resume on Escape, Space, or Enter
        if (e.key === "Escape" || e.key === " " || e.key === "Enter") {
            sounds.click();
            togglePause();
        }
        e.preventDefault();
        return;
    }

    if (gameState === STATE_LEVEL_CLEAR) {
        if (e.key === " " || e.key === "Enter") {
            sounds.pickup();
            startLevel(gameLevel + 1);
        }
        e.preventDefault();
        return;
    }

    if (gameState === STATE_GAME_OVER) {
        if (e.key === " " || e.key === "Enter") {
            sounds.pickup();
            restartAdventure();
        }
        e.preventDefault();
        return;
    }

    if (gameState === STATE_VICTORY) {
        if (e.key === " " || e.key === "Enter") {
            sounds.pickup();
            restartAdventure();
        }
        e.preventDefault();
        return;
    }
});

window.addEventListener("keyup", (e) => {
    pressedKeys[e.key] = false;
});

// Canvas click listener for Pause button and general overlay resume
canvas.addEventListener("click", (e) => {
    sounds.init(); // initialize Web Audio context
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (WIDTH / rect.width);
    const y = (e.clientY - rect.top) * (HEIGHT / rect.height);

    if (gameState === STATE_PLAY) {
        // Clicked Pause button in HUD (x: 605 to 710, y: 20 to 48)
        if (x >= 605 && x <= 710 && y >= 20 && y <= 48) {
            sounds.click();
            togglePause();
        }
    } else if (gameState === STATE_PAUSED) {
        // Click anywhere to resume when paused
        sounds.click();
        togglePause();
    }
});

// Start the loop
resetGameVariables();
requestAnimationFrame(gameLoop);

// Initialize or reset game fully
function resetGameVariables() {
    gameState = STATE_CUTSCENE;
    cutsceneIndex = 0;
    gameLevel = 1;
    window.gameLevel = 1;
    score = 0;

    // Player default
    player.level = 1;
    player.hp = 100;
    player.maxHp = 100;
    player.atk = 10;
    player.def = 5;
    player.xp = 0;
    player.maxXp = 100;
    player.damageTexts = [];
    player.items = { freeze: 1, fireball: 1, shield: 1 };
    freezeTimer = 0;
    shieldActive = false;

    initCutscenePanel();
    sounds.stopMusic();
}

function restartAdventure() {
    resetGameVariables();
    gameState = STATE_CUTSCENE;
    initCutscenePanel();
}

// Prepare next level
function startLevel(lvl) {
    if (lvl > 5) {
        gameState = STATE_VICTORY;
        sounds.stopMusic();
        sounds.win();
        return;
    }

    gameLevel = lvl;
    window.gameLevel = lvl;

    // Hero stats increase per level
    player.maxHp = 100 + (lvl - 1) * 10;
    player.hp = player.maxHp; // Heal to full
    player.atk = 10 + (lvl - 1) * 5;
    player.def = 5 + (lvl - 1) * 3;

    // Monster setup
    let mIdx = (lvl - 1) % 5;
    activeMonster.name = MONSTER_NAMES[lvl - 1];
    activeMonster.sprite = assets[`monster_${mIdx}`];
    activeMonster.hp = 5;
    activeMonster.maxHp = 5;
    activeMonster.shake = 0;
    activeMonster.flash = 0;
    activeMonster.damageTexts = [];

    // Scale monster size as floors descend
    let sizeFactor = 1 + (lvl - 1) * 0.08;
    activeMonster.w = Math.round(110 * sizeFactor);
    activeMonster.h = Math.round(130 * sizeFactor);

    // Setup word queue: pick 10 words for the level from corresponding tier
    let tierPool = LEVEL_TIERS[lvl] || TIER_1;
    let shuffled = [...tierPool].sort(() => 0.5 - Math.random());
    wordQueue = shuffled.slice(0, 10);
    spawnedWordCount = 0;
    activeWords = [];
    targetWord = null;
    wordSpawnTimer = 0;
    
    // Clear projectiles / particles
    projectiles = [];
    particles = [];

    // Setup gems
    wordGems = Array(10).fill("pending");
    correctCount = 0;
    failedCount = 0;

    gameState = STATE_PLAY;
    sounds.startMusic();
    triggerScreenFlash("rgba(255, 255, 255, 0.4)", 15);
}

// Typewriter Cutscene Functions
function initCutscenePanel() {
    let p = STORY_PANELS[cutsceneIndex];
    cutsceneCharIndex = 0;
    cutsceneTextTimer = 0;
    cutsceneTextDone = false;
    cutsceneLinesRevealed = Array(p.lines.length).fill("");
}

function skipTypewriter() {
    let p = STORY_PANELS[cutsceneIndex];
    p.lines.forEach((line, idx) => {
        cutsceneLinesRevealed[idx] = line;
    });
    cutsceneTextDone = true;
}

function nextCutscenePanel() {
    cutsceneIndex++;
    if (cutsceneIndex >= STORY_PANELS.length) {
        startLevel(1);
    } else {
        initCutscenePanel();
    }
}

// Word Spawning logic
function spawnNextWord() {
    if (spawnedWordCount >= 10) return;
    
    let text = wordQueue[spawnedWordCount];
    spawnedWordCount++;

    // Random X between margins
    let padding = 120;
    let rx = padding + Math.random() * (WIDTH - padding * 2 - 100);

    // Speed increases clearly from level 2 onwards (5 floors total)
    let baseSpeed = 0.6;
    let levelSpeedBonus = 0;
    if (gameLevel >= 2) {
        levelSpeedBonus = 0.5 + (gameLevel - 2) * 0.45;
    }
    let speed = baseSpeed + levelSpeedBonus + Math.random() * 0.3;
    speed = Math.min(4.8, speed); // Speed cap

    activeWords.push({
        text: text,
        x: rx,
        y: -10,
        speed: speed,
        typed: 0
    });
}

// Handle key input matching words
function handleTyping(letter) {
    if (targetWord) {
        // We are currently typing a locked word
        let nextChar = targetWord.text[targetWord.typed].toLowerCase();
        if (letter === nextChar) {
            targetWord.typed++;
            sounds.click();
            spawnTypeParticles(targetWord.x + targetWord.typed * 10, targetWord.y);

            // Complete word
            if (targetWord.typed === targetWord.text.length) {
                triggerWordCompletion(targetWord);
                targetWord = null;
            }
        } else {
            // Incorrect letter sound and visual shake
            triggerWordError(targetWord);
        }
    } else {
        // No target word, target the closest matching word
        let matchedWords = activeWords.filter(w => w.text[0].toLowerCase() === letter);
        if (matchedWords.length > 0) {
            // Target the one lowest on the screen (highest Y) to prioritize threat
            matchedWords.sort((a, b) => b.y - a.y);
            targetWord = matchedWords[0];
            targetWord.typed = 1;
            sounds.click();
            spawnTypeParticles(targetWord.x + 10, targetWord.y);

            if (targetWord.typed === targetWord.text.length) {
                triggerWordCompletion(targetWord);
                targetWord = null;
            }
        } else {
            // Typo with no active match
            sounds.playTone([160], [0.06], "sawtooth", 0.08);
        }
    }
}

function triggerWordError(word) {
    // Shorthand buzzer
    sounds.playTone([140], [0.08], "sawtooth", 0.12);
    word.shake = 8;
}

function triggerWordCompletion(word) {
    // Success: Spawn projectile
    projectiles.push({
        x: player.x + 40,
        y: player.y + 40,
        targetX: activeMonster.x + activeMonster.w / 2,
        targetY: activeMonster.y + activeMonster.h / 2,
        speed: 16,
        color: SPELL_COLORS[gameLevel - 1] || "#ffdd44",
        word: word.text
    });

    // Mark gem
    let gemIdx = spawnedWordCount - activeWords.length + activeWords.indexOf(word);
    if (gemIdx >= 0 && gemIdx < 10) {
        wordGems[gemIdx] = "correct";
    }

    // Remove from active lists
    activeWords = activeWords.filter(w => w !== word);
    correctCount++;
    score += word.text.length * 15;

    sounds.pickup();
}

function checkWinLossConditions() {
    // Defeated monster
    if (correctCount >= 5 && activeMonster.hp > 0) {
        // Monster HP gets reduced to zero
        activeMonster.hp = 0;
        triggerMonsterDefeat();
    }

    // Missed too many words
    if (failedCount >= 6 && gameState === STATE_PLAY) {
        triggerPlayerDefeat();
    }
}

function triggerMonsterDefeat() {
    triggerScreenFlash("rgba(255, 255, 255, 0.6)", 25);
    screenShake = 30;
    sounds.die();
    
    // Convert remaining words to floating gold particles
    activeWords.forEach(w => {
        spawnGoldBurst(w.x, w.y, 8);
    });
    activeWords = [];
    targetWord = null;

    setTimeout(() => {
        sounds.stopMusic();
        sounds.win();
        gameState = STATE_LEVEL_CLEAR;
        
        // XP Reward
        let xpGained = gameLevel * 25;
        player.xp += xpGained;
        if (player.xp >= player.maxXp) {
            player.level++;
            player.xp -= player.maxXp;
            player.maxXp = Math.round(player.maxXp * 1.3);
        }

        // Active Item Reward (max capacity 3 per type)
        let itemTypes = ["freeze", "fireball", "shield"];
        let rolledType = itemTypes[Math.floor(Math.random() * itemTypes.length)];
        let prettyNames = { freeze: "Freeze Scroll", fireball: "Fireball Scroll", shield: "Shield Potion" };
        
        if (player.items[rolledType] < 3) {
            player.items[rolledType]++;
            levelClearRewardMsg = `REWARD: +1 ${prettyNames[rolledType]}!`;
        } else {
            let candidates = itemTypes.filter(t => player.items[t] < 3);
            if (candidates.length > 0) {
                let fallbackType = candidates[Math.floor(Math.random() * candidates.length)];
                player.items[fallbackType]++;
                levelClearRewardMsg = `REWARD: +1 ${prettyNames[fallbackType]}!`;
            } else {
                levelClearRewardMsg = "INVENTORY FULL! (No Item Reward)";
            }
        }
    }, 800);
}

function triggerPlayerDefeat() {
    triggerScreenFlash("rgba(220, 0, 0, 0.6)", 30);
    screenShake = 20;
    sounds.stopMusic();
    sounds.hurt();
    
    setTimeout(() => {
        sounds.die();
        gameState = STATE_GAME_OVER;
    }, 600);
}

// Core Game loop
function gameLoop() {
    update();
    render();
    requestAnimationFrame(gameLoop);
}

function update() {
    // Screen shake decaying
    if (screenShake > 0) screenShake -= 1.2;
    if (flashOverlay > 0) flashOverlay -= 0.05;

    // Update animations
    if (player.shake > 0) player.shake--;
    if (player.flash > 0) player.flash--;
    if (activeMonster.shake > 0) activeMonster.shake--;
    if (activeMonster.flash > 0) activeMonster.flash--;

    // Update floating damage text overlays
    updateDamageTexts(player.damageTexts);
    updateDamageTexts(activeMonster.damageTexts);

    if (gameState === STATE_CUTSCENE) {
        updateCutscene();
    } else if (gameState === STATE_PLAY) {
        updateGameplay();
    }

    // Update Projectiles & Particles in all action states unless paused
    if (gameState !== STATE_PAUSED) {
        updateProjectiles();
        updateParticles();
    }
}

function updateCutscene() {
    let p = STORY_PANELS[cutsceneIndex];
    if (cutsceneTextDone) return;

    cutsceneTextTimer++;
    if (cutsceneTextTimer >= 2) { // characters per frame
        cutsceneTextTimer = 0;

        // Flatten panels line index and character index
        let flatIndex = 0;
        let charAdded = false;

        for (let i = 0; i < p.lines.length; i++) {
            let line = p.lines[i];
            if (cutsceneCharIndex >= flatIndex && cutsceneCharIndex < flatIndex + line.length) {
                let offset = cutsceneCharIndex - flatIndex;
                cutsceneLinesRevealed[i] += line[offset];
                cutsceneCharIndex++;
                charAdded = true;
                break;
            }
            flatIndex += line.length;
        }

        if (!charAdded) {
            cutsceneTextDone = true;
        }
    }
}

function updateGameplay() {
    // Decelerate active item freezeTimer
    if (freezeTimer > 0) freezeTimer--;

    // Spawn falling words
    wordSpawnTimer++;
    let spawnRate = Math.max(70, 160 - (gameLevel - 1) * 8); // spawn faster at higher levels
    if (wordSpawnTimer >= spawnRate && spawnedWordCount < 10) {
        wordSpawnTimer = 0;
        spawnNextWord();
    }

    // Update words
    for (let i = activeWords.length - 1; i >= 0; i--) {
        let w = activeWords[i];
        
        // Handle shake decay
        if (w.shake > 0) w.shake--;

        // Fall (slowed down by Freeze Scroll)
        let speedMult = (freezeTimer > 0) ? 0.5 : 1.0;
        w.y += w.speed * speedMult;

        // Reached Ground (Damage Trigger)
        if (w.y >= 485) {
            if (shieldActive) {
                // Shield blocks damage!
                shieldActive = false;
                sounds.shield();
                player.flash = 5;
                // Spawn blue shield block particles
                for (let k = 0; k < 15; k++) {
                    particles.push({
                        x: player.x + 50 + (Math.random() - 0.5) * 40,
                        y: player.y + 60 + (Math.random() - 0.5) * 40,
                        vx: (Math.random() - 0.5) * 4,
                        vy: (Math.random() - 0.5) * 4,
                        color: "#33ccff",
                        alpha: 1,
                        decay: 0.03 + Math.random() * 0.02,
                        size: 2 + Math.random() * 3
                    });
                }
                player.damageTexts.push({ text: "BLOCKED", x: player.x + 30, y: player.y - 10, alpha: 1, color: "#33ccff" });
            } else {
                sounds.hurt();
                
                // Player takes hit
                player.hp = Math.max(0, player.hp - 20);
                player.shake = 10;
                player.flash = 8;
                screenShake = 12;

                spawnRedExplosion(w.x, w.y);
                player.damageTexts.push({ text: "-20 HP", x: player.x + 30, y: player.y - 10, alpha: 1, color: "#ff3333" });
            }

            // Mark Gem
            let gemIdx = spawnedWordCount - activeWords.length + i;
            if (gemIdx >= 0 && gemIdx < 10) {
                wordGems[gemIdx] = "missed";
            }

            if (w === targetWord) targetWord = null;
            activeWords.splice(i, 1);
            failedCount++;

            checkWinLossConditions();
        }
    }

    checkWinLossConditions();
}

function updateProjectiles() {
    for (let i = projectiles.length - 1; i >= 0; i--) {
        let p = projectiles[i];
        let dx = p.targetX - p.x;
        let dy = p.targetY - p.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < p.speed) {
            // Hit!
            if (p.isFireball) {
                spawnFireBurst(p.targetX, p.targetY, 16);
            } else {
                activeMonster.hp = Math.max(0, activeMonster.hp - 1);
                activeMonster.shake = 10;
                activeMonster.flash = 8;
                screenShake = 6;

                // Damage popup
                let dmg = player.atk + Math.round(Math.random() * 5);
                activeMonster.damageTexts.push({
                    text: `-${dmg}`,
                    x: activeMonster.x + activeMonster.w / 2,
                    y: activeMonster.y - 10,
                    alpha: 1,
                    color: "#ffcc00"
                });

                spawnSpellHitBurst(p.targetX, p.targetY, p.color);
                sounds.hit();
            }
            projectiles.splice(i, 1);
        } else {
            p.x += (dx / dist) * p.speed;
            p.y += (dy / dist) * p.speed;
            // Spawn trailing particles
            spawnTrailParticles(p.x, p.y, p.color);
        }
    }
}

function updateParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
        let p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;
        if (p.life <= 0) {
            particles.splice(i, 1);
        }
    }
}

function updateDamageTexts(arr) {
    for (let i = arr.length - 1; i >= 0; i--) {
        let dt = arr[i];
        dt.y -= 0.8; // float up
        dt.alpha -= 0.02; // fade
        if (dt.alpha <= 0) {
            arr.splice(i, 1);
        }
    }
}

// Particle Builders
function spawnTypeParticles(x, y) {
    for (let i = 0; i < 4; i++) {
        particles.push({
            x: x, y: y,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4,
            color: "#00ffff",
            size: Math.random() * 4 + 2,
            life: 1.0,
            decay: 0.05
        });
    }
}

// Sparkle Trail for projectiles
function spawnTrailParticles(x, y, color) {
    particles.push({
        x: x, y: y,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        color: color,
        size: Math.random() * 5 + 3,
        life: 0.8,
        decay: 0.06
    });
}

function spawnSpellHitBurst(x, y, color) {
    for (let i = 0; i < 15; i++) {
        let angle = Math.random() * Math.PI * 2;
        let speed = Math.random() * 6 + 3;
        particles.push({
            x: x, y: y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            color: color,
            size: Math.random() * 6 + 3,
            life: 1.0,
            decay: 0.04
        });
    }
}

function spawnFireBurst(x, y, count) {
    let colors = ["#ff4500", "#ff8c00", "#ffd700", "#ff3300"];
    for (let i = 0; i < count; i++) {
        let angle = Math.random() * Math.PI * 2;
        let speed = Math.random() * 8 + 4;
        particles.push({
            x: x, y: y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * 8 + 4,
            life: 1.0,
            decay: 0.03 + Math.random() * 0.02
        });
    }
}

function spawnRedExplosion(x, y) {
    for (let i = 0; i < 12; i++) {
        let angle = Math.random() * Math.PI * 2;
        let speed = Math.random() * 5 + 2;
        particles.push({
            x: x, y: y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            color: "#ff3300",
            size: Math.random() * 5 + 4,
            life: 1.0,
            decay: 0.05
        });
    }
}

function spawnGoldBurst(x, y, count) {
    for (let i = 0; i < count; i++) {
        let angle = Math.random() * Math.PI * 2;
        let speed = Math.random() * 4 + 1;
        particles.push({
            x: x, y: y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            color: "#ffd700",
            size: Math.random() * 6 + 3,
            life: 1.0,
            decay: 0.03
        });
    }
}

function triggerScreenFlash(color, frames) {
    flashOverlay = 1.0;
    flashOverlayColor = color;
}

// RENDER FUNCTIONS
function render() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    // Apply screenshake
    ctx.save();
    if (screenShake > 0) {
        let sx = (Math.random() - 0.5) * screenShake;
        let sy = (Math.random() - 0.5) * screenShake;
        ctx.translate(sx, sy);
    }

    if (gameState === STATE_CUTSCENE) {
        drawCutscene();
    } else {
        drawGameplay();
    }

    ctx.restore();

    // Render Overlay Flash (Outside Screenshake)
    if (flashOverlay > 0) {
        ctx.fillStyle = flashOverlayColor;
        ctx.globalAlpha = flashOverlay;
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
        ctx.globalAlpha = 1.0;
    }
}

function drawCutscene() {
    let p = STORY_PANELS[cutsceneIndex];

    // Background Image
    if (p.crop && assets.cutscene.complete) {
        // Draw cropped panel center-top
        let cx = p.crop[0] * assets.cutscene.width;
        let cw = (p.crop[2] - p.crop[0]) * assets.cutscene.width;
        let ch = assets.cutscene.height;
        ctx.drawImage(assets.cutscene, cx, 0, cw, ch, WIDTH / 2 - 180, 50, 360, 360);
    } else if (assets.dungeon_bg.complete) {
        // Use full dungeon background for dungeon discovery panels
        ctx.drawImage(assets.dungeon_bg, 0, 0, WIDTH, HEIGHT);
    } else {
        ctx.fillStyle = "#0c0a12";
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
    }

    // Colored tint overlay
    ctx.fillStyle = p.overlay;
    if (p.crop) {
        ctx.fillRect(WIDTH / 2 - 180, 50, 360, 360);
        // Draw frame around crop
        ctx.strokeStyle = "#b48c3c";
        ctx.lineWidth = 4;
        ctx.strokeRect(WIDTH / 2 - 180, 50, 360, 360);
    } else {
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
    }

    // Text box at bottom
    let boxX = 60, boxY = 440, boxW = 840, boxH = 150;
    ctx.fillStyle = "rgba(0, 0, 0, 0.85)";
    ctx.fillRect(boxX, boxY, boxW, boxH);
    ctx.strokeStyle = "#ffcc00";
    ctx.lineWidth = 3;
    ctx.strokeRect(boxX, boxY, boxW, boxH);

    // Title text
    ctx.font = '22px "Press Start 2P", monospace';
    ctx.fillStyle = "#ffcc00";
    ctx.textAlign = "center";
    ctx.fillText(`— ${p.title} —`, WIDTH / 2, boxY + 35);

    // Lines of text
    ctx.font = '15px "Press Start 2P", monospace';
    ctx.fillStyle = "#e5e5e5";
    cutsceneLinesRevealed.forEach((line, idx) => {
        ctx.fillText(line, WIDTH / 2, boxY + 65 + idx * 20);
    });

    // Prompt indicator
    if (cutsceneTextDone) {
        ctx.font = '12px "Press Start 2P", monospace';
        let isBlink = Math.floor(Date.now() / 400) % 2 === 0;
        ctx.fillStyle = isBlink ? "#ffcc00" : "#997a00";
        ctx.fillText(`[${cutsceneIndex + 1}/${STORY_PANELS.length}]  PRESS SPACE OR ENTER TO CONTINUE`, WIDTH / 2, HEIGHT - 20);
    }
}

function drawGameplay() {
    // 1. Draw dungeon background with level-specific filters
    ctx.save();
    
    // Make backgrounds brighter and colorful per level
    let hue = (gameLevel - 1) * 72; // rotates 360 degrees across 5 levels
    let sat = 1.6;
    let br = 1.05;
    ctx.filter = `hue-rotate(${hue}deg) saturate(${sat}) brightness(${br})`;
    
    if (assets.dungeon_bg.complete) {
        ctx.drawImage(assets.dungeon_bg, 0, 0, WIDTH, HEIGHT);
    } else {
        ctx.fillStyle = "#111";
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
    }
    ctx.restore();

    // Draw floor boundary / danger line
    ctx.strokeStyle = "rgba(220, 50, 50, 0.4)";
    ctx.lineWidth = 4;
    ctx.setLineDash([10, 8]);
    ctx.beginPath();
    ctx.moveTo(0, 485);
    ctx.lineTo(WIDTH, 485);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw characters (Player and Monster)
    drawCharacter(player, true);
    drawCharacter(activeMonster, false);

    // Draw falling words
    drawWords();

    // Draw projectiles & particles
    drawProjectilesAndParticles();

    // Draw Frosted Border during active Freeze Scroll
    if (freezeTimer > 0) {
        ctx.save();
        ctx.strokeStyle = "rgba(0, 229, 255, 0.4)";
        ctx.lineWidth = 16;
        ctx.strokeRect(0, 0, WIDTH, HEIGHT);
        // Add pulsing inner border overlay
        let glowIntensity = Math.abs(Math.sin(Date.now() * 0.005)) * 0.15;
        ctx.fillStyle = `rgba(0, 229, 255, ${0.05 + glowIntensity})`;
        ctx.fillRect(0, 0, WIDTH, 12);
        ctx.fillRect(0, HEIGHT - 12, WIDTH, 12);
        ctx.fillRect(0, 0, 12, HEIGHT);
        ctx.fillRect(WIDTH - 12, 0, 12, HEIGHT);
        ctx.restore();
    }

    // Draw HUD overlays
    drawHUD();

    // Draw game state screen overlays (Level Clear / Game Over / Victory / Paused)
    if (gameState === STATE_LEVEL_CLEAR) {
        drawLevelClearOverlay();
    } else if (gameState === STATE_GAME_OVER) {
        drawGameOverOverlay();
    } else if (gameState === STATE_VICTORY) {
        drawVictoryOverlay();
    } else if (gameState === STATE_PAUSED) {
        drawPauseOverlay();
    }
}

function drawCharacter(char, isPlayer) {
    ctx.save();

    // Bobbing animation details
    let bob = Math.sin(Date.now() * 0.005) * 5;
    let cx = char.x;
    let cy = char.y + bob;

    // Flash white when hit
    if (char.flash > 0 && Math.floor(char.flash / 2) % 2 === 0) {
        ctx.filter = "brightness(3.0) saturate(0)";
    }

    // Shake horizontally when taking damage
    if (char.shake > 0) {
        cx += (Math.random() - 0.5) * 12;
    }

    if (isPlayer) {
        // Draw Hero Sprite
        if (assets.hero.complete) {
            ctx.drawImage(assets.hero, cx, cy, char.w, char.h);
        } else {
            // Draw placeholder box
            ctx.fillStyle = "#8b4513";
            ctx.fillRect(cx, cy, char.w, char.h);
        }

        // Draw Equipment Upgrades based on Floor Level
        if (gameLevel >= 2) drawHelmet(ctx, cx, cy, char.w, char.h);
        if (gameLevel >= 3) drawMagicShield(ctx, cx, cy, char.w, char.h);
        if (gameLevel >= 4) drawLegendarySword(ctx, cx, cy, char.w, char.h);

        // Draw Hero Legendary Aura if higher levels
        if (gameLevel >= 2) {
            ctx.strokeStyle = gameLevel >= 4 ? "rgba(255, 215, 0, 0.6)" : "rgba(30, 144, 255, 0.5)";
            ctx.lineWidth = 3;
            ctx.setLineDash([4, 4]);
            ctx.strokeRect(cx - 6, cy - 6, char.w + 12, char.h + 12);
            ctx.setLineDash([]);
        }

        // Draw Shield Bubble if active
        if (shieldActive) {
            ctx.save();
            ctx.strokeStyle = "rgba(0, 229, 255, 0.75)";
            ctx.lineWidth = 4;
            let pulse = Math.sin(Date.now() * 0.01) * 3;
            ctx.shadowBlur = 12;
            ctx.shadowColor = "#00e5ff";
            ctx.beginPath();
            ctx.arc(cx + char.w / 2, cy + char.h / 2, Math.max(char.w, char.h) / 2 + 10 + pulse, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
        }
    } else {
        // Draw Monster
        if (char.sprite && char.sprite.complete) {
            // Monsters face left (flipped)
            ctx.scale(-1, 1);
            ctx.drawImage(char.sprite, -cx - char.w, cy, char.w, char.h);
            ctx.scale(-1, 1); // restore
        } else {
            // Placeholder box
            ctx.fillStyle = "#8b0000";
            ctx.fillRect(cx, cy, char.w, char.h);
        }

        // Draw Monster auras on high difficulty (levels 4-5)
        if (gameLevel >= 4) {
            ctx.strokeStyle = "rgba(186, 85, 211, 0.6)";
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.arc(cx + char.w / 2, cy + char.h / 2, Math.max(char.w, char.h) / 2 + 10, 0, Math.PI * 2);
            ctx.stroke();
        }

        // Draw Monster HP & Name above
        ctx.font = '10px "Press Start 2P", monospace';
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.fillText(char.name, cx + char.w / 2, cy - 25);

        // Monster Health Hearts
        let heartX = cx + char.w / 2 - (char.maxHp * 15) / 2;
        for (let i = 0; i < char.maxHp; i++) {
            ctx.fillStyle = i < char.hp ? "#ff2222" : "#333333";
            ctx.font = '12px "Press Start 2P"';
            ctx.fillText("♥", heartX + i * 15, cy - 10);
        }
    }

    ctx.restore();

    // Draw Floating Damage Texts
    char.damageTexts.forEach(dt => {
        ctx.save();
        ctx.globalAlpha = dt.alpha;
        ctx.font = 'bold 16px "Press Start 2P", monospace';
        ctx.fillStyle = dt.color;
        ctx.textAlign = "center";
        ctx.fillText(dt.text, dt.x, dt.y);
        ctx.restore();
    });
}

function drawWords() {
    activeWords.forEach(w => {
        ctx.save();

        let wx = w.x;
        let wy = w.y;
        if (w.shake > 0) {
            wx += (Math.random() - 0.5) * w.shake;
        }

        // 1. Draw small highlight cursor if word is current active target
        let isTarget = (w === targetWord);

        ctx.font = '14px "Press Start 2P", monospace';
        let textWidth = ctx.measureText(w.text).width;
        let paddingX = 12;
        let paddingY = 8;

        // Draw capsule background
        ctx.fillStyle = isTarget ? "rgba(35, 10, 45, 0.9)" : "rgba(10, 10, 15, 0.8)";
        ctx.strokeStyle = isTarget ? "#ffcc00" : (freezeTimer > 0 ? "#00b0ff" : "#444455");
        ctx.lineWidth = isTarget ? 3 : (freezeTimer > 0 ? 2 : 1);
        
        ctx.beginPath();
        ctx.roundRect(wx - paddingX, wy - 18, textWidth + paddingX * 2, 28, 6);
        ctx.fill();
        ctx.stroke();

        // Draw Text letters
        let curX = wx;
        for (let i = 0; i < w.text.length; i++) {
            let letter = w.text[i];
            
            if (isTarget && i < w.typed) {
                // Typed letters (Green/Gold)
                ctx.fillStyle = "#ffcc00";
            } else {
                // Untyped letters (Frosty blue if frozen)
                ctx.fillStyle = (freezeTimer > 0) ? "#b3f5ff" : "#ffffff";
            }
            
            ctx.fillText(letter, curX, wy);
            curX += ctx.measureText(letter).width;
        }

        // Draw targeting crosshair arrow
        if (isTarget) {
            ctx.fillStyle = "#ffcc00";
            ctx.font = '10px "Press Start 2P"';
            ctx.textAlign = "center";
            ctx.fillText("▼", wx + textWidth / 2, wy - 24);
        }

        ctx.restore();
    });
}

function drawProjectilesAndParticles() {
    // Projectiles
    projectiles.forEach(p => {
        ctx.save();
        ctx.shadowBlur = 15;
        ctx.shadowColor = p.color;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
        ctx.fill();
        
        // Show complete word text floating slightly above projectile
        ctx.font = '9px "Press Start 2P", monospace';
        ctx.fillStyle = "#ffffff";
        ctx.fillText(p.word, p.x - 15, p.y - 12);
        
        ctx.restore();
    });

    // Particles
    particles.forEach(p => {
        ctx.save();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life;
        ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
        ctx.restore();
    });
}

function drawHUD() {
    // Top Bar Background
    ctx.fillStyle = "rgba(10, 8, 16, 0.9)";
    ctx.fillRect(0, 0, WIDTH, 80);
    ctx.strokeStyle = "#221a36";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, 80);
    ctx.lineTo(WIDTH, 80);
    ctx.stroke();

    // Floor title
    ctx.font = '14px "Press Start 2P", monospace';
    ctx.fillStyle = "#ffcc00";
    ctx.textAlign = "left";
    let isBoss = (gameLevel === 5);
    ctx.fillText(isBoss ? "FLOOR 5: BOSS CHAMBER" : `DUNGEON: FLOOR ${gameLevel}/5`, 30, 32);

    // Player HP
    ctx.fillStyle = "#88869a";
    ctx.font = '10px "Press Start 2P", monospace';
    ctx.fillText("HERO HP:", 30, 56);
    
    // Health bar outline
    let barW = 200;
    ctx.strokeStyle = "#333";
    ctx.strokeRect(95, 48, barW, 10);
    ctx.fillStyle = "#ff3333";
    let ratio = player.hp / player.maxHp;
    ctx.fillRect(95, 48, barW * ratio, 10);

    // HP Text
    ctx.fillStyle = "#fff";
    ctx.fillText(`${player.hp}/${player.maxHp}`, 95 + barW + 10, 57);

    // Word Gems Tracker (Exactly 10 circles in the middle)
    let gemStartX = 420;
    ctx.font = '9px "Press Start 2P", monospace';
    ctx.fillStyle = "#88869a";
    ctx.textAlign = "center";
    ctx.fillText("WORDS:", gemStartX + 65, 25);

    for (let i = 0; i < 10; i++) {
        let gx = gemStartX + i * 16;
        let gy = 40;
        
        ctx.beginPath();
        ctx.arc(gx, gy, 6, 0, Math.PI * 2);
        
        let status = wordGems[i];
        if (status === "correct") {
            ctx.fillStyle = "#00ff66";
            ctx.strokeStyle = "#007722";
        } else if (status === "missed") {
            ctx.fillStyle = "#ff2233";
            ctx.strokeStyle = "#880000";
        } else {
            ctx.fillStyle = "#444455";
            ctx.strokeStyle = "#1d1d26";
        }
        
        ctx.fill();
        ctx.stroke();
    }

    // Draw Pause Button in HUD
    ctx.save();
    ctx.fillStyle = "rgba(30, 20, 50, 0.85)";
    ctx.strokeStyle = "#ffcc00";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(605, 20, 105, 28, 4);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#ffcc00";
    ctx.font = '9px "Press Start 2P", monospace';
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("PAUSE [ESC]", 657, 34);
    ctx.restore();

    // Score & XP (Right side)
    ctx.textAlign = "right";
    ctx.fillStyle = "#ffffff";
    ctx.font = '12px "Press Start 2P", monospace';
    ctx.fillText(`SCORE: ${score}`, WIDTH - 30, 32);

    ctx.font = '10px "Press Start 2P", monospace';
    ctx.fillStyle = "#88869a";
    ctx.fillText(`HERO LVL: ${player.level}`, WIDTH - 30, 56);

    // Player XP Bar
    let xpW = 100;
    ctx.strokeStyle = "#333";
    ctx.strokeRect(WIDTH - 135 - xpW, 48, xpW, 8);
    ctx.fillStyle = "#00bbff";
    let xpRatio = player.xp / player.maxXp;
    ctx.fillRect(WIDTH - 135 - xpW, 48, xpW * xpRatio, 8);

    // Draw Active Items Hotbar at the bottom center
    ctx.save();
    let bx = 250;
    let by = 545;
    let bw = 300;
    let bh = 45;

    ctx.fillStyle = "rgba(10, 8, 20, 0.85)";
    ctx.strokeStyle = "#4b3c7a";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(bx, by, bw, bh, 6);
    ctx.fill();
    ctx.stroke();

    // Draw three items
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = '9px "Press Start 2P", monospace';

    // Item 1: Freeze Scroll
    ctx.fillStyle = (player.items.freeze > 0) ? "#00ffff" : "#555";
    ctx.fillText(`[1] ❄️ x${player.items.freeze}`, bx + 50, by + bh / 2);

    // Item 2: Fireball Scroll
    ctx.fillStyle = (player.items.fireball > 0) ? "#ff5500" : "#555";
    ctx.fillText(`[2] 🔥 x${player.items.fireball}`, bx + 150, by + bh / 2);

    // Item 3: Shield Potion
    ctx.fillStyle = (player.items.shield > 0) ? "#00e5ff" : "#555";
    if (shieldActive) ctx.fillStyle = "#ffd700";
    ctx.fillText(`[3] 🛡️ x${player.items.shield}`, bx + 250, by + bh / 2);

    ctx.restore();

    // Draw active Freeze timer countdown
    if (freezeTimer > 0) {
        ctx.save();
        ctx.textAlign = "center";
        ctx.fillStyle = "#00e5ff";
        ctx.font = '11px "Press Start 2P", monospace';
        let secondsLeft = (freezeTimer / 60).toFixed(1);
        let isBlink = Math.floor(Date.now() / 250) % 2 === 0;
        ctx.fillText(isBlink ? `❄️  TIME FROZEN: ${secondsLeft}s  ❄️` : `   TIME FROZEN: ${secondsLeft}s   `, WIDTH / 2, 525);
        ctx.restore();
    }
}

// Overlay Screens
function drawLevelClearOverlay() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.85)";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ctx.strokeStyle = "#00ff66";
    ctx.lineWidth = 4;
    ctx.strokeRect(80, 80, WIDTH - 160, HEIGHT - 160);

    ctx.textAlign = "center";
    ctx.fillStyle = "#00ff66";
    ctx.font = '28px "Press Start 2P", monospace';
    ctx.fillText("FLOOR CLEARED!", WIDTH / 2, 170);

    ctx.fillStyle = "#ffffff";
    ctx.font = '16px "Press Start 2P", monospace';
    ctx.fillText(`Defeated: ${activeMonster.name}`, WIDTH / 2, 230);

    // Hero level-up info
    ctx.fillStyle = "#ffd700";
    ctx.font = '18px "Press Start 2P", monospace';
    ctx.fillText(`Arjun Leveled Up! Now LVL ${player.level}`, WIDTH / 2, 290);

    ctx.fillStyle = "#88869a";
    ctx.font = '12px "Press Start 2P", monospace';
    ctx.fillText(`Max HP: +10 (${player.maxHp})`, WIDTH / 2, 335);
    ctx.fillText(`Attack Power: +5 (${player.atk})`, WIDTH / 2, 360);
    ctx.fillText(`Defense Power: +3 (${player.def})`, WIDTH / 2, 385);

    // Item Reward Message
    ctx.fillStyle = "#00e5ff";
    ctx.font = '13px "Press Start 2P", monospace';
    ctx.fillText(levelClearRewardMsg, WIDTH / 2, 422);

    ctx.font = '13px "Press Start 2P", monospace';
    let isBlink = Math.floor(Date.now() / 500) % 2 === 0;
    ctx.fillStyle = isBlink ? "#ffffff" : "#666666";
    ctx.fillText("PRESS SPACE OR ENTER TO DESCEND DEEPER", WIDTH / 2, 470);
}

function drawGameOverOverlay() {
    ctx.fillStyle = "rgba(30, 0, 0, 0.9)";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ctx.strokeStyle = "#ff2222";
    ctx.lineWidth = 4;
    ctx.strokeRect(80, 80, WIDTH - 160, HEIGHT - 160);

    ctx.textAlign = "center";
    ctx.fillStyle = "#ff2222";
    ctx.font = '32px "Press Start 2P", monospace';
    ctx.fillText("GAME OVER", WIDTH / 2, 200);

    ctx.fillStyle = "#ffffff";
    ctx.font = '16px "Press Start 2P", monospace';
    ctx.fillText("Arjun has fallen in the dark dungeon...", WIDTH / 2, 260);
    ctx.fillText(`Floor Reached: Floor ${gameLevel}/5`, WIDTH / 2, 310);
    ctx.fillText(`Final Score: ${score}`, WIDTH / 2, 350);

    ctx.font = '14px "Press Start 2P", monospace';
    let isBlink = Math.floor(Date.now() / 500) % 2 === 0;
    ctx.fillStyle = isBlink ? "#ffffff" : "#666666";
    ctx.fillText("PRESS SPACE OR ENTER TO RESTART ADVENTURE", WIDTH / 2, 450);
}

function drawVictoryOverlay() {
    ctx.fillStyle = "rgba(10, 8, 24, 0.95)";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // Glowing border
    ctx.strokeStyle = "#ffd700";
    ctx.lineWidth = 4;
    ctx.strokeRect(80, 80, WIDTH - 160, HEIGHT - 160);

    ctx.textAlign = "center";
    ctx.fillStyle = "#ffd700";
    ctx.font = '36px "Press Start 2P", monospace';
    ctx.fillText("VICTORY!", WIDTH / 2, 170);

    ctx.fillStyle = "#ffffff";
    ctx.font = '14px "Press Start 2P", monospace';
    ctx.fillText("Arjun escaped the terrifying dungeon", WIDTH / 2, 230);
    ctx.fillText("and reunited with his classmates safely!", WIDTH / 2, 255);

    ctx.fillStyle = "#00ff66";
    ctx.font = '18px "Press Start 2P", monospace';
    ctx.fillText(`Final Score: ${score}`, WIDTH / 2, 320);
    ctx.fillText(`Arjun reached Level: ${player.level}`, WIDTH / 2, 360);

    ctx.fillStyle = "#88869a";
    ctx.font = '11px "Press Start 2P", monospace';
    ctx.fillText("He survived Mr. Rahman's field trip mystery!", WIDTH / 2, 410);

    ctx.font = '14px "Press Start 2P", monospace';
    let isBlink = Math.floor(Date.now() / 500) % 2 === 0;
    ctx.fillStyle = isBlink ? "#ffffff" : "#666666";
    ctx.fillText("PRESS SPACE OR ENTER TO ADVENTURE AGAIN", WIDTH / 2, 480);
}

function drawPauseOverlay() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // Dialog Box
    let w = 340, h = 160;
    let x = WIDTH / 2 - w / 2;
    let y = HEIGHT / 2 - h / 2;

    ctx.fillStyle = "rgba(12, 10, 20, 0.95)";
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = "#ffcc00";
    ctx.lineWidth = 3;
    ctx.strokeRect(x, y, w, h);

    // Title
    ctx.textAlign = "center";
    ctx.fillStyle = "#ffcc00";
    ctx.font = '22px "Press Start 2P", monospace';
    ctx.fillText("PAUSED", WIDTH / 2, y + 45);

    // Text
    ctx.fillStyle = "#ffffff";
    ctx.font = '11px "Press Start 2P", monospace';
    ctx.fillText("PRESS 'ESC' TO RESUME", WIDTH / 2, y + 90);
    ctx.fillStyle = "#88869a";
    ctx.fillText("OR CLICK ANYWHERE TO CONTINUE", WIDTH / 2, y + 115);
}
