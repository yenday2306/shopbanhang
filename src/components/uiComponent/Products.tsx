import styled from 'styled-components'
import listBestSeller from './BestSeller.tsx'
import {useEffect} from "react";
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store.ts';
import { getListProduct } from '../../slice/productSlice.ts';
import ListMenu from '../childrenComponent/ListMenu.tsx';
// import SimpleSlider from './BanChay.tsx';
export type TypeProduct = {
    id:number,
    img:string,
    content:string,
    price:string
  }

const Products = () => {
    const dispatch = useDispatch()
    const { mainProduct } = useSelector((state: RootState) => state.products)
//     const [listProduct,setListProduct]=useState<Array<TypeProduct>>([])
//     useEffect(() => {
//         instance.get('/listproducts').then(response => {
//             setListProduct(response.data)
//     })
//   }, [])
    useEffect(() => {
        // @ts-ignore
    dispatch(getListProduct())
  }, [dispatch])
    return (
        <ListProducts>
            <img style={{ width: '100%' }} src="https://routine.vn/media/catalog/category/ao-nu-thoi-trang-routine-dep-cao-cap-chinh-hang.jpg" alt="" />
            <h3 className='mt-[40px]'><b>THỜI TRANG NỮ</b></h3>
            <div className='body'>
                <ListMenu/>
                <div className="product-grid">
                    {mainProduct.map((item:any, index:any) => (
                        <ItemProduct key={index}>
                            <div className="image-zoom">
                                <Link to={`buying/${item.id}`}><img className='rounded-2xl		' src={item.img} alt="" /></Link>

                            </div>
                            <p className='text-left'>{item.content}</p>
                            <b className='text-left mt-[5px]'>{item.price}</b>
                        </ItemProduct>
                    ))}
                </div>
            </div>
            <div>
                <h3 className='font-bold	 mt-[100px] mb-0'>ĐƯỢC MUA NHIỀU NHẤT</h3>
                <div className="product-grid" style={{marginLeft:'10px'}}>
                    {listBestSeller.map((product, index) => (
                        <BestSeller key={index}>
                            <div className='image-zoom'>
                            <img src={product.img} alt="" />
                            </div>
                            <p>{product.content}</p>
                            <b>{product.price}</b>
                        </BestSeller>
                    ))}
                </div>       
            </div>
            {/* <SimpleSlider/> */}
        </ListProducts>
        
    )
}
const ListProducts = styled.div`
    overflow:hidden;
    .image-zoom {
        overflow: hidden;
        
      }
      
      .image-zoom img {
        transition: transform 0.3s;
      }
      
      .image-zoom:hover img {
        transform: scale(1.05); 
      }
    .product-grid{
        margin-left:100px;
        overflow:hidden;
        display: grid;
        grid-template-columns: repeat(4, 1fr); 
        grid-gap: 0px; 
        text-align:left;
        font-size:12px;
    }
    .body{
        display:flex;
        flex-direction:row;
    }
    
    button{
        width:300px;
        text-align:left;
    }
    
`
const BestSeller = styled.div`
    width:100%;
    img{
        border-radius:10px;
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
export default Products


