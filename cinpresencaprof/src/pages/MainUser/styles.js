import styled from 'styled-components'

export const Menu = styled.header`
    background: #50B4F2;
    height: 8vh;
`;

export const MenuContent = styled.div`
    width: 100%;
    max-width: 980px;
    margin: 0 auto;
    height: 8vh;
    padding: 0 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const TextMenu = styled.span`
    @import url('https://fonts.googleapis.com/css?family=Sofadi+One&display=swap');
    font-size: 20px;
    color: #fff;
    margin-right: 15px;
    font-family: 'Sofadi One', cursive;
`;
export const TimeInicio = styled.input.attrs(props =>
({
    type: props.inputType,
}))
`
    margin-bottom:20px;
    margin-top:10px;
    width:100%;
    padding:15px;
    border-radius:5px;
    border:1px solid #7ac9b7;
    font-size:18px;
    :before {
    content:'Inicio:';
    margin-right:.6em;
    color:#9d9d9d;
    }
` 

export const TimeFim = styled.input.attrs(props =>
    ({
        type: props.inputType,
    }))
    `
        margin-bottom:20px;
        margin-top:10px;
        width:100%;
        padding:15px;
        border-radius:5px;
        border:1px solid #7ac9b7;
        font-size:18px;
        :before {
        content:'Fim:';
        margin-right:.6em;
        color:#9d9d9d;
        }
    `     

export const Container = styled.div`
    max-width:600px;
    margin:auto;
    padding:10px;
    font-size:18px;
    font-weight:bold;

`
export const Header = styled.div`
    background-color:#50B4F2;
    text-align:center;
    max-width:600px;
    color:aliceblue;
    padding:10px;
    margin:auto;
    border:1px solid gray;
    border-bottom:none;

`
export const H2 = styled.div`
    margin:0;
    padding:15px;
`    
export const InputText = styled.input`
    margin-bottom:20px;
    margin-top:10px;
    width:100%;
    padding:15px;
    border-radius:5px;
    border:1px solid #7ac9b7;
    font-size:18px;
`

export const Button = styled.button`
    margin-bottom:20px;
    width:100%;
    padding:15px;
    border-radius:5px;
    border:1px solid #7ac9b7;
    background:#50B4F2;
    color:aliceblue;
    cursor:pointer;
    font-weight:bold;
    font-size:18px;
`
export const Main = styled.div`
    margin-top: 10px;
    height: 92vh;
`
export const MainContent = styled.div`
    width: 100%;
    max-width: 980px;
    margin: 0 auto;
    height: 92vh;
    background: #fff;
    padding: 30px 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const List = styled.div`
    width: 98%;
    max-width: 980px;
    background: gray;
    padding: 30px 30px;
    height: 90%;
    overflow:auto;
    display: flex;
    flex-direction: column;
    
`


export const MainText = styled.span`
    @import url('https://fonts.googleapis.com/css?family=Sofadi+One&display=swap');
    font-size: 20px;
    font-family: 'Sofadi One', cursive;
`

