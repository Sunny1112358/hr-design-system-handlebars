(window["webpackJsonpardplayer"] = window["webpackJsonpardplayer"] || []).push([["pluginhtmlv"],{

/***/ "./app/extensions/plugins/html-video/PluginHTMLVideoLibrary.ts":
/*!*********************************************************************!*\
  !*** ./app/extensions/plugins/html-video/PluginHTMLVideoLibrary.ts ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _logic_HtmlVideoCtrl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./logic/HtmlVideoCtrl */ \"./app/extensions/plugins/html-video/logic/HtmlVideoCtrl.ts\");\n/* harmony import */ var _MediaElementGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../MediaElementGenerator */ \"./app/extensions/plugins/MediaElementGenerator.ts\");\n\n\nvar exports = {\n  Generator: _MediaElementGenerator__WEBPACK_IMPORTED_MODULE_1__[\"DefaultVideoElementGenerator\"],\n  Controller: _logic_HtmlVideoCtrl__WEBPACK_IMPORTED_MODULE_0__[\"HtmlVideoCtrl\"]\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (exports);\n\n//# sourceURL=webpack://ardplayer/./app/extensions/plugins/html-video/PluginHTMLVideoLibrary.ts?");

/***/ }),

/***/ "./app/extensions/plugins/html-video/logic/HtmlVideoCtrl.ts":
/*!******************************************************************!*\
  !*** ./app/extensions/plugins/html-video/logic/HtmlVideoCtrl.ts ***!
  \******************************************************************/
