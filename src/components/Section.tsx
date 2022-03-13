import { FC } from 'react';
import Container from 'react-bootstrap/Container';
import styled from 'styled-components';

namespace Styled {
    export const Section = styled.div<{ splitBg?: boolean }>`
        width: 100%;
        background: ${({ splitBg }) => splitBg 
            ? `linear-gradient(135deg, #0a0a0a 50%, #141414 50%)`
            : '#0a0a0a'
        };
        padding: 3rem;
    `;
}

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    sectionId: string;
    withContainer?: boolean;
    splitBg?: boolean;
    containerProps?: React.HTMLAttributes<HTMLDivElement>;
}

export const Section: FC<Props> = ({
    sectionId,
    withContainer,
    containerProps,
    children,
    ...props
}) => {
    const childrenWithContainer = (
        <Container {...containerProps}>{children}</Container>
    )

    return (
        <Styled.Section id={sectionId} {...props}>
            { withContainer ? childrenWithContainer : children }
        </Styled.Section>
    )
}
