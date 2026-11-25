/**
 * Lightweight Web Audio API Ambient Soundscape Engine
 * Produces gentle, soothing ambient audio for rain, cafe, lofi, and library
 * without relying on external audio files.
 */

class AmbientAudioEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.activeNodes = [];
    this.isPlaying = false;
    this.currentPreset = 'rain';
    this.volume = 0.7;
  }

  ensureContext() {
    if (typeof window === 'undefined') return null;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;
    if (!this.ctx) {
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0;
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  createNoiseBuffer(ctx, type = 'pink') {
    const bufferSize = ctx.sampleRate * 3;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    if (type === 'brown') {
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i += 1) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = data[i];
        data[i] *= 2.5;
      }
    } else {
      // Pink noise approximation
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i += 1) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
        b6 = white * 0.115926;
      }
    }
    return buffer;
  }

  clearNodes() {
    this.activeNodes.forEach((node) => {
      try {
        if (typeof node.stop === 'function') node.stop();
      } catch {
        // already stopped
      }
      try {
        node.disconnect();
      } catch {
        // ignore
      }
    });
    this.activeNodes = [];
  }

  start(preset = 'rain', volumePercent = 70) {
    const ctx = this.ensureContext();
    if (!ctx) return;

    this.clearNodes();
    this.currentPreset = preset;
    this.volume = Math.max(0, Math.min(1, volumePercent / 100));
    this.isPlaying = true;

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = this.createNoiseBuffer(
      ctx,
      preset === 'rain' || preset === 'library' ? 'brown' : 'pink'
    );
    noiseSource.loop = true;

    const filter = ctx.createBiquadFilter();
    const noiseGain = ctx.createGain();

    if (preset === 'rain') {
      filter.type = 'lowpass';
      filter.frequency.value = 850;
      noiseGain.gain.value = 0.35;
    } else if (preset === 'cafe') {
      filter.type = 'bandpass';
      filter.frequency.value = 480;
      filter.Q.value = 0.7;
      noiseGain.gain.value = 0.4;
    } else if (preset === 'library') {
      filter.type = 'lowpass';
      filter.frequency.value = 340;
      noiseGain.gain.value = 0.2;
    } else {
      // lofi: gentle warm pad + soft vinyl noise
      filter.type = 'lowpass';
      filter.frequency.value = 600;
      noiseGain.gain.value = 0.14;

      const freqs = [196.0, 246.94, 293.66]; // G3, B3, D4 calm triad
      freqs.forEach((f) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = f;
        oscGain.gain.value = 0.035;
        osc.connect(oscGain);
        oscGain.connect(this.masterGain);
        osc.start();
        this.activeNodes.push(osc, oscGain);
      });
    }

    noiseSource.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.masterGain);
    noiseSource.start();
    this.activeNodes.push(noiseSource, filter, noiseGain);

    const now = ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setTargetAtTime(this.volume * 0.5, now, 0.15);
  }

  setVolume(volumePercent) {
    this.volume = Math.max(0, Math.min(1, volumePercent / 100));
    if (this.ctx && this.masterGain && this.isPlaying) {
      this.masterGain.gain.setTargetAtTime(this.volume * 0.5, this.ctx.currentTime, 0.08);
    }
  }

  stop() {
    this.isPlaying = false;
    if (this.ctx && this.masterGain) {
      try {
        const now = this.ctx.currentTime;
        this.masterGain.gain.cancelScheduledValues(now);
        this.masterGain.gain.setTargetAtTime(0, now, 0.08);
      } catch {
        // ignore
      }
    }
    setTimeout(() => {
      if (!this.isPlaying) this.clearNodes();
    }, 180);
  }
}

export const ambientAudio = new AmbientAudioEngine();
