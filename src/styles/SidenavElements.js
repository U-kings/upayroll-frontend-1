import styled from "styled-components";
import { Link } from "react-router-dom";
import { COLORS } from "../values/colors";
import imgBg from '../resources/u-payLogo3White.png';

export const LeftSide  = styled.div`
    width: ${({isOpen9}) => (isOpen9 ? '55px' : '17%')};
    position: fixed;
    /* top: 0;
    bottom: 0; */
    z-index: 100;
    overflow: auto;
    background-color: ${COLORS.black};
    height: 100vh;
    /* height: calc(100vh - 2rem); */
    height: 100vh;
    /* transition: 360ms ease-in-out; */

    & .leftside__header{
        position: sticky;
        top: 0;
    }

`;
export const TextLink  = styled(Link)`
    text-decoration: none;
    transition: 360ms ease-in-out;
    
    & .profile__img{
        background-image: url(${imgBg});
        background-size: cover;
        width: 30px;
        height: 30px;
        margin: auto .1rem auto auto;
    }
    & h1{
        overflow: hidden;
        display: ${({isOpen9}) => (isOpen9 ? 'none' : 'inline-flex')};
        font-size: 2.4rem;
        padding: 1rem 0;
        margin: auto auto auto 1rem;
        text-align: left;
        color: ${COLORS.white};
        font-weight: 500;

        & span{
            color: ${COLORS.blue2};
            font-size: 2.4rem;
            margin-left: .5rem;
            font-weight: 400;
        }
    }
    & .small{
        display: ${({isOpen9}) => (!isOpen9 ? 'none' : 'block')};
        /* display: none; */
    }

`;
export const NavList  = styled.ul`
    list-style: none;
    font-weight: 400;
    margin: auto 0;
    overflow: hidden;
    width: 100%;
    /* width: 240px; */
    & p{
        margin: auto 0;
        font-size: 1.4rem;
        display: ${({isOpen9}) => (isOpen9 ? 'none' : 'inline-flex')};
        transition: 160ms ease-in-out;
    }
    & li{
        color: ${COLORS.grey};
        padding: 1rem 1rem;
        overflow: hidden;
        transition: ease-in-out .1s;
        display: flex;
    }
    & li:hover{
        background-color: ${COLORS.black6};
        border-left: 2px solid ${COLORS.blue2};
    }
    & .active{
        color: ${COLORS.grey};
        background-color: ${COLORS.black6};
        border-left: 2px solid ${COLORS.blue2};
    }

`;

export const NavLink = styled(Link)`
    & .icons{
        width: 2.2rem;
        height: 2.2rem;
        margin-right: 1rem;
        color: ${COLORS.white};
    }
`;