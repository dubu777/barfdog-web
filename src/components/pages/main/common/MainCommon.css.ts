import { recipe } from "@vanilla-extract/recipes";
import { style, createVar } from "@vanilla-extract/css";
import { MAIN_BACKGROUND_COLORS } from "@/constants/style";
import { themeVars } from "@/styles/theme.css";

export const mainWrapper = style({
  minHeight: "100vh",
  marginBottom: "85px",
});

// CSS 변수 정의
export const backgroundImageVar = createVar();

export const mainContainer = recipe({
  base: {
    display: "flex",
    flexDirection: "column",
    overflowX: "hidden",
  },
  variants: {
    paddingBottom: {
      0: {},
      10: {
        paddingBottom: "10px",
      },
      40: {
        paddingBottom: "40px",
      },
    },
    paddingY: {
      0: {},
      40: {
        paddingTop: "40px",
        paddingBottom: "40px",
      },
    },
    backgroundColor: {
      pinkWhite: {
        backgroundColor: MAIN_BACKGROUND_COLORS.pinkWhite,
      },
      yellow: {
        backgroundColor: MAIN_BACKGROUND_COLORS.yellow,
      },
      gray200: {
        backgroundColor: MAIN_BACKGROUND_COLORS.gray200,
      },
      gray50: {
        backgroundColor: MAIN_BACKGROUND_COLORS.gray50,
      },
      white: {
        backgroundColor: MAIN_BACKGROUND_COLORS.white,
      },
    },
  },
});

export const mainTitle = recipe({
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    padding: "20px",
  },
  variants: {
    align: {
      center: {
        alignItems: "center",
      },
      left: {
        alignItems: "flex-start",
      },
    },
    noPaddingTop: {
      true: {
        paddingTop: "0",
      },
      false: {},
    },
    paddingTop: {
      0: {},
      60: {
        paddingTop: "60px",
      },
    },
  },
});

export const mainBannerContainer = style({
  width: "100%",
});

export const mainBannerSlider = style({
  width: "100%",
});

export const mainBannerLink = style({
  display: "block",
  width: "100%",
});

export const mainBannerImage = style({
  width: "100%",
  height: "auto",
});

export const mainReviewDescription = style({
  maxWidth: "303px",
  margin: "28px auto 57px",
  padding: "20px",
  backgroundColor: themeVars.colors.red.pastelPink,
  borderRadius: "8px",
  position: "relative",
  selectors: {
    "&:before": {
      content: "😋",
      fontSize: "37px",
      display: "block",
      position: "absolute",
      left: "-15px",
      top: "-15px",
    },
    "&:after": {
      content: "💕",
      fontSize: "37px",
      display: "block",
      position: "absolute",
      right: "-10px",
      bottom: "-10px",
    },
  },
});

export const mainReviewCard = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  width: "120px",
  margin: "0 2px 10px 2px",
  overflow: "hidden",
  boxShadow: themeVars.shadow.light,
  backgroundColor: themeVars.colors.gray.gray0,
  borderRadius: "8px",
});

export const mainReviewImage = style({
  borderTopLeftRadius: "8px",
  borderTopRightRadius: "8px",
});

export const mainReviewCardContent = style({
  width: "100%",
  padding: "8px",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});

export const mainReviewButton = style({
  marginTop: "20px",
});

export const mainStoreItem = style({
  width: "fit-content !important",
  height: "auto",
});

export const mainStoreItemLink = style({
  display: "flex",
  flexDirection: "column",
  gap: "6px",
});

export const mainFAQDescriptionBox = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: "16px",
  padding: "40px 20px 20px",
  maxWidth: "440px",
});

export const mainFAQDescription = style({
  padding: "12px 20px",
  backgroundColor: themeVars.colors.yellow.yellow200,
  borderRadius: "48px",
  selectors: {
    "&:nth-child(1)": {
      marginRight: "auto",
    },
    "&:nth-child(2)": {
      marginLeft: "auto",
    },
    "&:nth-child(3)": {
      marginRight: "auto",
    },
  },
});

export const mainFAQButtonBox = style({
  padding: "120px 20px 20px",
});

export const mainFAQButton = style({
  position: "relative",
});

export const mainFAQButtonAvatar = style({
  position: "absolute",
  top: 0,
  left: "50%",
  transform: "translate(-50%, -100%)",
});

