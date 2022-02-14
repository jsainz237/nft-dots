import { FC, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

import { Section } from './Section';
import styled, { useTheme } from 'styled-components';

// @ts-ignore
import DOT from '../../public/assets/half_rotated_bottom_right.svg';

namespace Styled {
    export const InfoWrapper = styled.div`
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
    `;

    export const ListItemWrapper = styled.div`
        display: flex;
        align-items: center;
        margin-top: 0.5rem;

        *:first-child {
            margin-right: 1rem;
        }

        * {
            font-size: 1.5rem;
        }
    `;
}

export const InfoSection: FC = () => {
    const theme: any = useTheme();
    const dotRef = useRef<any>();

    const triangleSize = '15rem'

    // useEffect(() => {
    //     window.addEventListener('scroll', () => {
    //         if(dotRef.current) {
    //             dotRef.current.style.transform = 
    //                 `rotate(${window.scrollY / 15}deg)`;
    //         }
    //     })
    // })

    const ListItem = ({ item }: { item: string }) => (
        <Styled.ListItemWrapper>
            <FontAwesomeIcon icon={faCircleCheck} />
            <div>{item}</div> 
        </Styled.ListItemWrapper>
    );

    const list = [
        '10,000 ERC-271 NFTS',
        'Each DOTs combination is randomly generated',
        '6 different properties',
        '5 different rarity values',
        'Only 0.01 BNB per DOT',
    ]

    return (
        <Section style={{ background: theme.s1 }} withContainer>
            <Styled.InfoWrapper>
                <div style={{ marginBottom: '7rem' }}>
                    <h1 className='section-title'>Info & Specs</h1>
                    <div>
                        {list.map((str, i) => <ListItem key={i} item={str} />)}
                    </div>
                </div>
                <div ref={dotRef}>
                    <DOT height={triangleSize} width={triangleSize} />
                </div>
            </Styled.InfoWrapper>
        </Section>
    )
}