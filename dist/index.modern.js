import React__default, { Component } from 'react';

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

var styles = {"recorder_library_box":"_1ceqH","recorder_box":"_2fG9h","recorder_box_inner":"_dt3-T","mic_icon":"_1dpop","microphone_icon_sec":"_3neb0","mic_icon_svg":"_3wi1g","reco_header":"_1lB9c","h2":"_2N9dq","close_icons":"_3-aC9","record_section":"_3bC73","duration_section":"_1YOWG","btn_wrapper":"_1Yplu","btn":"_1Pz2d","clear_btn":"_2gd2_","upload_btn":"_37kfa","duration":"_f2DT8","recorder_page_box":"_17RTH","help":"_eV_dK","record_controller":"_qxztz","icons":"_2uz65","stop":"_1bSom","pause":"_3nQu5","play_icons":"_3O0Io","pause_icons":"_2ACrw","stop_icon":"_oEOY-"};

var audioType = 'audio/*';

var Recorder = /*#__PURE__*/function (_Component) {
  _inheritsLoose(Recorder, _Component);

  function Recorder(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.state = {
      time: {},
      seconds: 0,
      recording: false,
      medianotFound: false,
      audios: [],
      audioBlob: null
    };
    _this.timer = 0;
    _this.startTimer = _this.startTimer.bind(_assertThisInitialized(_this));
    _this.countDown = _this.countDown.bind(_assertThisInitialized(_this));
    return _this;
  }

  var _proto = Recorder.prototype;

  _proto.handleAudioPause = function handleAudioPause(e) {
    e.preventDefault();
    clearInterval(this.timer);
    this.mediaRecorder.pause();
    this.setState({
      pauseRecord: true
    });
  };

  _proto.handleAudioStart = function handleAudioStart(e) {
    e.preventDefault();
    this.startTimer();
    this.mediaRecorder.resume();
    this.setState({
      pauseRecord: false
    });
  };

  _proto.startTimer = function startTimer() {
    this.timer = setInterval(this.countDown, 1000);
  };

  _proto.countDown = function countDown() {
    var seconds = this.state.seconds + 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds
    });
  };

  _proto.secondsToTime = function secondsToTime(secs) {
    var hours = Math.floor(secs / (60 * 60));
    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);
    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);
    var obj = {
      h: hours,
      m: minutes,
      s: seconds
    };
    return obj;
  };

  _proto.componentDidMount = function componentDidMount() {
    try {
      var _this3 = this;

      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
      return Promise.resolve(navigator.mediaDevices.getUserMedia({
        audio: true
      })).then(function (stream) {
        if (_this3.props.mimeTypeToUseWhenRecording) {
          _this3.mediaRecorder = new MediaRecorder(stream, {
            mimeType: _this3.props.mimeTypeToUseWhenRecording
          });
        } else {
          _this3.mediaRecorder = new MediaRecorder(stream);
        }

        _this3.chunks = [];

        _this3.mediaRecorder.ondataavailable = function (e) {
          if (e.data && e.data.size > 0) {
            _this3.chunks.push(e.data);
          }
        };
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.startRecording = function startRecording(e) {
    e.preventDefault();
    this.chunks = [];
    this.mediaRecorder.start(10);
    this.startTimer();
    this.setState({
      recording: true
    });
  };

  _proto.stopRecording = function stopRecording(e) {
    clearInterval(this.timer);
    this.setState({
      time: {}
    });
    e.preventDefault();
    this.mediaRecorder.stop();
    this.setState({
      recording: false,
      pauseRecord: false
    });
    this.saveAudio();
  };

  _proto.handleReset = function handleReset(e) {
    var _this4 = this;

    if (this.state.recording) {
      this.stopRecording(e);
    }

    this.setState({
      time: {},
      seconds: 0,
      recording: false,
      medianotFound: false,
      audios: [],
      audioBlob: null
    }, function () {
      _this4.props.handleReset(_this4.state);
    });
  };

  _proto.saveAudio = function saveAudio() {
    var blob = new Blob(this.chunks, {
      type: audioType
    });
    var audioURL = window.URL.createObjectURL(blob);
    var audios = [audioURL];
    this.setState({
      audios: audios,
      audioBlob: blob
    });
    this.props.handleAudioStop({
      url: audioURL,
      blob: blob,
      chunks: this.chunks,
      duration: this.state.time
    });
  };

  _proto.render = function render() {
    var _this5 = this;

    var _this$state = this.state,
        recording = _this$state.recording,
        audios = _this$state.audios,
        time = _this$state.time,
        medianotFound = _this$state.medianotFound,
        pauseRecord = _this$state.pauseRecord;
    var _this$props = this.props,
        showUIAudio = _this$props.showUIAudio,
        title = _this$props.title,
        audioURL = _this$props.audioURL;
    return /*#__PURE__*/React__default.createElement("div", {
      className: styles.recorder_library_box
    }, /*#__PURE__*/React__default.createElement("div", {
      className: styles.recorder_box
    }, /*#__PURE__*/React__default.createElement("div", {
      className: styles.recorder_box_inner
    }, !this.props.hideHeader ? /*#__PURE__*/React__default.createElement("div", {
      className: styles.reco_header
    }, /*#__PURE__*/React__default.createElement("h2", {
      className: styles.h2
    }, title), /*#__PURE__*/React__default.createElement("span", {
      className: styles.close_icons
    })) : null, !medianotFound ? /*#__PURE__*/React__default.createElement("div", {
      className: styles.record_section
    }, /*#__PURE__*/React__default.createElement("div", {
      className: styles.btn_wrapper
    }, /*#__PURE__*/React__default.createElement("button", {
      onClick: function onClick() {
        return _this5.props.handleAudioUpload(_this5.state.audioBlob);
      },
      className: styles.btn + " " + styles.upload_btn,
      disabled: this.props.uploadButtonDisabled
    }, "\u0622\u067E\u0644\u0648\u062F"), /*#__PURE__*/React__default.createElement("button", {
      onClick: function onClick(e) {
        return _this5.handleReset(e);
      },
      className: styles.btn + " " + styles.clear_btn
    }, "\u067E\u0627\u06A9 \u06A9\u0631\u062F\u0646")), /*#__PURE__*/React__default.createElement("div", {
      className: styles.duration_section
    }, /*#__PURE__*/React__default.createElement("div", {
      className: styles.audio_section
    }, audioURL !== null && showUIAudio ? /*#__PURE__*/React__default.createElement("audio", {
      controls: true
    }, /*#__PURE__*/React__default.createElement("source", {
      src: audios[0],
      type: "audio/ogg"
    }), /*#__PURE__*/React__default.createElement("source", {
      src: audios[0],
      type: "audio/mpeg"
    })) : null), /*#__PURE__*/React__default.createElement("div", {
      className: styles.duration
    }, /*#__PURE__*/React__default.createElement("span", {
      className: styles.mins
    }, time.m !== undefined ? "" + (time.m <= 9 ? '0' + time.m : time.m) : '00'), /*#__PURE__*/React__default.createElement("span", {
      className: styles.divider
    }, ":"), /*#__PURE__*/React__default.createElement("span", {
      className: styles.secs
    }, time.s !== undefined ? "" + (time.s <= 9 ? '0' + time.s : time.s) : '00')), !recording ? /*#__PURE__*/React__default.createElement("p", {
      className: styles.help
    }, "\u0628\u0631\u0627\u06CC \u0636\u0628\u0637 \u0635\u062F\u0627 \u0631\u0648\u06CC \u0645\u06CC\u06A9\u0631\u0648\u0641\u0646 \u06A9\u0644\u06CC\u06A9 \u06A9\u0646\u06CC\u062F") : null), !recording ? /*#__PURE__*/React__default.createElement("a", {
      onClick: function onClick(e) {
        return _this5.startRecording(e);
      },
      href: " #",
      className: styles.mic_icon
    }, /*#__PURE__*/React__default.createElement("span", {
      className: styles.microphone_icon_sec
    }, /*#__PURE__*/React__default.createElement("svg", {
      className: styles.mic_icon_svg,
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg",
      x: "0px",
      y: "0px",
      viewBox: "0 0 1000 1000",
      enableBackground: "new 0 0 1000 1000"
    }, /*#__PURE__*/React__default.createElement("g", null, /*#__PURE__*/React__default.createElement("path", {
      d: "M500,683.8c84.6,0,153.1-68.6,153.1-153.1V163.1C653.1,78.6,584.6,10,500,10c-84.6,0-153.1,68.6-153.1,153.1v367.5C346.9,615.2,415.4,683.8,500,683.8z M714.4,438.8v91.9C714.4,649,618.4,745,500,745c-118.4,0-214.4-96-214.4-214.4v-91.9h-61.3v91.9c0,141.9,107.2,258.7,245,273.9v124.2H346.9V990h306.3v-61.3H530.6V804.5c137.8-15.2,245-132.1,245-273.9v-91.9H714.4z"
    }))))) : /*#__PURE__*/React__default.createElement("div", {
      className: styles.record_controller
    }, /*#__PURE__*/React__default.createElement("a", {
      onClick: function onClick(e) {
        return _this5.stopRecording(e);
      },
      href: " #",
      className: styles.icons + " " + styles.stop
    }, /*#__PURE__*/React__default.createElement("span", {
      className: styles.stop_icon
    })), /*#__PURE__*/React__default.createElement("a", {
      onClick: !pauseRecord ? function (e) {
        return _this5.handleAudioPause(e);
      } : function (e) {
        return _this5.handleAudioStart(e);
      },
      href: " #",
      className: styles.icons + " " + styles.pause
    }, pauseRecord ? /*#__PURE__*/React__default.createElement("span", {
      className: styles.play_icons
    }) : /*#__PURE__*/React__default.createElement("span", {
      className: styles.pause_icons
    })))) : /*#__PURE__*/React__default.createElement("p", {
      style: {
        color: '#fff',
        marginTop: 30,
        fontSize: 25
      }
    }, "Seems the site is Non-SSL"))));
  };

  return Recorder;
}(Component);
Recorder.defaultProps = {
  hideHeader: false,
  mimeTypeToUseWhenRecording: null
};

export { Recorder };
//# sourceMappingURL=index.modern.js.map
