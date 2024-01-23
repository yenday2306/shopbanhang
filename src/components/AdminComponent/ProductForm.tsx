// import { SubmitHandler, useForm } from "react-hook-form"
// import { FC } from "react";
// import { useDispatch } from "react-redux";
// import styled from "styled-components";
// import { TypeProduct } from "../uiComponent/Products";
// import { instance } from "../../axios-instance";
// import { getListProduct } from "../../slice/productSlice";

// const ProductForm: FC<{setAdding(values:boolean):void, products?: TypeProduct[] ,editing:any}> = ({ products,setAdding ,editing}) => {
//     const {
//       register,
//       handleSubmit,
//       reset,
//       formState: { errors },
//     } = useForm({
//       defaultValues: editing || {},
//     });
//     const dispatch = useDispatch();
//     function closeform () {
//       // @ts-ignore
//       setAdding(false)
//     }
//     console.log('hanh dong edit',editing)
//     const onSubmit: SubmitHandler<TypeProduct[]> = (data) => {
//       if (editing) {
//           // Case edit
//           instance.put(`/listproducts/${editing?.id}`, data).then(() => {
//             setAdding(false);
//             reset();
//               //@ts-ignore
//               dispatch(getListProduct());
//           });
//           setAdding(false);
//       } else {
//           // Case create
//           instance.post("/listproducts", data).then(() => {
//               reset();
//               //@ts-ignore
//               dispatch(getListProduct());
//               setAdding(false);
//           });
//       }
//   }

//     return (
//       <Form className="bg-red-200 text-center mt-[100px] ">
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div>
//             <p className="text-black">Ảnh:</p>
//             <input
//               type="text"
//               {...register("img", { required: true })}
//               className="bg-white text-black border-solid border-2 border-black "
//             />
//           </div>
//           <div>
//             <p className="text-black">Tên:</p>
//             <input
//               type="text"
//               {...register("content", { required: true })}
//               className="bg-white text-black border-solid border-2 border-black"
//             />
//           </div>
//           <div>
//             <p className="text-black">Giá:</p>
//             <input
//               type="text"
//               {...register("price", { required: true })}
//               className="bg-white text-black border-solid border-2 border-black "
//             />
//           </div>
//           <button type="submit" className="bg-black mt-12 text-white w-full h-[40px]">
//             Submit
//           </button>
//           <button
//             type="button"
//             onClick={closeform}
//             className="bg-black mt-2 text-white w-full h-[40px]"
//           >
//             Close
//           </button>
//         </form>
//       </Form>
//     );
//   };
//   const Form = styled.div`
//   position: fixed;
//   top: 40px;
//   left: 35vw;
//   font-size:12px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
  
//   form{
//       width:30vw;
//   }
//   `
//   export default ProductForm;
import { SubmitHandler, useForm } from "react-hook-form";
import { FC } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { TypeProduct } from "../uiComponent/Products";
import { instance } from "../../axios-instance";


const ProductForm: FC<{ closeForm: () => void, mainProduct?: Array<TypeProduct>, editing: any, setAdding(values: boolean): void }> = ({ closeForm, editing, setAdding }) => {
    //@ts-ignore
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        //@ts-ignore
        defaultValues: editing || {}
    });

    const dispatch = useDispatch()

    const onSubmit: SubmitHandler<TypeProduct[]> = (data) => {
        if (editing) {
            // Case edit
            instance.put(`/listproducts/${editing?.id}`, data).then(() => {
                closeForm();
                reset();
                //@ts-ignore
                dispatch(getListProduct());
                 setAdding(false);

            });
            setAdding(false);
        } else {
            // Case create
            instance.post("/listproducts", data).then(() => {
                closeForm();
                reset();
                //@ts-ignore
                dispatch(getListProduct());
                setAdding(false);
            });
        }
    }

    return <Form>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form">
                <p>Image:</p>
                {/* @ts-ignore */}
                <input type="text" {...register("img", { required: true })} />
            </div>
            <div className="form">
                <p>Title:</p>
                {/* @ts-ignore */}
                <input type="text" {...register("content", { required: true })} />
            </div>
            <div className="form">
                <p>Price:</p>
                {/* @ts-ignore */}
                <input type="text" {...register("price", { required: true })} />
            </div>
            
            
            <ButtonSubmit type="submit">Submit</ButtonSubmit>
            <ButtonClose onClick={closeForm}>Close</ButtonClose>
        </form>
    </Form>
}

const Form = styled.div`
    position: fixed;
    top: 11vh;
    left: 20vw;
    width: 50vw;
    background-color: #fff;

    div {
        display: flex;
        flex-direction: row;
    }

    p {
        margin-left: 50px;
        width: 5vw;
        font-weight: bold;
    }

    input {
        margin-top: 20px;
        margin-left: 50px;
        width: 35vw;
    }
    
    button {
        margin-bottom: 20px;
        margin-left: 200px;
    }
`
const ButtonSubmit = styled.button`
    background-color: #5BC0DE;
    color: #fff;
`

const ButtonClose = styled.button`
    background-color: #D9534F;
    color: #fff;
`
export default ProductForm