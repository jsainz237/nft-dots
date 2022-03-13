import { FC, useEffect, useRef } from "react";
import styled from 'styled-components';
import NextLink from 'next/link'
import { WalletButton } from './WalletButton';

/** @ts-ignore */
import DotPlus from '../../../public/assets/plus.svg';
import { useAppSelector } from "../../state/hooks";
import { selectTheme } from "../../state/slices/theme.state";

namespace Styled {
    export const Wrapper = styled.div`
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 2rem;
        background: rgba(0, 0, 0, 0);
        position: fixed;
        top: 0;
        right: 0;
        width: 100vw;
        z-index: 100;

        @media screen and (max-width: 720px) {
            justify-content: flex-end;
        }
    `;

    export const Nav = styled.header`
        display: flex;
        align-items: center;

        @media screen and (max-width: 720px) {
            display: none;
        }

        *:not(:last-child) {
            margin-right: 2rem;
        }
    `;

    export const Link = styled.a`
        font-size: 18px;
        color: ${props => props.theme.primaryColorOverride ?? props.theme.s0};
        margin: 0;
        cursor: pointer;

        &:hover {
            color: ${props => props.theme.primaryColorOverride ?? props.theme.s0};
            opacity: 0.5;
        }
    `;

    export const HomeIcon = styled(DotPlus)`
        height: 18px;
        width: 18px;
        color: ${props => props.theme.primaryColorOverride ?? props.theme.s0};

        &:hover {
            opacity: 0.5;
        }
    `;

    export const NavMenu = styled.button`
        border: none;
        background: none;
    `;
}

export const Header: FC = () => {
    const headerRef = useRef<any>();

    useEffect(() => {
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    });

    const onScroll = (e: Event) => {
        if(headerRef.current) {
            if(window.scrollY <= 55) {
                const opacity = Math.min(1, window.scrollY / 50);
                console.log(opacity);
                headerRef.current.style.background = `rgba(0, 0, 0, ${opacity})`;
            }

            if(window.scrollY === 0) {
                headerRef.current.style['z-index'] = 100;
            }

            if(window.scrollY > 0 && headerRef.current.style['z-index'] !== 200) {
                headerRef.current.style['z-index'] = 200;
            }
        }
    }

    return (
        <Styled.Wrapper ref={headerRef}>
            <Styled.Nav>
                <NextLink href="/#mint"><a><Styled.HomeIcon /></a></NextLink>
                <NextLink href="/#info"><Styled.Link>Info</Styled.Link></NextLink>
                <NextLink href="/#preview"><Styled.Link>Preview</Styled.Link></NextLink>
                <NextLink href="/#invest"><Styled.Link>Invest</Styled.Link></NextLink>
                <NextLink href="/#faq"><Styled.Link href="/#faq">FAQ</Styled.Link></NextLink>
            </Styled.Nav>
            <WalletButton/>
        </Styled.Wrapper>
    )
}