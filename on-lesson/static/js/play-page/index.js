function changeMusicSources(musicIndex) {
    bg.src = musics[musicIndex].film
    film.src = musics[musicIndex].film
    audio.src = musics[musicIndex].src
    title.innerHTML = musics[musicIndex].title
    signer.innerHTML = musics[musicIndex].singer
}

function formateTime(timeValue) {
    let timeArray = (timeValue / 60).toFixed(2).split('.')
    return timeArray[0] + ':' + timeArray[1]
}

function init() {
    changeMusicSources(0)
}

function start() {
    audio.play()
    playOrStopBtn.src = 'https://generic-data.oss-cn-chengdu.aliyuncs.com/img/training/playing(2).png'
    film.style.animationPlayState = 'running'
    isStarted = false
}

function ended() {
    audio.pause()
    playOrStopBtn.src = 'https://generic-data.oss-cn-chengdu.aliyuncs.com/img/training/playing(1).png'
    film.style.animationPlayState = 'paused'
    isStarted = true
}

playOrStopBtn.onclick = () => {
    if (isStarted) {
        start()
    } else {
        ended()
    }
}

nextBtn.onclick = () => {
    ended()
    musicIndex++
    if (musicIndex > musicLength) {
        musicIndex = 0
    }
    changeMusicSources(musicIndex)
    start()
}

lastBtn.onclick = () => {
    ended()
    musicIndex--
    if (musicIndex < 0) {
        musicIndex = musicLength
    }
    changeMusicSources(musicIndex)
    start()
}

audio.addEventListener('timeupdate', () => {
    processor.style.width = (audio.currentTime / audio.duration) * 100 + '%'
    startTime.innerHTML = formateTime(audio.currentTime)
})

audio.addEventListener('ended', () => {
    film.style.animationPlayState = 'paused'
})

init()
