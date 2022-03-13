import { ethers, BigNumber } from "ethers";
import { FC, useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons';
import NextLink from "next/link";
import { Row, Col as RBCol } from 'react-bootstrap';
import styled from 'styled-components';

import Dots from '../artifacts/contracts/Dot.sol/Dot.json';
import { Section } from "../components/Section";
import { DotImage } from "../components/DotImage";

namespace Styled {
    export const SectionContainer = styled(Section)`
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        overflow: hidden;
        padding-left: 1rem;
        padding-right: 1rem;
        color: ${({ theme }) => theme.s0};
        background: linear-gradient(135deg, #0a0a0a 50%, #141414 50%);

        h1 { margin: 0; }
    `;

    export const TitleBar = styled.div`
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;

        *:first-child {
            margin-right: 0.5rem;
        }
    `;

    export const Link = styled.a`
        cursor: pointer;
        &:hover {
            color: ${({ theme }) => theme.s0} !important;
            opacity: 0.5;
        }
    `;

    export const Col = styled(RBCol)`
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 1.5rem;
    `;
}

const MyDots: FC = () => {
    const [nfts, setNfts] = useState<number[]>();

    useEffect(() => {
        getMyDots();
    }, []);

    const getMyDots = async () => {
        try {
            // @ts-ignore
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
                Dots.abi,
                signer
            );

            const balance: BigNumber = await contract.balanceOf(await signer.getAddress());
            const tokenIds: number[] = [];
            for(let i = 0; i < balance.toNumber(); i++) {
                const tokenId: BigNumber = await contract.tokenOfOwnerByIndex(signer.getAddress(), i);
                tokenIds.push(tokenId.toNumber());
            }
            setNfts(tokenIds);

        } catch(err) {
            console.error(err.message);
            alert(`ERROR: Something went wrong.`);
        }
    }
    
    return (
        <Styled.SectionContainer sectionId="my-dots" style={{ overflow: 'auto' }} withContainer>
            <Styled.TitleBar>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <NextLink href="/">
                        <Styled.Link><FontAwesomeIcon size="lg" icon={faAnglesLeft} /></Styled.Link>
                    </NextLink>
                    <h1 className='section-title'>My DOTs</h1>
                </div>
                <p style={{ margin: '0 1.5rem 0 0' }}>({ nfts?.length ?? 0 })</p>
            </Styled.TitleBar>
            <div style={{ overflow: 'auto' }}>
                <Row xs={1} sm={2} lg={3} style={{ width: '100%' }}>
                    {nfts && nfts.map(nftId => (
                        <Styled.Col key={nftId}>
                            <DotImage nftId={nftId} />
                        </Styled.Col>
                    ))}
                </Row>
            </div>
        </Styled.SectionContainer>
    );
}

export default MyDots;