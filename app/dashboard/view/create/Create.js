import React, { Component } from 'react';

import './create.css';

import api from '../../api';
import i18n from '../../utils/i18n';
import Radio from '../../share/radio';
import Local from './local';
import Coding from './coding';
import Git from './git';
import { notify, NOTIFY_TYPE } from '../../../components/Notification/actions';

class Create extends Component {
    state = {
        projects: [],
        templates: [],
        envs: [],
        importFrom: 'coding',
    };

    render() {
        const { projects, templates, envs, importFrom } = this.state;
        return (
            <div className="dash-create">
                <div className="com-board">
                    <div className="board-label">{i18n('global.source')}*</div>
                    <div className="board-content radio">
                        <div className="radio-option" onClick={() => this.handleImportFrom('coding')}>
                            <Radio checked={importFrom === 'coding'} />
                            <span>{i18n('global.codingRepo')}</span>
                        </div>
                        <div className="radio-option" onClick={() => this.handleImportFrom('git')}>
                            <Radio checked={importFrom === 'git'} />
                            <span>{i18n('global.otherGitRepo')}</span>
                        </div>
                        <div className="radio-option" onClick={() => this.handleImportFrom('local')}>
                            <Radio checked={importFrom === 'local'} />
                            <span>{i18n('global.noRemoteRepo')}</span>
                        </div>
                    </div>
                </div>
                {importFrom === 'local' && <Local templates={templates} />}
                {importFrom === 'coding' && <Coding projects={projects} templates={templates} envs={envs} fetchCodingProject={this.fetchCodingProject} />}
                {importFrom === 'git' && <Git envs={envs} />}
            </div>
        );
    }

    componentDidMount() {
        this.fetchCodingProject();
        this.fetchTemplateProject();
        this.fetchEnvList();
    }

    fetchCodingProject = () => {
        api.getCodingProject().then(res => {
            if (res.code === 0) {
                this.setState({ projects: res.data });
            } else if (res.code === 401) {
                window.top.postMessage({ path: '/intro' }, '*');
                window.location.href = '/intro';
            } else {
                notify({ notifyType: NOTIFY_TYPE.ERROR, message: res.msg });
            }
        }).catch(err => {
            notify({ notifyType: NOTIFY_TYPE.ERROR, message: err });
        });
    }

    fetchTemplateProject = () => {
        api.getTemplateProject().then(res => {
            if (res.code === 0) {
                this.setState({ templates: res.data });
            } else if (res.code === 401) {
                window.top.postMessage({ path: '/intro' }, '*');
                window.location.href = '/intro';
            } else {
                notify({ notifyType: NOTIFY_TYPE.ERROR, message: res.msg });
            }
        }).catch(err => {
            notify({ notifyType: NOTIFY_TYPE.ERROR, message: err });
        });
    }

    fetchEnvList = () => {
        api.getEnvList().then(res => {
            if (Array.isArray(res)) {
                this.setState({ envs: res });
            } else if (res.code === 401) {
                window.top.postMessage({ path: '/intro' }, '*');
                window.location.href = '/intro';
            } else {
                notify({ notifyType: NOTIFY_TYPE.ERROR, message: res.msg });
            }
        }).catch(err => {
            notify({ notifyType: NOTIFY_TYPE.ERROR, message: err });
        });
    }

    handleImportFrom = (source) => {
        this.setState({ importFrom: source });
    }
}

export default Create;