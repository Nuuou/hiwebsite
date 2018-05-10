const audioContainer = document.getElementById('audio-container');
const alphaCalc = (alpha, max = 2) => (255 / alpha) * max;
const createAudio = source => {
    const audioEl = document.createElement('audio');
    audioEl.src = source;
    audioContainer.appendChild(audioEl);
    audioEl.addEventListener('ended', function() {
        this.remove();
    });

    audioEl.play();
};

export {
    alphaCalc,
    createAudio
};