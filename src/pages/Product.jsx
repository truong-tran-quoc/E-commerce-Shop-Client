
import { Add, FavoriteBorder, FavoriteBorderOutlined, FavoriteOutlined, Remove } from '@material-ui/icons'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Announcement from '../compunents/Announcement'
import Footer from '../compunents/Footer'
import Navbar from '../compunents/Navbar'
import { addProduct } from '../redux/cartRedux'
import { publicRequest } from '../requestMethod'
import { mobile } from '../responsive'
import { useDispatch, useSelector } from 'react-redux'
import Navigation from '../compunents/Navigation'
import Modal from '../compunents/Modal'
import {addFavorProduct, deleteFavorProduct} from "../redux/favorRedux"

const Container = styled.div`
`
const Wrapper = styled.div`
    padding: 50px;
    display: flex;
    ${mobile({padding: "10px",flexDirection: "column"})};
`
const ImgContainer = styled.div`
    flex: 1;

`
const Image = styled.img`
    width: 80%;
    height: 70vh;
    object-fit: cover;
    ${mobile({height: "40vh"})};
`
const InfoContainer = styled.div`
    flex: 1;
    padding: 0px 50px;
    ${mobile({padding: "10px"})};
`
const Title = styled.h1`
    font-weight: 200;

`
const Desc = styled.p`
    margin: 20px 0;
`
const Price = styled.span`
    font-weight: 100;
    font-size: 40px;
`
const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 50%;
    margin: 30px 0;
    ${mobile({width: "100%"})};
    flex-direction: column;
`
const Filter = styled.div`
    display: flex;
    align-items: center;
`
const FilterTitle = styled.span`
    font-size: 20px;
    font-weight: 200;
`

// const FilterSize = styled.select`
//   margin-left: 10px;
//   padding: 5px;
//   cursor: pointer;
// `;

const FilterColor = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid rgba(0,0,0,.09);
  background-color: ${(props) => props.color};
  margin: 20px 5px;
  &:hover {
        border: 1px solid teal;
  };
  border-color: ${(props) => props.borderColor ? "teal" : "rgba(0,0,0,.09)"};
  cursor: pointer;
`;

const FilterSizeOption = styled.button`
    padding: 15px;
    border: 1px solid rgba(0,0,0,.09);
    background-color: white;
    cursor: pointer;
    font-weight: 500;
    border-color: ${(props) => props.borderColor ? "teal" : "rgba(0,0,0,.09)"};
    &:hover {
        background-color: #f8f4f4;
        border: 1px solid teal;
        color: teal;
    }
    margin: 20px 5px;
`;
const AddContainer = styled.div`
    display: flex;
    align-items: center;
    width: 50%;
    justify-content: space-between;
    ${mobile({width: "100%"})};
    cursor:pointer;
`
const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
`
const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid teal;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 5px;
`
const Button = styled.button`
    padding: 15px;
    border: 2px solid teal;
    background-color: white;
    cursor: pointer;
    font-weight: 500;
    &:hover {
        background-color: #f8f4f4;
        color: teal;
    }
    height: 60px;
`
const ProductInfoWrapper = styled.div`
    padding: 50px;
`

const ProductInfoTitle = styled.h1`
    text-align: center;
`

const ProductInfo= styled.div`
    margin: 5px;
