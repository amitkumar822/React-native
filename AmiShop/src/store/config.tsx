import { Platform } from "react-native";

//FOR EMULATOR OR SIMULATOR DEVICE
export const BASE_URL = Platform.OS == "android" ? 'http://192.168.42.178:3000' : 'http://localhost:3000';
// export const BASE_URL = Platform.OS == "android" ? 'http://10.0.2.2:3000' : 'http://localhost:3000';

//FOR PHYSICAL DEVICE
// USE YOUR NETWORK IP OR HOSTED URL
// export const BASE_URL = 'http://192.168.29.88:3000';
