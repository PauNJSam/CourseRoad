import IndicatorBottomDesign from '../images/IndicatorBottomDesign.png';

const DeleteConfirmation = (props) => {
    return(props.trigger)?(
        <div className="DeleteConfirmation" style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'fixed',
            width: '100%',
            height: '100%',
            top: '0',
            left: '0',
            zIndex: '1000',
        }}>
            <div style={{
                padding: '1.5rem',
                width: '95%',
                maxWidth: '350px',
                height: '50%',
                maxWeight: '600px',
                background: 'linear-gradient(135deg, #f7f7f7, #e5e5e5)',
                borderRadius: '12px',
                boxShadow: '0 10px 35px rgba(0, 0, 0, 0.15)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
            }}>
                {props.children}
                {/* <img src={IndicatorBottomDesign} alt="bottom design"/> */}
            </div>
        </div>
    ) : "";
};
export default DeleteConfirmation;