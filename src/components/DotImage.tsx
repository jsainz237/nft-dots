import { FC, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import styled, { keyframes } from "styled-components";

namespace Styled {
    export const DotContainer = styled.div<{ isLoading?: boolean }>`
        border: ${({ isLoading }) => !isLoading && `1px solid lightgray`};
        padding: ${({ isLoading }) => isLoading && `4rem`};
        display: flex;
        justify-content: center;
        align-items: center;

        img {
            width: 100%;
            height: 100%;
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

export const DotImage: FC<{ nftId: number }> = ({ nftId }) => {
    const [isLoading, setLoading] = useState<boolean>(true);

    return (
        <Styled.DotContainer key={nftId} isLoading={isLoading}>
            {isLoading && <Styled.Loader size="2x" icon={faSpinner} />}
            <div style={{ display: isLoading ? 'none' : 'block' }}>
                <img
                    src={`${process.env.NEXT_PUBLIC_PNG_PATH}/${nftId}.png`}
                    onLoad={() => setLoading(false)}
                />
            </div>
        </Styled.DotContainer>
    )
}