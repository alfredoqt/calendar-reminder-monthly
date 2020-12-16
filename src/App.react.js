// @flow

import * as React from 'react';
import Calendar from 'components/calendar/Calendar.react';
import theme from 'constants/theme';
import {ThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import ReminderDialog from 'components/reminder/ReminderDialog.react';
import useBoolean from 'hooks/useBoolean';
import GoogleMapsJSAPILoader from 'components/shared/GoogleMapsJSAPILoader.react';

function App(): React.Node {
  const {value: open, setFalse} = useBoolean(true);
  return (
    <GoogleMapsJSAPILoader fallback={<p>Loading Maps JS API...</p>}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Calendar />
        <ReminderDialog open={open} onClose={setFalse} />
      </ThemeProvider>
    </GoogleMapsJSAPILoader>
  );
}

export default App;
