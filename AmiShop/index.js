/**
 * @format
 */

import {AppRegistry, TextInput} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import { configureReanimatedLogger, ReanimatedLogLevel } from "react-native-reanimated";
configureReanimatedLogger({
    level: ReanimatedLogLevel.warn,
    strict: false,
})

// Disable default system font scaling for Text and TextInput components
if(Text.defaultProps) {
    Text.defaultProps.allowFontScaling = false;
} else {
    Text.defaultProps = {};
    Text.defaultProps.allowFontScaling = false;
}

if(TextInput.defaultProps) {
    TextInput.defaultProps.allowFontScaling = false;
} else {
    TextInput.defaultProps = {};
    TextInput.defaultProps.allowFontScaling = false;
}

AppRegistry.registerComponent(appName, () => App);
