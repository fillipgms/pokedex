interface Gemeration {
    count: number;
    offset: number;
}

interface Generations {
    [key: string | number]: Gemeration;
}

const generations: Generations = {
    1: { count: 151, offset: 0 },
    2: { count: 100, offset: 151 },
    3: { count: 135, offset: 251 },
    4: { count: 107, offset: 386 },
    5: { count: 156, offset: 493 },
    6: { count: 72, offset: 649 },
    7: { count: 88, offset: 721 },
    8: { count: 96, offset: 809 },
    9: { count: 120, offset: 905 },
};

export default generations;
