// utils/scale.js
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Guideline sizes são baseados no design original (usei um iPhone 11 como base)
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const scale = size => (width / guidelineBaseWidth) * size;
const verticalScale = size => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

const wp = percentage => (width * percentage) / 100;     // width percentage
const hp = percentage => (height * percentage) / 100;     // height percentage

export { scale, verticalScale, moderateScale, wp, hp };