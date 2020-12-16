// @flow

import * as React from 'react';
import {useEffect, useState} from 'react';
import GoogleMapsJSAPIContext from 'components/shared/GoogleMapsJSAPIContext.react';

type Props = $ReadOnly<{
  children: React.Node,
  // Fallback to show while the script is loaded
  fallback: React.Node,
}>;

export default function GoogleMapsJSAPILoader({children, fallback}: Props): React.Node {
  const [google, setGoogle] = useState(null);

  useEffect(() => {
    function loadListener() {
      setGoogle(window.google);
    }
    const script = window.document.createElement('script');

    const apiKey = process.env.REACT_APP_MAPS_API_KEY;
    if (apiKey != null) {
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      window.document.body.appendChild(script);
    }
    script.addEventListener('load', loadListener);

    // Cleanup
    return function () {
      script.removeEventListener('load', loadListener);
    };
  }, []);

  // Check for null or undefined
  if (google == null) {
    return fallback;
  }

  return (
    <GoogleMapsJSAPIContext.Provider value={google}>
      {children}
    </GoogleMapsJSAPIContext.Provider>
  );
}
