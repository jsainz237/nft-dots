import { FC, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';

import { Section } from "./Section";

/** @ts-ignore */
import LargeDot from '../public/assets/large_dot.svg';
/** @ts-ignore */
import DotPlus from '../public/assets/plus.svg';


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

    type Props = { color: string; };

    export const Negative = styled.div<Props>`
        position: absolute;
        top: 0;
        right: -52%;
        height: 100%;
        width: 100%;
        transform: skewX(40deg);
        background: ${props => props.color};
        mix-blend-mode: difference;
    `;

    export const Title = styled.h1<Props>`
        color: ${props => props.color};
        font-size: 10rem;
        margin: 0;
    `;

    export const Subtitle = styled.p<Props>`
        color: ${props => props.color};
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
        transition: opacity 0.1s ease;
        
        &:hover {
            opacity: 0.7;
        }
    `;

    export const MintButton = styled.button<Props>`
        padding: 1rem 6rem;
        background: none;
        border-radius: 50px;
        border: ${props => `2px solid ${props.color}`};
    `;

    export const CounterContainer = styled.div`
        display: flex;
        width: 12%;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1rem;
    `;

    export const Counter = styled.h1<Props>`
        margin: 0;
        font-size: 2.5rem;
        color: ${props => props.color};
    `;
}

interface Props {
    color: string;
}

export const HomeSection: FC<Props> = ({ color }) => {
    const MINT_LIMIT = 10, MINT_MIN = 1;
    const [count, setCount] = useState<number>(MINT_MIN);

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
        <Styled.Header>
            <DotPlus
                color={color}
                height={homeIconSize}
                width={homeIconSize}
            />
            <Styled.Subtitle color={color}>INFO</Styled.Subtitle>
            <Styled.Subtitle color={color}>FAQ</Styled.Subtitle>
        </Styled.Header>
    );

    const renderTitle = () => (
        <Styled.TitleWrapper>
            <Styled.Title color={color}>D</Styled.Title>
            <LargeDot 
                height={dotSize}
                width={dotSize}
                color={color}
                style={{
                    margin: "2rem 0.25rem"
                }}
            />
            <Styled.Title color={color}>TS</Styled.Title>
            <Styled.Subtitle color={color} style={{
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
                    <FontAwesomeIcon size="2x" color={color} icon={faMinusCircle} />
                </Styled.ActionButton>
                <Styled.Counter color={color}>{count}</Styled.Counter>
                <Styled.ActionButton onClick={incrementCounter}>
                    <FontAwesomeIcon size="2x" color={color} icon={faPlusCircle} />
                </Styled.ActionButton>
            </Styled.CounterContainer>
            
            <Styled.MintButton color={color}>
                <Styled.Subtitle color={color}>Mint</Styled.Subtitle>
            </Styled.MintButton>
        </Styled.ActionWrapper>
    )

    return (
        <Styled.SectionContainer>
            <Styled.Negative color={color} />
            {renderHeader()}
            {renderTitle()}
            {renderMinting()}
        </Styled.SectionContainer>
    )
}