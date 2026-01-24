import { Injectable } from '@angular/core';
import { AUDIO_CONFIG } from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private context: AudioContext | null = null;
  private masterGain: GainNode | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.initializeAudio();
    }
  }

  private initializeAudio(): void {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.context = new AudioContextClass();
      this.masterGain = this.context.createGain();
      this.masterGain.connect(this.context.destination);
      this.masterGain.gain.value = 0.3;
    } catch {
      console.warn('Web Audio API not supported');
    }
  }

  playClick(): void {
    if (!this.context || !this.masterGain) return;

    if (this.context.state === 'suspended') {
      this.context.resume();
    }

    const oscillator = this.context.createOscillator();
    const gainNode = this.context.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.masterGain);

    oscillator.frequency.value = AUDIO_CONFIG.CLICK_FREQUENCY;
    oscillator.type = AUDIO_CONFIG.CLICK_TYPE;

    gainNode.gain.setValueAtTime(0.3, this.context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + AUDIO_CONFIG.CLICK_DURATION);

    oscillator.start(this.context.currentTime);
    oscillator.stop(this.context.currentTime + AUDIO_CONFIG.CLICK_DURATION);
  }

  playToggle(): void {
    if (!this.context || !this.masterGain) return;

    if (this.context.state === 'suspended') {
      this.context.resume();
    }

    const oscillator = this.context.createOscillator();
    const gainNode = this.context.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.masterGain);

    oscillator.frequency.value = 600;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.2, this.context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + 0.15);

    oscillator.start(this.context.currentTime);
    oscillator.stop(this.context.currentTime + 0.15);
  }

  setVolume(volume: number): void {
    if (this.masterGain) {
      this.masterGain.gain.value = Math.max(0, Math.min(1, volume));
    }
  }
}
