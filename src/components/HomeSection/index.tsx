import { FC, useEffect, useMemo, useState } from "react";
import { useTheme } from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';

import { selectWallet } from '../../state/slices/wallet.state';
import { WalletButton } from "./WalletButton";
import { Styled } from './styles';
import { useAppSelector } from "../../state/hooks";

const MINT_LIMIT = 10, MINT_MIN = 1;

export const HomeSection: FC = () => {
    const walletAddress = useAppSelector(selectWallet)
    const [count, setCount] = useState<number>(MINT_MIN);
    const [isDotLegendary, setDotRarity] = useState<boolean>(false);
    const [isNegLegendary, setNEgRarity] = useState<boolean>(false);
    const theme: any = useTheme();

    const readyToMint = process.env.NEXT_PUBLIC_IS_READY === 'true';
    
    useEffect(() => {
        setDotRarity(Math.floor(Math.random() * (100 + 1)) <= 3);
        setNEgRarity(Math.floor(Math.random() * (100 + 1)) <= 3);
    }, []);

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
        <Styled.Header.Wrapper>
            <Styled.Header.Nav>
                <a href="#mint"><Styled.Header.HomeIcon /></a>
                <Styled.Header.Link href="#info">Info</Styled.Header.Link>
                <Styled.Header.Link href="#preview">Preview</Styled.Header.Link>
                <Styled.Header.Link href="#invest">Invest</Styled.Header.Link>
                <Styled.Header.Link href="#faq">FAQ</Styled.Header.Link>
            </Styled.Header.Nav>
            <WalletButton/>
        </Styled.Header.Wrapper>
    );

    const renderTitle = () => (
        <Styled.Title.Wrapper>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Styled.Title.Text>D</Styled.Title.Text>
                <Styled.Title.Dot legendary={isDotLegendary}>
                    <Styled.Negative legendary={isNegLegendary} />
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
                    <FontAwesomeIcon icon={faMinusCircle} />
                </Styled.Minting.ActionButton>
                <Styled.Minting.Counter>{count}</Styled.Minting.Counter>
                <Styled.Minting.ActionButton onClick={incrementCounter}>
                    <FontAwesomeIcon icon={faPlusCircle} />
                </Styled.Minting.ActionButton>
            </Styled.Minting.CounterContainer>
            
            <Styled.Minting.MintButton disabled={!readyToMint || !walletAddress}>
                { 
                    !readyToMint 
                    ? 'Not available'
                    : !walletAddress
                    ? 'No wallet connected'
                    : 'Mint'
                }
            </Styled.Minting.MintButton>
            <Styled.Minting.Price style={{ color: theme.s0 }}>
                ( {process.env.NEXT_PUBLIC_PRICE_IN_BNB} BNB each )
            </Styled.Minting.Price>
        </Styled.Minting.ActionWrapper>
    )

    return (
        <Styled.SectionContainer sectionId="mint" style={{ paddingTop: '1.25rem' }}>
            {renderHeader()}
            {renderTitle()}
            {renderMinting()}
        </Styled.SectionContainer>
    )
}