import { BlueLoader } from '@/components/Common/Loaders';
import React, { useEffect } from 'react';

const CalendlyWidget = ({ name, email }: any) => {
  
  const [loading, setLoading] = React.useState(true);


  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    
    document.body.appendChild(script);
    setTimeout(() => setLoading(false), 1000);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Construct Calendly URL with name and email parameters
  const calendlyUrl = `https://calendly.com/yeppai/yepp-introduction-call?hide_event_type_details=1&hide_gdpr_banner=1&name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`;

  return (
    <div  className='lg:w-9/12 w-full min-h-[35rem] shadow rounded-[35px] overflow-hidden'  style={{ boxShadow: "0px 0px 20px rgba(0, 0, 100, 0.15)" }}>
      {loading &&
        <div className='w-full h-full flex justify-center items-center'>
          <BlueLoader />
        </div>
      }
      <div
        className="calendly-inline-widget w-full h-full rounded-[35px]"
        data-url={calendlyUrl}
      ></div>
    </div>
  );
};

export default CalendlyWidget;
