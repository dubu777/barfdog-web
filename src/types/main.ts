type BannerTargets = 'ALL' | 'GUEST' | 'USER' | 'SUBSCRIBER';

type PopupPosition = 'LEFT' | 'MID' | 'RIGHT';

interface TopBanner {
  name: string;
  backgroundColor: string;
  fontColor: string;
  pcRedirectUrl: string;
  mobileRedirectUrl: string;
}

interface BaseBanner {
  id: number;
  name: string;
  leakedOrder: number;
  pcDisplayBannerUrl: {
    url: string;
  },
  mobileDisplayBannerUrl: {
    url: string;
  },
  pcRedirectUrl: string;
  mobileRedirectUrl: string;
}

interface MainBanner extends BaseBanner {
  targets: BannerTargets;
}

interface PopupBanner extends BaseBanner {
  position: PopupPosition;
}

interface MainBannerInfo {
  topBanner: TopBanner;
  mainBannerList: MainBanner[];
  popupBannerList: PopupBanner[];
}

export type {
  PopupPosition,
  PopupBanner,
  MainBanner,
  MainBannerInfo,
};
