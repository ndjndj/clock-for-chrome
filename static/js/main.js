var BEGIN_HOUR = 10;
var END_HOUR = 22;

function setClock(){
    let elClock = document.getElementById("clock");
    
    let nowDate = new Date();
    let hour = zeroPadding(nowDate.getHours(), 2);
    let minutes = zeroPadding(nowDate.getMinutes(), 2);
    let seconds = zeroPadding(nowDate.getSeconds(), 2);

    elClock.innerHTML = hour + ":" + minutes + ":" + seconds;
    let parcent = calcParcentage();
    changePrgBarWidth(parcent);
}

function calcParcentage(){
    // 現在、開始、終了時刻を取得
    let lstNow = document.getElementById("clock").textContent.split(":").map(s => Number(s));
    let begin = new Date(1900, 0, 1, BEGIN_HOUR, 0, 0);
    let end = new Date(1900, 0, 1, END_HOUR, 0, 0);
    let now = new Date(1900, 0, 1, lstNow[0], lstNow[1], lstNow[2]);
    
    let beginTime = parseInt(begin.getTime(), 10);
    let endTime = parseInt(end.getTime(), 10);
    let nowTime = parseInt(now.getTime(), 10);
    // 開始時刻～終了時刻、開始時刻～現在の時刻を取得
    let diffBeginToEnd = (endTime - beginTime) / 1000;
    let diffBeginToNow = (nowTime - beginTime) / 1000;
    let parcent = diffBeginToNow > diffBeginToEnd ? 100 : 100 * calcDecimal(diffBeginToNow / diffBeginToEnd, 5);
    return parcent;
    
}

function changePrgBarWidth(parcent){
    let par = document.getElementById("par");
    let prgBar = document.getElementById("prg-bar");
    par.innerText = String(calcDecimal(parcent, 4)) + "%";
    prgBar.style.width = String(parcent) + "%";
}

function calcDecimal(num, base){
    const ZERO = "0";
    let digit = Number(base == 0 ? 1 : "1" + ZERO.repeat(base-1));
    return Math.round(num * digit) / digit;
}

function zeroPadding(targetNum, paddingNum) {
    const ZERO = "0";
    let joinedZero = ZERO.repeat(paddingNum) + String(targetNum);
    return joinedZero.slice(-paddingNum);
}

function applyConfig() {
    const begin = document.getElementById('begin');
    const end = document.getElementById('end');

    BEGIN_HOUR = begin.value;
    END_HOUR = end.value;
    
}

function initConf() {
    const begin = document.getElementById('begin');
    const end = document.getElementById('end');

    begin.value = BEGIN_HOUR;
    end.value = END_HOUR;
}

window.onload = function () {
    const confBtn = document.getElementById('conf');
    const body = document.body;

    body.addEventListener(
          'keydown'
        , event => {
            if (event.shiftKey && event.ctrlKey && event.altKey) {
                console.log(event.key);
                const conf = document.getElementById('config');
                conf.style.display = conf.style.display == 'none' ? 'block' : 'none';
            }
        }
    );

    confBtn.addEventListener(
          'click'
        , applyConfig
        , false
    );
    
    initConf();
    let timer = setInterval("setClock()", 1000);
}
