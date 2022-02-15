import { FC, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { Section } from './Section';

namespace Styled {
    export const CardTitle = styled.div<{ expanded?: boolean }>`
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.25rem;
        transition: color 0.3s ease;
                
        h3 {
            text-decoration: ${props => props.expanded && 'underline'};
            margin: 0;
        }
    `;
    
    export const Card = styled.button<{ maxHeight?: number; expanded?: boolean }>`
        background: none;
        text-align: left;
        width: 100%;
        padding: 1.5rem 2rem;
        border: 1px solid lightgray;
        box-shadow: 0px 2px 4px 0px lightgrey;
        border-radius: 0.25rem;
        max-height: ${props => props.expanded ? `${props.maxHeight ?? 200}px` : '82px'};
        overflow: hidden;
        transition: all 0.5s ease;
        margin-bottom: 1rem;

        &:hover {
            ${CardTitle} > h3 {
                text-decoration: underline;
            }
        }

        a {
            color: #3F84E5;
            &:hover {
                opacity: 0.7;
            }
        }

        p {
            max-width: 90%;
        }
    `;
}

export const FAQSection: FC = () => {
    const theme: any = useTheme();

    return (
        <Section style={{ background: theme.s3 }} withContainer>
            <h1 className='section-title'>FAQ</h1>
            <FAQCard title='How do I get DOTs?' maxHeight={500}>
                <p>
                    First you will need <a href='https://metamask.io'>MetaMask</a> intalled. Once Installed,
                    you will need to add the Binance Smart Chain (Mainnet) to you MetaMask networks.
                </p>
                <p><a href='https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain'>
                    Here's a step-by-step guide on how to do that.
                </a></p>
                <p>
                    Once that is all set up, you need Binance Coin (BNB). You can buy BNB on exchanges like <a href='https://binanace.com'>Binance</a> and
                    <a href='https://kucoin.com'> Kucoin</a>. Once you have bought some BNB in an exchange, you'll need to transfer some or all of that BNB 
                    from the exchange to your MetaMask Wallet. After that transaction finishes, you will be able to buy DOTs!
                </p>
                <p>
                    After that, just connect your address in MetaMask to this site and you can mint in the Minting Section.
                </p>
            </FAQCard>
            <FAQCard title='How do I Mint DOTs?' maxHeight={250}>
                <p>
                    To buy the NFT, sync your MetaMask wallet to this website. You'll then see a "Mint" button. You'll be able to 
                    choose how many DOTs you want to mint; up to 10 at a time. It will automatically introduce the amount 
                    you need to transfer in MetaMask. Add to that the amount of Gas you're willing to pay to the network, and you're ready to go.
                </p>
            </FAQCard>
            <FAQCard title='What are Gas fees?' maxHeight={350}>
                <p>
                    Gas is used to pay for transactions on the Binance smart blockchain. To mint your Simple Planet, you'll need some extra BNB in your wallet. 
                    Say a DOT costs 0.01 BNB to mint -- you'll need more than 0.01 BNB in your wallet to get a transaction accepted. Sadly, it's impossible to know how much more.
                    At the time of the transaction, your MetaMask wallet will recommend a Gas amount. To learn more about gas, visit
                    <a href="https://www.investopedia.com/terms/g/gas-ethereum.asp">investopedia.com.</a>
                </p>
                <p>
                    You can check out the <a href="https://bscscan.com/gastracker">BscScan Binance Smart Chain Gas Tracker</a> or similar sites to have an idea of Gas prices at 
                    the moment of your transaction.
                </p>
            </FAQCard>
            <FAQCard title='Beware of scammers!' maxHeight={400}>
                <p>
                    Never, ever, give anyone your private keys, pass phrases, recovery phrases, seed phrases or any other phrases. Don't click links you don't trust 100%. 
                    Don't download files at random. If you do, you can lose all your assets and nobody will be able to help you. 
                </p>
                <p>
                    One of the most common scams in the crypto space involves social engineering. Be super careful when people reach out to you on Discord or Twitter; 
                    they can try to impersonate people you know or public figures, or simply members of the team. Members of the team will never reach out to you via 
                    Direct/Private Messages, nor ask you for your personal information, your passwords, your phrases, or anything like that.
                </p>
            </FAQCard>
        </Section>
    )
}

const FAQCard: FC<{ title: string; maxHeight?: number }> = ({ title, maxHeight, children }) => {
    const [expanded, toggle] = useState<boolean>(false);

    const iconStyle: React.CSSProperties = {
        position: 'absolute',
        transition: 'all 0.3s ease',
    }

    const renderIcons = () => (
        <div style={{ position: "relative", height: 20, width: 20 }}>   
            <FontAwesomeIcon
                icon={faPlusCircle}
                style={{
                    ...iconStyle,
                    transform: expanded && 'rotate(90deg)',
                    opacity: expanded ? 0 : 1,
                }}
            />
            <FontAwesomeIcon
                icon={faMinusCircle}
                style={{
                    ...iconStyle,
                    transform: !expanded && 'rotate(-90deg)',
                    opacity: expanded ? 1 : 0,
                }}
            />
        </div>
    )

    return (
        <Styled.Card expanded={expanded} maxHeight={maxHeight} onClick={() => toggle(prev => !prev)}>
            <Styled.CardTitle expanded={expanded}>
                <h3>{title}</h3>
                { renderIcons() }
            </Styled.CardTitle>
            { children }
        </Styled.Card>
    )
}