document.addEventListener('DOMContentLoaded', function() {
    createRainEffect();
    const typewriter = document.getElementById('typewriter');
    const typingSound = document.getElementById('typingSound');
    const clickPrompt = document.getElementById('clickPrompt');
    const heartIcon = document.getElementById('heartIcon');
    const clickSound = document.getElementById('clickSound');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const skipButton = document.getElementById('skipButton');
    const blogBack = document.getElementById('blogBack');

    const lines = [
        '* Initializing D£C£MB£R V3RS10N 2.0... ',
        '* Welcome to D£C£MB£R V3RS10N 2.0'
    ];

    let charIndex = 0;
    let lineIndex = 0;
    let typingInterval;
    let hasUserInteracted = false;
    let isTypingActive = false;

    function enableAudio() {
        if (!hasUserInteracted) {
            hasUserInteracted = true;

            if (clickSound) {
                clickSound.volume = 1.0;
                clickSound.play().catch(() => {
                    clickSound.load();
                    setTimeout(() => clickSound.play(), 200);
                });
            }

            heartIcon.src = 'assets/images/brokenheart.png';

            setTimeout(() => {
                clickPrompt.style.opacity = '0';
                setTimeout(() => clickPrompt.style.display = 'none', 300);
            }, 200);

            if (backgroundMusic) {
                backgroundMusic.volume = 0.4;
                backgroundMusic.play();
            }

            setTimeout(() => {
                const titleImage = document.getElementById('titleImage');
                titleImage.style.display = 'block';

                const chatBox = document.getElementById('chatBox');
                chatBox.style.display = 'flex';
                chatBox.style.animation = 'fadeIn 1s ease-in forwards';

                setTimeout(() => startTyping(), 1000);
            }, 500);
        }
    }

    document.addEventListener('click', enableAudio, { once: true });
    document.addEventListener('keydown', enableAudio, { once: true });

    skipButton.addEventListener('click', (e) => {
        e.stopPropagation();
        if (isTypingActive) skipToMenu();
    });

    function skipToMenu() {
        clearInterval(typingInterval);
        if (typingSound) {
            typingSound.pause();
            typingSound.currentTime = 0;
        }
        skipButton.style.display = 'none';
        isTypingActive = false;
        lineIndex = lines.length;
        showMenu();
    }

    function startTyping() {
        if (lineIndex >= lines.length) {
            if (typingSound) fadeOutAudio(typingSound, 1000);
            skipButton.style.display = 'none';
            isTypingActive = false;
            showMenu();
            return;
        }

        if (lineIndex === 0) {
            skipButton.style.display = 'block';
            isTypingActive = true;
        }

        const currentLine = lines[lineIndex];

        if (typingSound && hasUserInteracted) {
            typingSound.loop = true;
            typingSound.volume = 0.3;
            typingSound.play();
        }

        typingInterval = setInterval(() => {
            if (charIndex < currentLine.length) {
                typewriter.innerHTML = currentLine.slice(0, charIndex + 1) + '<span class="cursor"></span>';
                charIndex++;
            } else {
                clearInterval(typingInterval);
                if (typingSound) fadeOutAudio(typingSound, 500);

                setTimeout(() => {
                    typewriter.innerHTML = currentLine;
                    setTimeout(() => {
                        typewriter.innerHTML = '';
                        charIndex = 0;
                        lineIndex++;
                        setTimeout(() => startTyping(), 500);
                    }, 2000);
                }, 500);
            }
        }, 80);
    }

    function showMenu() {
        const chatBox = document.getElementById('chatBox');
        const menuContainer = document.getElementById('menuContainer');

        chatBox.style.animation = 'fadeOut 2s ease-out forwards';

        setTimeout(() => {
            chatBox.style.display = 'none';
            menuContainer.style.display = 'flex';
            menuContainer.classList.add('menu-fadeIn');
            initializeMenu();
        }, 2000);
    }

    function fadeOutAudio(audioElement, duration) {
        const fadeStep = 0.05;
        const fadeInterval = duration / (audioElement.volume / fadeStep);

        const fade = setInterval(() => {
            if (audioElement.volume > fadeStep) {
                audioElement.volume -= fadeStep;
            } else {
                audioElement.volume = 0;
                audioElement.pause();
                clearInterval(fade);
            }
        }, fadeInterval);
    }

    let selectedMenuIndex = 0;
    const menuOptions = ['start', 'archives'];

    function initializeMenu() {
        const startOption = document.getElementById('startOption');
        const archivesOption = document.getElementById('archivesOption');
        const menuSelectSound = document.getElementById('menuSelectSound');
        const menuHoverSound = document.getElementById('menuHoverSound');
        const whiteFade = document.getElementById('whiteFade');

        updateMenuSelection();

        function playHoverSound() {
            if (menuHoverSound) {
                menuHoverSound.currentTime = 0;
                menuHoverSound.volume = 0.3;
                menuHoverSound.play();
            }
        }

        startOption.addEventListener('mouseenter', () => {
            playHoverSound();
            selectedMenuIndex = 0;
            updateMenuSelection();
        });

        archivesOption.addEventListener('mouseenter', () => {
            playHoverSound();
            selectedMenuIndex = 1;
            updateMenuSelection();
        });

        startOption.addEventListener('click', () => selectOption('start'));
        archivesOption.addEventListener('click', () => selectOption('archives'));

        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowUp') {
                playHoverSound();
                selectedMenuIndex = selectedMenuIndex === 0 ? 1 : 0;
                updateMenuSelection();
            } else if (e.key === 'ArrowDown') {
                playHoverSound();
                selectedMenuIndex = selectedMenuIndex === 1 ? 0 : 1;
                updateMenuSelection();
            } else if (e.key === 'Enter' || e.key === ' ') {
                selectOption(menuOptions[selectedMenuIndex]);
            }
        });

        function updateMenuSelection() {
            startOption.classList.toggle('selected', selectedMenuIndex === 0);
            archivesOption.classList.toggle('selected', selectedMenuIndex === 1);
        }

        function selectOption(option) {
            if (menuSelectSound) {
                menuSelectSound.volume = 0.7;
                menuSelectSound.play();
            }

            whiteFade.classList.add('white-fade-in');

            setTimeout(() => {
                whiteFade.classList.remove('white-fade-in');

                if (option === 'start') {
                    showBlogPage();
                } else if (option === 'archives') {
                    showArchivesPage();
                }
            }, 1000);
        }
    }

    function showBlogPage() {
        const blogPage = document.getElementById('blogPage');
        const menuContainer = document.getElementById('menuContainer');
        const titleImage = document.getElementById('titleImage');

        menuContainer.style.display = 'none';
        titleImage.style.display = 'none';

        blogPage.style.display = 'flex';
        blogPage.style.animation = 'fadeIn 2s ease-in forwards';

        blogBack.style.display = 'block';
    }

    function showArchivesPage() {
        const archivesPage = document.getElementById('archivesPage');
        const menuContainer = document.getElementById('menuContainer');
        const titleImage = document.getElementById('titleImage');

        menuContainer.style.display = 'none';
        titleImage.style.display = 'none';

        archivesPage.style.display = 'flex';
        archivesPage.style.animation = 'fadeIn 2s ease-in forwards';

        blogBack.style.display = 'block';
    }

    blogBack.addEventListener('click', () => {
        const blogPage = document.getElementById('blogPage');
        const archivesPage = document.getElementById('archivesPage');
        const menuContainer = document.getElementById('menuContainer');
        const titleImage = document.getElementById('titleImage');

        blogPage.style.display = 'none';
        archivesPage.style.display = 'none';

        blogBack.style.display = 'none';

        menuContainer.style.display = 'flex';
        titleImage.style.display = 'block';
    });

    function createRainEffect() {
        const canvas = document.getElementById('rain-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const raindrops = [];
        const numberOfDrops = 100;

        for (let i = 0; i < numberOfDrops; i++) {
            raindrops.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                length: Math.random() * 20 + 10,
                speed: Math.random() * 3 + 2,
                opacity: Math.random() * 0.5 + 0.2
            });
        }

        function animateRain() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            raindrops.forEach(drop => {
                ctx.strokeStyle = `rgba(125, 211, 192, ${drop.opacity})`;
                ctx.lineWidth = 1;
                ctx.lineCap = 'round';

                ctx.beginPath();
                ctx.moveTo(drop.x, drop.y);
                ctx.lineTo(drop.x, drop.y + drop.length);
                ctx.stroke();

                drop.y += drop.speed;
                drop.x += 0.5;

                if (drop.y > canvas.height) {
                    drop.y = -drop.length;
                    drop.x = Math.random() * canvas.width;
                }
            });

            requestAnimationFrame(animateRain);
        }

        animateRain();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    const profiles = {
        eyepatch: {
            name: "eyepatch",
            image: "assets/images/eyepatch.png",
            links: {
                telegram: "https://t.me/decemberboss",
                doxbin: "https://doxbin.com/user/eyepatch"
            },
            song: "assets/audio/eyepatch.mp3"
        },
        broidk: {
            name: "broidk",
            image: "assets/images/broidk.png",
            links: {
                doxbin: "https://doxbin.com/user/nn",
                discord: "https://discordapp.com/users/1415359021090734080"
            },
            song: "assets/audio/broidk.mp3"
        },
        gothic: {
            name: "gothic",
            image: "assets/images/gothic.png",
            links: {
                telegram: "https://t.me/nyaaagh",
                doxbin: "https://doxbin.com/user/rileigh"
            },
            song: "assets/audio/gothic.mp3"
        },
        spider: {
            name: "spider",
            image: "assets/images/spider.jpg",
            links: {
                Telegram: "https://t.me/snitch"
            },
            song: "assets/audio/spider.mp3"
        },
        cetin: {
            name: "cetin",
            image: "assets/images/cetin.png",
            links: {
                doxbin: "https://doxbin.com/user/cuck"
            },
            song: "assets/audio/cetin.mp3"
        },
        rifle: {
            name: "rifle",
            image: "assets/images/rifle.png",
            links: {
                telegram: "https://t.me/temp73822",
                doxbin: "https://doxbin.com/user/hell"
            },
            song: "assets/audio/rifle.mp3"
        },
        fear: {
            name: "fear",
            image: "assets/images/fear.png",
            links: {
                telegram: "https://t.me/judgmental",
                doxbin: "https://doxbin.com/user/sin"
            },
            song: "assets/audio/fear.mp3"
        },
        yuno: {
            name: "yuno",
            image: "assets/images/yuno.png",
            links: {
                telegram: "https://t.me/scaryegirl",
                discord: "https://discordapp.com/users/1512165226320105655"
            },
            song: "assets/audio/yuno.mp3"
        },
        abel: {
            name: "abel",
            image: "assets/images/abel.png",
            links: {
                telegram: "https://t.me/abelfh",
                doxbin: "https://doxbin.com/user/draculea"
            },
            song: "assets/audio/abel.mp3"
        },
        mirva: {
            name: "mirva",
            image: "assets/images/mirva.png",
            links: {
                telegram: "https://t.me/lifetoricky",
                discord: "https://discordapp.com/users/1501861860406726747"
            },
            song: "assets/audio/mirva.mp3"
        },
        kaid: {
            name: "kaid",
            image: "assets/images/kaid.png",
            links: {
                doxbin: "https://doxbin.com/users/catboy67"
            },
            song: "assets/audio/kaid.mp3"
        }
    };

    const modal = document.getElementById('profileModal');
    const modalIcon = document.getElementById('modalIcon');
    const modalName = document.getElementById('modalName');
    const modalLinks = document.getElementById('modalLinks');
    const modalSong = document.getElementById('modalSong');
    const backArrow = document.getElementById('backArrow');

    document.querySelectorAll('.blog-profile').forEach(card => {
        card.addEventListener('click', () => {
            const name = card.querySelector('.blog-name').textContent.trim().toLowerCase();
            openProfile(name);
        });
    });

    function openProfile(id) {
        const p = profiles[id];
        if (!p) return;

        modalIcon.src = p.image;
        modalName.textContent = p.name;

        modalLinks.innerHTML = "";
        for (const key in p.links) {
            const url = p.links[key];
            const btn = document.createElement("a");
            btn.href = url.startsWith("http") ? url : "https://" + url;
            btn.target = "_blank";
            btn.className = "modal-link";
            btn.textContent = key;
            modalLinks.appendChild(btn);
        }

        modalSong.src = p.song;
        modalSong.currentTime = 0;
        modalSong.volume = 0.4;

        if (backgroundMusic) backgroundMusic.pause();
        modalSong.play();

        modal.style.display = 'flex';
        requestAnimationFrame(() => {
            modal.classList.add('open');
        });
    }

    backArrow.addEventListener('click', () => {
        modal.classList.remove('open');
        modalSong.pause();
        modalSong.currentTime = 0;

        if (backgroundMusic) backgroundMusic.play();

        setTimeout(() => {
            modal.style.display = 'none';
        }, 200);
    });

    document.querySelectorAll('.archive-link').forEach(link => {
        link.addEventListener('click', () => {
            const url = link.getAttribute('data-url');
            window.open(url, '_blank');
        });
    });

});