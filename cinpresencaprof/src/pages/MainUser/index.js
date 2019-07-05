import React, { Component } from 'react'
import { firebaseDatabase,firebaseImpl } from '../../firebase/config'
import { MainText,TimeInicio,TimeFim,Container,Header,List,InputText,Button,H2,Menu,MenuContent,TextMenu,MainContent,Main } from './styles'
import Modal from 'react-responsive-modal'

export default class MainUser extends Component
{
    state =
    {
        user : null,
        start: '',
        end: '',
        name: '',
        usersUid: [],
        open: false,
    }

    async componentDidMount()
    {
        const user = await firebaseImpl.auth().currentUser
        this.setState({ user })
        console.log(user)
        this.listener = firebaseDatabase.ref('/users').once('value', this.getUserUid)

    }

    getUserUid = snapshot =>
    {
        this.setState({ usersUid: Object.keys(snapshot.val()) })
    }

    schedule = async () =>
    {
        const start = new Date(this.state.start).getTime()
        const end = new Date(this.state.end).getTime()
        await firebaseDatabase.ref('agenda').push({alunos_presentes:this.state.usersUid.map(userUid =>
        {
            return {
                quantidade_parcial_presencas: 0,
                referencia: `users/${userUid}`
            }
        }),fim:end,inicio:start,nome_aula:this.state.name})
    }

    handleInput = e =>
    {
        this.setState({[e.target.name]:e.target.value})
    }

    onOpenModal = () =>
    {
        this.setState({ open: true })
    }

    onCloseModal = () =>
    {
        this.setState({ open: false })
    }

    render()
    {
        return (
            
            <section>
                <Menu>
                    <MenuContent>
                        <TextMenu>CinPresença</TextMenu>
                    </MenuContent>
                </Menu>
                <Main>
                    <MainContent>
                        <MainText>Seja bem vindo Kiev!</MainText>


                        <Button style={{backgroundColor:'#151515',width:'40%',marginTop:'20px'}} onClick={this.onOpenModal}>Open modal</Button>
                        <List>
                            
                            
                            
                        </List>
                        
                        
                        
                        
                        
                        <Modal showCloseIcon={false} styles={{bordeRadius:'20px'}} open={this.state.open} onClose={this.onCloseModal} center style={{borderRadius:'10'}}>
                        <Container>
                            <Header>
                                <H2>Cadastro de aula</H2>
                            </Header>
                            <InputText name="name" type="text" value={this.state.name} placeholder="Nome da aula" onChange={this.handleInput} />
                            <TimeInicio name="start" inputType="datetime-local" step="1" value={this.state.start} onChange={this.handleInput} />
                            <TimeFim name="end" teste="ok" inputType="datetime-local" step="1" value={this.state.end} onChange={this.handleInput} />
                            <Button onClick={this.schedule}>Agendar aula</Button>
                        </Container>
                    </Modal>

                    </MainContent>
                
                </Main>
                
                
            </section>
            
        )
    }
}
