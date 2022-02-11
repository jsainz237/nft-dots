import { FC, useEffect, useRef, useState } from "react";
import styled from 'styled-components';
import MetaMaskOnboarding from '@metamask/onboarding';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { ethers } from 'ethers';

type Props = { color: string; }

namespace Styled {
    export const Container = styled.div`
        position: relative;
    `;

    export const WalletButton = styled.button<Props>`
        border: 2px solid ${props => props.color};
        color: ${props => props.color};
        font-size: 1rem;
        padding: 0.25rem 1rem;
        display: flex;
        align-items: center;
        background: none;
        border-radius: 50px;
        mix-blend-mode: difference;
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover:not(:disabled) {
            background: ${props => props.color};
            color: black;
        }

        &:disabled {
            cursor: not-allowed;
        }
    `;

    export const Dropdown = styled.div<{ color: string, visible?: boolean }>`
        position: absolute;
        right: 0;
        top: 110%;
        display: flex;
        flex-direction: column;
        background-color: white;
        color: black;
        width: 16rem;
        border-radius: 0.75rem;
        overflow: hidden;
        padding: 0.25rem 0;
        box-shadow: 0 3px 6px 0px #00000052;
        visibility: ${props => props.visible ? 'visible' : 'hidden'};

        & > * {
            background: none;
            border: none;
            font-size: 1rem;
            text-align: left;
            padding: 0.5rem 1.5rem;
            cursor: pointer;

            &:hover {
                background: #e4e4e4;
            }

            &:active {
                transform: translateY(1px);
            }
        }
    `;
}

export const WalletButton: FC<Props> = ({ color }) => {
    const [showDropdown, setshowDropdown] = useState<boolean>(false);
    const dropdownRef = useRef();
    const walletButtonRef = useRef();

    const [metaMask, setMetaMask] = useState<boolean>();
    const [walletAddress, setWalletAddress] = useState<string>();
    const [isOnboarding, setIsOnboarding] = useState<boolean>();
    const [connectedToBSC, setConnectedToBSC] = useState<boolean>();
    
    useEffect(() => {
        async function connect() {
            if(isMetamaskInstalled()) {
                await setConnectedAccount();
            }
        }
        connect();
    }, []);

    useEffect(() => {
        window.addEventListener('click', (e) => {
            if(
                e.target !== dropdownRef.current &&
                e.target !== walletButtonRef.current
            ) {
                setshowDropdown(false);
            }
        });
    }, []);

    //Created check function to see if the MetaMask extension is installed
    const isMetamaskInstalled = () => {
        //Have to check the ethereum binding on the window object to see if it's installed
        const { ethereum } = window as any;
        const isInstalled = Boolean(ethereum && ethereum.isMetaMask)
        setMetaMask(isInstalled);
        return isInstalled;
    };

    const installMetamask = () => {
        const onboarding = new MetaMaskOnboarding({ forwarderOrigin: process.env.CALLBACK_URL });
        setIsOnboarding(true);
        onboarding.startOnboarding();
    }

    const connectWallet = async () => {
        try {
            // Will open the MetaMask UI
            // You should disable this button while the request is pending!
            // @ts-ignore
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const address = accounts[0];

            if(address) {
                setWalletAddress(address);
            } else {
                throw new Error('Could not get wallet address');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const setConnectedAccount = async () => {
        try {
            // @ts-ignore
            const provider = new ethers.providers.Web3Provider(window.ethereum);            
            const connectedNetwork = await provider.getNetwork();
            if(connectedNetwork.chainId !== 56) {
                setConnectedToBSC(false);
                return;
            } else {
                setConnectedToBSC(true);
            }

            const signer = provider.getSigner();
            const address = await signer.getAddress();

            if(address) {
                setWalletAddress(address);
            }
        } catch {
            setWalletAddress(undefined);
        }
    }

    const disconnectWallet = async () => {
        setWalletAddress(undefined);
    }

    const renderMessage = () => {
        return walletAddress
            ? `0x...${walletAddress.slice(-4)}`
            : !connectedToBSC
            ? 'Connect to BSC'
            : isOnboarding
            ? 'Install in progress'
            : metaMask
            ? 'Connect wallet'
            : 'Install MetaMask';
    }

    const onClick = () => {
        if(walletAddress) {
            setshowDropdown(prev => !prev);
            return;
        }

        metaMask ? connectWallet() : installMetamask();
    }

    return (
        <Styled.Container>
            <Styled.WalletButton
                ref={walletButtonRef}
                color={color}
                disabled={isOnboarding}
                onClick={onClick}
            >
                {walletAddress && <FontAwesomeIcon style={{ marginRight: 12 }} icon={faWallet} />}
                {renderMessage()}
                {walletAddress && <FontAwesomeIcon size="xs" style={{ marginLeft: 8 }} icon={faChevronDown} />}
            </Styled.WalletButton>
            <Styled.Dropdown ref={dropdownRef} visible={showDropdown} color={color}>
                <button onClick={disconnectWallet} style={{ color: 'red' }}>Disconnect</button>
                <button>My DOTS</button>
            </Styled.Dropdown>
        </Styled.Container>
    )
}