import React, { Component } from 'react'
import { firebaseDatabase,firebaseImpl } from '../../firebase/config'
import { Time } from './styles';

export default class MainUser extends Component
{
    state =
    {
        user : null,
        start: '',
        end: '',
        name: '',
    }

    async componentDidMount()
    {
        const user = await firebaseImpl.auth().currentUser
        this.setState({ user })
    }

    schedule = async () =>
    {
        const start = new Date(this.state.start).getTime()
        const end = new Date(this.state.end).getTime()
        console.log(start)
        await firebaseDatabase.ref(`agenda/${this.state.user.uid}`).set({alunos_presentes:[{id1:12323443},{id2:1293298}],fim:end,inicio:start,nome_aula:this.state.name})
    }

    handleTime = e =>
    {
        this.setState({[e.target.name]:e.target.value})
    }

    render()
    {
        return (
            <section>
                <input name="name" type="text" value={this.state.name} placeholder="Nome da aula" onChange={this.handleTime} />
                <Time name="start" inputType="datetime-local" step="1" value={this.state.start} onChange={this.handleTime} />
                <Time name="end" inputType="datetime-local" step="1" value={this.state.end} onChange={this.handleTime} />
                <button onClick={this.schedule}>Agendar aula</button>
            </section>
            
        )
    }
}
