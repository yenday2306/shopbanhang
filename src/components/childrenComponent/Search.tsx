import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../store";
import { getListProduct } from "../../slice/productSlice";


const Search = () => {
    
    const dispatch = useDispatch();
    const { products } = useSelector((state: RootState) => state.products)
    useEffect(() => {
        dispatch(getListProduct());
    }, [dispatch]);

useEffect(() => {
    console.log('searchProduct', products);
  }, [products]);
 

    return (
        <Menu>
            <div className="product-grid">
                    {products.map((item, index) => (
                        <ItemProduct key={index}>
                           <a href=""><img src={item.img} alt="" /></a>
                            <p>{item.content}</p>
                            <b>{item.price}</b>
                        </ItemProduct>
                    ))}
                </div>
        </Menu>
    );
};

const Menu = styled.div`
overflow:hidden;
   
.product-grid{
    overflow:hidden;
    display: grid;
    grid-template-columns: repeat(4, 1fr); 
    grid-gap: 10px; 
    text-align:left;
    font-size:12px;
}
.body{
    display:flex;
    flex-direction:row;
}
.menu{
    display:flex;
    flex-direction:column;
}
button{
    width:300px;
    text-align:left;
}

`
const ItemProduct = styled.div`
display:flex;
flex-direction:column;
img{
    width:220px;
    height:345px;
}
`

export default Search