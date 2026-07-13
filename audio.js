// ============================================================
//  DUNGEON QUEST — 8-Bit Web Audio Engine
// ============================================================

class SoundEngine {
    constructor() {
        this.ctx = null;
    }

    init() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
    }

    playTone(freqs, durs, type = "sine", vol = 0.3) {
        this.init();
        if (!this.ctx) return;

        let time = this.ctx.currentTime;
        let gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0, time);
        gain.connect(this.ctx.destination);

        freqs.forEach((freq, idx) => {
            let dur = durs[idx];
            let osc = this.ctx.createOscillator();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, time);

            // Volume envelope: attack / decay
            gain.gain.setValueAtTime(0, time);
            gain.gain.linearRampToValueAtTime(vol, time + 0.01);
            gain.gain.exponentialRampToValueAtTime(0.0001, time + dur - 0.01);

            osc.connect(gain);
            osc.start(time);
            osc.stop(time + dur);

            time += dur;
        });
    }

    playNoise(dur, vol = 0.2) {
        this.init();
        if (!this.ctx) return;

        let bufferSize = this.ctx.sampleRate * dur;
        let buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        let data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        let noiseNode = this.ctx.createBufferSource();
        noiseNode.buffer = buffer;

        let gain = this.ctx.createGain();
        gain.gain.setValueAtTime(vol, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + dur);

        noiseNode.connect(gain);
        gain.connect(this.ctx.destination);

        noiseNode.start();
    }

    click() {
        this.playTone([600], [0.03], "square", 0.1);
    }

    hit() {
        this.playTone([300, 150], [0.08, 0.1], "triangle", 0.3);
    }

    hurt() {
        this.playNoise(0.2, 0.4);
    }

    die() {
        this.playTone([250, 180, 100], [0.1, 0.1, 0.25], "sawtooth", 0.3);
    }

    pickup() {
        this.playTone([440, 660, 880], [0.06, 0.06, 0.15], "square", 0.2);
    }

    win() {
        this.playTone([523, 659, 784, 1047], [0.12, 0.12, 0.12, 0.3], "square", 0.2);
    }

    freeze() {
        this.playTone([800, 600, 400], [0.1, 0.1, 0.15], "sine", 0.35);
    }

    fireball() {
        this.playNoise(0.35, 0.5);
    }

    shield() {
        this.playTone([500, 750, 1000], [0.04, 0.04, 0.15], "sine", 0.25);
    }

    startMusic() {
        this.init();
        if (!this.ctx) return;
        this.stopMusic();

        let beat = 0;
        // Simple 16-step chiptune progression (A minor scale)
        const bassNotes = [110.0, 110.0, 130.8, 146.8, 110.0, 110.0, 98.0, 103.8]; 
        const melodyNotes = [
            220, 0, 261.6, 293.7, 329.6, 0, 392, 440,
            329.6, 0, 293.7, 261.6, 220, 0, 196, 207.7
        ];

        // Check level periodically and schedule audio notes
        this.musicInterval = setInterval(() => {
            if (!this.ctx || this.ctx.state === "suspended") return;
            
            let currentLevel = window.gameLevel || 1;
            let time = this.ctx.currentTime;
            
            // Play Bass (low triangle note) on even beats
            if (beat % 2 === 0) {
                let bassFreq = bassNotes[(beat / 2) % bassNotes.length];
                let osc = this.ctx.createOscillator();
                let gain = this.ctx.createGain();
                osc.type = "triangle";
                osc.frequency.setValueAtTime(bassFreq, time);
                gain.gain.setValueAtTime(0.06, time);
                gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.25);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(time);
                osc.stop(time + 0.25);
            }

            // Play Melody (square note)
            let melodyFreq = melodyNotes[beat % melodyNotes.length];
            if (melodyFreq > 0 && beat % 4 !== 1) {
                let osc = this.ctx.createOscillator();
                let gain = this.ctx.createGain();
                osc.type = "square";
                // Shift melody pitch slightly up as level increases to sound more tense
                let pitchShift = 1 + (currentLevel - 1) * 0.02;
                osc.frequency.setValueAtTime(melodyFreq * pitchShift, time); 
                gain.gain.setValueAtTime(0.025, time);
                gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.15);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(time);
                osc.stop(time + 0.15);
            }

            // Play a small noise hit for percussion (hi-hat simulation)
            if (beat % 4 === 2) {
                this.playNoise(0.03, 0.015);
            }

            beat++;
        }, 180); // Speed remains consistent, pitch shifts up, and tempo increases slightly via visual game loop tick if desired, but constant beat duration is clean.
    }

    stopMusic() {
        if (this.musicInterval) {
            clearInterval(this.musicInterval);
            this.musicInterval = null;
        }
    }
}

const sounds = new SoundEngine();
