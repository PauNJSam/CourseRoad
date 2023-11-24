import ErrorPage from "../icons/ErrorPage"
import { useNavigate } from "react-router-dom";


const NoAccess = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="NoAccess">
        <div style={{
          maxWidth: "95vw", 
          margin: "0 auto", 
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
          <ErrorPage width='600px' />
          <div>
            <button type="button" style={{
              border: "none",
              background: "#F35251",
              color: "white",
              fontFamily: 'Inter',
              fontSize: "2rem",
              padding: "0.5rem 3rem",
              borderRadius: "5px",
              marginTop: "2rem",
              cursor: "pointer"
            }} onClick={goBack}>Go Back</button>
          </div>
        </div>
        
    </div>
  )
}

export default NoAccess