import styled from "styled-components";

function Logo() {
    return (
        <Wrapper>
            <WrapperLogo>
                <Img src={process.env.PUBLIC_URL +"/images/logo_vidal_i_barraquer.png"} alt='Logo Institut F. Vidal i Barraquer' />
                <NameApp>GIIF</NameApp>
            </WrapperLogo>
            <ImatgeLogo xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/>
            </ImatgeLogo>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 80%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    align-items: center;
`;

const WrapperLogo = styled.div`
    grid-column: 1 / 4;
    display: flex;
    align-items: center;
`;

const Img = styled.img`
    width: 2rem;
    height: 2rem;
`;

const NameApp = styled.span`
    font-size: 1.2rem;
    color: white;
`;

const ImatgeLogo = styled.svg`
    grid-column: 4 / -1;
    width: 20px;
    height: 20px;
    min-width: 20px;
    min-height: 20px;
    font-size: 20px;
    line-height: 20;
    fill: white;
`;
