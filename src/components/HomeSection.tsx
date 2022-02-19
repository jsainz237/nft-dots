import { FC, useState } from "react";
import styled, { useTheme } from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';

import { Section } from "./Section";
import { WalletButton } from "./WalletButton";

/** @ts-ignore */
import LargeDot from '../../public/assets/large_dot.svg';
/** @ts-ignore */
import DotPlus from '../../public/assets/plus.svg';

namespace Styled {
    export const SectionContainer = styled(Section)`
        position: relative;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        overflow: hidden;
    `;

    export namespace Title {
        export const Wrapper = styled.div`
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: flex-end;
            margin-bottom: 8rem;
        `;

        export const Dot = styled.div`
            position: relative;
            height: 7.5rem;
            width: 7.5rem;
            margin: 0;
            border-radius: 100px;
            background: ${props => props.theme.s0};
            
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
                font-size: 0.875rem;
                margin-bottom: 1rem;
            }
        `;
    }

    export const Negative = styled.div`
        position: absolute;
        top: calc(-100vh + 50%);
        left: calc(-100vw + 50%);
        pointer-events: none;
        height: 200vh;
        width: 200vw;
        mix-blend-mode: difference;
        background-color: ${props => props.theme.s0};
        background: ${({ theme }) => {
            const stop = 50;
            return `linear-gradient(
                45deg,
                ${theme.s0} 0%,
                ${theme.s0} ${stop}%,
                black ${stop}%,
                black 100%
            )`
        }};
    `;

    export const Header = styled.header`
        display: flex;

        @media screen and (max-width: 720px) {
            display: none;
        }

        *:not(:last-child) {
            margin-right: 2rem;
        }
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
            background: none;
            border: none;
            cursor: pointer;
            transition: opacity 0.2s ease;
            font-size: 2rem;
            
            &:hover {
                opacity: 0.7;
            }

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

export const HomeSection: FC = () => {    
    const MINT_LIMIT = 10, MINT_MIN = 1;
    const [count, setCount] = useState<number>(MINT_MIN);
    const theme: any = useTheme();

    const readyToMint = process.env.NEXT_PUBLIC_IS_READY === 'true';

    const homeIconSize = "2rem";
    const dotSize = 120;

    const incrementCounter = () => {
        if(count < MINT_LIMIT) {
            setCount(prev => prev + 1);
        }
    }

    const decrementCounter = () => {
        if(count > MINT_MIN) {
            setCount(prev => prev - 1);
        }
    }

    const renderHeader = () => (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Styled.Header>
                <DotPlus
                    color={theme.s0}
                    height={homeIconSize}
                    width={homeIconSize}
                />
                <Styled.Title.Subtitle>INFO</Styled.Title.Subtitle>
                <Styled.Title.Subtitle>FAQ</Styled.Title.Subtitle>
            </Styled.Header>
            <WalletButton/>
        </div>
    );

    const renderTitle = () => (
        <Styled.Title.Wrapper>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Styled.Title.Text>D</Styled.Title.Text>
                <Styled.Title.Dot>
                    <Styled.Negative />
                </Styled.Title.Dot>
                <Styled.Title.Text>TS</Styled.Title.Text>
            </div>
            <Styled.Title.Subtitle>
                (NFTs)
            </Styled.Title.Subtitle>
        </Styled.Title.Wrapper>
    );

    const renderMinting = () => (
        <Styled.Minting.ActionWrapper>
            <Styled.Minting.CounterContainer>
                <Styled.Minting.ActionButton onClick={decrementCounter}>
                    <FontAwesomeIcon color={theme.s0} icon={faMinusCircle} />
                </Styled.Minting.ActionButton>
                <Styled.Minting.Counter>{count}</Styled.Minting.Counter>
                <Styled.Minting.ActionButton onClick={incrementCounter}>
                    <FontAwesomeIcon color={theme.s0} icon={faPlusCircle} />
                </Styled.Minting.ActionButton>
            </Styled.Minting.CounterContainer>
            
            <Styled.Minting.MintButton disabled={!readyToMint}>
                { readyToMint ? 'Mint' : 'Not available' }
            </Styled.Minting.MintButton>
            <Styled.Minting.Price style={{ color: theme.s0 }}>
                ( {process.env.NEXT_PUBLIC_PRICE_IN_BNB} BNB each )
            </Styled.Minting.Price>
        </Styled.Minting.ActionWrapper>
    )

    return (
        <Styled.SectionContainer>
            {renderHeader()}
            {renderTitle()}
            {renderMinting()}
        </Styled.SectionContainer>
    )
}