// @flow

import * as React from 'react';
import Calendar from 'components/calendar/Calendar.react';
import theme from 'constants/theme';
import {ThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

function App(): React.Node {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Calendar />
    </ThemeProvider>
  );
}

export default App;
