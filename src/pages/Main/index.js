/* eslint-disable no-debugger */
import React, { Component } from 'react';

import { FaGithubAlt, FaPlus, FaSpinner, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';

import api from '../../services/api';

import Container from '../../components/container';
import { Form, SubmitButton, List, Div, ButtonTable } from './styles';

// export default function Main() {
//     return (
//         <Title error={false}>
//             Main
//             <small>Menor</small>
//         </Title>
//     );
// }
export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newRepo: '',
            repositories: [],
            loading: false,
            loadingDel: false,
            error: null,
            msgError: '',
        };
    }

    // Carregar os dados do localStorage
    componentDidMount() {
        const repositories = localStorage.getItem('repositories');

        if (repositories) {
            this.setState({ repositories: JSON.parse(repositories) });
        }
    }

    // salvar os dados do localStorage
    componentDidUpdate(_, prevState) {
        const { repositories } = this.state;

        if (prevState.repositories !== repositories) {
            localStorage.setItem('repositories', JSON.stringify(repositories));
        }
    }

    handleInputChange = (e) => {
        this.setState({ newRepo: e.target.value, error: null, msgError: '' });
    };

    handleDelete = async (e) => {
        const { repositories } = this.state;

        this.setState({
            loadingDel: true,
        });

        setTimeout(() => {
            this.setState({
                repositories: repositories.filter((t) => t.name !== e.name),
                loadingDel: false,
            });
        }, 1000);
    };

    handleSubmit = async (e) => {
        e.preventDefault();

        this.setState({ loading: true, error: false });

        try {
            const { newRepo, repositories } = this.state;

            debugger;
            if (newRepo === '') {
                throw new Error('Você precisa indicar um repositório');
            }

            const hasRepo = repositories.find((r) => r.name === newRepo);

            if (hasRepo) throw new Error('Repositório duplicado');

            const response = await api.get(`/repos/${newRepo}`);

            const data = {
                name: response.data.full_name,
            };

            this.setState({
                repositories: [...repositories, data],
                newRepo: '',
            });
        } catch (error) {
            this.setState({ error: true, msgError: error.message });
        } finally {
            this.setState({ loading: false });
        }
    };

    render() {
        const {
            newRepo,
            repositories,
            loading,
            error,
            msgError,
            loadingDel,
        } = this.state;

        return (
            <Container>
                <h1>
                    <FaGithubAlt />
                    Repositórios
                </h1>

                <Div>
                    <Form onSubmit={this.handleSubmit} error={error}>
                        <input
                            type="text"
                            placeholder="Adicionar Repositório"
                            value={newRepo}
                            onChange={this.handleInputChange}
                        />
                        <SubmitButton loading={loading}>
                            {loading ? (
                                <FaSpinner color="#FFF" size={14} />
                            ) : (
                                <FaPlus color="#FFF" size={14} />
                            )}
                        </SubmitButton>
                    </Form>
                </Div>
                <Div>{error && <Alert severity="error">{msgError}</Alert>}</Div>

                <List>
                    {repositories.map((repository) => (
                        <li key={repository.name}>
                            <span>{repository.name}</span>
                            <ButtonTable
                                loading={loadingDel}
                                onClick={() => this.handleDelete(repository)}
                            >
                                {loadingDel ? (
                                    <FaSpinner color="#FFF" size={18} />
                                ) : (
                                    <FaTrash color="#FFF" size={18} />
                                )}
                            </ButtonTable>
                            {/* <button
                                type="button"
                                onClick={() => this.handleDelete(repository)}
                            >
                                <FaTrash color="#FFF" size={18} />
                            </button> */}
                            <Link
                                to={`/repository/${encodeURIComponent(
                                    repository.name
                                )}`}
                            >
                                Detalhes
                            </Link>
                        </li>
                    ))}
                </List>
            </Container>
        );
    }
}
