import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import Announcement from '../compunents/Announcement'
import Footer from '../compunents/Footer'
import Navbar from '../compunents/Navbar'
import Navigation from '../compunents/Navigation'
import Modal from '../compunents/Modal'
import { addOrder } from '../redux/apiCalls'
import { deleteCart } from '../redux/cartRedux'


const Container = styled.div`

`

const Wrapper2 = styled.div``

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    margin: 20px;
`

const ShipInfo = styled.div`
    flex: 3;
    padding-right: 40px;
`

const ProductInfo = styled.div`
    flex: 1;
    background-color: #f1f1f1;
`


const ShipInfoTitleWrapper = styled.div`
    width: 100%;
    margin-bottom: 20px;
`

const ShipForm = styled.form``

const ShipInfoInput = styled.input`
    width: 80%;
    font-size: 20px;
    border: 1px solid #edecec;
    margin: 20px 0;
    &:focus {
        outline: none !important;
    }
    margin-left: 10px;
    margin-right: 10px;
`

const ShipInfoTitle = styled.h2`
    padding-top: 5px;
    margin-left: 10px;
    margin-right: 10px;
    border-bottom: 3px solid black;
`

const ProductItemWrapper = styled.div`
    margin: 20px;
`

const ProductItemInfoWrapper = styled.div`
    display: flex;
    margin-bottom: 20px;
`

const ProductItemLeft = styled.div`
    display: flex;
    flex-direction: column;
`

                           
const ProductImg = styled.img`
    width: 80px;
    height: 80px;
`

const ProductItemRight = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: auto;
`

const ProductItemInfo = styled.span`
    margin: 10px;
`

const TotalPriceWrapper = styled.div`
    margin: 10px;
    padding-top: 10px;
    display: flex;
    justify-content: space-between;
    border-top: 1px dashed #ddd;
    margin-top: 50px;
    font-size: 20px;
`

const TotalPriceHeader = styled.span`
`

const TotalPrice = styled.span`
    
`

const ProductBtn = styled.button`
    margin: 10px;
    width: 96%;
    font-size: 16px;
    background-color: black;
    color: white;
    border: none;
    height: 50px;
`

const CheckOut = () => {
    const user = useSelector(state => state.user.currentUser)
    const products = useSelector(state => state.cart.products)
    const cart = useSelector(state => state.cart)
    const error = useSelector(state => state.cart.error)
    const dispatch = useDispatch()
    const [modal,setModal] = useState(false)
    const [inputs, setInputs] = useState({})
    const [count, setCount] = useState(0)
    const isEmpty = str => !str.trim().length;
    const handleChange = (e) => {
        setInputs(prev => {
            return { ...prev, [e.target.name]: e.target.value };
        })
    }
    const handleClick = (e) => {
        e.preventDefault()
        if(count === 5) {
            if(cart.quantity === 0 ) {
                alert("Gi??? h??ng tr???ng!")
            } else {
                const order = {  userID: user._id, products, ...inputs, total: cart.total, quantity: cart.quantity }
                setModal(true)
                addOrder(dispatch,order)
                setInputs({})
            }
        } else {
            alert("Please Fill All Required Field")
        } 
    }
    useEffect(() => {
        let countInputs = 0
        Object.values(inputs).forEach(item => {
            if(!isEmpty(item)) {
                countInputs+=1
            }
        })
        setCount(countInputs)
    },[inputs])
    return (
            <Container>
                {modal && <Modal stateModal={setModal} message={error ? "C?? l???i x???y ra, vui l??ng th??? l???i" : "?????t h??ng th??nh c??ng"}/>}
                <Wrapper2>
                    <Navbar/>
                    <Announcement/>
                    <Navigation/>
                    <Wrapper>
                        <ShipInfo>
                            <ShipInfoTitleWrapper>
                                <ShipInfoTitle>TH??NG TIN GIAO H??NG</ShipInfoTitle>
                            </ShipInfoTitleWrapper>
                            <ShipForm>
                                <ShipInfoInput name='name' placeholder='H??? t??n' value={inputs.name} onChange={handleChange} required></ShipInfoInput>
                                <ShipInfoInput name='tel' placeholder='S??? ??i???n tho???i' type="tel" onChange={handleChange} value={inputs.tel} required pattern="^\+?[0-9]{3}-?[0-9]{6,12}$"></ShipInfoInput>
                                <ShipInfoInput name='email' placeholder='Email' type="email" onChange={handleChange}  value={inputs.email} required></ShipInfoInput>
                                <ShipInfoInput name='address' placeholder='?????a ch???' required value={inputs.address} onChange={handleChange}></ShipInfoInput>
                                <ShipInfoInput name='city' placeholder='T???nh/TP' value={inputs.city} onChange={handleChange} required></ShipInfoInput>
                            </ShipForm>
                        </ShipInfo>
                        <ProductInfo>
                            <ShipInfoTitleWrapper>
                                <ShipInfoTitle>????N H??NG</ShipInfoTitle> 
                            </ShipInfoTitleWrapper>
                            <ProductItemWrapper>
                                {products.map((product, index) => (
                                    <ProductItemInfoWrapper key={index}>
                                        <ProductImg src={product.img}></ProductImg>
                                        <ProductItemLeft>
                                            <ProductItemInfo>{product.title}</ProductItemInfo>
                                            <ProductItemInfo>Combo:{product.combo}</ProductItemInfo>
                                        </ProductItemLeft>
                                        <ProductItemRight>
                                            <ProductItemInfo>{product.quantity * product.price}.000??</ProductItemInfo>
                                            <ProductItemInfo>S??? l?????ng: {product.quantity}</ProductItemInfo>
                                        </ProductItemRight>
                                    </ProductItemInfoWrapper>
                                ))}
                            </ProductItemWrapper>  
                            <TotalPriceWrapper>
                                <TotalPriceHeader>T???ng c???ng</TotalPriceHeader>
                                <TotalPrice>{cart.total}.000??</TotalPrice>
                            </TotalPriceWrapper>
                            <ProductBtn onClick={handleClick}>Ho??n t???t ?????t h??ng</ProductBtn>
                        </ProductInfo>
                    </Wrapper>
                    <Footer/>
                </Wrapper2>
            </Container>
    )
    }

export default CheckOut
