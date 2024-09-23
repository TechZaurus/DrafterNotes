import {Manrope} from "next/font/google";


export const manrope_init = Manrope({
    subsets: ['cyrillic'],
    display: 'swap',
    variable: '--font-manrope',
    weight: ['400', '600', '700']
})


export const manrope = manrope_init.className;