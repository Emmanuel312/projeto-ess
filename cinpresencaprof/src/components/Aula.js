import React,{ useState } from 'react'
import {P,RightContent,Text,IconDiv,Button} from './styles'
import MaterialIcon from 'material-icons-react'

function Aula(props)
{
    async function handleDownload()
    {
        //const requestReportOfClassTest = await firebase.functions().httpsCallable('requestReportOfClassTest');
        console.log('oi')
    }

    return (
        <div>
        <P>
            <RightContent>
                <Text>Nome da Aula : {props.nome_aula}</Text>
                <Text>Inicio : {new Date(props.inicio).toLocaleString()}  </Text>
                <Text>Fim : {new Date(props.fim).toLocaleString()}</Text>
            </RightContent>
            <IconDiv>
                <Button onClick={handleDownload} disabled={props.disabled}>
                    <MaterialIcon icon="arrow_downward" color={props.disabled?"#151515":"#fff"}  />
                </Button>
               
            </IconDiv>
            
        </P>
    </div>
    )
}

    


export default Aula;