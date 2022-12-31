import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { StudioMate } from './StudioMate';
import { BrowserRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { NotificationsProvider } from '@mantine/notifications';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <MantineProvider
    theme={{
      fontFamily: 'Raleway',
      spacing: { xs: 15, sm: 20, md: 25, lg: 30, xl: 40 },
      colorScheme: "light",
      colors: {
        'orangy': ['#BB5A36', '#bb5a36', '#c97b5e', '#cf8c72', '#d69c86', '#ddad9b', "#e4bdaf", "#ebcec3", "#f1ded7", "#f8efeb"],
        'browny': ['#623A2C', '#724e41', '#816156', '#91756b', '#a18980', "#b19d96", "#c0b0ab", "#d0c4c0", "#e0d8d5", "#efebea"]
      }
    }}
    style={{
      Button: (theme) => ({
        root: {
          backgroundColor: theme.colors.orangy[0]
        }
      })
    }}
  >
    <ModalsProvider>
      <NotificationsProvider position="bottom-center">
        <BrowserRouter>
          <StudioMate />
        </BrowserRouter>
      </NotificationsProvider>
    </ModalsProvider>
  </MantineProvider>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
