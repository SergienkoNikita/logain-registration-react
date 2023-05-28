const UI_SIZES_LIST = [
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
] as const;

type AllUiSizes = typeof UI_SIZES_LIST[number];

export type UiSize<T extends AllUiSizes = AllUiSizes> = T;

export const UI_SIZES: {
  [p in AllUiSizes]: p
} = Object.fromEntries(
  UI_SIZES_LIST
    .map((size) => [size, size])
    .filter((size) => size !== undefined),
);
