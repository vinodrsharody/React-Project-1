import styled from "styled-components";
import { Link } from 'react-router-dom';

export const NavigationContainer = styled.div`
  width: 100%;
  height: 80px;
  background: #fff;
  border-bottom: 2px solid #ccc;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  align-items: center;
  font-weight: bold;
`

export const LogoContainer = styled(Link)`
  flex: 0;
  color: #666;
`
export const NavLinks = styled.div`
    flex: auto;
    display: flex;
    justify-content: flex-end;
`
export const NavLink = styled(Link)`
  padding: 10px;
  color: #666;
  cursor: pointer;
`
