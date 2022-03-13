export enum Rarity {
    // name -- percentage
    Common = 100,
    Uncommon = 40,
    Rare = 20,
    Epic = 8,
    Legendary = 3,
};

interface Attribute {
    trait_type?: string;
    value: string;
};

export interface Metadata {
    id: number;
    name: string;
    description: string;
    datacode: string;
    attributes: Attribute[];
    image: string;
}

const colors = {
    'Yale Blue': Rarity.Common,
    'Amaranth': Rarity.Common,
    'Medium Champagne': Rarity.Common,
    'White': Rarity.Common,

    'Orchid Pink': Rarity.Uncommon,
    'Medium Turquoise': Rarity.Uncommon,
    'Azure': Rarity.Uncommon,
    'Blue Bell': Rarity.Uncommon,
    'Thistle': Rarity.Uncommon,
    'Celadon Blue': Rarity.Uncommon,
};

const grids = {
    '5x5': Rarity.Common,
    'missing_corners': Rarity.Common,
    '3x3': Rarity.Common,
    '5_horizontal': Rarity.Common,
    '5_vertical': Rarity.Common,

    'missing_corners_rotated': Rarity.Uncommon,
    '3x3_rotated': Rarity.Uncommon,
    '5_plus_corners': Rarity.Uncommon,
    '3_horizontal': Rarity.Uncommon,
    '3_vertical': Rarity.Uncommon,
    '5_plus': Rarity.Uncommon,
    '3_plus': Rarity.Uncommon,

    '3_rotated_cw': Rarity.Rare,
    '3_rotated_ccw': Rarity.Rare,
    '5_plus_rotated': Rarity.Rare,
    '3_plus_rotated': Rarity.Rare,
    '5_rotated_cw': Rarity.Rare,
    '5_rotated_ccw': Rarity.Rare,

    'frame': Rarity.Epic,
    'cube': Rarity.Epic,
    'single': Rarity.Epic,

    'diamond': Rarity.Legendary,
    'single_large': Rarity.Legendary,
};

const negatives = {
    'None': Rarity.Common,
    'Quarter_bottom_right': Rarity.Common,
    'Quarter_top_right': Rarity.Common,
    'Quarter_bottom_left': Rarity.Common,
    'Quarter_top_left': Rarity.Common,

    'Half_right': Rarity.Uncommon,
    'Half_left': Rarity.Uncommon,
    'Half_top': Rarity.Uncommon,
    'Half_bottom': Rarity.Uncommon,
    'Quarter_rotated_left': Rarity.Uncommon,
    'Quarter_rotated_top': Rarity.Uncommon,
    'Quarter_rotated_bottom': Rarity.Uncommon,
    'Quarter_rotated_right': Rarity.Uncommon,

    'half_rotated_top_right': Rarity.Rare,
    'half_rotated_bottom_right': Rarity.Rare,
    'half_rotated_top_left': Rarity.Rare,
    'half_rotated_bottom_left': Rarity.Rare,

    '3_quarters_right': Rarity.Epic,
    '3_quarters_left': Rarity.Epic,
    '3_quarters_top': Rarity.Epic,
    '3_quarters_bottom': Rarity.Epic,

    'Full': Rarity.Legendary,
};

const gradients = {
    'gradient-up': Rarity.Rare,
    'gradient-down': Rarity.Rare,
    'gradient-right': Rarity.Rare,
    'gradient-left': Rarity.Rare,
};

const borders = { 'borders': Rarity.Legendary };

export const properties = {
    ...colors,
    ...grids,
    ...negatives,
    ...gradients,
    ...borders,
};

export function hasGradient(attributes: Attribute[]) {
    return attributes.some(({ trait_type }) => trait_type && trait_type === 'gradient');
}