`



const Product = () => {
    const user = useSelector(state => state.user.currentUser)
    const favorList = useSelector(state => state.favor.products)
    const location = useLocation()
    const [modal,setModal] = useState(false)
    const id = location.pathname.split("/")[2]
    const [product, setProduct] = useState({})
    const [attributes, setAttributes] = useState([])
    const [price, setPrice] = useState();
    const [combo, setSize] = useState("1");
    const [listCombo, setListCombo] = useState([]);
    const [quantity, setQuantity] = useState(1)
    const [color, setColor] = useState("");
    const [colors, setColors] = useState([])
    const [selectColor, setSelectColor] = useState([])
    const [favor, setFavor] = useState(false)
    const [selectCombo, setSelectCombo] = useState([false,false])
    const dispatch = useDispatch()
    useEffect(() => {
        const getProduct = async ()=> {
            try{
                const res = await publicRequest.get("/products/find/"+id)
                setProduct(res.data)
                setPrice(res.data.price)
            }catch(err){

            }
        }
        const getAttribute = async () => {
            try {
                const res = await publicRequest.get("/value/find/"+id)
                setAttributes(res.data.attributes)
            }
            catch(err){
            }
        }
        getProduct()
        getAttribute()
    },[id])
    useEffect(() => {
        let listColor = []
        let listCombo = []
        attributes.forEach((attribute) => {
            if(attribute.attributeID === "color") {
                listColor.push({label: attribute.label, color: attribute.value})
            }
            if(attribute.attributeID === "price") {
                listCombo.push({label: attribute.label, price: attribute.value})
            }
        })
        setColors(listColor)
        setListCombo(listCombo)
    },[attributes])
    const handleQuantity = (type) => {
        if(type==="dec"){
            quantity > 1 && setQuantity(quantity-1)
        }
        else{
            setQuantity(quantity+1)
        }
    }
    const handleClick = () => {
        dispatch(addProduct({...product,quantity,combo,price, color}))
    }
    const handleLogIn = () => {
        setModal(true)
    }
    const handleFavor = () => {
        if(favor) {
            setFavor(false)
            dispatch(deleteFavorProduct(id))
        } else {
            setFavor(true)
            dispatch(addFavorProduct({productID: id, title: product.title, img: product.img}))
        }
    }
    const setCombo = (value,index) => {
        let newArr = selectCombo.map((item, i) => {
            if (index === i) {
              return !item;
            } else {
              if (item) {
                  return !item;
              }else {
                  return item;
              }
            }
          });
        setSelectCombo(newArr)
        let priceNoCombo = selectCombo[index]
        if(!priceNoCombo) {
            setPrice(value.price)
            setSize(value.label)
        } else {
            setPrice(product.price)
        }
        
    }
    const HandlesetColor = (c,index) => {
        setColor(c)
        let color = []
        for (let index = 0; index < colors.length; index++) {
            color.push(false)
        }
        let newArr = color.map((item, i) => {
            if (index === i) {
                return !item;
              } else {
                if (item) {
                    return !item;
                }else {
                    return item;
                }
              }
        })
        setSelectColor(newArr)
    }
    console.log(color)
    useEffect(() => {
        const check = favorList.some(item => item.productID === id)
        setFavor(check)
    },[favorList])
    return (
        <Container>
            {modal && <Modal stateModal={setModal} message="B???n c???n ph???i ????ng nh???p!" action="login"/>}
            <Navbar/>
            <Announcement/>
            <Navigation/>
            <Wrapper>
                <ImgContainer>
                    <Image src={product.img}/>
                </ImgContainer>
                <InfoContainer>
                    <Title>{product.title}</Title>
                    <Desc>{product.desc}</Desc>
                    <Price>{price}.000??</Price>
                    <FilterContainer>
                        <Filter>
                            {colors.length !== 0 && <FilterTitle>Color</FilterTitle>}
                            {colors?.map((c,index) => (
                                <FilterColor borderColor={selectColor[index]} color={c.color} key={c.color} onClick={() => HandlesetColor(c.color,index)} />
                            ))}
                        </Filter>
                        <Filter>
                                {listCombo?.map((s, index) => (
                                <FilterSizeOption borderColor={selectCombo[index]}  key={s.label} onClick={() => setCombo(s,index)}>{s.label}</FilterSizeOption>
                                ))}
                        </Filter>
                    </FilterContainer>
                    <AddContainer>
                        <AmountContainer>
                            <Remove onClick={()=>handleQuantity("dec")}/>
                            <Amount>{quantity}</Amount>
                            <Add onClick={()=>handleQuantity("inc")}/>
                        </AmountContainer>
                        <Button onClick={user ? handleClick : handleLogIn}>TH??M V??O GI??? H??NG</Button>
                        <Button onClick={user ? handleFavor : handleLogIn}><FavoriteOutlined style={favor ? {color: "#ff5722"} : {color: "#bdbdbd"}}/></Button>
                    </AddContainer>
                </InfoContainer>
            </Wrapper>
            <ProductInfoWrapper>
                <ProductInfoTitle>H?????ng d???n b???o qu???n</ProductInfoTitle>
                <ProductInfo>
                        H?????ng d???n gi???t v?? b???o qu???n:
                        Khi  m???i mua v??? b???n h??y cho v??o ng??n ???? t??? l???nh ????? kho???ng 1 ng??y r???i m???i s??? d???ng. ??i???u n??y gi??p t???t tr??? n??n b???n h??n.  

                        Khi gi???t : 
                        N??n ph??n lo???i  ????? tr??nh vi???c phai m??u t??? ????i t???t m??u n??y sang m??u kh??c ?????c bi???t l?? tr??nh phai ra ????? tr???ng. ?????c bi???t b???n n??n ????? ?? ????? phai m??u ????? quy???t ?????nh ph??n lo???i th??? n??o trong l???n gi???t t???i 
                        H??y gi???t qua b???ng n?????c s???ch sau ???? gi???t v???i b???t gi???t v?? ng??m v???i n?????c x??? v???i
                        N???u gi???t m??y v?? s???c gi???t r???t l???n  th?? b???n n??n l???n  l???i ho???c cho  v??o t??i gi???t ????? tr??nh b??? x?? nh??.
                        
                        C??ch gi??? g??n b???o qu???n: 
                        Gi???t  ngay sau khi s??? d???ng s??? d??? d??ng lo???i b??? ???????c ngay b???i b???n, vi khu???n, m??i h??i. Tr??nh vi???c ????? khi n??o nhi???u th?? gi???t m???t th??? nh?? .
                        Ph??i ngang tr??n m??c v?? ??? n??i tho??ng m??t, tr??nh ti???p x??c tr???c ti???p v???i ??nh n???ng m???t tr???i v?? ??i???u ???? c?? th??? g??y h???ng ch???t li???u v?? m??u s???c .
                        Tr??nh ph??i ??? g???n nh???ng v???t d???ng s???c nh???n l??m x?????c, r??ch .
                        S???p x???p v??? g???n g??ng ????? tr??nh b??? nh??n  .

                        M??ch nh???: B???n h??y s??? h???u ??t nh???t t??? 3 ????i tr??? l??n v???i c??c ki???u d??ng kh??c nhau ????? ph?? h???p v???i t???ng b??? ????? c???a m??nh v?? n??n l??m m???i b??? s??u t???p c???a m??nh 6 th??ng m???t l???n nh??!!
                </ProductInfo>
            </ProductInfoWrapper>
            {/* <ProductSuggest>
                {product.map(item => (
                    <Product item={item} key={item.id}/>))}
            </ProductSuggest> */}
            <Footer/>
        </Container>
    )
}

export default Product
