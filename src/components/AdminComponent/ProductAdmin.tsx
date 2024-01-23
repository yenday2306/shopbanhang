// import { SetStateAction, useState } from "react";
// import { instance } from "../../axios-instance";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../store";
// import { useCheckLogin } from "../../hook/useCheckLogin";
// import styled from "styled-components";
// import ProductForm from "./ProductForm";


// const ProductAdmin = () => {
//     const [adding, setAdding] = useState(false);
//     const [editing, setEditing] = useState(null);
//     const dispatch = useDispatch();
//     const { mainProduct } = useSelector((state: RootState) => state.products)
//     function deleteProduct(id: number) {
//       instance.delete(`/listproducts/${id}`).then(() => {
//         // @ts-ignore
//         dispatch(getListProduct());
//       });
//       console.log(id);
//     }
//     function editProduct(product: SetStateAction<null>) {
//       setAdding(true);
//       console.log('edit',product);
//       setEditing(product);
//     }
//     function addNewProduct() {
//       setAdding(true);
//       console.log(1)
      
//     }
  
//     useCheckLogin(); 
  
//     return (
//       <>
//         <Table>
//           <button className="flex justify-between bg-pink-200 mb-3" onClick={addNewProduct}>
//             Thêm Sản Phẩm
//           </button>
//           <table className="admin-table">
//             <thead>
//               <tr>
//                 <th>Số thứ tự</th>
//                 <th>Ảnh</th>
//                 <th>Tên</th>
//                 <th>Giá</th>
//                 <th></th>
//                 <th></th>
//               </tr>
//             </thead>
//             <tbody>
//               {mainProduct.map((product, index) => (
//                 <tr key={product.id}>
//                   <td>{index + 1}</td>
//                   <td>
//                     <img src={product.img} alt={product.content} />
//                   </td>
//                   <td>{product.content}</td>
//                   <td>{product.price}</td>
//                   <td>
//                     <button onClick={() => editProduct(product)} className="bg-yellow-100">
//                       Sửa
//                     </button>
//                   </td>
//                   <td>
//                     <button onClick={() => deleteProduct(product.id)} className="bg-red-200">
//                       Xóa
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </Table>
//         {adding && <ProductForm editing={editing} setAdding={setAdding} />}
//       </>
//     );
//   };
  
// const Table = styled.div`
// text-align:center;
// .admin-table {
//           width: 100%;
//           border-collapse: collapse;
//           font-family: Arial, sans-serif;
//         }
//         button{
//             width:100px;
//             heigth:100px;
//             border-radius:10px;
//         }
        
//         .admin-table th,
//         .admin-table td {
//           padding: 10px;
//           text-align: left;
//           border-bottom: 1px solid #ddd;
//         }
        
//         .admin-table th {
//           background-color: #f2f2f2;
//           font-weight: bold;
//         }
        
//         .admin-table img {
//           width: 100px;
//           height: auto;
//         }
//       `
// export default ProductAdmin
import { useDispatch, useSelector } from "react-redux";
import { SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import ProductForm from "./ProductForm";
import { instance } from "../../axios-instance";
import { getListProduct } from "../../slice/productSlice";
import { RootState } from "../../store";
import { useCheckLogin } from "../../hook/useCheckLogin";


const ProductAdmin = () => {
    const [isAdding, setAdding] = useState(false)
    const [isEdit, setEdit] = useState(false)
    const dispatch = useDispatch()
    const [editing, setEditing] = useState(null)

    function deleteProduct(id: number) {
            instance.delete(`/listproducts/${id}`).then(() => {
              dispatch(getListProduct());
            });
            console.log(id);
          }
          // function editProduct(product: SetStateAction<null>) {
          //   setAdding(true);
          //   console.log('edit',product);
          //   setEditing(product);
          // }
          // function addNewProduct() {
          //   setAdding(true);
          //   console.log(1)
            
          // }
    function closeForm() {
        setAdding(false)
    }

    function editProduct(product: SetStateAction<null>) {
        setEditing(product)
        setEdit(true)
    }

    // function deleteProduct(id: any) {
    //     instance.delete(`/listproducts/${id}`).then(() => {
    //         dispatch(getListProduct())
    //     })
    // }

    useEffect(() => {
        // @ts-ignore
        dispatch(getListProduct())
    }, [dispatch])

    const { mainProduct } = useSelector((state: RootState) => state.products)

    useCheckLogin();

    return <>
        <>
            <AdminPage>
                <DSSP>
                    <p>Danh sách sản phẩm</p>
                </DSSP>
                <ButtonAdd onClick={() => setAdding(true)}>Thêm sản phẩm</ButtonAdd>
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Price</th>
                  
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            mainProduct.map((product, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td><img src={product.img} /></td>
                                    <td>{product.content}</td>
                                    <td>{product.price}</td>
                                  
                                    <td>
                                        <ButtonEdit onClick={() => editProduct(product)}>Edit</ButtonEdit>
                                    </td>
                                    <td>
                                        <ButtonDelete onClick={() => deleteProduct(product.id)}>Delete</ButtonDelete>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </AdminPage>
            {
                // @ts-ignore
                isAdding && <ProductForm mainProduct={mainProduct} closeForm={closeForm} />
            }
            {
                // @ts-ignore
                isEdit && <ProductForm mainProduct={mainProduct} setAdding={setAdding} editing={editing} closeForm={() => setEdit(false)}/>
            }
        </>
    </>
}

const DSSP = styled.div`
    font-size: 25px;
    font-weight: bold;
`

const AdminPage = styled.div`
    margin: 0 75px;

    .admin-table {
        width: 100%;
        border-collapse: collapse;
    }
      
    .admin-table th, .admin-table td {
        padding: 10px;
        text-align: center;
        border-bottom: 1px solid #ddd;
    }
      
    .admin-table th {
        background-color: #f2f2f2;
        font-weight: bold;
    }
      
    .admin-table img {
        width: 99px;
        height: auto;
    }
`

const ButtonAdd = styled.button`
    background-color: #5CB85C;
    color: #fff;
    margin-top:10px;
    margin-bottom: 30px;
    heigth:40px;
    width:120px;
    border-radius:5px;
`

const ButtonEdit = styled.button`
    background-color: #F1AD4D;
    color: #fff;
    border-radius:5px;
    width:40px;
`
const ButtonDelete = styled.button`
    background-color: #D9534F;
    color: #fff;
    border-radius:5px;
    width:50px;
`



export default ProductAdmin