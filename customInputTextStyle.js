// 自定义input内部文字隔断
import React, { Component } from 'react';
import { url } from 'url';
const xss = require('xss');

const style = {
    wrap: {
        height: '0.88rem',
        backgroundColor: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 0.3rem'
    },
    inputBox: {
        position: 'relative'
    },
    clear: {
        position: 'absolute',
        width: '0.5rem',
        height: '0.5rem',
        backgroundImage: `url(${url('img/cv/clearSearch.png')})`,
        backgroundSize: '0.3rem 0.3rem',
        top: '50%',
        marginTop: '-0.25rem',
        right: '0.2rem',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50% 50%'
    },
    input: {
        width: '6.14rem',
        height: '0.56rem',
        fontSize: '0.28rem',
        backgroundColor: '#F0F0F0',
        border: 'none',
        borderRadius: '10px',
        paddingLeft: '0.62rem',
        boxSizing: 'border-box',
        backgroundImage: `url(${url('img/cv/inputIcon.png')})`,
        backgroundSize: '0.32rem',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '0.2rem 50%',
        fontFamily: 'PingFangSC-Regular'
    },
    text: {
        fontSize: '0.28rem',
        color: '#333333'
    },
    touch: {
        fontFamily: 'PingFangSC-Regular',
        color: '#333333'
    }
};

class Input extends Component {
    other = {
        lastValLen: 0,
        forReqVal: '',
        isPaste: false
    };
    state = {
        inputVal: ''
    };
    componentDidMount() {
        this.refs.input.focus();
    }

    handleText(text) {
        let value = text.trim();
        value = value.replace(/([^\d\s]*)/g, '');
        this.other.forReqVal = value.replace(/ /g, '');
        if (this.other.forReqVal.length > 12) {
            this.other.forReqVal = value.replace(/ /g, '').substr(0, 12);
        }

        if (this.other.lastValLen < value.length || this.other.isPaste) {
            this.other.isPaste = false;
            value = this.other.forReqVal.replace(/(\d{4})/g, (...args) => {
                return `${args[1]} `;
            });

            if (this.other.forReqVal.length === 12) {
                value = value.slice(0, -1);
            }
        }

        this.other.lastValLen = value.length;

        this.setState(
            {
                inputVal: value
            },
            () => {
                this.other.forReqVal = this.state.inputVal;
            }
        );
    }

    bind(event) {
        this.handleText(event.target.value);
    }

    whenPaste() {
        this.other.isPaste = true;
    }

    clear() {
        this.setState(
            {
                inputVal: ''
            },
            () => {
                // 会导致数字键盘闪烁为全键盘，然后再闪烁回来，有时间去找原因
                // this.refs.input.focus();
            }
        );
    }
    interaction() {
        this.state.inputVal.length
            ? this.props.onConfirm.call(
                  null,
                  xss(this.other.forReqVal.replace(/ /g, ''))
              )
            : window.history.back();
    }

    render() {
        return (
            <div style={style.wrap}>
                <div style={style.inputBox}>
                    <input
                        type="text"
                        pattern="[0-9]*"
                        placeholder="输入点什么吧"
                        style={style.input}
                        value={this.state.inputVal}
                        onChange={this.bind.bind(this)}
                        ref="input"
                        onPaste={this.whenPaste.bind(this)}
                    />
                    {this.state.inputVal ? (
                        <div
                            style={style.clear}
                            onClick={this.clear.bind(this)}
                        />
                    ) : null}
                </div>

                <div
                    style={Object.assign(
                        {},
                        style.touch,
                        this.state.inputVal.length
                            ? {
                                  color: '#3DC6B6',
                                  fontFamily: 'PingFangSC-Semibold'
                              }
                            : {}
                    )}
                    onClick={this.interaction.bind(this)}
                >
                    {this.state.inputVal.length ? '搜索' : '取消'}
                </div>
            </div>
        );
    }
}

Input.propTypes = {
    onConfirm: React.PropTypes.func
};

export default Input;
