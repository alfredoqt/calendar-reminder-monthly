// @flow

import * as React from 'react';
import theme from 'constants/theme';
import {ThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import GoogleMapsJSAPILoader from 'components/shared/GoogleMapsJSAPILoader.react';
import {StoreContext} from 'stores/hooks/CalendarStoreHooks';
import CalendarStore from 'stores/CalendarStore';
import CalendarApp from 'components/CalendarApp.react';

export default function App(): React.Node {
  return (
    <GoogleMapsJSAPILoader fallback={<p>Loading Maps JS API...</p>}>
      <StoreContext.Provider value={CalendarStore}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <CalendarApp />
        </ThemeProvider>
      </StoreContext.Provider>
    </GoogleMapsJSAPILoader>
  );
}
