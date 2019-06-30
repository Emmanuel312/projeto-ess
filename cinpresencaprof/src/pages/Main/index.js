import React from 'react'
import { Link } from 'react-router-dom'
import { Menu,MenuContent,MenuContentRight,TextMenu,Main,Image,MessageDiv,Message,Footer } from './styles'
import image from '../../assets/images/presenca.jpg'

export default function App()
{    
    return (
        <section>
            <Menu>
            <MenuContent>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <TextMenu>CinPresença</TextMenu>
                </Link>
                <MenuContentRight>
                    <Link to="/register" style={{ textDecoration: 'none' }}>
                        <TextMenu>Registrar</TextMenu>
                    </Link>

                    <Link to="/login" style={{ textDecoration: 'none' }} >
                        <TextMenu>Login</TextMenu>
                    </Link>
                </MenuContentRight>
            </MenuContent>
            </Menu>
            <Main>
                <Image src={image}/>
                <MessageDiv>
                    <Message>Sua gestão de presença em um só lugar</Message>
                </MessageDiv>
            </Main>
            <Footer>
                <span style={{color:'#fff'}}>Criar alguma coisa aqui</span>
            </Footer>
        </section>
        
            
    )
}