export const mainSurveyImageBox = style({
  height: "308px",
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  paddingTop: "20px",
});

export const mainSurveyImageInnerBox = style({
  display: "flex",
  flexDirection: "row-reverse",
  marginRight: "28px",
});

export const mainSurveyImage1 = style({
  marginTop: "64px",
  transform: "translateX(28px)",
});

export const mainChapterIndexChips = style({
  display: "inline-block",
  marginLeft: "20px",
  marginBottom: "12px",
  borderRadius: "50px",
  background: themeVars.colors.red.red,
  color: themeVars.colors.gray.gray0,
  padding: "0 12px",
});

export const mainChapter1ImageList = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "17px",
  overflow: "hidden",
  padding: "20px",
});

export const mainChapter1Image = style({
  width: "158px",
  height: "344px",
  borderRadius: "8px",
});

export const mainChapter2ImageList = recipe({
  base: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "auto auto",
    gap: "6px 4px",
    paddingBottom: "20px",
  },
  variants: {
    isMobileWidth: {
      true: {
        maxWidth: "100%",
        padding: "20px",
      },
      false: {
        width: "440px",
        margin: "0 auto",
      },
    },
  },
});

export const mainChapter2ImageBox = recipe({
  base: {
    borderRadius: "8px",
    boxShadow: themeVars.shadow.strong,
  },
  variants: {
    gridPosition: {
      0: {
        gridArea: "1 / 1 / 2 / 2", // 첫 번째 행, 첫 번째 열
      },
      1: {
        gridArea: "1 / 2 / 2 / 3", // 첫 번째 행, 두 번째 열
      },
      2: {
        gridArea: "2 / 1 / 3 / 3", // 두 번째 행, 전체 너비
      },
    },
  },
});

export const mainChapter2Image = style({
  width: "100%",
  height: "100%",
  borderRadius: "8px",
});

export const mainChapter3ImageList = style({
  padding: "0 20px !important",
});

export const mainChapter3ImageSlide = style({
  width: "fit-content !important",
  height: "280px !important",
  borderRadius: "8px",
  overflow: "hidden",
});

export const mainChapter3Image = style({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

export const mainBarfContentBox = style({
  padding: "0 20px 20px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

export const storeItemImage = style({
  boxShadow: themeVars.shadow.light,
  borderRadius: "8px",
});

export const mainBarfImage = style({
  width: "100%",
  height: "306px",
  objectFit: "cover",
});

export const mainProductionPointsBox = style({
  background: themeVars.colors.red.red,
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "center",
  padding: "10px 20px",
  gap: "26px",
});

export const mainProductionPoint = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  width: "calc(100% / 3)",
  gap: "10px",
  paddingBottom: "10px",
  height: "100%",
});

export const mainProductionPointDivider = style({
  width: "1.5px",
  height: "100px",
  display: "block",
  margin: "auto 0",
  background: themeVars.colors.gray.gray0,
});

export const mainProductionImageBox = style({
  display: "flex",
  justifyContent: "center",
  gap: "4px",
  padding: "0 20px 20px",
});

export const mainProductionImage = style({
  width: "109px",
  height: "148px",
  objectFit: "contain",
  borderRadius: "8px",
});

export const mainProductionVideo = style({
  width: "100%",
  height: "auto",
  objectFit: "contain",
});

export const mainDeliveryMarqueeContainer = style({
  background: themeVars.colors.red.red,
  height: "40px",
});

export const mainDeliveryMarqueeBox = style({
  display: "flex",
  gap: "46px",
  margin: "0 23px",
});

export const mainDeliveryMarquee = style({
  display: "flex",
  alignItems: "center",
  gap: "8px",
});

export const mainDeliveryImage = style({
  maxWidth: "340px",
  width: "100%",
  height: "auto",
  objectFit: "contain",
  borderRadius: "8px",
  margin: "0 auto 10px",
});

export const mainBrandStoryContainer = style({
  padding: "40px 20px 316px",
});

export const mainBrandStoryMarquee = style({
  background: themeVars.colors.gray.gray0,
  height: "64px",
  display: "flex",
  alignItems: "center",
  padding: "8px 0",
});

export const mainBrandStoryLogo = style({
  margin: "0 12px",
  width: "auto",
  height: "auto",
});
