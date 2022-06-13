import { FC, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

import { Section } from './Section';
import styled, { useTheme } from 'styled-components';

// @ts-ignore
import DOT from '../../public/assets/half_rotated_bottom_right.svg';

namespace Styled {
    export const InfoWrapper = styled.div`
        margin-bottom: 7rem;

        @media screen and (max-width: 540px) {
            margin-bottom: 5rem;
        }
    `;

    export const TriangleContainer = styled.div`
        position: absolute;
        bottom: 3rem;
        right: 3rem;
        height: 15rem;
        width: 15rem;

        @media screen and (max-width: 960px) {
            height: 8rem;
            width: 8rem;
        }

        @media screen and (max-width: 540px) {
            height: 5rem;
            width: 5rem;
        }

    `;

    export const ListItemWrapper = styled.div`
        display: flex;
        align-items: flex-start;
        margin-top: 0.5rem;

        *:first-child {
            margin-right: 1rem;
        }

        * {
            font-size: 1.5rem;
            @media screen and (max-width: 720px) {
                font-size: 1rem;
            }
        }
    `;
}

export const InfoSection: FC = () => {
    const theme: any = useTheme();
    const ListItem = ({ item }: { item: string }) => (
        <Styled.ListItemWrapper>
            <FontAwesomeIcon icon={faCircleCheck} style={{ marginTop: 4 }} />
            <div>{item}</div> 
        </Styled.ListItemWrapper>
    );

    const list = [
        '10,000 ERC-271 NFTS',
        'Each DOTs combination is randomly generated',
        '6 different properties',
        '5 different rarity values',
        `Only ${process.env.NEXT_PUBLIC_COST} BNB per DOT`,
    ]

    return (
        <Section sectionId="info" style={{ position: 'relative', background: theme.s1 }} withContainer>
            <Styled.InfoWrapper>
                <h1 className='section-title'>Info & Specs</h1>
                <div>
                    {list.map((str, i) => <ListItem key={i} item={str} />)}
                </div>
            </Styled.InfoWrapper>
            <Styled.TriangleContainer>
                <DOT height="100%" width="100%" />
            </Styled.TriangleContainer>
        </Section>
    )
}