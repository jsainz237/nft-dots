import { FC, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import styled, { keyframes } from "styled-components";
import Link from "next/link";

namespace Styled {
    export const DotContainer = styled.div<{ isLoading?: boolean, link?: boolean }>`
        border: ${({ isLoading }) => !isLoading && `1px solid lightgray`};
        padding: ${({ isLoading }) => isLoading && `4rem`};
        display: flex;
        justify-content: center;
        align-items: center;
        transition: transform 0.3s ease;
        cursor: ${({ link }) => link && 'pointer'};

        img {
            width: 100%;
            height: 100%;
        }

        &:hover {
            transform: ${({ link }) => link && 'scale(1.05)'};
        }
    `;

    const rotate = keyframes`
        from { transform: rotate(0deg);   }
        to   { transform: rotate(360deg); }
    `;

    export const Loader = styled(FontAwesomeIcon)`
        animation: ${rotate} 1s linear infinite;
    `;
}

export const DotImage: FC<{ nftId: number, link?: boolean }> = ({ nftId, link }) => {
    const [isLoading, setLoading] = useState<boolean>(true);

    const style = { display: isLoading ? 'none' : 'block' };

    const renderImage = () => (
        <img
            src={`${process.env.NEXT_PUBLIC_PNG_PATH}/${nftId}.png`}
            onLoad={() => setLoading(false)}
        />
    )

    return (
        <Styled.DotContainer key={nftId} isLoading={isLoading} link={link}>
            {isLoading && <Styled.Loader size="2x" icon={faSpinner} />}
            { link 
                ? (
                    <Link href={`/view/${nftId}`}>
                        <a style={style}>{ renderImage() }</a>
                    </Link>
                )
                : (
                    <div style={style}>{ renderImage() }</div>
                )
            }
        </Styled.DotContainer>
    )
}