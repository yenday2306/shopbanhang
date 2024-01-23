
import styled from "styled-components"
import {useEffect, useState} from "react";
import {  useParams} from "react-router-dom";
import Cart from "./Cart.tsx";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store.ts";
import { TypeProduct } from "../uiComponent/Products.tsx";
import { instance } from "../../axios-instance.ts";
import { addProduct, buyProducts } from "../../slice/cartSlice.ts";
import { useCheckLogin } from "../../hook/useCheckLogin.ts";
import Header from "../uiComponent/Header.tsx";
import Footer from "../uiComponent/Footer.tsx";
const Buying = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);
    localStorage.setItem('quantity', quantity.toString());
    const [isBuying, setBuying] = useState(false)
    const listProduct = useSelector((state:RootState)=>state.cart)
    console.log(listProduct)
    const [product, setProduct] = useState<TypeProduct>()
    const [selectedSize, setSelectedSize] = useState('');
    const size = selectedSize;
    // @ts-ignore
    const handleSizeSelection = (size) => {
      setSelectedSize(size);
  }
  
    useEffect(() => {
      instance.get(`/listproducts/${params.id}`).then(res => {
        setProduct(res.data)
      })
    }, [])
    console.log(product)
    const incrementQuantity = () => {
      setQuantity(quantity + 1);
    };
    const decrementQuantity = () => {
        if (quantity > 1) {
          setQuantity(quantity - 1);
        }
      };
      function confirmBuying() {
        setBuying(false)
        dispatch(buyProducts());
  
        
    }
    function handleBuyNow() {
      setBuying(true)
      dispatch(addProduct({ ...product, quantity,size }))
    }
      
      useCheckLogin();
    return (<div>
        <Header />
        <Product>
            <img style={{width:'30%',marginLeft:'100px',height:'30%'}} src={product?.img} alt="" />
            <div className="info-product">
            <p style={{fontWeight:'bold'}}>{product?.content}</p>
            <p style={{fontWeight:'bold',fontSize:'20px'}}> {product?.price}</p>
           
            <br />
            <p>Chọn size: {selectedSize && selectedSize}</p>

                 <div>
      <button
        className={`size-button ${selectedSize === 'S' ? 'selected' : ''}`}
        onClick={() => handleSizeSelection('S')}
      >
        S
      </button>
      <button
        className={`size-button ${selectedSize === 'M' ? 'selected' : ''}`}
        onClick={() => handleSizeSelection('M')}
      >
        M
      </button>
      <button
        className={`size-button ${selectedSize === 'L' ? 'selected' : ''}`}
        onClick={() => handleSizeSelection('L')}
      >
        L
      </button>
      <button
        className={`size-button ${selectedSize === 'XL' ? 'selected' : ''}`}
        onClick={() => handleSizeSelection('XL')}
      >
        XL
      </button>
    </div>
            <br />
           <div style={{display:'flex',flexDirection:'row'}}>
           <p className="mt-[15px]"> Chọn số lượng: {quantity}</p>
            
            <div className="quantity-container">
            <button  className="quantity-button plus mt-[10px]" onClick={incrementQuantity}>+</button>
            <input style={{marginTop:'10px',marginLeft:'3px'}} className="quantity-input" type="number" value={quantity}  />
                
            <button className="quantity-button minus mt-[10px]" onClick={decrementQuantity}>-</button>
            <button className="ml-[20px] w-[100px] h-[40px] mt-[10px] bg-black text-white	" onClick={handleBuyNow} >Mua ngay</button>
            </div>
           </div>
            
            
            <br />
            <br />
            <div  className="grid-container">
                <div>
                    <img  src="https://routine.vn/static/version1702264202/frontend/Magenest/routine/vi_VN/images/ghn.png" alt="" />
                    <p>Giao hàng nhanh</p>
                    <p>Từ 2-5 ngày</p>
                </div>
                <div>
                    <img src="https://routine.vn/static/version1702264202/frontend/Magenest/routine/vi_VN/images/free.png" alt="" />
                    <p>Giao hàng nhanh</p>
                    <p>Từ 2-5 ngày</p>
                </div>
                <div>
                    <img src="https://routine.vn/static/version1702264202/frontend/Magenest/routine/vi_VN/images/order.png" alt="" />
                    <p>Giao hàng nhanh</p>
                    <p>Từ 2-5 ngày</p>
                </div>
                <div>
                    <img src="https://routine.vn/static/version1702264202/frontend/Magenest/routine/vi_VN/images/returns.png" alt="" />
                    <p>Giao hàng nhanh</p>
                    <p>Từ 2-5 ngày</p>
                </div>
                <div>
                    <img src="https://routine.vn/static/version1702264202/frontend/Magenest/routine/vi_VN/images/pay.png" alt="" />
                    <p>Giao hàng nhanh</p>
                    <p>Từ 2-5 ngày</p>
                </div>
                <div>
                    <img src="https://routine.vn/static/version1702264202/frontend/Magenest/routine/vi_VN/images/hotline.png" alt="" />
                    <p>Giao hàng nhanh</p>
                    <p>Từ 2-5 ngày</p>
                </div>
            </div>
            </div>
        </Product>
        {
            isBuying && <Cart setBuying={setBuying} confirmBuying={confirmBuying} quantity= {quantity}/>
           }
        <Footer />
    </div>)
}

export default Buying
const Product = styled.div`
margin-left:100px;
button{
  border:1px solid black;
  border-radius:0px;
  margin-left:5px;
}
text-align:left;
display:flex;
flex-direction:row;
.info-product{
    margin-left:200px;
}
font-size:12px;
.quantity-container {
    display: flex;
    align-items: center;
    width:max-content;
    margin:0 auto;
  }
  
  .quantity-button {
    padding: 5px 10px;
    border: none;
    background-color: #ccc;
    color: #fff;
    cursor: pointer;
  }
  
  .quantity-button:hover {
    background-color: #aaa;
  }
  
  .quantity-input {
    width: 50px;
    padding: 5px;
    text-align: center;
  }
  .size-button {
    font-size:12px;
    width: 20px;
    
    background-color: transparent;
    color: black;
    
  }
  
  .size-button.selected {
    background-color: black;
    color: white;
  }
  .grid-container {
    font-size:14px;
    align-items:center;
    img{
      margin-left:62px;
      margin-bottom:10px;
      width:30px;
    }
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    text-align:center;
  }
`