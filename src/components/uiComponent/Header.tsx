import { useEffect, useState } from 'react';
import { RootState } from '../../store.ts';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { instance } from '../../axios-instance';
import { getListProduct, saveProduct } from '../../slice/productSlice';
import Cart from '../childrenComponent/Cart';
const Header = () => {
    const dispatch = useDispatch();
    // @ts-ignore
    const { products } = useSelector((state: RootState) => state.cart)  // useEffect(() => 
    const totalQuantity = products.reduce((acc, product) => acc + product.quantity, 0);
    const [searchInput,setSearchInput] = useState('');
    useEffect(() => {
        dispatch(getListProduct());
      }, [dispatch]);
    const handleSearch = () => {
        instance.get(`/listproducts?search=${searchInput}`).then(response => {
            // Cập nhật kết quả tìm kiếm vào sto
            const data = response.data
            dispatch(saveProduct(data));
            console.log('response', data)
        })
       
    }
    
    const [isBuying, setBuying] = useState(false)
    function confirmBuying() {
        setBuying(false)
    }
    function logout () {
        localStorage.removeItem("email")
    }
    function buying() {
        setBuying(true)
    }
    return (
        <Headerrr>
            <PageHeader>
                <button className='menu'><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzFfMTM5OCkiPgo8cGF0aCBkPSJNMTggNC44MDAxQzE4IDQuMTM3MzggMTcuNDYyNyAzLjYwMDEgMTYuOCAzLjYwMDFIMS4yQzAuNTM3MjgxIDMuNjAwMSAwIDQuMTM3MzggMCA0LjgwMDFDMCA1LjQ2MjgyIDAuNTM3MjgxIDYuMDAwMSAxLjIgNi4wMDAxSDE2LjhDMTcuNDYyNyA2LjAwMDEgMTggNS40NjI3NyAxOCA0LjgwMDFaTTEuMiAxMC44MDAxSDIyLjhDMjMuNDYyNyAxMC44MDAxIDI0IDExLjMzNzQgMjQgMTIuMDAwMUMyNCAxMi42NjI4IDIzLjQ2MjcgMTMuMjAwMSAyMi44IDEzLjIwMDFIMS4yQzAuNTM3MjgxIDEzLjIwMDEgMCAxMi42NjI4IDAgMTIuMDAwMUMwIDExLjMzNzQgMC41MzcyODEgMTAuODAwMSAxLjIgMTAuODAwMVpNMS4yIDE4LjAwMDFIMTJDMTIuNjYyNyAxOC4wMDAxIDEzLjIgMTguNTM3NCAxMy4yIDE5LjIwMDFDMTMuMiAxOS44NjI4IDEyLjY2MjcgMjAuNDAwMSAxMiAyMC40MDAxSDEuMkMwLjUzNzI4MSAyMC40MDAxIDAgMTkuODYyOCAwIDE5LjIwMDFDMCAxOC41Mzc0IDAuNTM3MjgxIDE4LjAwMDEgMS4yIDE4LjAwMDFaIiBmaWxsPSJibGFjayIvPgo8L2c+CjxkZWZzPgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzFfMTM5OCI+CjxyZWN0IHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgZmlsbD0id2hpdGUiIHRyYW5zZm9ybT0ibWF0cml4KC0xIDAgMCAxIDI0IDApIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg==" alt="" /></button>
                <img className='logo' src="https://routine.vn/media/amasty/webp/logo/websites/1/logo-black-2x_png.webp" alt="" />
                <HeaderContentRight>
                    <div className='search-input pt-2' >
                    <input type="text" value={searchInput} onChange={e => setSearchInput(e.target.value)} placeholder="  Tìm kiếm..."/>                        <p style={{ textAlign: 'left' }}>
                           <Link to={'/search'}>
                                <svg onClick={handleSearch} style={{ color: 'black', position: 'absolute', top: '25px',marginLeft:'220px' }} xmlns="http://www.w3.org/2000/svg"
                                        width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                        <path
                                            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                    </svg>
                           </Link>
                        </p>

                    </div>
                    <div className='icon-three'>
                    <div onClick={logout}>
                    <Link to="/login">
                        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE4LjM2IDEzLjY4MzJDMTcuMzY3MiAxMi4yOTIzIDE1Ljk4NzIgMTEuMjIxNiAxNC4zOTA2IDEwLjYwMzRDMTUuMjYzMSA5LjczNTMxIDE1Ljg1NzYgOC42Mjg4MiAxNi4wOTg5IDcuNDIzOTVDMTYuMzQwMSA2LjIxOTA4IDE2LjIxNzIgNC45Njk5OCAxNS43NDU4IDMuODM0NzFDMTUuMjc0NCAyLjY5OTQ0IDE0LjQ3NTYgMS43MjkwMiAxMy40NTA1IDEuMDQ2MjRDMTIuNDI1NCAwLjM2MzQ2OSAxMS4yMiAtMC4wMDA5NzY1NjMgOS45ODY5OCAtMC4wMDA5NzY1NjJDOC43NTM5NCAtMC4wMDA5NzY1NjMgNy41NDg2MSAwLjM2MzQ2OSA2LjUyMzUgMS4wNDYyNEM1LjQ5ODM5IDEuNzI5MDIgNC42OTk1OCAyLjY5OTQ0IDQuMjI4MTUgMy44MzQ3MUMzLjc1NjcyIDQuOTY5OTggMy42MzM4NSA2LjIxOTA4IDMuODc1MDkgNy40MjM5NUM0LjExNjMzIDguNjI4ODIgNC43MTA4NCA5LjczNTMxIDUuNTgzMzkgMTAuNjAzNEMzLjkzODk5IDExLjI0OTIgMi41MjczNiAxMi4zNzI2IDEuNTMxNzMgMTMuODI3N0MwLjUzNjA5NSAxNS4yODI5IDAuMDAyNDMwMDkgMTcuMDAyNyAwIDE4Ljc2MzlDMCAxOS4wOTE1IDAuMTMwNjE5IDE5LjQwNTcgMC4zNjMxMjEgMTkuNjM3NEMwLjU5NTYyMyAxOS44NjkgMC45MTA5NjYgMTkuOTk5MiAxLjIzOTc3IDE5Ljk5OTJDMS41Njg1OCAxOS45OTkyIDEuODgzOTIgMTkuODY5IDIuMTE2NDMgMTkuNjM3NEMyLjM0ODkzIDE5LjQwNTcgMi40Nzk1NSAxOS4wOTE1IDIuNDc5NTUgMTguNzYzOUMyLjQ4MTE1IDE3LjA5MDEgMy4xNDkxNCAxNS40ODUzIDQuMzM2OTIgMTQuMzAxNkM1LjUyNDcgMTMuMTE4IDcuMTM1MjQgMTIuNDUyMyA4LjgxNTA4IDEyLjQ1MDZIMTEuMTg1OEMxMi44NjU0IDEyLjQ1MjggMTQuNDc1NiAxMy4xMTg3IDE1LjY2MzEgMTQuMzAyMkMxNi44NTA3IDE1LjQ4NTggMTcuNTE4NiAxNy4wOTAzIDE3LjUyMDQgMTguNzYzOUMxNy41MjA0IDE5LjA5MTUgMTcuNjUxMSAxOS40MDU3IDE3Ljg4MzYgMTkuNjM3NEMxOC4xMTYxIDE5Ljg2OSAxOC40MzE0IDE5Ljk5OTIgMTguNzYwMiAxOS45OTkyQzE5LjA4OSAxOS45OTkyIDE5LjQwNDQgMTkuODY5IDE5LjYzNjkgMTkuNjM3NEMxOS44Njk0IDE5LjQwNTcgMjAgMTkuMDkxNSAyMCAxOC43NjM5QzE5Ljk5ODMgMTYuOTQxMyAxOS40MjQ5IDE1LjE2NDkgMTguMzYgMTMuNjgzMlpNMTMuNzE5MyA2LjI0MjA0QzEzLjcxOTMgNy4xMDI1NCAxMy40MTk5IDcuOTM2NDMgMTIuODcyIDguNjAxNjJDMTIuMzI0MiA5LjI2NjggMTEuNTYxOCA5LjcyMjEzIDEwLjcxNDggOS44OTAwMkM5Ljg2NzggMTAuMDU3OSA4Ljk4ODU3IDkuOTI3OTcgOC4yMjY5MyA5LjUyMjM1QzcuNDY1MyA5LjExNjcyIDYuODY4MzggOC40NjA1IDYuNTM3ODggNy42NjU1QzYuMjA3MzggNi44NzA1MSA2LjE2Mzc1IDUuOTg1OTIgNi40MTQ0MyA1LjE2MjQ2QzYuNjY1MTEgNC4zMzkwMSA3LjE5NDU5IDMuNjI3NjQgNy45MTI2NCAzLjE0OTU2QzguNjMwNyAyLjY3MTQ4IDkuNDkyOSAyLjQ1NjI3IDEwLjM1MjMgMi41NDA2MUMxMS4yMTE4IDIuNjI0OTQgMTIuMDE1MyAzLjAwMzYgMTIuNjI2IDMuNjEyMDZDMTIuOTczNyAzLjk1NjYgMTMuMjQ5NCA0LjM2NjQ2IDEzLjQzNzEgNC44MTc5QzEzLjYyNDggNS4yNjkzNSAxMy43MjA3IDUuNzUzNCAxMy43MTkzIDYuMjQyMDRaIiBmaWxsPSIjNDY0NjQ2Ii8+Cjwvc3ZnPgo=" alt="" /></Link>
                    </div>
                    <div>
                        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAyMCAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xLjYzMTY2IDkuNTk2NDdDMC41ODY3NzMgOC41NDIzMiAwIDcuMTE3NTYgMCA1LjYzMjA4QzAgNC4xMzgzNiAwLjU5Mjk0OCAyLjcwNTM4IDEuNjQ5MTYgMS42NDkxN0MyLjcwNTM2IDAuNTkyOTYgNC4xMzgzNSAwIDUuNjMyMDcgMEM3LjEyNTc5IDAgOC41NTg3OCAwLjU5Mjk2IDkuNjE0OTkgMS42NDkxN0w5Ljk5OTk5IDIuMDM0MThMMTAuMzg1IDEuNjQ5MTdDMTEuNDQxMiAwLjU5Mjk2IDEyLjg3MzIgMCAxNC4zNjY5IDBDMTUuODYxNiAwIDE3LjI5MzYgMC41OTI5NiAxOC4zNDk4IDEuNjQ5MTdDMTkuNDA2IDIuNzA1MzggMjAgNC4xMzgzNiAyMCA1LjYzMjA4QzIwIDcuMTE3NTYgMTkuNDEzMiA4LjU0MjMyIDE4LjM2NzMgOS41OTY0N0wxMC43MjY4IDE3LjY4NjlDMTAuNTM4NCAxNy44ODY2IDEwLjI3NDkgMTcuOTk5OCA5Ljk5OTk5IDE3Ljk5OThDOS43MjUxMyAxNy45OTk4IDkuNDYxNiAxNy44ODY2IDkuMjczMjEgMTcuNjg2OUwxLjYzMTY2IDkuNTk2NDdaTTkuOTk5OTkgMTUuNTQzNkwxNi45MTU4IDguMjIxMTNMMTYuOTM2NCA4LjIwMDU0QzE3LjYxNjggNy41MTkwNSAxNy45OTk4IDYuNTk1NjQgMTcuOTk5OCA1LjYzMjA4QzE3Ljk5OTggNC42Njg1MiAxNy42MTY4IDMuNzQ1MTEgMTYuOTM2NCAzLjA2MzYyQzE2LjI1NDkgMi4zODIxMyAxNS4zMzA1IDEuOTk5MTggMTQuMzY2OSAxLjk5OTE4QzEzLjQwNDQgMS45OTkxOCAxMi40Nzk5IDIuMzgyMTMgMTEuNzk4NCAzLjA2MzYyTDEwLjcwNzIgNC4xNTU4NkMxMC4zMTYgNC41NDYwMiA5LjY4MjkzIDQuNTQ2MDIgOS4yOTI3NyA0LjE1NTg2TDguMjAwNTMgMy4wNjM2MkM3LjUyMDA2IDIuMzgyMTMgNi41OTU2MyAxLjk5OTE4IDUuNjMyMDcgMS45OTkxOEM0LjY2ODUxIDEuOTk5MTggMy43NDUxMSAyLjM4MjEzIDMuMDYzNjIgMy4wNjM2MkMyLjM4MjEzIDMuNzQ1MTEgMi4wMDAyIDQuNjY4NTIgMi4wMDAyIDUuNjMyMDhDMi4wMDAyIDYuNTk1NjQgMi4zODIxMyA3LjUxOTA1IDMuMDYzNjIgOC4yMDA1NEMzLjA3MDgyIDguMjA3NzUgMy4wNzcgOC4yMTM5MiAzLjA4MzE3IDguMjIxMTNMOS45OTk5OSAxNS41NDM2WiIgZmlsbD0iIzQ2NDY0NiIvPgo8L3N2Zz4K" alt="" />
                    </div>
                    <div className='icon-cart' onClick={buying}>
                        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMSAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzFfMTQwNikiPgo8cGF0aCBkPSJNMTYuMTg0NyAxMy45ODY4SDE2LjE4MkMxNS4zOTczIDEzLjk5NjUgMTQuNjQ4MSAxNC4zMTc2IDE0LjA5NjYgMTQuODgwNEMxMy41NDUxIDE1LjQ0MzIgMTMuMjM1OCAxNi4yMDI0IDEzLjIzNTggMTYuOTkzNUMxMy4yMzU4IDE3Ljc4NDYgMTMuNTQ1MSAxOC41NDM4IDE0LjA5NjYgMTkuMTA2NkMxNC42NDgxIDE5LjY2OTQgMTUuMzk3MyAxOS45OTA0IDE2LjE4MiAyMC4wMDAxQzE2Ljk2NjcgMTkuOTkwOCAxNy43MTYxIDE5LjY3MDEgMTguMjY3OSAxOS4xMDc1QzE4LjgxOTYgMTguNTQ1IDE5LjEyOTIgMTcuNzg1OSAxOS4xMjk2IDE2Ljk5NDhDMTkuMTI5OSAxNi4yMDM4IDE4LjgyMSAxNS40NDQ0IDE4LjI2OTggMTQuODgxM0MxNy43MTg2IDE0LjMxODMgMTYuOTY5NCAxMy45OTY5IDE2LjE4NDcgMTMuOTg2OFpNMTYuOTk5NSAxNi45OTMzQzE2Ljk5OTcgMTcuMTAxMiAxNi45Nzg3IDE3LjIwODEgMTYuOTM3NyAxNy4zMDc5QzE2Ljg5NjggMTcuNDA3NiAxNi44MzY2IDE3LjQ5ODIgMTYuNzYwOCAxNy41NzQ0QzE2LjYwNzcgMTcuNzI4MyAxNi40MDA1IDE3LjgxNDkgMTYuMTg0MyAxNy44MTU1QzE2LjA3NTYgMTcuODE4IDE1Ljk2NzUgMTcuNzk4NyAxNS44NjYzIDE3Ljc1ODVDMTUuNzY1MSAxNy43MTg0IDE1LjY3MjkgMTcuNjU4MyAxNS41OTUyIDE3LjU4MTdDMTUuNTE3NCAxNy41MDUxIDE1LjQ1NTYgMTcuNDEzNiAxNS40MTM0IDE3LjMxMjZDMTUuMzcxMiAxNy4yMTE2IDE1LjM0OTUgMTcuMTAzMSAxNS4zNDk1IDE2Ljk5MzVDMTUuMzQ5NSAxNi44ODM5IDE1LjM3MTIgMTYuNzc1NCAxNS40MTM0IDE2LjY3NDRDMTUuNDU1NiAxNi41NzM0IDE1LjUxNzQgMTYuNDgxOSAxNS41OTUyIDE2LjQwNTNDMTUuNjcyOSAxNi4zMjg3IDE1Ljc2NTEgMTYuMjY4NiAxNS44NjYzIDE2LjIyODRDMTUuOTY3NSAxNi4xODgzIDE2LjA3NTYgMTYuMTY4OSAxNi4xODQzIDE2LjE3MTVDMTYuNDAwNCAxNi4xNzIxIDE2LjYwNzUgMTYuMjU4NSAxNi43NjA4IDE2LjQxMjFDMTYuODM2NiAxNi40ODgzIDE2Ljg5NjggMTYuNTc4OSAxNi45Mzc3IDE2LjY3ODZDMTYuOTc4NyAxNi43Nzg0IDE2Ljk5OTcgMTYuODg1MyAxNi45OTk1IDE2Ljk5MzNaIiBmaWxsPSIjNDY0NjQ2Ii8+CjxwYXRoIGQ9Ik0yMC43NzM1IDQuMTM0ODdDMjAuNjcyNiA0LjAwMjQxIDIwLjU0MjggMy44OTUxNyAyMC4zOTQyIDMuODIxNTFDMjAuMjQ1NSAzLjc0Nzg0IDIwLjA4MiAzLjcwOTcyIDE5LjkxNjQgMy43MTAxMkg2LjY0MjM3TDYuMjIyMzcgMi4wNTExNUg2LjIxODMxQzYuMDM1NjggMS40NTcyNiA1LjY2OTE4IDAuOTM3OTQ1IDUuMTcyNTEgMC41NjkyNzRDNC42NzU4NCAwLjIwMDYwMyA0LjA3NTExIDAuMDAxOTU4MjMgMy40NTgzMSAwLjAwMjQ0MjI5SDEuMDgyMjJDMC43OTUwNjcgMC4wMDI0NDIyOSAwLjUxOTY3NSAwLjExNzQzMiAwLjMxNjYyOCAwLjMyMjExNUMwLjExMzU4MSAwLjUyNjc5OCAtMC4wMDA0ODgyODEgMC44MDQ0MDcgLTAuMDAwNDg4MjgxIDEuMDkzODdDLTAuMDAwNDg4MjgxIDEuMzgzMzQgMC4xMTM1ODEgMS42NjA5NSAwLjMxNjYyOCAxLjg2NTYzQzAuNTE5Njc1IDIuMDcwMzEgMC43OTUwNjcgMi4xODUzIDEuMDgyMjIgMi4xODUzSDMuNDU1MTVDMy42MTU1NCAyLjE4NDgyIDMuNzcxNTMgMi4yMzgyIDMuODk4NDcgMi4zMzcwMkM0LjAyNTQyIDIuNDM1ODQgNC4xMTYxMSAyLjU3NDQ3IDQuMTU2MiAyLjczMTAyTDYuMjc2NTEgMTEuMTUzMkM2LjQzNjU4IDExLjc3ODQgNi43OTgxNiAxMi4zMzIzIDcuMzA0NDMgMTIuNzI3OEM3LjgxMDcxIDEzLjEyMzMgOC40MzI5OCAxMy4zMzgxIDkuMDczNSAxMy4zMzg0SDE2LjU0MUMxNy4xNzc3IDEzLjMzODUgMTcuNzk2NiAxMy4xMjY1IDE4LjMwMTQgMTIuNzM1NEMxOC44MDYyIDEyLjM0NDIgMTkuMTY4NiAxMS43OTU4IDE5LjMzMjEgMTEuMTc1NUwyMC45NjAzIDUuMDc4MDVDMjEuMDAzMSA0LjkxNjk0IDIxLjAwODYgNC43NDgwNCAyMC45NzYyIDQuNTg0NDZDMjAuOTQzOCA0LjQyMDg4IDIwLjg3NDUgNC4yNjcwMyAyMC43NzM1IDQuMTM0ODdaTTE3LjI0NDggMTAuNjAwN0MxNy4yMDQ5IDEwLjc1NjYgMTcuMTE0OCAxMC44OTQ3IDE2Ljk4ODcgMTAuOTkzNEMxNi44NjI1IDExLjA5MjIgMTYuNzA3NSAxMS4xNDYgMTYuNTQ3OCAxMS4xNDY0SDkuMDc3MUM4LjkxNjk0IDExLjE0NjYgOC43NjEyNyAxMS4wOTMxIDguNjM0NiAxMC45OTQzQzguNTA3OTMgMTAuODk1NSA4LjQxNzQ1IDEwLjc1NyA4LjM3NzQxIDEwLjYwMDdMNy4xOTI3NCA1Ljg4Mzg5SDE4LjUwNDhMMTcuMjQ1MiAxMC42MDA3SDE3LjI0NDhaIiBmaWxsPSIjNDY0NjQ2Ii8+CjxwYXRoIGQ9Ik04Ljc4NzU5IDEzLjk4NjNIOC43NzU0MUM3Ljk4Njc2IDEzLjk5IDcuMjMxNjQgMTQuMzA4MyA2LjY3NTA4IDE0Ljg3MTVDNi4xMTg1MiAxNS40MzQ4IDUuODA1NzYgMTYuMTk3MiA1LjgwNTE4IDE2Ljk5MjJDNS44MDUxMiAxNy4zODcxIDUuODgyMjIgMTcuNzc4IDYuMDMyMDggMTguMTQyOEM2LjE4MTk0IDE4LjUwNzYgNi40MDE2MiAxOC44MzkxIDYuNjc4NTggMTkuMTE4MkM2Ljk1NTUzIDE5LjM5NzQgNy4yODQzMyAxOS42MTg5IDcuNjQ2MiAxOS43Njk5QzguMDA4MDcgMTkuOTIxIDguMzk1OTEgMTkuOTk4NyA4Ljc4NzU5IDE5Ljk5ODdIOC43OTE2NUM5LjU3NjM0IDE5Ljk4ODQgMTAuMzI1NCAxOS42NjY5IDEwLjg3NjUgMTkuMTAzN0MxMS40Mjc2IDE4LjU0MDUgMTEuNzM2NCAxNy43ODExIDExLjczNTggMTYuOTlDMTEuNzM1MyAxNi4xOTg5IDExLjQyNTUgMTUuNDM5OSAxMC44NzM3IDE0Ljg3NzVDMTAuMzIxOCAxNC4zMTUxIDkuNTcyMjkgMTMuOTk0NSA4Ljc4NzU5IDEzLjk4NTRWMTMuOTg2M1pNNy45NzI0IDE2Ljk5MzJDNy45Njk4NSAxNi44ODQ0IDcuOTg4OTEgMTYuNzc2MiA4LjAyODQ1IDE2LjY3NDlDOC4wNjc5OCAxNi41NzM2IDguMTI3MiAxNi40ODE0IDguMjAyNjMgMTYuNDAzNUM4LjI3ODA1IDE2LjMyNTcgOC4zNjgxNiAxNi4yNjM4IDguNDY3NjUgMTYuMjIxNkM4LjU2NzE0IDE2LjE3OTMgOC42NzQgMTYuMTU3NiA4Ljc4MTk1IDE2LjE1NzZDOC44ODk5IDE2LjE1NzYgOC45OTY3NSAxNi4xNzkzIDkuMDk2MjQgMTYuMjIxNkM5LjE5NTczIDE2LjI2MzggOS4yODU4MyAxNi4zMjU3IDkuMzYxMjYgMTYuNDAzNUM5LjQzNjY5IDE2LjQ4MTQgOS40OTU5MSAxNi41NzM2IDkuNTM1NDUgMTYuNjc0OUM5LjU3NDk5IDE2Ljc3NjIgOS41OTQwNCAxNi44ODQ0IDkuNTkxNDkgMTYuOTkzMlYxNy4xMjk2QzkuNTU3NiAxNy4zMzI5IDkuNDQ5MTYgMTcuNTE1OSA5LjI4NzY3IDE3LjY0MjNDOS4xMjYxOSAxNy43Njg4IDguOTIzNDUgMTcuODI5NCA4LjcxOTY4IDE3LjgxMjNDOC41MTU5MSAxNy43OTUxIDguMzI1OTggMTcuNzAxMyA4LjE4NzU2IDE3LjU0OTZDOC4wNDkxNCAxNy4zOTc5IDcuOTcyMzQgMTcuMTk5MyA3Ljk3MjQgMTYuOTkzMloiIGZpbGw9IiM0NjQ2NDYiLz4KPC9nPgo8ZGVmcz4KPGNsaXBQYXRoIGlkPSJjbGlwMF8xXzE0MDYiPgo8cmVjdCB3aWR0aD0iMjEiIGhlaWdodD0iMjAiIGZpbGw9IndoaXRlIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg==" alt="" />
                        {totalQuantity !== 0 && (
                            <span>
                                {totalQuantity}
                            </span>)}
                    </div>
                    {
                        isBuying && <Cart  setBuying={setBuying} confirmBuying={confirmBuying} quantity={0} />
                    }
                    </div>
                </HeaderContentRight>
            </PageHeader>

        </Headerrr>
    )
}

const PageHeader = styled.div`
    margin-bottom:50px;
    display:flex;
    flex-direction:row;
    align-items: center;
    .logo{
        margin:0 auto;
        width:10%;
        height:20%;        
    }
    .menu{
        position: absolute;
        left:20px;
    }
    .icon-cart {
        position: relative;
        display: inline-block;
      }
      .icon-cart span {
        position: absolute;
        top: 5px; 
        right: 5px; 
       display: inline-block;
       width: 12px;
       height: 12px;
       border-radius: 50%;
       background-color: red;
       color: white;
       text-align: center;
       line-height: 12px;
       font-size:8px;
      }
`
const Headerrr = styled.div`
     
`
const HeaderContentRight = styled.div`
    position: absolute;
    display:flex;
    flex-direction:row;
    right:20px;
    margin:10px;
    margin-top:40px;
    
      .icon-three{
        display:flex;
        flex-direction:row;
        margin-top:15px;
      }  
    
    img{
        margin:10px;
    }
    input{
        width:250px;
        border:0;
        margin-top:15px;
    }
   
`
export default Header