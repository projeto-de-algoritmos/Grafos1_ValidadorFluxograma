import React from 'react';
import Slick from 'react-slick';
import styled from 'styled-components';
import arrow from '../../../../assets/arrow.svg';

const SlickSlider = styled(Slick)`
  .slick-list {
    margin: 0 -0.888rem;

    .slick-track {
      display: flex;
      flex-wrap: wrap;

      .slick-slide {
        opacity: ${(props) => (props.opacity ? 0.4 : 1)};
        transition: opacity .2s;

        &.slick-active {
          opacity: 1;
        }

        & > div {
          height: ${(props) => (props.useFullHeight ? '100%' : 'auto')};
          padding: 0 .888rem;
        }
      }
    }
  }

  .slick-arrow {
      background: url('${arrow}') no-repeat;
      background-position: 1.181rem .958rem;
      background-size: auto .75rem;
      border: 0;
      border-radius: 50%;
      color: transparent;
      cursor: pointer;
      display: block !important;
      font-size: 0;
      height: 2.666rem;
      position: absolute;
      right: 0;
      top: 56%;
      width: 2.666rem;
      z-index: 1;
      &.slick-prev {
        right: 8%;
        transform: rotate(180deg);
      }
      &.slick-next {
        right: 6%;
      }
      &.slick-disabled {
        cursor: initial;
        opacity: .6;
      }
    }
`;

const Slider = ({
  dots = true, numSlidesInDesktop = 3, numSlidesInTablet = 2, refs = null,
  initialCenter = false, opacity = false, useDotsInBar = false, useFullHeight = true,
  rows = 1, numRowsInDesktop, numRowsInTablet,
  slidesPerRow = 1, slidesPerRowInTablet, ...rest
}) => {
  const numbersParsedToDecimal = (key) => {
    const slidesAndRows = {
      numSlidesInDesktop,
      numSlidesInTablet,
      numRowsInDesktop,
      numRowsInTablet,
      slidesPerRow,
      slidesPerRowInTablet,
      default: rows
    };
    return parseInt(slidesAndRows[key], 10) || slidesAndRows.default;
  };

  return (
    <SlickSlider
      ref={refs}
      infinite={false}
      initialSlide={initialCenter ? Math.floor((rest.children?.length || 0) / 2) : 0}
      dots={dots}
      opacity={opacity}
      slidesToShow={numbersParsedToDecimal('numSlidesInDesktop')}
      slidesToScroll={numbersParsedToDecimal('numSlidesInDesktop')}
      useDotsInBar={useDotsInBar}
      useFullHeight={useFullHeight}
      slidesPerRow={numbersParsedToDecimal('slidesPerRow')}
      rows={numbersParsedToDecimal('numRowsInDesktop')}
      responsive={[{
        breakpoint: 600,
        settings: {
          slidesToShow: numbersParsedToDecimal('numSlidesInMobile'),
          slidesToScroll: 1,
          slidesPerRow: numbersParsedToDecimal('slidesPerRowInMobile'),
          rows: numbersParsedToDecimal('numRowsInMobile')
        }
      }, {
        breakpoint: 992,
        settings: {
          slidesToShow: numbersParsedToDecimal('numSlidesInTablet'),
          slidesToScroll: numbersParsedToDecimal('numSlidesInTablet'),
          slidesPerRow: numbersParsedToDecimal('slidesPerRowInTablet'),
          rows: numbersParsedToDecimal('numRowsInTablet')
        }
      }]}
    // eslint-disable-next-line react/no-unstable-nested-components
      customPaging={() => <span />}
      {...rest}
    />
  );
};

export default Slider;
