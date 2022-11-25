import tokens from './tokens.json';
import { createTheme } from '@shopify/restyle';

const theme = createTheme({
  colors: {
    white: tokens.FigmaColors.white,
    darkSecondary: tokens.FigmaColors.darkSecondary,
    primary: tokens.FigmaColors.primary,
    gray1: tokens.FigmaColors.gray1,
    gray6: tokens.FigmaColors.gray6
  },
  textVariants: {
    price: {
      fontFamily: tokens.FigmaTexts.price.fontFamily,
      fontWeight: tokens.FigmaTexts.price.fontWeight,
      fontSize: tokens.FigmaTexts.price.fontSize
    },
    titleH2: {
      fontFamily: tokens.FigmaTexts.titleH2.fontFamily,
      fontWeight: tokens.FigmaTexts.titleH2.fontWeight,
      fontSize: tokens.FigmaTexts.titleH2.fontSize
    },
    titleH1: {
      fontFamily: tokens.FigmaTexts.titleH1.fontFamily,
      fontWeight: tokens.FigmaTexts.titleH1.fontWeight,
      fontSize: tokens.FigmaTexts.titleH1.fontSize
    }
  }
});

export type Theme = typeof theme;
export default theme;
