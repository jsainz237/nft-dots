const colors = {
    // 'Yale Blue': '#1D4E89', // too dark
    'Amaranth': '#DA3E52',
    'Medium Champagne': '#EDDEA4',
    'White': '#FFFFFF',
    'Orchid Pink': '#F6BDD1',
    'Medium Turquoise': '#40CBC0',
    'Azure': '#3F84E5',
    'Blue Bell': '#9097C0',
    'Thistle': '#BFACC8',
    'Celadon Blue': '#247BA0',
}

function getRandomColor() {
    const colorList = Object.entries(colors);
    const num = Math.floor(Math.random() * (colorList.length -1));

    return colorList[num][1];
};

export function getTheme(sectionsCount: number) {
    const theme = {};
    const colorArr = [];
    
    for(let i = 0; i < sectionsCount; i++) {
        let randomColor = getRandomColor();
        while(colorArr.includes(randomColor)) {
            randomColor = getRandomColor();
        }
        colorArr.push(randomColor);
    }

    colorArr.forEach((color, ind) => {
        theme[`s${ind}`] = color;
    });

    return theme;
}