/**
 * points are sparated from lines and polygons so points can be re-used
 * without duplication. Lines can extend from any point to another. Polygons
 * will auto close to the first point.
 * */ 

export const artboard = {
  points: {
    0:  [ 70,   0],
    1:  [ 91,   9],
    2:  [ 89,  29],
    3:  [ 60,  40],
    4:  [ 43,  24],
    5:  [ 48,   8],
    6:  [ 80,   1],
    7:  [ 61,  41],
    8:  [ 55,   6],
    9:  [ 74,  14],
    10: [ 63,  28],
    11: [ 72,  48],
    12: [ 69,  73],
    13: [ 41,  84],
    14: [  7,  81],
    15: [  7,  57],
    16: [ 21,  36],
    17: [ 29,  39],
    18: [ 48,  54],
    19: [ 35,  64],
    20: [ 17,  56],
    21: [100,  22],
    22: [100,  37],
    23: [  5,  36],
    24: [  0,  49],
    25: [  0,  61],
    26: [ 37,  95],
    27: [  8, 100],
    28: [ 95,   2],
    29: [100,   4],
    30: [ 15,  25],
    31: [  0,  80],
  },
  lines: [
    [8, 0, 1, 2, 11, 12, 13, 26, 27, 14, 15, 24, 16, 4, 5, 0, 9, 10, 3, 18, 
      19, 14, 25, 15, 17, 4, 8, 1, 21, 2, 22, 11, 18, 12, 19, 20, 24, 14, 13, 
      19, 17, 7, 10, 2, 9, 6, 8, 5, 10, 4, 23, 16, 15, 20, 18, 7, 2, 3, 16, 
      17, 3, 4, 9, 8, 10, 17, 24, 30, 4],
    [31, 14, 20, 16, 18, 17, 20, 25, 19, 31, 25, 27, 19, 26, 14],
    [4, 7, 11, 3, 9, 1, 10, 11],
    [6, 5, 9, 21, 29, 6],
    [29, 1, 6, 28, 21, 22],
    [30, 16],
  ],
  polygons: [
  ],
  options: {
    vertices: {
      strokeColor: '#1F2833',
      fillColor: '#66FCF1',
      lineWidth: 2,
      radius: 4
    },
    shapes: {
      strokeColor: '#1F2833',
      fillColor: '#2C5F5D',
      lineWidth: 2,
    }
  }
};

export const drawArtboard = {
  points: {},
  lines: [],
  polygons: [],
  options: {
    vertices: {
      strokeColor: 'black',
      fillColor: 'white',
      lineWidth: 2,
      radius: 4
    },
    shapes: {
      strokeColor: 'black',
      fillColor: 'white',
      lineWidth: 2,
    }
  }
};