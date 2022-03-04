import { FC, useEffect, useState } from "react";
import { useTheme } from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { ethers } from 'ethers';

import { selectWallet } from '../../state/slices/wallet.state';
import { WalletButton } from "./WalletButton";
import { Styled } from './styles';
import { useAppSelector } from "../../state/hooks";
import Dots from '../../artifacts/contracts/Dot.sol/Dot.json';

const MINT_LIMIT = 10, MINT_MIN = 1;

export const HomeSection: FC = () => {
    const walletAddress = useAppSelector(selectWallet);

    const [isLoading, setLoading] = useState<boolean>(false);
    const [mintCount, setMintCount] = useState<number>(MINT_MIN);

    const [isDotLegendary, setDotRarity] = useState<boolean>(false);
    const [isNegLegendary, setNEgRarity] = useState<boolean>(false);
    const theme: any = useTheme();

    const readyToMint = process.env.NEXT_PUBLIC_IS_READY === 'true';
    
    useEffect(() => {
        setDotRarity(Math.floor(Math.random() * (100 + 1)) <= 3);
        setNEgRarity(Math.floor(Math.random() * (100 + 1)) <= 3);
    }, []);

    const incrementCounter = () => {
        if(mintCount < MINT_LIMIT) {
            setMintCount(prev => prev + 1);
        }
    }

    const decrementCounter = () => {
        if(mintCount > MINT_MIN) {
            setMintCount(prev => prev - 1);
        }
    }

    const mintDot = async () => {
        const totalCost = mintCount * parseFloat(process.env.NEXT_PUBLIC_COST);
        setLoading(true);
        try {
            // @ts-ignore
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
                Dots.abi,
                signer
            );

            const transaction = await contract.payToMint(
                mintCount,
                { value: ethers.utils.parseEther(totalCost.toString()) }
            );
            await transaction.wait();

            alert(`Successfully Minted ${mintCount} Dots!`);
        } catch(err) {
            // skip if user declined transaction
            if(!err.data && err.message?.includes('User denied transaction signature.')) {
                return;
            }

            let message: string;

            if(err.data?.message.includes('Not enough ether provided')) {
                message = "Not enough BNB provided";
            }
            else if(err.data?.message.includes('Must mint at least one')) {
                message = "Must mint at lease one DOT";
            }
            else if(err.data?.message.includes('Cannot mint more than 10')) {
                message = "Cannot mint more than 10";
            }
            else if(err.data?.message.includes('Minting would exceed supply')) {
                message = "Minting would exceed supply";
            }
            else if (err.data?.message?.includes('insufficient funds')) {
                message = 'Insufficient funds';
            }
            else if (err.data?.message?.includes('paused')) {
                message = 'Currently Paused';
            }
            else {
                message = "Unknown error";
            }

            alert(`ERROR: ${message}`);
        } finally {
            setLoading(false);
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
                <Styled.Minting.Counter>{mintCount}</Styled.Minting.Counter>
                <Styled.Minting.ActionButton onClick={incrementCounter}>
                    <FontAwesomeIcon icon={faPlusCircle} />
                </Styled.Minting.ActionButton>
            </Styled.Minting.CounterContainer>
            
            <Styled.Minting.MintButton onClick={mintDot} disabled={!readyToMint || !walletAddress}>
                {
                    !readyToMint 
                    ? 'Not available'
                    : !walletAddress
                    ? 'No wallet connected'
                    : isLoading
                    ? 'Loading...'
                    : 'Mint'
                }
            </Styled.Minting.MintButton>
            <Styled.Minting.Price style={{ color: theme.s0 }}>
                ( {process.env.NEXT_PUBLIC_COST} BNB each )
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