import React, { Component } from 'react';
import { connect } from 'react-redux';

import './config.css';

import i18n from '../../utils/i18n';
import Radio from '../../share/radio';
import SSH from '../../share/ssh';

class Config extends Component {
    render() {
        const { switchLanguageToEn, switchLanguageToZh, language } = this.props;
        return (
            <div className="dash-config">
                <div className="com-board">
                    <div className="board-label">{i18n('global.language')}</div>
                    <div className="board-content radio">
                        <div className="radio-option" onClick={switchLanguageToZh}>
                            <Radio checked={language === 'zh_CN'} />
                            <span>简体中文</span>
                        </div>
                        <div className="radio-option" onClick={switchLanguageToEn}>
                            <Radio checked={language === 'en_US'} />
                            <span>English</span>
                        </div>
                    </div>
                </div>
                <div className="com-board">
                    <div className="board-label">
                        {i18n('global.sshPublicKey')}
                        <a href="https://coding.net/help/faq/git/git.html#_SSH_Key" target="_blank" rel="noopener noreferrer">
                            <i className="fa fa-question-circle"></i>
                        </a>
                    </div>
                    <div className="board-content">
                        <SSH />
                    </div>
                </div>
            </div>
        );
    }
}

const mapState = (state) => {
    return {
        language: state.language,
    };
}

const mapDispatch = (dispatch) => {
    return {
        switchLanguageToEn: () => {
            localStorage.setItem('cloudstudio-dashboard-language', 'en_US');
            dispatch({ type: 'SWITCH_LANGUAGE_TO_EN' });
        },
        switchLanguageToZh: () => {
            localStorage.setItem('cloudstudio-dashboard-language', 'zh_CN');
            dispatch({ type: 'SWITCH_LANGUAGE_TO_ZH' })
        },
    };
}

export default connect(mapState, mapDispatch)(Config);