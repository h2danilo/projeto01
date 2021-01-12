import React, { Component } from 'react';
import api from '../../services/api';
// import { Container } from './styles';

export default class Repository extends Component {
    constructor(props) {
        super(props);
        this.state = {
            repository: {},
            issues: [],
            loading: true,
        };
    }

    async componentDidMount() {
        const { match } = this.props;
        const repoName = decodeURIComponent(match.params.repository);

        const [repository, issues] = await Promise.all([
            api.get(`/repos/${repoName}`),
            api.get(`/repos/${repoName}/issues`, {
                params: {
                    state: 'open',
                    per_page: 5,
                },
            }),
        ]);

        this.setState({
            repository: repository.data,
            issues: issues.data,
            loading: false,
        });
    }

    render() {
        // eslint-disable-next-line no-unused-vars
        const { repository, issues, loading } = this.state;
        return <h1>Repositorio: </h1>;
    }
}