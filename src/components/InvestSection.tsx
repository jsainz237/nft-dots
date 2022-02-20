import { FC } from "react";
import styled, { useTheme } from "styled-components";
import { Section } from "./Section";

// @ts-ignore
import HorizontalDots from '../../public/assets/3_horizontal.svg';
// @ts-ignore
import BottomFrameDots from '../../public/assets/Frame-bottom-right.svg';

namespace Styled {
    export const TextWrapper = styled.div`
        width: 100%;
        max-width: 720px;
        font-weight: bold;

        a {
            color: black;
            text-decoration: underline;
            &:hover {
                opacity: 0.7;
            }
        }
    `;

    export const BottomContainer = styled.div`
        width: 100%;
        display: flex;
        justify-content: flex-end;
    `;
}

export const InvestSection: FC = () => {
    const theme: any = useTheme();
    const horizontalDotsSize = 48;
    const frameDotsSize = 36;

    return (
        <Section 
            sectionId="invest"
            style={{ background: theme.s2 }} 
            withContainer
            containerProps={{
                style: {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }
            }}
        >
            <Styled.TextWrapper>
                <h1 className="section-title">Why invest in DOTs?</h1>
                <p>The short answer: you shouldn't :)</p>
                <HorizontalDots
                    height={horizontalDotsSize / 3}
                    width={horizontalDotsSize}
                    style={{ marginBottom: '1rem' }}
                />
                <p>
                    I'm not going to be maintaining this project / doing any more drops. I made 
                    this project purely to learn the technology and challenge myself.
                </p>
                <p>
                    However, that being said, if you like the art, buy some!
                    They're cheaper than the monkeys ¯\_(ツ)_/¯
                </p>
                <p>
                    If you are looking for a cool NFT project to invest in check
                    out <a target="_blank" href="https://simpleplanets.com">Simple Planets!</a> 🪐 I'll be a developer 
                    on that project after this one is completed.
                </p>
                <Styled.BottomContainer>
                    <BottomFrameDots height={frameDotsSize} width={frameDotsSize} />
                </Styled.BottomContainer>
            </Styled.TextWrapper>
        </Section>
    )
}