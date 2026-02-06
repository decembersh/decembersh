document.addEventListener('DOMContentLoaded', function() {
    let currentMember = null;
    let audioPlayer = document.getElementById('audio-player');

const songs = [
    'eyepatch.mp3', // 0
    'wine.mp3', // 1
    'rifle.mp3',  // 2
    'tayek.mp3',   // 3
    'cetin.mp3', // 4
    'gothic.mp3', // 5
    'broidontknow.mp3', // 6
    'abel.mp3', // 7
    'december.mp3', // 8
];

function showMember(member) {
    const memberInfo = {
        'Eyepatch': { 'name': 'EYEPATCH', 'image': 'eyepatch.png', 'description': 'i hope cetin gets hit by a car', 'songIndex': 0 },
        'Wine': { 'name': 'WINE', 'image': 'wine.png', 'description': 'dingle berry', 'songIndex': 1 },
        'Rifle': { 'name': 'RIFLE', 'image': 'rifle.png', 'description': 'bossman', 'songIndex': 2 },
        'Tayek': { 'name': 'TAYEK', 'image': 'tayek.png', 'description': 'i <3 my choppa', 'songIndex': 3 },
        'Cetin': { 'name': 'CETIN', 'image': 'cetin.png', 'description': 'sad', 'songIndex': 4 },
        'Gothic': { 'name': 'GOTHIC', 'image': 'gothic.png', 'description': 'gothick', 'songIndex': 5 },
        'Broidontknow': { 'name': 'BROIDONTKNOW', 'image': 'broidontknow.png', 'description': 'im a gummy bear', 'songIndex': 6 },
        'Abel': { 'name': 'ABEL', 'image': 'abel.png', 'description': 'cetin is a jade lover', 'songIndex': 7 },
    };
 const hardcodedVolume = 0.2; 
    if (audioPlayer) {
        audioPlayer.volume = hardcodedVolume; 
    }
        const info = memberInfo[member];
        if (!info) return;

        const memberDiv = document.getElementById('member-info');
        const selectedElement = document.querySelector(`[onclick="showMember('${member}')"]`);

        if (currentMember) {
            currentMember.classList.remove('selected');
            const previousDot = document.getElementById(`${currentMember.getAttribute('data-member')}-dot`);
            if (previousDot) previousDot.innerHTML = '*';
            stopMusic();
        }

        if (currentMember === selectedElement) {
            currentMember = null;
            memberDiv.innerHTML = '';
            playDefaultSong();
            return;
        }

        if (selectedElement) {
            selectedElement.classList.add('selected');
            selectedElement.setAttribute('data-member', member);
        } else {
            console.warn('Selected element not found for member:', member);
            return;
        }

const currentDot = document.getElementById(`${member}-dot`);
if (currentDot) {
    currentDot.innerHTML = '<span style="color: #40E0D0;">&bull;</span>';
}

memberDiv.innerHTML = `
    <img src="${info.image}" class="fade-in" style="width: 120px; height: 120px;" draggable="false">
    <p style="margin-top: 5px; margin-bottom: 0; color: #40E0D0;">[ ${info.name} ]</p>
    <hr style="border-top: 1px solid #ffffff; margin: 3px 0;">
    <p class="glitch" style="margin-top: 5px;">${info.description}</p>
`;


        changeSong(info.songIndex);

        currentMember = selectedElement;
    }

    function playDefaultSong() {
        const defaultSongIndex = songs.length - 1;
        changeSong(defaultSongIndex);
    }

    function changeSong(songIndex) {
        if (!audioPlayer) {
            console.error('Audio player element not found');
            return;
        }

        const songPath = songs[songIndex] || songs[songs.length - 1];
        audioPlayer.src = songPath;
        audioPlayer.play().catch(error => {
            console.error('Error playing song:', error);
        });
    }

    function stopMusic() {
        if (audioPlayer) {
            audioPlayer.pause();
            audioPlayer.currentTime = 0;
        }
    }

    function removeOverlay() {
        const overlay = document.getElementById('overlay');
        if (overlay) {
            overlay.style.display = 'none';
            playDefaultSong();
        }
    }

    window.showMember = showMember;
    window.removeOverlay = removeOverlay;
});