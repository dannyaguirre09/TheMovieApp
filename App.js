import React, {useMemo, useState} from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { Provider as PaperProvider, DarkTheme as DarkThemePaper, DefaultTheme as DefaultThemePaper } from 'react-native-paper';
import { NavigationContainer, DarkTheme as DarkThemeNavigation, DefaultTheme as DefaultThemeNavigation } from '@react-navigation/native';
import Navigation from "./src/navigation/Navigation";
import PreferencesContext from './src/context/PreferencesContext'

export default function App() {

  DefaultThemePaper.colors.primary = '#1ae1f2';
  DarkThemePaper.colors.primary = '#1ae1f2';
  DarkThemePaper.colors.accent = '#1ae1f2';
  DarkThemeNavigation.colors.background = '#192734';
  DarkThemeNavigation.colors.card = '#15212b'

 const[theme, setTheme] = useState('dark');

 const toggleTheme = () => {
   setTheme(theme === 'dark' ? 'ligth': 'dark')
 }

  const preferences = useMemo(
    () => ({toggleTheme, theme}),
    [theme]
  )

  return (
    <PreferencesContext.Provider value={preferences}>
      <PaperProvider theme={theme === 'dark' ? DarkThemePaper: DefaultThemePaper}>
        <StatusBar barStyle={theme === 'dark' ? 'light-content': 'dark-content'} />
        <NavigationContainer theme={theme === 'dark' ? DarkThemeNavigation: DefaultThemeNavigation}>
          
          <Navigation />
        </NavigationContainer>
      </PaperProvider>
    </PreferencesContext.Provider>
  );
}

const styles = StyleSheet.create({

});
