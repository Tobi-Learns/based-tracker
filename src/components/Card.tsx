import baselogo from "/src/assets/baselogo.png";

function Card() {
  return (
    <div className="card">
      <img className="card-image" src={baselogo} alt="token logo"></img>
      <h2 className="card-title">BASE</h2>
      <p className="card-text">
        Base is a secure, low-cost, builder-friendly Ethereum L2 built to bring
        the next billion users onchain.
      </p>
    </div>
  );
}

export default Card;
