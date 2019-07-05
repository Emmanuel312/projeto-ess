import React, { Component } from 'react'
import { firebaseDatabase,firebaseImpl } from '../../firebase/config'
import { MainText,TimeInicio,TimeFim,Container,Header,List,InputText,Button,H2,Menu,MenuContent,TextMenu,MainContent,Main } from './styles'
import Modal from 'react-responsive-modal'
import Aula from '../../components/Aula'
import Swal from 'sweetalert2'

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
        aulas: [],
    }

    async componentDidMount()
    {
        const user = await firebaseImpl.auth().currentUser
        this.setState({ user })
        console.log(user)
        this.listener = firebaseDatabase.ref('/users').once('value', this.getUserUid)
        this.listener = firebaseDatabase.ref('/agenda').on('value', this.getAulas)

    }

    getUserUid = snapshot =>
    {
        this.setState({ usersUid: Object.keys(snapshot.val()) })
    }

    getAulas = snapshot =>
    {
        if(snapshot.val())
        {
            var aulas = Object.keys(snapshot.val()).map(key => snapshot.val()[key])
            /*this.setState({ aulas: aulas.map(aula =>
            {
                return {
                    ...aula,
                    inicio: new Date(aula.inicio),
                    fim: new Date(aula.fim),
                }
            })})
            
            aulas = aulas.map(aula =>
            {
                return {
                    ...aula,
                    inicio: new Date(aula.inicio),
                    fim: new Date(aula.fim),
                }
            })
            */
            this.setState({ aulas })
        }
            
    }

    schedule = async () =>
    {
        const start = new Date(this.state.start).getTime()
        const end = new Date(this.state.end).getTime()
        try
        {
            await firebaseDatabase.ref('agenda').push({alunos_presentes:this.state.usersUid.map(userUid =>
            {
                return {
                    quantidade_parcial_presencas: 0,
                    referencia: `users/${userUid}`
                }
            }),fim:end,inicio:start,nome_aula:this.state.name})
            Swal.fire(
            {
                type: 'success',
                title: 'Nice...',
                text: 'Sua aula foi cadastrada com sucesso!',
                footer: 'Sua aula vai aparecer na lista em instantes'
            })
            this.setState({ start: '',end:'',name:'' })
            
        }
        catch(err)
        {
            Swal.fire(
                {
                    type: 'error',
                    title: 'Oops...',
                    text: 'Algo deu errado!',
                    footer: `${err}`
                })
        }
       
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

    showModal = () =>
    (
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
    )
        
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


                        <Button style={{backgroundColor:'#151515',width:'40%',marginTop:'20px'}} onClick={this.onOpenModal}>Cadastrar uma aula</Button>
                        <List>
                        
                                {this.state.aulas.map(aula => {
                                    return (
                                        <Aula key={Math.random()} disabled={false} nome_aula={aula.nome_aula} inicio={aula.inicio} fim={aula.fim}/>
                                    )
                                })}
                        </List>
                        
                        
                        
                        {this.showModal()}
                        

                    </MainContent>
                
                </Main>
                
                
            </section>
            
        )
    }
}
