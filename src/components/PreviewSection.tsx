import { FC, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowRight, faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Slider, { Settings } from 'react-slick';
import { Section } from './Section';

namespace Styled {
    export const TitleContainer = styled.div`
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    `;

    export const ButtonWrapper = styled.div`
        display: flex;
        align-items: center;
    `;

    export const Icon = styled(FontAwesomeIcon)`
        transition: opacity 0.3s ease;
        cursor: pointer;
        &:hover {
            opacity: 0.5;
        }
    `;

    export const ExampleContainer = styled.div`
        padding: 0 0.5rem;
    `;

    export const ExampleImg = styled.img`
        width: 100%;
        border-radius: 1rem;
        border: 1px solid lightgray;
    `;
}

export const PreviewSection: FC = () => {
    const sliderRef = useRef<Slider>();
    const [slidesToShow, setSlidesToShow] = useState<number>(3);

    const examples = new Array(12).fill(0).map((_, i) => `ex-${i + 1}`);
    const settings: Settings = {
        infinite: true,
        centerPadding:  "60px",
        swipeToSlide: true,
        arrows: false,
        dots: false,
        slidesToShow: 4,
        responsive: [
            {
                breakpoint: 960,
                settings: {
                    slidesToShow: 3,
                }
            },
        ]
    }

    const scroll = (dir: number) => {
        if(sliderRef.current) {
            dir > 0 
                ? sliderRef.current.slickNext()
                : sliderRef.current.slickPrev()
        }
    }

    return (
        <Section style={{ color: 'white' }} withContainer>
            <Styled.TitleContainer>
                <h1 className='section-title'>Previews</h1>
                <Styled.ButtonWrapper>
                    <Styled.Icon onClick={() => scroll(-1)} size='2x' icon={faCircleArrowLeft} style={{ marginRight: '1rem' }} />
                    <Styled.Icon onClick={() => scroll(1)} size='2x' icon={faCircleArrowRight} />
                </Styled.ButtonWrapper>
            </Styled.TitleContainer>
            <div style={{ cursor: 'pointer' }}>
                <Slider ref={sliderRef} slidesToShow={slidesToShow} {...settings}>
                    { examples.map(filename => (
                        <Styled.ExampleContainer>
                            <Styled.ExampleImg key={filename} src={`assets/previews/${filename}.png`} />
                        </Styled.ExampleContainer>
                    ))}
                </Slider>
            </div>
        </Section>
    )
}