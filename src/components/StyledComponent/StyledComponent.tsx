import styled from 'styled-components'
const StyledComponent = ({ primary = false }) => {
    const Header = styled.div`
    display: flex;
    width: 100%;
    height: 50px;
  `;
    const HeaderSide = styled.div`
    display: flex;
    width: calc(50% - 80px);
  `;
    const NavItem = styled.div`
    width: fit-content;
    font-size: 16px;
    padding: 10px;
    &:hover {
      color: rgb(0, 106, 255);
    }
  `;
    const Banner = styled.div`
    width: 100%;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  `;

    const SearchInput = styled.input`
    height: 50px;
    padding: 10px;
    width: 50%;
    position: absolute;
    top: calc(50% - 25px);
    left: 25%;
  `;

    const CardContainer = styled.div`
    margin-top: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 500px;
  `;
    const FeatureCard = styled.div`
    width: 32%;
    height: 450px;
    box-shadow: rgb(0 0 0 / 30%) 0px 2px 4px 0px;
    padding: 5px;
    transition: all 0.5s;
    &:hover {
      transition: all 0.5s;
      height: 470px;
      width: 35%;
    }
  `;

    const CardTitle = styled.p`
    font-size: 24px;
    font-weight: 700;
    padding: 10px;
  `;
    const CardDes = styled.p`
    height: calc(100% - 276px);
    width: 280px;
    text-align: center;
    margin: auto;
  `;
    const Button = styled.button`
    /* Adapt the colors based on primary prop */
    background: ${(props) => (primary ? "palevioletred" : "white")};
    color: ${(props) => (primary ? "white" : "palevioletred")};
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 1px solid rgb(0, 106, 255);
    color: rgb(0, 106, 255);
    font-weight: 700;
    border-radius: 3px;
    ${FeatureCard}:hover & {
        background-color:rgb(0, 106, 255);
        color:white;
    }
  `;
    const cardList = [
        {
            title: "Buy a home",
            des: "Find your place with an immersive photo experience and the most listings, including things you won’t find anywhere else.",
            btn: "Browse Home",
            // img: `${process.env.PUBLIC_URL}/buy.png`,
        },
        {
            title: "Sell a home",
            des: "No matter what path you take to sell your home, we can help you navigate a successful sale.",
            btn: "See your option",
            // img: `${process.env.PUBLIC_URL}/sell.png`,
        },
        {
            title: "Rent a home",
            des: "Discover a place that checks all of your boxes. Filter your rental search, and find exactly what you’re looking for.",
            btn: "Find Rental",
            // img: `${process.env.PUBLIC_URL}/rent.png`,
        },
    ];
    return (
        <div>
            <Header>
                <HeaderSide>
                    <NavItem>Buy</NavItem>
                    <NavItem>Rent</NavItem>
                    <NavItem>Sell</NavItem>
                    <NavItem>Home Loans</NavItem>
                    <NavItem>Agent finder</NavItem>
                </HeaderSide>

                <div>
                    <img
                        alt="alt"
                        // src={`${process.env.PUBLIC_URL}/zlogo.svg`}
                        style={{ height: "35px", width: "160px" }}
                    />
                </div>
                <HeaderSide style={{ justifyContent: "flex-end" }}>
                    <NavItem>Manage rentals</NavItem>
                    <NavItem>Advertise</NavItem>
                    <NavItem>Help</NavItem>
                    <NavItem>Sign in</NavItem>
                </HeaderSide>
            </Header>
            <Banner>
                <img
                    alt="alt"
                    // src={`${process.env.PUBLIC_URL}/zbanner.png`}
                    style={{ height: "100%", width: "100%" }}
                />
                <SearchInput placeholder="Enter an address, neighborhood, city, or ZIP code"></SearchInput>
            </Banner>
            <CardContainer>
                {cardList.map((i, ind) => (
                    <FeatureCard key={ind}>
                        {/* <img
                            alt="alt"
                            src={i.img}
                            style={{ height: "160px", width: "285px" }}
                        /> */}
                        <CardTitle>{i.title}</CardTitle>
                        <CardDes>{i.des}</CardDes>
                        <Button>{i.btn}</Button>
                    </FeatureCard>
                ))}
            </CardContainer>

            {/* <Button primary={true}>Primary</Button> */}
        </div>
    );
};

export default StyledComponent;