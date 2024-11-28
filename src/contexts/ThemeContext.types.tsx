export interface ThemeContext {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  themeClasses: {
    textClass: string;
    textHighlightedClass: string;
    textHoveredClass: string;
    primaryBgClass: string;
    secondaryBgClass: string;
    primaryBorderClass: string;
    primaryBgHoveredClass: string;
    inputRingClass: string;
    inputRingClassPrimary: string;
    inputBgClass: string;
    secondaryBorderClass: string;
    primaryColor: string;
  };
}
