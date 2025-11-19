// Splash screen logic
document.addEventListener('DOMContentLoaded', () => {
    const splashScreen = document.getElementById('splash-screen');
    const modeScreen = document.getElementById('mode-screen');
    const loadingProgress = document.querySelector('.loading-progress');

    // Create sound using Web Audio API
    const playSound = () => {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const now = audioContext.currentTime;

            const oscillator1 = audioContext.createOscillator();
            const gainNode1 = audioContext.createGain();
            oscillator1.connect(gainNode1);
            gainNode1.connect(audioContext.destination);

            oscillator1.type = 'sine';
            oscillator1.frequency.setValueAtTime(200, now);
            oscillator1.frequency.exponentialRampToValueAtTime(400, now + 0.3);

            gainNode1.gain.setValueAtTime(0.3, now);
            gainNode1.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

            oscillator1.start(now);
            oscillator1.stop(now + 0.3);

            const oscillator2 = audioContext.createOscillator();
            const gainNode2 = audioContext.createGain();
            oscillator2.connect(gainNode2);
            gainNode2.connect(audioContext.destination);

            oscillator2.type = 'sine';
            oscillator2.frequency.setValueAtTime(400, now + 0.15);
            oscillator2.frequency.exponentialRampToValueAtTime(600, now + 0.45);

            gainNode2.gain.setValueAtTime(0.2, now + 0.15);
            gainNode2.gain.exponentialRampToValueAtTime(0.01, now + 0.45);

            oscillator2.start(now + 0.15);
            oscillator2.stop(now + 0.45);
        } catch (err) {
            console.log('Sound generation failed:', err);
        }
    };

    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += 2;
        loadingProgress.style.width = progress + '%';

        if (progress >= 100) {
            clearInterval(loadingInterval);

            setTimeout(() => {
                splashScreen.classList.add('fade-out');

                setTimeout(() => {
                    splashScreen.style.display = 'none';
                    modeScreen.style.display = 'flex';
                    modeScreen.classList.add('fade-in');
                }, 500);
            }, 500);
        }
    }, 30);

    setTimeout(playSound, 100);
});
