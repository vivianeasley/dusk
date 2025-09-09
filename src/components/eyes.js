import { html } from "../sparse"
import { emojiLowPolyPNGString } from "../utils";

const img = emojiLowPolyPNGString('😶', { size: 500, cell: 20 });

export const eye = (isleft) => {

    return html`
        <div class="eye-wrapper" ${isleft ? "style='transform: scaleX(-1)'" : ''}>
            <img class="eye-background" src="${img}">
            <svg class="eye-layer" viewBox="0 0 622 500" preserveAspectRatio="xMaxYMin">
                <g class="layer">
                <path class="upper-brow" d="m-6,0l649,0l0,890c-119.17,-95.85 -41.92,-306.25 -163.12,-392.89c-104.61,-77.09 -381.27,-13.02 -485.88,-90.11z" fill="#000000" id="svg_16" stroke="#000000" stroke-width="0"/>
                <path d="m-3,-1c0.68,161 1.35,322 2.03,483l642.97,0c-94.8,-70.22 -336.89,9.59 -431.69,-60.63c-120.2,-90.78 -93.11,-331.59 -213.31,-422.37z" fill="#000000" id="svg_17" stroke="#000000" stroke-width="0"/>
                <path class="iris" d="m330.55,45c-23.96,49.98 -25.34,117.3 -27.43,197.88c0.34,140.76 19.85,202.98 27.97,210.12c0.27,0 25.44,-22.44 24.94,-210.12c-0.65,-149.94 -25.48,-197.88 -25.48,-197.88z" fill="#000000" stroke="#000000" stroke-width="0"/>
                </g>
            </svg>
        </div>
    `
}

export const eyes = () => {

    return html`
        <div class="eyes-wrapper">
            ${eye(false)}
            ${eye(true)}
        </div>
    `
}