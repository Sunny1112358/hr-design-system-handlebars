(window.webpackJsonpardplayer=window.webpackJsonpardplayer||[]).push([[5],{515:function(t,e,i){"use strict";i.d(e,"a",(function(){return T}));var r,s,a,n,o,d=i(0),h=i(169),l=i.n(h),u=i(9),m=function(t,e,i,r){var s,a=arguments.length,n=a<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,r);else for(var o=t.length-1;o>=0;o--)(s=t[o])&&(n=(a<3?s(n):a>3?s(e,i,n):s(e,i))||n);return a>3&&n&&Object.defineProperty(e,i,n),n},v=function(t,e,i,r){return new(i||(i=Promise))((function(s,a){function n(t){try{d(r.next(t))}catch(t){a(t)}}function o(t){try{d(r.throw(t))}catch(t){a(t)}}function d(t){var e;t.done?s(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(n,o)}d((r=r.apply(t,e||[])).next())}))},c=function(t,e,i,r,s){if("m"===r)throw new TypeError("Private method is not writable");if("a"===r&&!s)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof e?t!==e||!s:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===r?s.call(t,i):s?s.value=i:e.set(t,i),i},f=function(t,e,i,r){if("a"===i&&!r)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof e?t!==e||!r:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===i?r:"a"===i?r.call(t):r?r.value:e.get(t)},T=class{constructor(t,e,i){this.hasDvr=!1,this.endTime=0,this.lastSegmentIndex=0,this.lastCurrentTime=0,this.lastDuration=0,this.dvrDuration=0,this.durationDelta=0,this.segmentDuration=0,this.liveSyncDurationCount=3,this.lastMediaSequence=null,this.lastNumSegments=0,this.growingWindow=!1,this.initialTimestamp=0,this.dvrData=null,this.dvrToDateSync=null,r.set(this,""),s.set(this,null),a.set(this,null),n.set(this,-1),o.set(this,null),this.player=t,this.mediaElement=e,this.playerCtrl=i,this.emap=new l.a}initStream(t){c(this,r,t,"f"),this.loadManifest(t,!0,(t=>{c(this,s,t,"f"),this.loadManifest(this.getSegmentsUrl(),!1,(t=>{c(this,a,t,"f"),this.hasDvr=t.isLive||t.duration>60,this.endTime=t.duration,this.dvrDuration=t.duration,this.segmentDuration=t.targetDuration,this.hasDvr=t.isLive||t.duration>60,this.initialTimestamp=Math.floor(Date.now()/1e3),this.lastSegmentIndex=t.segmentsList[t.segmentsList.length-1].index,this.emap.map(this.mediaElement,"timeupdate",this.handleVideoTimeUpdate,this),this.emap.map(this.mediaElement,"durationchange",this.handleVideoDurationChange,this),this.dispatchDVRInfo(),this.startManifestTimeout()}))}))}getSegmentsUrl(){var t,e,i=null!==(e=null===(t=f(this,s,"f"))||void 0===t?void 0:t.streams[0].url)&&void 0!==e?e:"";if(Object(d.k)(f(this,r,"f"))||/^http/.test(i))return i;if(!i.includes("/")){var a=f(this,r,"f").split("/");return a.pop(),a.join("/")+"/"+i}var n=new URL(f(this,r,"f"));return n.protocol+"//"+n.host+i}loadManifest(t,e,i){fetch(t).then((t=>v(this,void 0,void 0,(function*(){return yield t.text()})))).then((t=>{try{this.player.checkState()}catch(t){return void console.warn("aborting async",t)}var e=new g(t);i&&i(e.parse())})).catch((t=>{var r,a,o,d;try{this.player.checkState()}catch(t){return void console.warn("aborting async",t)}e?(this.hasDvr=!1,clearTimeout(f(this,n,"f"))):(null===(a=null===(r=f(this,s,"f"))||void 0===r?void 0:r.streams)||void 0===a?void 0:a.length)>1?(null===(d=null===(o=f(this,s,"f"))||void 0===o?void 0:o.streams)||void 0===d||d.shift(),this.loadManifest(this.getSegmentsUrl(),!1,i)):(this.hasDvr=!1,clearTimeout(f(this,n,"f")))}))}startManifestTimeout(){var t,e;clearTimeout(f(this,n,"f")),c(this,n,this.player.safeTimeout((()=>{this.loadManifest(this.getSegmentsUrl(),!1,(t=>{c(this,a,t,"f"),this.hasDvr=t.isLive||t.duration>60;var e,i,r=this.endTime;for(e=0;e<t.segmentsList.length;++e)(i=t.segmentsList[e]).index>this.lastSegmentIndex&&(this.endTime+=i.duration);this.lastSegmentIndex=t.segmentsList[t.segmentsList.length-1].index,this.endTime!==r&&this.handleVideoDurationChange(),this.setDvrToDateSync(),this.startManifestTimeout()}))}),1e3*(null!==(e=null===(t=f(this,a,"f"))||void 0===t?void 0:t.targetDuration)&&void 0!==e?e:5)),"f")}dispatchDVRInfo(){if(null!==f(this,a,"f")){this.lastCurrentTime<Math.round(this.getVideoTime())&&++this.durationDelta;var t=f(this,a,"f").firstProgTime,e=f(this,a,"f").lastProgTime;null==this.lastMediaSequence?(this.lastMediaSequence=f(this,a,"f").mediaSequence,this.lastNumSegments=f(this,a,"f").numSegments):this.lastMediaSequence===f(this,a,"f").mediaSequence?f(this,a,"f").numSegments>this.lastNumSegments&&(this.lastNumSegments=f(this,a,"f").numSegments,this.growingWindow=!0):this.growingWindow=!1,this.growingWindow&&(this.dvrDuration=(e-t)/1e3,this.endTime=this.dvrDuration);var i,r=this.dvrDuration-this.segmentDuration*this.liveSyncDurationCount,s=r+this.durationDelta,n=this.getVideoTime(),o=s-n<=this.segmentDuration*this.liveSyncDurationCount+this.segmentDuration;i=this.growingWindow?t/1e3+this.mediaElement.currentTime:this.initialTimestamp-(this.dvrDuration-this.segmentDuration*this.liveSyncDurationCount)+this.mediaElement.currentTime,this.dvrData={dvrDuration:r,currentTime:n,duration:s,liveTimestamp:i,start:t,end:e,isLive:o},this.setDvrToDateSync()}}setDvrToDateSync(){var t,e,i,r=null!==(e=null===(t=f(this,a,"f"))||void 0===t?void 0:t.firstProgTime)&&void 0!==e?e:0,s=this.getVideoTime();i=this.growingWindow?r/1e3+this.mediaElement.currentTime:this.initialTimestamp-this.dvrDuration+this.mediaElement.currentTime,this.dvrToDateSync={rel:s,real:1e3*i,at:Date.now()},this.onDVRCallback()}getVideoTime(){return Math.max(0,this.mediaElement.currentTime-(this.endTime-this.dvrDuration))}getVideoDuration(){return this.endTime}getCurrentDuration(){return this.dvrDuration-this.segmentDuration*this.liveSyncDurationCount+this.durationDelta}seek(t){this.mediaElement.currentTime=Math.max(1,Math.min(this.endTime,t))+this.endTime-this.dvrDuration}seekToLive(){this.playerCtrl.bufferingEventHandler(!0),this.mediaElement.load(),this.initStream(f(this,r,"f"))}onDVRCallback(){var t,e,i,r,s;null!==f(this,o,"f")&&f(this,o,"f").dvrEnabled===this.hasDvr&&f(this,o,"f").dvrDuration===(null===(t=this.dvrData)||void 0===t?void 0:t.dvrDuration)&&f(this,o,"f").dvrIsLive===this.dvrData.isLive||(c(this,o,{dvrEnabled:this.hasDvr,dvrDuration:null===(e=this.dvrData)||void 0===e?void 0:e.dvrDuration,dvrIsLive:null===(i=this.dvrData)||void 0===i?void 0:i.isLive},"f"),this.playerCtrl.onDVRCallback(this.hasDvr,null===(r=this.dvrData)||void 0===r?void 0:r.dvrDuration,null===(s=this.dvrData)||void 0===s?void 0:s.isLive))}dispose(){this.emap.all(),clearTimeout(f(this,n,"f"))}handleVideoTimeUpdate(){this.dispatchDVRInfo(),this.lastCurrentTime=Math.round(this.getVideoTime())}handleVideoDurationChange(){var t=Math.round(this.endTime);this.durationDelta=0,this.lastDuration!==t&&(this.lastDuration=t,this.dispatchDVRInfo())}};r=new WeakMap,s=new WeakMap,a=new WeakMap,n=new WeakMap,o=new WeakMap,T=m([u.a],T);class g{constructor(t){this.text=t}parse(){var t,e=this.text.split("\n"),i={keyInfo:{},firstProgTime:0,lastProgTime:0,streams:[],segments:{},segmentsList:[],mediaSequence:0,duration:0,isLive:!0,targetDuration:0,numSegments:0},r=!1,s=i.mediaSequence,a={},n=0,o=0;return e.forEach((e=>{var d,h,l,u,m;r&&(a.url=e,i.streams.push(a),a={},r=!1),0===e.indexOf("#EXT-X-PROGRAM-DATE-TIME:")&&(t=new Date(e.substr("#EXT-X-PROGRAM-DATE-TIME:".length)).getTime(),0===n&&(n=t),o=new Date(e.substr("#EXT-X-PROGRAM-DATE-TIME:".length)).getTime()),e.startsWith("#EXT-X-STREAM-INF")&&(r=!0),e.startsWith("#EXT-X-ENDLIST")&&(i.isLive=!1),e.startsWith("#EXT-X-KEY")&&(i.keyInfo=e.replace("#EXT-X-KEY:","").split(",").reduce(((t,e)=>{var i=e.indexOf("="),r=e.substring(0,i),s=e.substring(i+1);return t[r]=s.replace(/"/g,""),t}),{}));var v=/^#EXT-X-TARGETDURATION:?(-?[0-9.]*)?/.exec(e);(null==v?void 0:v[1])&&(i.targetDuration=parseInt(v[1],10));var c=/^#EXT-X-STREAM-INF:.*BANDWIDTH=(\d*)?/.exec(e);""!==(null!==(d=null==c?void 0:c[1])&&void 0!==d?d:"")&&(a.bandwidth=null==c?void 0:c[1]);var f=/^#EXT-X-STREAM-INF:.*RESOLUTION=(\d*x\d*)?/.exec(e);if(""!==(null!==(h=null==f?void 0:f[1])&&void 0!==h?h:"")){var T=null==f?void 0:f[1].split("x");!T||T.length<2?a.resolution={width:0,height:0}:a.resolution={width:parseInt(T[0],10),height:parseInt(T[1],10)}}var g=/^#EXTINF:?([0-9.]*)?,?(.*)?/.exec(e);""!==(null!==(l=null==g?void 0:g[1])&&void 0!==l?l:"")&&(t=parseFloat(null!==(u=null==g?void 0:g[1])&&void 0!==u?u:""),i.segments[s]=t,i.segmentsList.push({index:s,duration:t}),s+=1,i.duration+=t,++i.numSegments,0!==o&&(o+=1e3*t));var p=/^#EXT-X-MEDIA-SEQUENCE:?(-?[0-9.]*)?/.exec(e),D=null!==(m=null==p?void 0:p[1])&&void 0!==m?m:"";""!==D&&(i.mediaSequence=parseInt(D,10),s=parseInt(D,10))})),i.firstProgTime=n,i.lastProgTime=o,i}}},546:function(t,e,i){"use strict";i.r(e);var r=i(502),s=i(28),a=i(515),n=i(7),o=i(10),d=i(0),h=i(9),l=function(t,e,i,r){var s,a=arguments.length,n=a<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,r);else for(var o=t.length-1;o>=0;o--)(s=t[o])&&(n=(a<3?s(n):a>3?s(e,i,n):s(e,i))||n);return a>3&&n&&Object.defineProperty(e,i,n),n},u=class extends r.a{constructor(t,e){if(super(t,e),this.forcedBuffering=!1,this.lastTimeupdate=0,navigator.userAgent.match(/Safari/i)&&!navigator.userAgent.match(/Chrome/i)&&this.mc.isLive&&this.pc.generic.isDvrEnabled&&(this.dvrUtil=new a.a(t,e,this)),e.audioTracks){var i,r,s=e.audioTracks,o=()=>{this.audioTracks=[];for(var t=0;t<e.audioTracks.length;t++){var i=e.audioTracks.item(t),r={id:i.id,label:i.label,enabled:i.enabled,language:i.language};this.audioTracks.push(r),!0===i.enabled&&(this.audioTrack=r)}this.onAudioTracksChanged()};this.emap.map(s,"addtrack",(()=>{clearTimeout(r),r=this.player.safeTimeout((()=>{o()}))})),this.emap.map(s,"removetrack",(()=>{clearTimeout(r),r=this.player.safeTimeout((()=>{o()}))})),this.emap.map(s,"change",(()=>{clearTimeout(i),i=this.player.safeTimeout((()=>{this.player.loop.dispatchEvent(n.a.CURRENT_AUDIO_TRACK_CHANGED,{audioTrack:this.audioTrack})}))}))}}addSource(t){var e,i;null===(i=null===(e=this.player)||void 0===e?void 0:e.pixelController)||void 0===i||i.loadStream(t.url);var r=t.url.toLowerCase();o.a.instance.browserIsSafari&&this._pendingSeek>0&&(t.url+="#t="+this._pendingSeek,this._pendingSeek=0,this.__seeking=!0);var s=e=>{var i=document.createElement("source");i.src=t.url,i.type=e,this.mediaElement.appendChild(i),this.emap.map(i,"error",this.onSourceError,this)};switch(!0){case r.indexOf(".m3u8")>0:s("application/x-mpegURL");break;case r.indexOf(".mp4")>0:s("video/mp4");break;case r.indexOf(".ogv")>0:s("video/ogg");break;case r.indexOf(".webm")>0:s("video/webm");break;case!Object(d.k)(t.mimeType):s(t.mimeType);break;default:this.handleError('Unknown mimetype "'+t.mimeType+'" for stream '+r)}this.dvrUtil&&this.dvrUtil.initStream(t.url)}seekToLive(){this.bufferingEventHandler(!0),this.mediaElement.load(),super.seekToLive()}play(){!this.mc.isLive||this.model.playstate!==s.a.PLAYSTATE_PAUSED||this.mediaElement.webkitCurrentPlaybackTargetIsWireless||this.dvrUtil||this.seekToLive(),this.lastTimeupdate=Date.now(),this.forcedBuffering=!1,super.play()}onTimeUpdate(){this.lastTimeupdate=Date.now()}updateTicker(){super.updateTicker(),this.model.playstate===s.a.PLAYSTATE_PLAYING&&Date.now()-this.lastTimeupdate>2e3?(this.forcedBuffering=!0,this.bufferingEventHandler(!0)):this.forcedBuffering&&this.bufferingEventHandler(!1)}getAudioTracks(){var t;return null!==(t=this.audioTracks)&&void 0!==t?t:[]}setAudioTrack(t){var e,i;for(var r of(this.audioTrack=t,null!==(i=null===(e=this.mediaElement)||void 0===e?void 0:e.audioTracks)&&void 0!==i?i:[]))r.enabled=String(r.id)===String(t.id);for(var s of this.audioTracks)s.enabled=String(s.id)===String(t.id)}setAudioTrackById(t){var e,i;for(var r of null!==(i=null===(e=this.mediaElement)||void 0===e?void 0:e.audioTracks)&&void 0!==i?i:[])r.enabled=String(r.id)===String(t);for(var s of this.audioTracks)String(s.id)===String(t)?(s.enabled=!0,this.audioTrack=s):s.enabled=!1}getAudioTrack(){return this.audioTrack}getClassTypeString(){return"HtmlVideoCtrl"}getDvrToDateSync(){return this.dvrUtil?this.dvrUtil.dvrToDateSync:null}getCurrentTime(){var t,e;return null!==(e=null===(t=this.dvrUtil)||void 0===t?void 0:t.getVideoTime())&&void 0!==e?e:super.getCurrentTime()}getDuration(){var t,e;return null!==(e=null===(t=this.dvrUtil)||void 0===t?void 0:t.getCurrentDuration())&&void 0!==e?e:super.getDuration()}setTimeByPercent(t){if(this.dvrUtil){var e=t/100*this.dvrUtil.getCurrentDuration();return t>99.9?this.dvrUtil.seekToLive():this.dvrUtil.seek(e),e}return super.setTimeByPercent(t)}setCurrentTime(t,e,i,r){return void 0===e&&(e=!1),void 0===i&&(i=!1),void 0===r&&(r=!1),this.dvrUtil&&t>=this.dvrRelToUnix(0)&&(t=this.dvrUnixToRel(t)),super.setCurrentTime(Math.min(t,this.getDuration()-.1),e,i,r)}dispose(){super.dispose(),this.dvrUtil&&this.dvrUtil.dispose()}};u=l([h.a],u);var m={Generator:i(503).b,Controller:u};e.default=m}}]);