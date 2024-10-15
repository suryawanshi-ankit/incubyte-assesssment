import { styled } from '@mui/system';

const Header = () => {
    return (
        <HeaderWrapper>
            <h1>Incubyte TDD Assessment - Frontend</h1>
        </HeaderWrapper>
    )
}

const HeaderWrapper = styled('div')({
    display: "flex",
    justifyContent: "center",
});

export default Header;
