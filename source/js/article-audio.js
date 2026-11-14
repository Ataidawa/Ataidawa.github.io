(function(){
  function initArticleAudio(){
    document.querySelectorAll('.post-content audio[controls]').forEach(function(audio){
      if(audio.closest('.article-audio'))return;
      var src=audio.getAttribute('src')||(audio.querySelector('source')||{}).src||'';
      var filename;try{filename=decodeURIComponent(src.split('/').pop().split('?')[0]).replace(/\.[^.]+$/,'');}catch(e){filename='音频';}
      var label=audio.dataset.title||audio.title||filename||'音频';
      var card=document.createElement('div');card.className='article-audio';
      card.innerHTML='<button class="clip-play" type="button" aria-label="播放音频"><span class="clip-play-icon" aria-hidden="true"></span></button><div class="clip-main"><span class="clip-title"></span><div class="clip-timeline"><input type="range" min="0" max="100" value="0" step="0.1" aria-label="音频播放进度" disabled><span class="clip-time">0:00 / --:--</span></div><span class="clip-error" role="status"></span></div>';
      card.querySelector('.clip-title').textContent=label;
      audio.parentNode.insertBefore(card,audio);card.appendChild(audio);audio.controls=false;
      var play=card.querySelector('.clip-play'),seek=card.querySelector('input'),clock=card.querySelector('.clip-time'),error=card.querySelector('.clip-error');
      function time(value){if(!isFinite(value)||value<0)return '--:--';return Math.floor(value/60)+':'+String(Math.floor(value%60)).padStart(2,'0');}
      function update(){var duration=audio.duration,known=isFinite(duration)&&duration>0,progress=known?audio.currentTime/duration*100:0;seek.disabled=!known;seek.value=progress;seek.style.setProperty('--clip-progress',progress+'%');seek.setAttribute('aria-valuetext',time(audio.currentTime)+' / '+time(duration));clock.textContent=time(audio.currentTime||0)+' / '+time(duration);var playing=!audio.paused&&!audio.ended;card.classList.toggle('is-playing',playing);play.setAttribute('aria-label',(playing?'暂停：':'播放：')+label);}
      function failed(){error.textContent='暂时无法播放，请重试';}
      play.onclick=function(){if(!audio.paused){audio.pause();return;}error.textContent='';if(audio.error)audio.load();var promise=audio.play();if(promise&&promise.catch)promise.catch(failed);};
      seek.addEventListener('input',function(){if(isFinite(audio.duration)&&audio.duration>0)audio.currentTime=Number(seek.value)/100*audio.duration;update();});
      audio.addEventListener('play',function(){document.querySelectorAll('.article-audio audio').forEach(function(other){if(other!==audio)other.pause();});error.textContent='';update();});
      ['pause','ended','timeupdate','loadedmetadata','durationchange'].forEach(function(event){audio.addEventListener(event,update);});
      audio.addEventListener('error',failed);update();
    });
  }
  document.addEventListener('DOMContentLoaded',initArticleAudio);
  document.addEventListener('jopolis:navigate',initArticleAudio);
})();
