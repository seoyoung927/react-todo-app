import { Link } from "react-router-dom";
import styled from "styled-components";

const HeaderWrapper = styled.ul`
    background-color: #FFFBE9;
    position: fixed;
    width: 100vw;
    height: 40px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 8px;
    li{
        cursor: pointer;
        padding: 8px;
        margin: 0px 8px;
        float: left;
        border-radius: 16px;
        &:hover{
            background-color: #F4EAD5;;
        }
    }
    a{
        text-decoration: none;
        color: inherit;
        &:visited{
            color: inherit;
        }
    }
`;

function Header() {
    return (<HeaderWrapper>
        <Link to={`${process.env.PUBLIC_URL}`}>
            <li>
                할일 관리
            </li>
        </Link>
        <Link to={`${process.env.PUBLIC_URL}/category`}>
            <li>
                카테고리 관리
            </li>
        </Link>
    </HeaderWrapper>);
}

export default Header;
