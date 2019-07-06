import React,{ useState } from 'react'
import {P,RightContent,Text,IconDiv,Button} from './styles'
import MaterialIcon from 'material-icons-react'
import { firebaseImpl } from '../firebase/config'
import axios from 'axios'
import Swal from 'sweetalert2'

function Aula(props)
{
    const storage = firebaseImpl.storage();
    
    async function handleDownload()
    {
        const requestReportOfClass = await firebaseImpl.functions().httpsCallable('requestReportOfClass');
        await requestReportOfClass({ text:props.id_aula}).then(console.log).catch(console.log)
        const pathReference = storage.ref(`classReports/${props.id_aula}.json`);
        console.log(pathReference)
        pathReference.getDownloadURL().then(async (url) =>
        {
            var {data:file} = await axios.get(url)
            file = JSON.stringify(file)
            var blob = new Blob([file], {type: "application/json"});
            var url  = URL.createObjectURL(blob);

            var a = document.createElement('a');
            a.download    = `${props.id_aula}.json`
            a.href        = url;
            a.textContent = "Download backup.json"
            a.click()
            Swal.fire(
            {
                type: 'success',
                title: 'Nice...',
                text: 'Sua aula foi baixada com sucesso!',
                
            })
        }).catch(err =>
        {
            Swal.fire(
            {
                type: 'error',
                title: 'Oops...',
                text: 'Algo deu errado!',
                footer: `${err}`
            })
        })    
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
                <Button onClick={handleDownload}  disabled={props.disabled} alt={props.disabled?"Você so pode baixar a aula aṕos o seu termino":"clique para baixar a aula"}>
                    <MaterialIcon icon="arrow_downward" color={props.disabled?"#151515":"#fff"}  />
                </Button>
               
            </IconDiv>
            
        </P>
    </div>
    )
}

export default Aula;