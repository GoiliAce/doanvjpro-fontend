import React from 'react';
import styled from 'styled-components';

const ImageError = styled.img`
    width: 500px;
`
const NotLoginWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #040404;
    z-index: 999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const Content = styled.h1`
    margin-top: 20px;
    color: #fff;
`

export const Error = (props) => {
    return (
        <NotLoginWrapper>
        <ImageError src={props.img} />
        <Content>{props.content}</Content>
    </NotLoginWrapper>
    )
}