/*! exports provided: HtmlVideoCtrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"HtmlVideoCtrl\", function() { return HtmlVideoCtrl; });\n/* harmony import */ var _controller_AbstractPlayerCtrl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../controller/AbstractPlayerCtrl */ \"./app/controller/AbstractPlayerCtrl.ts\");\n/* harmony import */ var _model_PlayerModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../model/PlayerModel */ \"./app/model/PlayerModel.ts\");\n/* harmony import */ var _utils_DVRUtil__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../utils/DVRUtil */ \"./app/utils/DVRUtil.ts\");\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../.. */ \"./app/index.ts\");\n/* harmony import */ var _utils_Utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../utils/Utils */ \"./app/utils/Utils.ts\");\n/* harmony import */ var _utils_Decorators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../utils/Decorators */ \"./app/utils/Decorators.ts\");\nvar __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {\n  var c = arguments.length,\n      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,\n      d;\n  if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {\n    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n  }\n  return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\n\n\n\n\n\n\n\nvar HtmlVideoCtrl = class HtmlVideoCtrl extends _controller_AbstractPlayerCtrl__WEBPACK_IMPORTED_MODULE_0__[\"AbstractPlayerCtrl\"] {\n  constructor(player, htmlPlayer) {\n    super(player, htmlPlayer);\n    this.forcedBuffering = false;\n    this.lastTimeupdate = 0;\n    var isSafari = navigator.userAgent.match(/Safari/i) && !navigator.userAgent.match(/Chrome/i);\n\n    if (isSafari && this.mc.isLive && this.pc.generic.isDvrEnabled) {\n      this.dvrUtil = new _utils_DVRUtil__WEBPACK_IMPORTED_MODULE_2__[\"DVRUtil\"](player, htmlPlayer, this);\n    }\n\n    if (htmlPlayer.audioTracks) {\n      var tracks = htmlPlayer.audioTracks;\n      var changeTrackTimeout;\n      var changeTracksTimeout;\n\n      var tracksChanged = () => {\n        this.audioTracks = [];\n\n        for (var i = 0; i < htmlPlayer.audioTracks.length; i++) {\n          var t = htmlPlayer.audioTracks.item(i);\n          var track = {\n            id: t.id,\n            label: t.label,\n            enabled: t.enabled,\n            language: t.language\n          };\n          this.audioTracks.push(track);\n\n          if (t.enabled === true) {\n            this.audioTrack = track;\n          }\n        }\n\n        this.onAudioTracksChanged();\n      };\n\n      this.emap.map(tracks, 'addtrack', () => {\n        clearTimeout(changeTracksTimeout);\n        changeTracksTimeout = this.player.safeTimeout(() => {\n          tracksChanged();\n        });\n      });\n      this.emap.map(tracks, 'removetrack', () => {\n        clearTimeout(changeTracksTimeout);\n        changeTracksTimeout = this.player.safeTimeout(() => {\n          tracksChanged();\n        });\n      });\n      this.emap.map(tracks, 'change', () => {\n        clearTimeout(changeTrackTimeout);\n        changeTrackTimeout = this.player.safeTimeout(() => {\n          this.player.loop.dispatchEvent(___WEBPACK_IMPORTED_MODULE_3__[\"Player\"].CURRENT_AUDIO_TRACK_CHANGED, {\n            audioTrack: this.audioTrack\n          });\n        });\n      });\n    }\n  }\n\n  addSource(stream) {\n    var _a, _b;\n\n    (_b = (_a = this.player) === null || _a === void 0 ? void 0 : _a.pixelController) === null || _b === void 0 ? void 0 : _b.loadStream(stream.url);\n    var stl = stream.url.toLowerCase(); // for iOS we nee to add the #t= param to the stream to perform our initial seek\n\n    if (___WEBPACK_IMPORTED_MODULE_3__[\"Environment\"].instance.browserIsSafari && this._pendingSeek > 0) {\n      stream.url += \"#t=\" + this._pendingSeek;\n      this._pendingSeek = 0;\n      this.__seeking = true;\n    }\n\n    var createdMappedSource = mimetype => {\n      var source = document.createElement('source');\n      source.src = stream.url;\n      source.type = mimetype;\n      this.mediaElement.appendChild(source);\n      this.emap.map(source, 'error', this.onSourceError, this);\n    };\n\n    switch (true) {\n      case stl.indexOf('.m3u8') > 0:\n        createdMappedSource('application/x-mpegURL');\n        break;\n\n      case stl.indexOf('.mp4') > 0:\n        createdMappedSource('video/mp4');\n        break;\n\n      case stl.indexOf('.ogv') > 0:\n        createdMappedSource('video/ogg');\n        break;\n\n      case stl.indexOf('.webm') > 0:\n        createdMappedSource('video/webm');\n        break;\n\n      case !Object(_utils_Utils__WEBPACK_IMPORTED_MODULE_4__[\"isBlank\"])(stream.mimeType):\n        createdMappedSource(stream.mimeType);\n        break;\n\n      default:\n        this.handleError(\"Unknown mimetype \\\"\" + stream.mimeType + \"\\\" for stream \" + stl);\n        break;\n    }\n\n    if (this.dvrUtil) {\n      this.dvrUtil.initStream(stream.url);\n    }\n  }\n\n  seekToLive() {\n    // directly notify about buffering\n    this.bufferingEventHandler(true); // reload source to get back to live location\n\n    this.mediaElement.load();\n    super.seekToLive();\n  }\n\n  play() {\n    // if the livestream is paused and has no dvr capabilities,\n    // seek to live position as we do not want to play in cache\n    // to prevent buffer holes.\n    if (this.mc.isLive && this.model.playstate === _model_PlayerModel__WEBPACK_IMPORTED_MODULE_1__[\"PlayerModel\"].PLAYSTATE_PAUSED && !this.mediaElement.webkitCurrentPlaybackTargetIsWireless && // not for airplay\n    !this.dvrUtil // don't seek to live in fake dvr mode\n    ) {\n      this.seekToLive();\n    }\n\n    this.lastTimeupdate = Date.now();\n    this.forcedBuffering = false;\n    super.play();\n  }\n  /**\r\n   * @inheritDoc\r\n   */\n\n\n  onTimeUpdate() {\n    this.lastTimeupdate = Date.now();\n  }\n\n  updateTicker() {\n    super.updateTicker(); // no time updates since 2 sec\n\n    if (this.model.playstate === _model_PlayerModel__WEBPACK_IMPORTED_MODULE_1__[\"PlayerModel\"].PLAYSTATE_PLAYING && Date.now() - this.lastTimeupdate > 2000) {\n      this.forcedBuffering = true; // force buffering\n\n      this.bufferingEventHandler(true);\n    } else {\n      // and reverse it if we are back on time\n      if (this.forcedBuffering) {\n        // force un-buffer\n        this.bufferingEventHandler(false);\n      }\n    }\n  }\n\n  getAudioTracks() {\n    var _a;\n\n    return (_a = this.audioTracks) !== null && _a !== void 0 ? _a : [];\n  }\n\n  setAudioTrack(audioTrack) {\n    var _a, _b;\n\n    this.audioTrack = audioTrack;\n\n    for (var t of (_b = (_a = this.mediaElement) === null || _a === void 0 ? void 0 : _a.audioTracks) !== null && _b !== void 0 ? _b : []) {\n      t.enabled = String(t.id) === String(audioTrack.id);\n    }\n\n    for (var _t of this.audioTracks) {\n      _t.enabled = String(_t.id) === String(audioTrack.id);\n    }\n  }\n\n  setAudioTrackById(id) {\n    var _a, _b;\n\n    for (var t of (_b = (_a = this.mediaElement) === null || _a === void 0 ? void 0 : _a.audioTracks) !== null && _b !== void 0 ? _b : []) {\n      t.enabled = String(t.id) === String(id);\n    }\n\n    for (var _t2 of this.audioTracks) {\n      if (String(_t2.id) === String(id)) {\n        _t2.enabled = true;\n        this.audioTrack = _t2;\n      } else {\n        _t2.enabled = false;\n      }\n    }\n  }\n\n  getAudioTrack() {\n    return this.audioTrack;\n  }\n\n  getClassTypeString() {\n    return 'HtmlVideoCtrl';\n  }\n\n  getDvrToDateSync() {\n    if (this.dvrUtil) {\n      return this.dvrUtil.dvrToDateSync;\n    }\n\n    return null;\n  }\n\n  getCurrentTime() {\n    var _a, _b;\n\n    return (_b = (_a = this.dvrUtil) === null || _a === void 0 ? void 0 : _a.getVideoTime()) !== null && _b !== void 0 ? _b : super.getCurrentTime();\n  }\n\n  getDuration() {\n    var _a, _b;\n\n    return (_b = (_a = this.dvrUtil) === null || _a === void 0 ? void 0 : _a.getCurrentDuration()) !== null && _b !== void 0 ? _b : super.getDuration();\n  }\n\n  setTimeByPercent(percent) {\n    if (this.dvrUtil) {\n      var targetTime = percent / 100 * this.dvrUtil.getCurrentDuration();\n\n      if (percent > 99.9) {\n        this.dvrUtil.seekToLive();\n      } else {\n        this.dvrUtil.seek(targetTime);\n      }\n\n      return targetTime;\n    } else {\n      return super.setTimeByPercent(percent);\n    }\n  }\n\n  setCurrentTime(seconds, preventPlay, preventSeek, isSubclipSeek) {\n    if (preventPlay === void 0) {\n      preventPlay = false;\n    }\n\n    if (preventSeek === void 0) {\n      preventSeek = false;\n    }\n\n    if (isSubclipSeek === void 0) {\n      isSubclipSeek = false;\n    }\n\n    // if seconds are detected as UTC Timestamp, we need to convert them to a relative (seekable) time.\n    if (this.dvrUtil && seconds >= this.dvrRelToUnix(0)) {\n      seconds = this.dvrUnixToRel(seconds); // switch format\n    }\n\n    return super.setCurrentTime(Math.min(seconds, this.getDuration() - 0.1), preventPlay, preventSeek, isSubclipSeek);\n  }\n\n  dispose() {\n    super.dispose();\n\n    if (this.dvrUtil) {\n      this.dvrUtil.dispose();\n    }\n  }\n\n};\nHtmlVideoCtrl = __decorate([_utils_Decorators__WEBPACK_IMPORTED_MODULE_5__[\"sealed\"]], HtmlVideoCtrl);\n\n\n//# sourceURL=webpack://ardplayer/./app/extensions/plugins/html-video/logic/HtmlVideoCtrl.ts?");

/***/ })

}]);