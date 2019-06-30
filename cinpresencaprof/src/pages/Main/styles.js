import styled from 'styled-components'
import image from '../../assets/images/presenca.jpg'

export const Menu = styled.header`
    background: #50B4F2;
    height: 50px;
`;

export const MenuContent = styled.div`
    width: 100%;
    max-width: 980px;
    margin: 0 auto;
    height: 50px;
    padding: 0 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const MenuContentRight = styled.div` 
    display: flex;
`;

export const TextMenu = styled.span`
    @import url('https://fonts.googleapis.com/css?family=Sofadi+One&display=swap');
    font-size: 20px;
    color: #fff;
    margin-right: 15px;
    font-family: 'Sofadi One', cursive;
`;

export const Main = styled.main`
    display: flex;
    width: 100%;
    height: 520px;
    background-image: url(${image});
    opacity: 0.4;
    background-repeat: no-repeat;
    background-size: cover;
`;
export const MainContent = styled.div`
    width: 100%;
    max-width: 980px;
    margin: 0 auto;
    padding: 30px 30px
`


export const Message = styled.span`
    @import url('https://fonts.googleapis.com/css?family=Snippet&display=swap');
    font-family: 'Snippet', sans-serif;
    font-size: 20px;
    color: #151515;
`;

export const Footer = styled.footer`
    display: flex;
    align-items: flex-end;
    background: #151515;
    height: 67px;
`;