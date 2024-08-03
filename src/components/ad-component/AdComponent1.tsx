import React from 'react';
import './AdComponent1.css'

interface AdComponentProps {
  adWidth: string;
  adHeight: string;
}

const AdComponent1 = ({adWidth,adHeight}:AdComponentProps) => {
  // Check if the environment is production
  const isProduction = process.env.REACT_APP_ENV === 'production';

  if (!isProduction) {
    return (
      <div className='ad-card'>
      </div>
    );
  }
  else{
    return (
      <div className="ad-container">
        <ins className="adsbygoogle"
             style={{ display: 'block', width: adWidth, height: adHeight }}
             data-ad-client="ca-pub-7470776396597629"
             data-ad-slot="5471764311"></ins>
        <script>
          (adsbygoogle = window.adsbygoogle || []).push({});
        </script>
      </div>
    );
  }
};

export default AdComponent1;