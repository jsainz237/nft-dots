import styled from 'styled-components';
import { Section } from '../Section';

export namespace Styled {
    export const SectionContainer = styled(Section)`
        position: relative;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        overflow: hidden;
        padding-left: 1rem;
        padding-right: 1rem;
    `;

    export namespace Title {
        export const Wrapper = styled.div`
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: flex-end;
            margin-bottom: 8rem;
            margin-top: 7rem;
        `;

        export const Dot = styled.div<{ legendary?: boolean }>`
            position: relative;
            height: 7.5rem;
            width: 7.5rem;
            margin: 0;
            border-radius: 100px;
            ${props => {
                return props.legendary ? `
                    border: 4px solid ${props.theme.s0};
                ` : `
                    background: ${props.theme.s0};
                `
            }}
            
            @media screen and (max-width: 720px) {
                height: 4rem;
                width: 4rem;
            }
        `;

        export const Text = styled.h1`
            color: ${props => props.theme.s0};
            font-size: 10rem;
            margin: 0;

            @media screen and (max-width: 720px) {
                font-size: 5rem;
            }
        `;

        export const Subtitle = styled.p`
            color: ${props => props.theme.s0};
            font-size: 2.2rem;
            margin-bottom: 2rem;
            margin-left: 0.5rem;
            
            @media screen and (max-width: 720px) {
                font-size: 1rem;
                margin-bottom: 1rem;
            }
        `;
    }

    export const Negative = styled.div<{ legendary?: boolean }>`
        position: absolute;
        top: calc(-100vh + 50%);
        left: calc(-100vw + 50%);
        pointer-events: none;
        height: 200vh;
        width: 200vw;
        mix-blend-mode: difference;
        background-color: ${props => props.theme.s0};
        background-blend-mode: difference;
        z-index: 100;
        background: ${({ legendary, theme }) => {
            const stop = 50;
            return legendary ? theme.s0 : `linear-gradient(
                45deg,
                ${theme.s0} 0%,
                ${theme.s0} ${stop}%,
                black ${stop}%,
                black 100%
            )`
        }};
    `;

    export namespace Minting {
        export const ActionWrapper = styled.div`
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-bottom: 6rem;
        `;

        export const ActionButton = styled.button`
            padding: 0;
            margin: 0;
            color: ${props => props.theme.s0};
            background: none;
            border: none;
            cursor: pointer;
            font-size: 2rem;

            @media screen and (max-width: 720px) {
                font-size: 1.5rem;
            }
        `;

        export const MintButton = styled.button`
            padding: 1rem 6rem;
            background: none;
            border-radius: 50px;
            color: ${props => props.theme.s0};
            border: ${props => `2px solid ${props.theme.s0}`};
            cursor: pointer;
            font-size: 1.5rem;
            transition: all 0.2s ease;

            @media screen and (max-width: 720px) {
                font-size: 1rem;
                padding: 1rem 3rem;
            }

            &:hover:not(:disabled) {
                background: ${props => props.theme.s0};
                color: black;
            }

            &:disabled {
                cursor: not-allowed;
            }
        `;

        export const CounterContainer = styled.div`
            display: flex;
            width: 198px;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 1rem;

            @media screen and (max-width: 720px) {
                width: 124px;
            }
        `;

        export const Counter = styled.h1`
            margin: 0;
            font-size: 2.5rem;
            color: ${props => props.theme.s0};

            @media screen and (max-width: 720px) {
                font-size: 1.5rem;
            }
        `;

        export const Price = styled.p`
            color: ${props => props.theme.s0};
            margin-top: 1rem;
        `;
    }
}