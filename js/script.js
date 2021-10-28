const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)





const player_storage_key = 'f8_player';
const player = $('.player')
const playlist = $('.playlist')
const cd = $('.cd')
const heading = $("header h2")
const cdthumb = $('.cd-thumb')
const audio = $('#audio')
const playbtn = $('.btn-toggle-play')
const progresss = $('#progress')
const prevbtn = $('.btn-prev')
const nextbtn = $('.btn-next')
const randombtn = $('.btn-random')
const repeatbtn = $('.btn-repeat')


const app = {
    currentIndex :0,
    isplaying : false,
    isRandom: false,
    isRepeat:false,
    config: JSON.parse(localStorage.getItem(player_storage_key)) || {},
    songs: [
        {
            name: "Stay",
            singer: "The Kid LAROI, Justin Bieber",
            path: "./music/The Kid LAROI, Justin Bieber - Stay (Lyrics).mp3",
            image: "./img/Stay.jpg"
        },
        {
            name: "Stay2",
            singer: "The Kid LAROI, Justin Bieber",
            path: "./music/The Kid LAROI, Justin Bieber - Stay (Lyrics).mp3",
            image: "./img/Stay.jpg"
        },
        {
            name: "Stay3",
            singer: "The Kid LAROI, Justin Bieber",
            path: "./music/The Kid LAROI, Justin Bieber - Stay (Lyrics).mp3",
            image: "./img/Stay.jpg"
        },
        {
            name: "Stay4",
            singer: "The Kid LAROI, Justin Bieber",
            path: "./music/The Kid LAROI, Justin Bieber - Stay (Lyrics).mp3",
            image: "./img/Stay.jpg"
        },
        {
            name: "Stay5",
            singer: "The Kid LAROI, Justin Bieber",
            path: "./music/The Kid LAROI, Justin Bieber - Stay (Lyrics).mp3",
            image: "./img/Stay.jpg"
        },
        {
            name: "Stay6",
            singer: "The Kid LAROI, Justin Bieber",
            path: "./music/The Kid LAROI, Justin Bieber - Stay (Lyrics).mp3",
            image: "./img/Stay.jpg"
        },
        {
            name: "Stay7",
            singer: "The Kid LAROI, Justin Bieber",
            path: "./music/The Kid LAROI, Justin Bieber - Stay (Lyrics).mp3",
            image: "./img/Stay.jpg"
        },
        {
            name: "Stay8",
            singer: "The Kid LAROI, Justin Bieber",
            path: "./music/The Kid LAROI, Justin Bieber - Stay (Lyrics).mp3",
            image: "./img/Stay.jpg"
        },
        {
            name: "Stay9",
            singer: "The Kid LAROI, Justin Bieber",
            path: "./music/The Kid LAROI, Justin Bieber - Stay (Lyrics).mp3",
            image: "./img/Stay.jpg"
        },
        {
            name: "Stay10",
            singer: "The Kid LAROI, Justin Bieber",
            path: "./music/The Kid LAROI, Justin Bieber - Stay (Lyrics).mp3",
            image: "./img/Stay.jpg"
        },
        {
            name: "Stay11",
            singer: "The Kid LAROI, Justin Bieber",
            path: "./music/The Kid LAROI, Justin Bieber - Stay (Lyrics).mp3",
            image: "./img/Stay.jpg"
        },
        {
            name: "Stay12",
            singer: "The Kid LAROI, Justin Bieber",
            path: "./music/The Kid LAROI, Justin Bieber - Stay (Lyrics).mp3",
            image: "./img/Stay.jpg"
        }
    ],
    setConfig : function(key,value){
        this.config[key] = value
        localStorage.setItem(player_storage_key, JSON.stringify(this.config))

    },
    render: function(){
        const htmls = this.songs.map((song,index) =>{
            return `
            <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
            <div class="thumb" style="background-image: url('${song.image}')"></div>
            <div class="body">
            <h3 class="title">${song.name}</h3>
            <p class="author">${song.singer}</p>
            </div>
            <div class="option">
            <i class="fas fa-ellipsis-h"></i>
            </div>
            </div>`;
        });
        playlist.innerHTML = htmls.join("");
    },

    defineProperties:function(){
        Object.defineProperty(this,"currentSong",{
            get :function(){
                return this.songs[this.currentIndex]
            }
        });
},
    loadCurrentSong :function(){
        heading.textContent = this.currentSong.name;
        cdthumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
    },

    loadConfig: function(){
        this.isRandom = this.config.isRandom
        this.isRepeat = this.config.isRepeat

    },
    handleEvents:function(){
        const _this = this
        const cdwidth = cd.offsetWidth;

        // xử lý cd quay và dừng
        const cdthumbanimation = cdthumb.animate([
            {transform:'rotate(360deg)'}
            ],{
                duration:10000, // 10s
                iterations : Infinity
            })
        cdthumbanimation.pause()

        // xử lý phóng to
        document.onscroll = function(){
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newCdwidth = cdwidth - scrollTop
            cd.style.width = newCdwidth > 0 ? newCdwidth + 'px' :0
            cd.style.opacity = newCdwidth/ cdwidth
        }

        // xử lý khi click play
        playbtn.onclick = function(){
           
            if(_this.isplaying){
                audio.pause()
            }else{
                audio.play()
            }
        }
        // khi bài hát đc play
        audio.onplay = function(){
            _this.isplaying = true;
            player.classList.add('playing')
            cdthumbanimation.play()

        }

         // khi bài hát đc pause
         audio.onpause = function(){
            _this.isplaying = false;
            player.classList.remove('playing')
            cdthumbanimation.pause()

        }
        // khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function(){
            if(audio.duration){
                const currentprogress = Math.floor(audio.currentTime / audio.duration * 100)
                progresss.value = currentprogress
            }

        }
        // xử lý tua
        progresss.onchange = function(e){
            const seektime = audio.duration / 100 * e.target.value;
            audio.currentTime = seektime
        }

        // khi next song
        nextbtn.onclick = function(){
            if(_this.isRandom){
                _this.randomSong()
            }else{
                _this.nextsong()
            }
            audio.play()
            // console.log(cdthumbanimation)
            _this.render()
            _this.scrollToActivesong()
        }
        // khi prev song
        prevbtn.onclick = function(){
            if(_this.isRandom){
                _this.randomSong()
            }else{
                _this.prevSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActivesong()
        }

        // xử lý lặp bài hát
        repeatbtn.onclick = function(){
            _this.isRepeat = !_this.isRepeat
            _this.setConfig('isRepeat',_this.isRepeat)
            repeatbtn.classList.toggle('active',_this.isRepeat)
        }
        // khi random song
        randombtn.onclick = function(){
            _this.isRandom = !_this.isRandom
            _this.setConfig('isRandom',_this.isRandom)
            randombtn.classList.toggle('active',_this.isRandom)

        }
        // xử lý next song khi audio end
        audio.onended = function(){
            if(_this.isRepeat){
                audio.play()
            }else{
                nextbtn.click()
            }
        }


        // lắng nghe click vào playlist  
        playlist.onclick = function(e){
            const songnode = e.target.closest('.song:not(.active)')
            if(songnode || e.target.closest('.option')){
                // xử lý khi click vào song
                if(songnode){
                    // data-index = dataset.index
                    _this.currentIndex = Number(songnode.dataset.index)
                    _this.loadCurrentSong()
                    _this.render()
                    audio.play()

                }
                // xử lý khi vào option
                if(e.target.closest('.option')){

                }


            }

        }

    },
    nextsong: function(){
        this.currentIndex++
        if(this.currentIndex >= this.songs.length){
            this.currentIndex = 0
        }
        this.loadCurrentSong()

    },
    prevSong: function(){
        this.currentIndex--
        if(this.currentIndex < 0){
            this.currentIndex = this.songs.length -1
        }
        this.loadCurrentSong()

    },
    randomSong: function(){
        let newIndex 
        do{
            newIndex = Math.floor(Math.random() * this.songs.length)
        }
        while(newIndex === this.currentIndex)
        this.currentIndex = newIndex
       this.loadCurrentSong()
    },
    scrollToActivesong: function(){
        setTimeout(()=>{
            $('.song.active').scrollIntoView({
                behavior :'smooth',
                block: 'center'
            })
        },300)

    },

    start: function(){
        // gán cấu hình từ config vào ứng dụng
        this.loadConfig()
        // dinh nghia thuoc tinh
        this.defineProperties()
        // lắng nghe dom
        this.handleEvents()
        // render
        this.render()
        // tai bai hat
        this.loadCurrentSong()



        randombtn.classList.toggle('active',this.isRandom.config)
        repeatbtn.classList.toggle('active',this.isRepeat.config)

    }
}
app.start()