import styled, { keyframes, css } from 'styled-components';

// export const Title = styled.h1`
//     font-size: 24px;
//     color: ${props => (props.error ? 'red' : '#588C73')};
//     font-family: Arial, Helvetica, sans-serif;

//     small {
//         font-size: 14px;
//         color: #333
//     }
// `;

export const Form = styled.form`
    margin-top: 30px;
    display: flex;
    flex-direction: row;

    input {
        flex: 1;
        border: 1px solid ${(props) => (props.error ? '#ff6b6b' : '#eee')};
        padding: 10px 15px;
        border-radius: 4px;
        font-size: 16px;

        transition: border 0.25s ease-out;
    }
`;

export const Div = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;

    & + div {
        margin-top: 10px;
    }
`;

const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
`;

export const SubmitButton = styled.button.attrs((props) => ({
    type: 'submit',
    disabled: props.loading,
}))`
    background: #0f5959;
    border: 0;
    padding: 0 15px;
    margin-left: 10px;
    border-radius: 4px;

    display: flex;
    justify-content: center;
    align-items: center;

    &[disabled] {
        cursor: not-allowed;
        opacity: 0.6;
    }

    ${(props) =>
        props.loading &&
        css`
            svg {
                animation: ${rotate} 2s linear infinite;
            }
        `}
`;

export const List = styled.ul`
    list-style: none;
    margin-top: 30px;

    li {
        padding: 15px 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        //pegando todos li e pegando qq li que seja seguido por um li anterior - aplica estilizacao em todos icones menos no primeiro
        & + li {
            border-top: 1px solid #eee;
        }

        a {
            color: #0f5959;
            text-decoration: none;
        }
    }
`;
