import { FC } from 'react';
import Container from 'react-bootstrap/Container';
import styled from 'styled-components';

namespace Styled {
    export const Section = styled.div`
        width: 100%;
        background-color: #0a0a0a;
        padding: 2rem 3rem;
    `;
}

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    withContainer?: boolean;
}

export const Section: FC<Props> = ({ withContainer, children, ...props }) => {
    const childrenWithContainer = (
        <Container>{children}</Container>
    )

    return (
        <Styled.Section {...props}>
            { withContainer ? childrenWithContainer : children }
        </Styled.Section>
    )
}
