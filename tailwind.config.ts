/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      display: ['Open Sans', 'sans-serif'],
      body: ['Open Sans', 'sans-serif'],
    },
    // screens: {
    // },
    extend: {
      fontSize: {
        9: '9px',
        10: '10px',
        11: '11px',
        12: '12px',
        13: '13px',
        14: '14px',
        15: '15px',
        16: '16px',
        17: '17px',
        18: '18px',
        19: '19px',
        20: '20px',
        21: '21px',
        22: '22px',
        23: '23px',
        24: '24px',
        25: '25px',
        26: '26px',
        27: '27px',
        28: '28px',
      },
      fontWeight: {
        600: '600',
        700: '700',
        800: '800',
      },
      lineHeight: {
        0.2: '0.2',
      },
      letterSpacing: {
        2: '2px',
        1: '1px',
      },
      backgroundColor: {
        'side-bg': '#fdf9ff',
      },
      textColor: {
        basic: 'rgba(0, 200, 150, 0.80)',
      },
      borderWidth: {
        1: '1px',
      },

      Colors: {
        400: 'rgba(0, 0, 0, 0.1)',
      },
      width: {
        40: '40px',
        250: '250px',
        280: '280px',
        400: '400px',
        760: '760px',
        780: '780px',
        800: '800px',
        1000: '1000px',
        1200: '1200px',
        1400: '1400px',
      },

      height: {
        80: '80px',
      },
      minHeight: {
        590: '590px',
      },
    },
  },
  plugins: [],
}
