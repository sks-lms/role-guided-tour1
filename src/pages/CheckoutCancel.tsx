import { useNavigate, useLocation } from 'react-router-dom';

export default function CheckoutCancel() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const gateway = params.get('gateway') || 'ipay';

  const getGatewayName = () => {
    return gateway === 'stripe' ? 'Stripe' : 'iPay';
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '40px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        textAlign: 'center',
        maxWidth: '500px',
        width: '100%',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Cancel Icon */}
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #ff6b6b, #ee5a52)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 30px',
          boxShadow: '0 10px 20px rgba(255, 107, 107, 0.3)'
        }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Cancel Message */}
        <h1 style={{
          color: '#2c3e50',
          fontSize: '2.5rem',
          fontWeight: '700',
          margin: '0 0 20px',
          background: 'linear-gradient(135deg, #ff6b6b, #ee5a52)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Payment Cancelled
        </h1>

        <p style={{
          color: '#7f8c8d',
          fontSize: '1.1rem',
          lineHeight: '1.6',
          margin: '0 0 40px',
          fontWeight: '400'
        }}>
          Your <strong style={{ color: '#2c3e50' }}>{getGatewayName()}</strong> payment was cancelled. 
          You can try again or contact support if you need help.
        </p>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          gap: '15px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button 
            onClick={() => navigate('/')}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '50px',
              padding: '15px 30px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
              minWidth: '150px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 35px rgba(102, 126, 234, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.3)';
            }}
          >
            Return Home
          </button>

          <button 
            onClick={() => navigate('/payment')}
            style={{
              background: 'linear-gradient(135deg, #ff6b6b, #ee5a52)',
              color: 'white',
              border: 'none',
              borderRadius: '50px',
              padding: '15px 30px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 25px rgba(255, 107, 107, 0.3)',
              minWidth: '150px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 35px rgba(255, 107, 107, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 107, 107, 0.3)';
            }}
          >
            Try Again
          </button>
        </div>

        {/* Decorative Elements */}
        <div style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(255, 154, 158, 0.1), rgba(254, 207, 239, 0.1))',
          zIndex: '-1'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '-30px',
          left: '-30px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.1), rgba(238, 90, 82, 0.1))',
          zIndex: '-1'
        }}></div>
      </div>
    </div>
  );
} 