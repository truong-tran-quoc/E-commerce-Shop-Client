
import React, { useState } from 'react'
import styled from 'styled-components'
import { mobile } from '../responsive'
import { createCart, register } from '../redux/apiCalls'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '../compunents/Modal'



const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #90EEEB;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Wrapper = styled.div`
    padding: 20px;
    width: 40%;
    background-color: white;
    ${mobile({width: "75%"})};

`
const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
`
const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
`

const Error = styled.span`
    font-size: 12px;
    padding: 3px;
    color: red;
    display: none;
`

const Input = styled.input`
    flex: 1;
    min-width: 90%;
    margin: 20px 10px 0 0;
    padding: 10px;
    &:invalid[data-myAttr="true"] {
        border: 1px solid red;
    }
    &:invalid[data-myAttr="true"] ~ ${Error} {
        display: block;
    }
`
const Agreement = styled.span`
    font-size: 12px;
    margin: 20px 0;
`
const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    cursor: pointer;
    color: white;
    &:disabled {
        cursor: default;
    }
`

const Label = styled.label`
    display: none;
`




const Register = () => {
    const [focused, setFocused] = useState(false)
    const [modal,setModal] = useState(false)
    const dispatch = useDispatch()
    const [inputs, setInputs] = useState({})
    const error = useSelector(state => state.user.error)
    const handleChange = (e) => {
        setInputs(prev => {
            return { ...prev, [e.target.name]: e.target.value };
        })
    }
    const handleFocus = (e) => {
        setFocused(true)
    }
    const handleClick = (e) => {
        e.preventDefault();
        register(dispatch, inputs)
        setModal(true)    
    }
    // const cart = {userID: user._id, products: [], quantity:0, total:0,}
    // createCart(dispatch, cart)
    return (
        <>
            <Container>
                <Wrapper>
                    <Title >T???O T??I KHO???N</Title>
                    <Form onSubmit={handleClick}>
                        <Label>Fullname</Label>
                        <Input name='fullname' placeholder="H??? T??n" value={inputs.fullname} onChange={handleChange}  data-myattr={focused} onBlur={handleFocus}/>
                        
                        <Label>Username</Label>
                        <Input name='username' placeholder="Username" onChange={handleChange} value={inputs.username} required pattern="^[A-Za-z0-9]{3,15}$" onBlur={handleFocus} data-myattr={focused}/>
                        <Error>Username ch???a 3-15 k?? t???, kh??ng bao g???m c??c k?? t??? ?????c bi???t</Error>
                        <Label>Email</Label>
                        <Input name='email' placeholder="Email" type="email" onChange={handleChange}  value={inputs.email} required onBlur={handleFocus} data-myattr={focused}/>
                        <Error>Vui l??ng nh???p email h???p l???!</Error>
                        <Label>password</Label>
                        <Input name='password' placeholder="M???t kh???u" type="password" onChange={handleChange}  value={inputs.password} required pattern="^[A-Za-z0-9]{6,}$" onBlur={handleFocus} data-myattr={focused}/>
                        <Error>M???t kh???u y??u c???u 6 k?? t??? tr??? l??n</Error>
                        <Label>Confirmpassword</Label>
                        <Input placeholder="Nh???p l???i m???t kh???u" type="password" onChange={handleChange}  value={inputs.confirmpassword} required name="confirmpassword" pattern={inputs.password} onBlur={handleFocus} data-myattr={focused}/>
                        <Error>M???t kh???u kh??ng kh???p, vui l??ng nh???p l???i.</Error>
                        <Agreement>
                            B???ng vi???c ????ng k??, b???n ???? ?????ng ?? v???i FuwaMise v??? <b>??I???U KHO???N D???CH V???</b> & <b>CH??NH S??CH B???O M???T</b>
                        </Agreement>
                        <Button type='submit' >T???O</Button>
                    </Form>  
                </Wrapper>
                {modal && <Modal stateModal={setModal} message={error ? "Username ho???c email ???? ???????c s??? d???ng, vui l??ng th??? l???i" : "????ng k?? th??nh c??ng!"}/>}
            </Container>
            
        </>
        
        
    )
}

export default Register
