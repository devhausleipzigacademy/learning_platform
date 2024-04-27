import { create } from "zustand";

import { linksConfig } from "@/components/layout-navigation/links";
import { NavLinks } from "@/components/layout-navigation/useLinks";
import { ArrayOf } from "@/lib/typing";

type IndependentVisibilities = never;
type BlockingVisibilities = "anchors";

export interface UIStoreState {
  visibilities: {
    [K in IndependentVisibilities]: boolean;
  } & { [K in BlockingVisibilities]: Array<string> };
  setVisibilities: (
    updater: (
      visibilities: UIStoreState["visibilities"],
    ) => Partial<UIStoreState["visibilities"]>,
  ) => void;
}

export const useUIStore = create<UIStoreState>((set, get) => ({
  visibilities: {
    anchors: [],
  },
  setVisibilities: (updater) => {
    set((state) => ({
      visibilities: {
        ...state.visibilities,
        ...updater(state.visibilities),
      },
    }));
  },
}));
