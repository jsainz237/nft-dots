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

    export const TitleWrapper = styled.div`
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: flex-end;
        margin-bottom: 8rem;
    `;

    export const Negative = styled.div`
        position: absolute;
        pointer-events: none;
        top: 0;
        right: -52%;
        height: 100%;
        width: 100%;
        transform: skewX(40deg);
        background: ${props => props.theme.s0};
        mix-blend-mode: difference;
    `;

    export const Title = styled.h1`
        color: ${props => props.theme.s0};
        font-size: 10rem;
        margin: 0;
    `;

    export const Subtitle = styled.p`
        color: ${props => props.theme.s0};
        font-size: 1.5rem;
        margin: 0;
    `;

    export const Header = styled.header`
        display: flex;

        *:not(:last-child) {
            margin-right: 2rem;
        }
    `;

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
        
        &:hover {
            opacity: 0.7;
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
        width: 12%;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1rem;
    `;

    export const Counter = styled.h1`
        margin: 0;
        font-size: 2.5rem;
        color: ${props => props.theme.s0};
    `;
}

export const HomeSection: FC = () => {
    const MINT_LIMIT = 10, MINT_MIN = 1;
    const [count, setCount] = useState<number>(MINT_MIN);
    const theme: any = useTheme();

    const homeIconSize = "2rem";
    const dotSize = "7.5rem";

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
                <Styled.Subtitle>INFO</Styled.Subtitle>
                <Styled.Subtitle>FAQ</Styled.Subtitle>
            </Styled.Header>
            <WalletButton/>
        </div>
    );

    const renderTitle = () => (
        <Styled.TitleWrapper>
            <Styled.Title>D</Styled.Title>
            <LargeDot 
                height={dotSize}
                width={dotSize}
                color={theme.s0}
                style={{
                    margin: "2rem 0.25rem"
                }}
            />
            <Styled.Title>TS</Styled.Title>
            <Styled.Subtitle style={{
                marginBottom: '2rem',
                marginLeft: '0.5rem',
                fontSize: '2.2rem',
            }}>
                (NFTs)
            </Styled.Subtitle>
        </Styled.TitleWrapper>
    );

    const renderMinting = () => (
        <Styled.ActionWrapper>
            <Styled.CounterContainer>
                <Styled.ActionButton onClick={decrementCounter}>
                    <FontAwesomeIcon color={theme.s0} size="2x" icon={faMinusCircle} />
                </Styled.ActionButton>
                <Styled.Counter>{count}</Styled.Counter>
                <Styled.ActionButton onClick={incrementCounter}>
                    <FontAwesomeIcon color={theme.s0} size="2x" icon={faPlusCircle} />
                </Styled.ActionButton>
            </Styled.CounterContainer>
            
            <Styled.MintButton>
                Mint
            </Styled.MintButton>
        </Styled.ActionWrapper>
    )

    return (
        <Styled.SectionContainer>
            <Styled.Negative />
            {renderHeader()}
            {renderTitle()}
            {renderMinting()}
        </Styled.SectionContainer>
    )
}