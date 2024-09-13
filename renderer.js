let audio = new Audio(); // HTML5 Audio object
let musicFiles = [];
let currentFileIndex = null;
let isPaused = false; // Flag to track if audio is paused

// Play the selected file or resume if paused
const playFile = (filePath) => {
    if (audio.src !== filePath) {
        audio.src = filePath;
        audio.currentTime = 0; // Start from the beginning for new files
    }
    audio.play();
    isPaused = false;
};

// Event listener for Play button
document.getElementById('play').addEventListener('click', () => {
    if (currentFileIndex !== null) {
        if (isPaused) {
            // If paused, just resume playback
            audio.play();
            isPaused = false;
        } else {
            // If not paused, play the current file
            playFile(musicFiles[currentFileIndex]);
        }
    }
});

// Event listener for Pause button
document.getElementById('pause').addEventListener('click', () => {
    if (audio && !isPaused) {
        audio.pause();
        isPaused = true; // Set pause flag
    }
});

// Event listener for Stop button
document.getElementById('stop').addEventListener('click', () => {
    if (audio) {
        audio.pause();
        audio.currentTime = 0; // Reset to the start
        isPaused = false; // Reset pause flag
    }
});

// Volume control
document.getElementById('volume').addEventListener('input', (event) => {
    const volumeValue = event.target.value;
    audio.volume = volumeValue; // Set audio volume
});

// Handle folder selection and file display
document.querySelector('.add-folder').addEventListener('click', async () => {
    const files = await window.electronAPI.openFolderDialog();

    if (files && files.length > 0) {
        musicFiles = files;
        displayFiles();
    } else {
        alert('No music files found in the selected folder.');
    }
});

// Display the list of music files in the UI
const displayFiles = () => {
    const fileDisplay = document.getElementById('file-display');
    fileDisplay.innerHTML = ''; // Clear previous content

    musicFiles.forEach((file, index) => {
        const fileName = file.split('/').pop(); // Get the file name from the path
        const fileItem = document.createElement('div');
        fileItem.textContent = fileName;
        fileItem.className = 'cursor-pointer good-button text-white p-2 m-2 rounded non-draggable';

        // Play file on click
        fileItem.addEventListener('click', () => {
            currentFileIndex = index;
            isPaused = false; // Reset pause flag when a new file is selected
            playFile(musicFiles[currentFileIndex]);
        });

        fileDisplay.appendChild(fileItem);
    });
};

document.getElementById('close-btn').addEventListener('click', () => {
    window.electronAPI.closeWindow();
});

document.getElementById('minimize-btn').addEventListener('click', () => {
    window.electronAPI.minimizeWindow();
});

document.getElementById('maximize-btn').addEventListener('click', () => {
    window.electronAPI.maximizeWindow();
});

