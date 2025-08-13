import { useLocation, useNavigate } from 'react-router-dom';

export default function CheckoutSuccess() {
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
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
        {/* Success Icon */}
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #4CAF50, #45a049)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 30px',
          boxShadow: '0 10px 20px rgba(76, 175, 80, 0.3)'
        }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Success Message */}
        <h1 style={{
          color: '#2c3e50',
          fontSize: '2.5rem',
          fontWeight: '700',
          margin: '0 0 20px',
          background: 'linear-gradient(135deg, #4CAF50, #45a049)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Payment Successful!
        </h1>

        <p style={{
          color: '#7f8c8d',
          fontSize: '1.1rem',
          lineHeight: '1.6',
          margin: '0 0 40px',
          fontWeight: '400'
        }}>
          Thank you for subscribing with <strong style={{ color: '#2c3e50' }}>{getGatewayName()}</strong>. 
          Your account is now active and ready to use.
        </p>

        {/* Action Button */}
        <button 
          onClick={() => navigate('/tutor-dashboard/home')}
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '50px',
            padding: '15px 40px',
            fontSize: '1.1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
            minWidth: '200px'
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
          Go to Dashboard
        </button>

        {/* Decorative Elements */}
        <div style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
          zIndex: '-1'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '-30px',
          left: '-30px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(69, 160, 73, 0.1))',
          zIndex: '-1'
        }}></div>
      </div>
    </div>
  );
} 