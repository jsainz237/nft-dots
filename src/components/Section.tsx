import { FC } from 'react';
import Container from 'react-bootstrap/Container';
import styled from 'styled-components';

namespace Styled {
    export const Section = styled.div`
        width: 100%;
        background-color: #0a0a0a;
        padding: 3rem;
    `;
}

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    withContainer?: boolean;
    containerProps?: React.HTMLAttributes<HTMLDivElement>;
}

export const Section: FC<Props> = ({ withContainer, containerProps, children, ...props }) => {
    const childrenWithContainer = (
        <Container {...containerProps}>{children}</Container>
    )

    return (
        <Styled.Section {...props}>
            { withContainer ? childrenWithContainer : children }
        </Styled.Section>
    )
}
