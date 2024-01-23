import styled from "styled-components"
const info = [
    {
        title:'Công ty',
        content:['Giới thiệu về ROUTINE','Tuyển dụng','Tin thời trang','Hợp tác nhượng quyền','Liên hệ'],
        getmore:'KẾT NỐI VỚI CHÚNG TÔI',
    },
    {
        title:'CHÍNH SÁCH KHÁCH HÀNG',
        content:['Chính sách khách hàng thân thiết','Chính sách đổi trả','Chính sách bảo hành','Chính sách bảo mật','Câu hỏi thường gặp','Hướng dẫn mua hàng online','Hướng dẫn kiểm tra hạng thẻ thành viên'],
        getmore:'',
    },
    {
        title:'THÔNG TIN CỬA HÀNG',
        content:['CỬA HÀNG THỨ 34','CỬA HÀNG THỨ 33','CỬA HÀNG THỨ 32'],
        getmore:'XEM TẤT CẢ CÁC CỬA HÀNG',
    },
]

const Footer = () => {
    return (
        <FooterContent>
            <Footer1>
                <img className='logo' src="https://routine.vn/media/amasty/webp/logo/websites/1/logo-black-2x_png.webp" alt="" />
                <p>CÔNG TY TNHH ROUTINE VIETNAM</p>
                <p>Mã Số Thuế: 0106486365</p>
                <p>Địa chỉ: tầng 5 Tòa nhà IMC, 62 Trần Quang Khải - Phường Tân Định - Quận 1 - TP Hồ Chí Minh.</p>
                <p>THAM GIA BẢNG TIN CỦA CHÚNG TÔI</p>
                <div>
                    <input type="text" placeholder="Nhập email của bạn" />
                    <button>Đăng ký</button>
                </div>
            </Footer1>
            <Footer2>
                <div className="ulitem">
                    {info.map((item, index) => (
                        <ItemInfo key={index}>
                            
                                <ul >{item.title}
                                    
                                    {item.content.map((content, contentIndex) => (
                                        <li key={contentIndex}>{content}</li>
                                    ))}
                                </ul>
                            
                        </ItemInfo>
                    ))}
                </div>
            </Footer2>
        </FooterContent>
    )
}
const FooterContent = styled.footer`
  background-color: #f5f5f5;
  padding: 20px;
`;

const Footer1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
    font-size:12px;
  .logo {
    width: 150px;
    height: auto;
    margin-bottom: 10px;
  }
  text-align:left;
  p {
    margin: 5px 0;
    font-size: 14px;
    color: #333;
  }

  div {
    display: flex;
    align-items: center;
    margin-top: 10px;

    input[type="text"] {
      width: 200px;
      padding: 5px;
      border: 1px solid #ccc;
      border-radius: 4px;
      margin-right: 10px;
      font-size: 14px;
    }

    button {
      padding: 5px 10px;
      background-color: #333;
      color: #fff;
      border: none;
      border-radius: 4px;
      font-size: 14px;
      cursor: pointer;
    }
  }
`;

const Footer2 = styled.div`
  display: flex;
  justify-content: center;

  .ulitem {
    display: flex;
    justify-content: space-between;
    width: 80%;

    ul {
      list-style: none;
    }
  }
`;

const ItemInfo = styled.div`
  ul {
    margin: 0;
    padding: 0;
  }

  li {
    margin-bottom: 5px;
    font-size: 13px;
    color: #333;
  }
`;
export default Footer