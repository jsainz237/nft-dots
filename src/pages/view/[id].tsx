import { useEffect, useState } from "react";
import { NextPage, NextPageContext } from "next";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon as FAIcon} from '@fortawesome/react-fontawesome';
import { faList, faUser, faInfo, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { ethers } from 'ethers';

import { Section } from '../../components/Section';
import { Metadata, properties, Rarity } from "../../utils/properties";
import { DotImage } from "../../components/DotImage";
import Dots from '../../artifacts/contracts/Dot.sol/Dot.json';

namespace Styled {
    export const FlexColumn = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    `;

    export const PropertyContainer = styled.div`
        flex: 1;
        background: #ebebeb;
        border: 1px solid darkgray;
        border-radius: 0.25rem;
        width: 100%;
        color: #5a5a5a;
        margin-top: 4rem;
        overflow: hidden;
        
        .attribute-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            padding: 1rem;

            h5, h6 {
                margin: 0;
            }

            &.header {
                color: #0a0a0a;
                background: white;
                border: none;
                border-bottom: 1px solid darkgray;
            }

            .rarity {
                font-size: smaller;
                margin-left: 0.5rem;
            }

            @media screen and (max-width: 576px) {
                .rarity, .trait {
                    display: none;
                }

                .rarity.long {
                    display: none;
                }

                .rarity.short {
                    display: inline;
                }
            }

            @media screen and (min-width: 577px) {
                .rarity.short {
                    display: none;
                }
            }
        }
    `;

    export const ImageWrapper = styled(Col)`
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    `;

    export const RightContainer = styled(Col)`
        display: flex;
        flex-direction: column;
        color: lightgray;
    `;

    export const CodeText = styled.span`
        font-family: monospace;
        white-space: pre;
    `;
}

interface Props {
    metadata: Metadata;
}

const DotViewer: NextPage<Props> = ({ metadata }) => {
    const [owner, setOwner] = useState<string>();

    useEffect(() => {
        getOwner();
    }, []);

    const getOwner = async () => {
        try {
            // @ts-ignore
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
                Dots.abi,
                signer
            );

            const owner = await contract.ownerOf(metadata.id);
            setOwner(owner);
        } catch(err) {
            if(!err.data?.message.includes('nonexistent token')) {
                console.error(err);
                alert("ERROR: something went wrong");
            }
        }
    };

    const renderDetails = () => (
        <div>
            <h2 className="mt-4 mt-md-0">Dot ID: #{metadata.id}</h2>
            <h6>
                <FAIcon icon={faUser} style={{ marginRight: 8 }} />
                { 
                    owner 
                    ? `owned by: ${owner.slice(-5)}` 
                    : 'not owned'
                }
            </h6>
            <h6>
                <FAIcon icon={faCircleInfo} style={{ marginRight: 8 }} />
                datacode: <Styled.CodeText>{metadata.datacode}</Styled.CodeText>
            </h6>
        </div>
    )


    const renderProperties = () => (
        <Styled.PropertyContainer>
            <div className="attribute-bar header">
                <h5><span><FAIcon icon={faList} /></span> Properties</h5>
            </div>
            { metadata.attributes.map(({ trait_type, value }) => (
                <div className="attribute-bar">
                    <h6 className="trait">{trait_type ?? 'property'}</h6>
                    <h6 className="value">
                        {value.replace('-', '_')}
                        <span className="rarity long">
                            ({Rarity[properties[value]]})
                        </span>
                        <span className="rarity short">
                            ({Rarity[properties[value]][0]})
                        </span>
                    </h6>
                </div>
            ))}
        </Styled.PropertyContainer>
    );

    return (
        <Section
            sectionId="dot-viewer" 
            withContainer
            splitBg
            style={{ minHeight: '100vh' }}
        >
            <Row>
                <Styled.ImageWrapper xs={12} lg={6}>
                    <DotImage nftId={metadata.id} />
                </Styled.ImageWrapper>
                <Styled.RightContainer xs={12} lg={6}>
                    { renderDetails() }
                    { renderProperties() }
                </Styled.RightContainer>
            </Row>
        </Section>
    )
}

DotViewer.getInitialProps = async (ctx: NextPageContext) => {
    const nftId = ctx.query.id;
    const response = await fetch(`${process.env.NEXT_PUBLIC_JSON_PATH}/${nftId}.json`);
    const data = await response.json();
    return { metadata: data };
}

export default DotViewer;